# Goodreads on Amazon Webscraper: for the eternal unsure

This [Puppeteer](https://github.com/puppeteer/puppeteer)-powered scripts:

1. fetches categories from a selected GoodReads book of the year (eg: https://www.goodreads.com/choiceawards/best-books-2020)
2. asks the user (via cmd) what category it should proceed with
3. selects a random book from the selected category in the winning section
4. opens a browser and heads to Amazon, where it finds the books, adds it to the cart and proceeds to checkout
5. profit! (at least for Amazon)

### How do I run it?

- Download the zip package from Github, extract it.
- Open the folder in your preferred terminal, then run:
  1. `npm install` to fetch all the packages required to run the script ([node](https://nodejs.org/en/download/) is required).
  2. `node script` to run the script.
  3. Follow the terminal screen instructions to navigate the script.
