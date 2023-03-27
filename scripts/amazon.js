const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapVacancies(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // Extracting job titles.
    const job_titles = await page.$$eval(".job-title", 
        element => element.map(
            title => title.textContent
        )
    );
    // console.log(job_titles);

    // Extracting Job_id.
    const location_and_id = await page.$$eval(".location-and-id", 
        element => element.map(
            title => title.textContent
        )
    );
    // console.log(location_and_id);

    // Extracting Job posting date.
    const job_posting = await page.$$eval(".posting-date", 
        element => element.map(
            title => title.textContent
        )
    );
    // console.log(job_posting);

    browser.close();
    
    return {
        job_titles, 
        location_and_id, 
        job_posting
    };
}

scrapVacancies('https://www.amazon.jobs/en/teams/in').then((data) => {
    const fileData = fs.readFileSync('data.json');
    // console.log(fileData.length);
    let newDataJSON = {amazon: data};
    if(fileData.length) {
        newDataJSON = {...newDataJSON, ...(JSON.parse(fileData))};
    }
    // console.log(newDataJSON);
    const newFileData = JSON.stringify(newDataJSON);
    fs.writeFileSync('data.json', newFileData, (error) => {
        if(error) {
            console.log(error);
        }
    });
    console.log("[Amazon] Data Saved Successfully!");
}).catch((error) => {
    console.log(error);
});
