const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapVacancies(url) {
    const browser = await puppeteer.launch();
    let page = await browser.newPage();
    await page.goto(url);

    let job_title = [], job_location = [], job_link = [];

    do {
        // Extracting job titles.
        await page.waitForSelector('.spHGqe .QJPWVe');
        job_title = [...job_title, ...(await page.$$eval(".spHGqe .QJPWVe", 
            element => element.map(
                title => title.textContent.trim()
            )
        ))];
        // console.log(job_title);
    
        // Extracting Job_locations.
        await page.waitForSelector('.l103df .r0wTof:first-child');
        job_location = [...job_location, ...(await page.$$eval('.l103df .r0wTof:first-child', 
            element => element.map(
                location => location.textContent.trim()
            )
        ))];
        job_location = job_location.map(
            location => location.split('\n').filter(s => s).join(' ').split(' ').filter(s => s).join(' ')
        );
        // console.log(job_location);
    
        // Extracting job link.
        await page.waitForSelector('.VfPpkd-dgl2Hf-ppHlrf-sM5MNb .VfPpkd-LgbsSe a');
        job_link = [...job_link, ...(await page.$$eval(".VfPpkd-dgl2Hf-ppHlrf-sM5MNb .VfPpkd-LgbsSe a", 
            element => element.map(
                title => "https://careers.google.com" + title.getAttribute("href")
            )
        ))];
        // console.log(job_link);

        await page.waitForSelector('button[aria-label="Go to next page"]');
        if(await page.$('button[aria-label="Go to next page"][disabled]')) {
            break;
        } else {
            await page.click('button[aria-label="Go to next page"]');
            await page.goto(page.url());
        }
    } while(true);

    browser.close();
    
    return {
        job_title,
        job_location,
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
