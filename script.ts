const puppeteer = require('puppeteer');
const readline = require('readline');

console.clear();

interface catsArr {
    title: string;
    url: string;
}
[];

(async () => {
    const goodreads = await puppeteer.launch();
    const grPage = await goodreads.newPage();
    grPage.setDefaultNavigationTimeout(0);

    console.log('Looking up available book categories...');

    await grPage.goto('https://www.goodreads.com/choiceawards/best-books-2020');

    const categoriesList = '.category';
    await grPage.waitForSelector(categoriesList);

    // Extract the results from the page into an array of objects
    const categories = await grPage.evaluate((categoriesList: string) => {
        const titles = document.querySelectorAll<HTMLElement>(`${categoriesList} h4`);
        const urls = document.querySelectorAll<HTMLAnchorElement>(`${categoriesList} > a`);
        const catsArr: catsArr[] = [];
        for (let i = 0; i < titles.length; i++) {
            catsArr.push({
                title: titles[i].innerText,
                url: urls[i].href,
            });
        }
        return catsArr;
    }, categoriesList);

    let catList = '';
    categories.forEach((elem: HTMLElement, index: number) => {
        catList += `${index}. ${elem.title}\n`;
    });

    async function askUserForCat(): Promise<string> {
        const ask = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        return new Promise((resolve) => {
            ask.question(
                `Which category would you like a suggestion for? Please input the number for the desidered category:\n${catList}=> `,
                (answer: string) => {
                    ask.close();
                    resolve(answer);
                }
            );
        });
    }
    const selectedCat = await askUserForCat();
    await grPage.goto(categories[selectedCat].url);

    const booksList = '.pollAnswer';
    await grPage.waitForSelector(booksList);

    // Choose a random book between the books present in a category
    const randomBook = await grPage.evaluate((booksList: string) => {
        const books = Array.from(document.querySelectorAll<HTMLImageElement>(`${booksList} > .answerWrapper img`));
        const numOfBooks = books.length;
        return books[Math.floor(Math.random() * numOfBooks)].alt;
    }, booksList);

    console.log(`The book that was choosen for you is: ${randomBook}`);
    console.log(`Now adding the book to your Amazon shopping cart...`);

    await goodreads.close();
    // end of goodreads fetch

    // start of amazon checkout
    const amazon = await puppeteer.launch({
        headless: false,
        args: ['--start-maximized'],
    });
    const amazPpage = await amazon.newPage();
    amazPpage.setDefaultNavigationTimeout(0);
    await amazPpage.goto('https://www.amazon.com');

    // Type book into search box and clicks search button
    const searchField = '.nav-search-field input';
    await amazPpage.waitForSelector(searchField);
    await amazPpage.type(searchField, `${randomBook} paperback`);
    await amazPpage.click('.nav-search-submit');

    // Wait for the amazon results page to load and display the results
    // clicking on the paperback option
    const searchResults = 'div[data-cel-widget="search_result_1"] .a-link-normal';
    await amazPpage.waitForSelector(searchResults);
    const findPaperback = await amazPpage.evaluate((searchResults: string) => {
        const links = document.querySelectorAll<HTMLAnchorElement>(searchResults);
        const paperbackIndex = Array.from(links).filter((link, index) => {
            if (link.innerText === 'Kindle' || link.innerText === 'Paperback' || link.innerText === 'Hardcover')
                return index;
        });
        return paperbackIndex[0].href;
    }, searchResults);
    await amazPpage.goto(findPaperback);

    // Wait for the product page to load and add to cart
    const addToCart = '#add-to-cart-button';
    await amazPpage.waitForSelector(addToCart);
    await amazPpage.click(addToCart);

    // Proceed to checkout
    const checkout = '#sc-buy-box-ptc-button';
    await amazPpage.waitForSelector(checkout);
    await amazPpage.click(checkout);
})();
