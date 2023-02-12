const puppeteer = require('puppeteer');

async function scrapVacancies(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // Extracting job titles.
    // Extracting using very first class.
    const job_titles = await page.$$eval("._8sel", 
    element => element.map(
            title => title.textContent
        )
    );
    console.log(job_titles);
        
    // Extracting job locations.
    const job_locations = await page.$$eval("._8seh>._97fe>._8sec>._8see", 
        element => element.map(
            title => title.textContent
        )
    );
    console.log(job_locations);

    browser.close();
}

scrapVacancies('https://www.metacareers.com/jobs');