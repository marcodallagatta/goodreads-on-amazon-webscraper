var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var puppeteer = require('puppeteer');
var readline = require('readline');
console.clear();
[];
(function () { return __awaiter(_this, void 0, void 0, function () {
    function askUserForCat() {
        return __awaiter(this, void 0, void 0, function () {
            var ask;
            return __generator(this, function (_a) {
                ask = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout
                });
                return [2 /*return*/, new Promise(function (resolve) {
                        ask.question("Which category would you like a suggestion for? Please input the number for the desidered category:\n".concat(catList, "=> "), function (answer) {
                            ask.close();
                            console.log("Now fetching a random book from ".concat(categories[answer].title, ". Please wait..."));
                            resolve(answer);
                        });
                    })];
            });
        });
    }
    var goodreads, grPage, err_1, categoriesList, categories, catList, selectedCat, err_2, booksList, randomBook, amazon, amazPpage, err_3, searchField, searchResults, findPaperback, err_4, addToCart, checkout;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, puppeteer.launch()];
            case 1:
                goodreads = _a.sent();
                return [4 /*yield*/, goodreads.newPage()];
            case 2:
                grPage = _a.sent();
                grPage.setDefaultNavigationTimeout(0);
                console.log('Looking up available book categories...');
                _a.label = 3;
            case 3:
                _a.trys.push([3, 5, , 6]);
                return [4 /*yield*/, grPage.goto('https://www.goodreads.com/choiceawards/best-books-2020')];
            case 4:
                _a.sent();
                return [3 /*break*/, 6];
            case 5:
                err_1 = _a.sent();
                console.error('An error occurred loading the page!\n', err_1);
                return [3 /*break*/, 6];
            case 6:
                categoriesList = '.category';
                return [4 /*yield*/, grPage.waitForSelector(categoriesList)];
            case 7:
                _a.sent();
                return [4 /*yield*/, grPage.evaluate(function (categoriesList) {
                        try {
                            var titles = document.querySelectorAll("".concat(categoriesList, " h4"));
                            var urls = document.querySelectorAll("".concat(categoriesList, " > a"));
                            var catsArr = [];
                            for (var i = 0; i < titles.length; i++) {
                                catsArr.push({
                                    title: titles[i].innerText,
                                    url: urls[i].href
                                });
                            }
                            return catsArr;
                        }
                        catch (err) {
                            console.error('An error occured scraping the page!\n', err);
                        }
                    }, categoriesList)];
            case 8:
                categories = _a.sent();
                catList = '';
                categories.forEach(function (elem, index) {
                    catList += "".concat(index, ". ").concat(elem.title, "\n");
                });
                return [4 /*yield*/, askUserForCat()];
            case 9:
                selectedCat = _a.sent();
                _a.label = 10;
            case 10:
                _a.trys.push([10, 12, , 13]);
                return [4 /*yield*/, grPage.goto(categories[selectedCat].url)];
            case 11:
                _a.sent();
                return [3 /*break*/, 13];
            case 12:
                err_2 = _a.sent();
                console.error('An error occurred loading the page!\n', err_2);
                return [3 /*break*/, 13];
            case 13:
                booksList = '.pollAnswer';
                return [4 /*yield*/, grPage.waitForSelector(booksList)];
            case 14:
                _a.sent();
                return [4 /*yield*/, grPage.evaluate(function (booksList) {
                        try {
                            var books = Array.from(document.querySelectorAll("".concat(booksList, " > .answerWrapper img")));
                            var numOfBooks = books.length;
                            return books[Math.floor(Math.random() * numOfBooks)].alt;
                        }
                        catch (err) {
                            console.error('An error occured scraping the page!\n', err);
                        }
                    }, booksList)];
            case 15:
                randomBook = _a.sent();
                console.log("The book that was choosen for you is: ".concat(randomBook));
                console.log("Now adding the book to your Amazon shopping cart...");
                return [4 /*yield*/, goodreads.close()];
            case 16:
                _a.sent();
                return [4 /*yield*/, puppeteer.launch({
                        headless: false,
                        args: ['--start-maximized']
                    })];
            case 17:
                amazon = _a.sent();
                return [4 /*yield*/, amazon.newPage()];
            case 18:
                amazPpage = _a.sent();
                amazPpage.setDefaultNavigationTimeout(0);
                _a.label = 19;
            case 19:
                _a.trys.push([19, 21, , 22]);
                return [4 /*yield*/, amazPpage.goto('https://www.amazon.com')];
            case 20:
                _a.sent();
                return [3 /*break*/, 22];
            case 21:
                err_3 = _a.sent();
                console.error('An error occurred loading the page!\n', err_3);
                return [3 /*break*/, 22];
            case 22:
                searchField = '.nav-search-field input';
                return [4 /*yield*/, amazPpage.waitForSelector(searchField)];
            case 23:
                _a.sent();
                return [4 /*yield*/, amazPpage.type(searchField, "".concat(randomBook, " paperback"))];
            case 24:
                _a.sent();
                return [4 /*yield*/, amazPpage.click('.nav-search-submit')];
            case 25:
                _a.sent();
                searchResults = 'div[data-cel-widget="search_result_1"] .a-link-normal';
                return [4 /*yield*/, amazPpage.waitForSelector(searchResults)];
            case 26:
                _a.sent();
                return [4 /*yield*/, amazPpage.evaluate(function (searchResults) {
                        var links = document.querySelectorAll(searchResults);
                        var paperbackIndex = Array.from(links).filter(function (link, index) {
                            if (link.innerText === 'Kindle' || link.innerText === 'Paperback' || link.innerText === 'Hardcover')
                                return index;
                        });
                        return paperbackIndex[0].href;
                    }, searchResults)];
            case 27:
                findPaperback = _a.sent();
                _a.label = 28;
            case 28:
                _a.trys.push([28, 30, , 31]);
                return [4 /*yield*/, amazPpage.goto(findPaperback)];
            case 29:
                _a.sent();
                return [3 /*break*/, 31];
            case 30:
                err_4 = _a.sent();
                console.error('An error occurred loading the page!\n', err_4);
                return [3 /*break*/, 31];
            case 31:
                addToCart = '#add-to-cart-button';
                return [4 /*yield*/, amazPpage.waitForSelector(addToCart)];
            case 32:
                _a.sent();
                return [4 /*yield*/, amazPpage.click(addToCart)];
            case 33:
                _a.sent();
                checkout = '#sc-buy-box-ptc-button';
                return [4 /*yield*/, amazPpage.waitForSelector(checkout)];
            case 34:
                _a.sent();
                return [4 /*yield*/, amazPpage.click(checkout)];
            case 35:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
