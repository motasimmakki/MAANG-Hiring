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
        job_title = [...job_title, ...(await page.$$eval(".job-title", 
            element => element.map(
                title => title.textContent
            )
        ))];
        // console.log(job_title);
    
        // Extracting Job_id.
        job_location = [...job_location, ...(await page.$$eval(".location-and-id", 
            element => element.map(
                title => title.textContent
            )
        ))];
        // console.log(job_location);
    
        // Extracting Job posting date.
        job_posting = [...job_posting, ...(await page.$$eval(".posting-date", 
            element => element.map(
                title => title.textContent
            )
        ))];
        // console.log(job_posting);
    
        // Extracting job link.
        job_link = [...job_link, ...(await page.$$eval(".job-link", 
            element => element.map(
                title => "https://www.amazon.jobs" + title.getAttribute("href")
            )
        ))];
        // console.log(job_link);

        if(await page.$(".pagination-control>.btn.circle.right")) {
            await page.click(".pagination-control>.btn.circle.right");
            await page.goto(page.url());
        } else {
            break;
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

scrapVacancies('https://www.amazon.jobs/en/teams/in').then((data) => {
    const fileData = fs.readFileSync('./src/data.json');
    // console.log(fileData.length);
    let newDataJSON = {amazon: data};
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
    console.log("[Amazon] Data Saved Successfully!");
}).catch((error) => {
    console.log(error);
});
