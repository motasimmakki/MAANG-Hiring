// Testing phase.
const puppeteer = require('puppeteer');

async function scrapVacancies(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // Extracting job titles.
    const job_titles = await page.$$eval(".e1rpdjew0", 
        element => element.map(
            title => title.textContent
        )
    );
    console.log(job_titles);

    // Extracting job locations.
    const job_locations = await page.$$eval(".e13jx43x2:not(div)", 
        element => element.map(
            title => title.textContent
        )
    );
    console.log(job_locations);

    browser.close();
}

scrapVacancies('https://jobs.netflix.com/search?location=Mumbai%2C%20India');
