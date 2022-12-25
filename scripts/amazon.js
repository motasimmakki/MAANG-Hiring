const puppeteer = require('puppeteer');

module.exports = {
    scrapVacancies: async function(url) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
    
        // Extracting job titles.
        const job_titles = await page.$$eval(".job-title", 
            element => element.map(
                title => title.textContent
            )
        );
        console.log(job_titles);
    
        // Extracting Job_id.
        const location_and_id = await page.$$eval(".location-and-id", 
            element => element.map(
                title => title.textContent
            )
        );
        console.log(location_and_id);
    
        // Extracting Job posting date.
        const job_posting = await page.$$eval(".posting-date", 
            element => element.map(
                title => title.textContent
            )
        );
        console.log(job_posting);
    
        browser.close();
    }
}