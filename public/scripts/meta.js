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
        job_title = [...job_title, ...(await page.$$eval("._8sel", 
            element => element.map(
                    title => title.textContent
                )
        ))];
        // console.log(job_title);
    
        // Extracting job locations.
        job_location = [...job_location, ...(await page.$$eval("._8seh>._97fe>._8sec>._8see", 
            element => element.map(
                title => title.textContent
            )
        ))];
        // console.log(job_location);
    
        // Extracting job link.
        job_link = [...job_link, ...(await page.$$eval("._af0h>._8sef", 
            element => element.map(
                title => "https://www.metacareers.com" + title.getAttribute("href")
            )
        ))];
        // console.log(job_link);
        
        if(await page.$("._8se3>a")) {
            let pagination = await page.$$eval("._8se3>a", 
                element => element.map(
                    title => title.textContent
                )
            )
            if(pagination.at(pagination.length-1) === "Next") {
                await page.click("._8se3>a");
                await page.goto(page.url());
            } else {
                break;
            }
        } else {
            break;
        }
    } while(true);

    browser.close();

    return {
        job_title,
        job_location,
        job_link
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
