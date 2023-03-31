const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapVacancies(url) {
    const browser = await puppeteer.launch();
    let page = await browser.newPage();
    await page.goto(url);

    let job_title = [], job_location = [], 
        job_posting = [], job_link = [];

    do {
        // Extracting job titles.
        await page.waitForSelector('.gc-card__title');
        job_title = [...job_title, ...(await page.$$eval(".gc-card__title", 
            element => element.map(
                title => title.textContent.trim()
            )
        ))];
        // console.log(job_title);
    
        // Extracting Job_id.
        await page.waitForSelector('.gc-job-tags');
        job_location = [...job_location, ...(await page.$$eval('.gc-job-tags', 
            element => element.map(
                title => title.textContent.trim()
            )
        ))];
        job_location = job_location.map(
            s => s.split('\n').filter(s => s).join(' ').split(' ').filter(s => s).join(' ')
        );
        // console.log(job_location);
    
        // Extracting job link.
        await page.waitForSelector('.gc-card__container>.gc-card');
        job_link = [...job_link, ...(await page.$$eval(".gc-card__container>.gc-card", 
            element => element.map(
                title => "https://careers.google.com" + title.getAttribute("href")
            )
        ))];
        // console.log(job_link);

        await page.waitForSelector('a[data-gtm-ref="search-results-next-click"]');
        if(await page.$('a[data-gtm-ref="search-results-next-click"][style="display: none;"]')) {
            break;
        } else {
            await page.click('a[data-gtm-ref="search-results-next-click"]');
            await page.goto(page.url());
        }
    } while(true);

    browser.close();
    
    return {
        job_title, 
        job_location, 
        job_posting,
        job_link
    };
}

scrapVacancies('https://careers.google.com/jobs/results/').then((data) => {
    const fileData = fs.readFileSync('./src/data.json');
    // console.log(fileData.length);
    let newDataJSON = {google: data};
    if(fileData.length) {
        newDataJSON = {...newDataJSON, ...(JSON.parse(fileData))};
    }
    // console.log(newDataJSON);
    const newFileData = JSON.stringify(newDataJSON);
    fs.writeFileSync('./src/data.json', newFileData, (error) => {
        if(error) {
            console.log(error);
        }
    });
    console.log("[Google] Data Saved Successfully!");
}).catch((error) => {
    console.log(error);
});
