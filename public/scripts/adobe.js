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
        await page.waitForSelector('.job-title span');
        job_title = [...job_title, ...(await page.$$eval(".job-title span", 
            element => element.map(
                title => title.textContent
            )
        ))];
        // console.log(job_title);
    
        // Extracting Job_location.
        await page.waitForSelector('.jobs-list-item');
        let job_item = await page.$$(".jobs-list-item");
        for(let item of job_item) {
            if(await item.$('.job-location')) {
                let element = await item.$('.job-location');
                let str = await element.evaluate((location) => location.textContent.split('\n'));
                str = str[str.length - 2].trim();
                job_location = [...job_location, str];
            } else {
                job_location = [...job_location, ''];
            }
        }
        // console.log(job_location);
        
        // Extracting Job posting date.
        for(let item of job_item) {
            if(await item.$('.job-postdate')) {
                let element = await item.$('.job-postdate');
                let str = await element.evaluate((location) => location.textContent.split('\n'));
                str = str[str.length - 2].trim();
                job_posting = [...job_posting, str];
            } else {
                job_posting = [...job_location, ''];
            }
        }
        // console.log(job_posting);
    
        // Extracting job link.
        await page.waitForSelector('.jobs-list-item a[ph-tevent="job_click"]');
        job_link = [...job_link, ...(await page.$$eval('.jobs-list-item a[ph-tevent="job_click"]', 
            element => element.map(
                link => link.getAttribute("href")
            )
        ))];
        // console.log(job_link);

        if(await page.$('a[aria-label="View next page"].aurelia-hide')) {
            break;
        } else {
            await page.click('a[aria-label="View next page"].au-target .icon-arrow-right');
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

// async function print() {
//     let adobe = await scrapVacancies('https://careers.adobe.com/us/en/c/engineering-and-product-jobs');
//     console.log(adobe);
// }
// print();
scrapVacancies('https://careers.adobe.com/us/en/c/engineering-and-product-jobs').then((data) => {
    const fileData = fs.readFileSync('./src/data.json');
    // console.log(fileData.length);
    let newDataJSON = {adobe: data};
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
    console.log("[Adobe] Data Saved Successfully!");
}).catch((error) => {
    console.log(error);
});
