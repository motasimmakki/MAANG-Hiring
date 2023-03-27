// Testing phase.
const puppeteer = require('puppeteer');
const fs = require('fs');

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
    // console.log(job_titles);

    // Extracting job locations.
    const job_locations = await page.$$eval(".e13jx43x2:not(div)", 
        element => element.map(
            title => title.textContent
        )
    );
    // console.log(job_locations);

    browser.close();

    return {
        job_titles,
        job_locations
    };
}

scrapVacancies('https://jobs.netflix.com/search?location=Mumbai%2C%20India').then((data) => {
    const fileData = fs.readFileSync('data.json');
    // console.log(fileData.length);
    let newDataJSON = {netflix: data};
    if(fileData.length) {
        newDataJSON = {...newDataJSON, ...(JSON.parse(fileData))};
    }
    const newFileData = JSON.stringify(newDataJSON);
    fs.writeFileSync('data.json', newFileData, (error) => {
        if(error) {
            console.log(error);
        }
    });
    console.log("[Netflix] Data Saved Successfully!");
}).catch((error) => {
    console.log(error);
});
