const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapVacancies(url) {
    const browser = await puppeteer.launch();
    let page = await browser.newPage();
    await page.goto(url);

    let job_title = [], job_location = [], job_link = [];
    let nextCount = 0, sizeFactor = 14;

    do {
        // Extracting job titles.
        await page.waitForSelector('.job-tile__header .job-tile__title');
        let titles = await page.$$('.job-tile__header .job-tile__title');
        for(let i = (sizeFactor * nextCount); i < titles.length; i++) {
            job_title = [...job_title, await titles[i].evaluate((title) => title.textContent)];
        }
        // console.log(job_title);
    
        // Extracting Job_locations.
        await page.waitForSelector('.job-tile__subheader span[data-bind="html: primaryLocation"]');
        let locations = await page.$$('.job-tile__subheader span[data-bind="html: primaryLocation"]');
        for(let i = (sizeFactor * nextCount); i < locations.length; i++) {
            job_location = [...job_location, await locations[i].evaluate((location) => location.textContent)];
        }
        // console.log(job_location);
    
        // Extracting job link.
        await page.waitForSelector('.job-tile a[href]');
        let links = await page.$$('.job-tile a[href]');
        for(let i = (sizeFactor * nextCount); i < links.length; i++) {
            job_link = [...job_link, await links[i].evaluate((link) => link.getAttribute("href"))];
        }
        // console.log(job_link);

        try {
            await page.waitForSelector('div.search-pagination button');
            if(await page.$("div.search-pagination button")) {
                await page.click("div.search-pagination button");
                await page.waitForNetworkIdle();
                nextCount += 1;
            } else {
                break;
            }
        } catch(error) {
            break;
        }
    } while(true);

    browser.close();
    
    return {
        job_title, 
        job_location,
        job_link
    };
}
// async function print() {
//     let oracle = await scrapVacancies('https://careers.oracle.com/jobs/#en/sites/jobsearch/requisitions');
//     console.log(oracle);
// }
// print();
scrapVacancies('https://careers.oracle.com/jobs/#en/sites/jobsearch/requisitions').then((data) => {
    const fileData = fs.readFileSync('./src/data.json');
    // console.log(fileData.length);
    let newDataJSON = {oracle: data};
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
    console.log("[Oracle] Data Saved Successfully!");
}).catch((error) => {
    console.log(error);
});
