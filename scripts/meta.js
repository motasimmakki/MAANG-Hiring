const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapVacancies(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // Extracting job titles.
    // Extracting using very first class.
    const job_titles = await page.$$eval("._8sel", 
    element => element.map(
            title => title.textContent
        )
    );
    // console.log(job_titles);
        
    // Extracting job locations.
    const job_locations = await page.$$eval("._8seh>._97fe>._8sec>._8see", 
        element => element.map(
            title => title.textContent
        )
    );
    // console.log(job_locations);

    browser.close();

    return {
        job_titles,
        job_locations
    }
}

scrapVacancies('https://www.metacareers.com/jobs').then((data) => {
    const fileData = fs.readFileSync('./src/data.json');
    // console.log(fileData.length);
    let newDataJSON = {meta: data};
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
    console.log("[Meta] Data Saved Successfully!");
}).catch((error) => {
    console.log(error);
});
