// Testing phase.
const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapVacancies(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    let job_title = [], job_location = [], job_link = [];

    do {
        // Extracting job titles.
        // Extracting using very first class.
        await page.waitForSelector('.e1rpdjew0');
        job_title = [...job_title, ...(await page.$$eval(".e1rpdjew0", 
            element => element.map(
                    title => title.textContent.trim()
                )
        ))];
        // console.log(job_title);
    
        // Extracting job locations.
        await page.waitForSelector('.e13jx43x2:not(div)');
        job_location = [...job_location, ...(await page.$$eval(".e13jx43x2:not(div)", 
            element => element.map(
                location => location.textContent.trim()
            )
        ))];
        // console.log(job_location);
    
        // Extracting job link.
        await page.waitForSelector('.e1rpdjew3>.essqqm81');
        job_link = [...job_link, ...(await page.$$eval(".e1rpdjew3>.essqqm81", 
            element => element.map(
                link => "https://www.jobs.netflix.com" + link.getAttribute("href")
            )
        ))];
        // console.log(job_link);

        await page.waitForSelector('button[aria-label="Next Page"]');
        if(await page.$('button[aria-label="Next Page"][disabled]')) {
            break;
        } else {
            await page.click('button[aria-label="Next Page"]');
            await page.goto(await page.url());
        }
    } while(true);

    browser.close();

    return {
        job_title,
        job_location,
        job_link
    };
}

scrapVacancies('https://jobs.netflix.com/search').then((data) => {
    const fileData = fs.readFileSync('./src/data.json');
    // console.log(fileData.length);
    let newDataJSON = {netflix: data};
    if(fileData.length) {
        newDataJSON = {...newDataJSON, ...(JSON.parse(fileData))};
    }
    const newFileData = JSON.stringify(newDataJSON);
    fs.writeFileSync('./src/data.json', newFileData, (error) => {
        if(error) {
            console.log(error);
        }
    });
    console.log("[Netflix] Data Saved Successfully!");
}).catch((error) => {
    console.log(error);
});
