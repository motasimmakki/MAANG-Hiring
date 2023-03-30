const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapVacancies(url) {
    const browser = await puppeteer.launch();
    let page = await browser.newPage();
    await page.goto(url);

    let job_titles = [], location_and_id = [], 
        job_posting = [], job_link = [];

    do {
        // Extracting job titles.
        job_titles = [...job_titles, ...(await page.$$eval(".table--advanced-search__title", 
            element => element.map(
                title => title.textContent
            )
        ))];
        // console.log(job_titles);
    
        // Extracting Job_id.
        location_and_id = [...location_and_id, ...(await page.$$eval(".table-col-2>span:last-of-type", 
            element => element.map(
                title => title.textContent
            )
        ))];
        // console.log(location_and_id);
    
        // Extracting Job posting date.
        job_posting = [...job_posting, ...(await page.$$eval(".table--advanced-search__date", 
            element => element.map(
                title => title.textContent
            )
        ))];
        // console.log(job_posting);
    
        // Extracting job link.
        job_link = [...job_link, ...(await page.$$eval(".table--advanced-search__title", 
            element => element.map(
                title => "https://jobs.apple.com" + title.getAttribute("href")
            )
        ))];
        // console.log(job_link);

        if(await page.$('.pagination__next .disabled')) {
            break;
        } else {
            await page.click('.pagination__next .next');
            await page.goto(await page.url());
        }
    } while(true);

    browser.close();
    
    return {
        job_titles, 
        location_and_id, 
        job_posting,
        job_link
    };
}

scrapVacancies('https://jobs.apple.com/en-in/search').then((data) => {
    const fileData = fs.readFileSync('./src/data.json');
    // console.log(fileData.length);
    let newDataJSON = {apple: data};
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
    console.log("[Apple] Data Saved Successfully!");
}).catch((error) => {
    console.log(error);
});
