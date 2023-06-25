const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapVacancies(url) {
    const browser = await puppeteer.launch();
    let page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto(url);

    let job_title = [], job_location = [], job_link = [];

    do {
        // Extracting job titles.
        await page.waitForSelector('#search-results-list li h2');
        job_title = [...job_title, ...(await page.$$eval("#search-results-list li h2", 
            element => element.map(
                title => title.textContent.trim()
            )
        ))];
        // console.log(job_title);
            
        // Extracting Job_location.
        await page.waitForSelector('#search-results-list .job-location-search');
        job_location = [...job_location, ...(await page.$$eval("#search-results-list .job-location-search", 
            element => element.map(
                location => location.textContent.trim()
            )
        ))];
        // console.log(job_location);
                
        // Extracting job link.
        await page.waitForSelector('#search-results-list a:not(.prev):not(.next):not(.pagination-show-all)');
        job_link = [...job_link, ...(await page.$$eval("#search-results-list a:not(.prev):not(.next):not(.pagination-show-all)", 
            element => element.map(
                link => "https://jobs.dell.com/" + link.getAttribute("href")
            )
        ))];
        // console.log(job_link);

        if(await page.$("#search-results-list a.next:not(.disabled)")) {
            await page.click("#search-results-list a.next:not(.disabled)");
            await page.goto(page.url());
        } else {
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
//     let dell = await scrapVacancies('https://jobs.dell.com/category/new-graduates-jobs/375/55394/1');
//     console.log(dell);
// }
// print();

scrapVacancies('https://jobs.dell.com/category/new-graduates-jobs/375/55394/1').then((data) => {
    const fileData = fs.readFileSync('./src/data.json');
    // console.log(fileData.length);
    let newDataJSON = {dell: data};
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
    console.log("[Dell] Data Saved Successfully!");
}).catch((error) => {
    console.log(error);
});
