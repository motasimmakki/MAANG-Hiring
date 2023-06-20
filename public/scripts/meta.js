const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapVacancies(url) {
    const browser = await puppeteer.launch(
        // { headless: false, defaultViewPort: null }
    );
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto(url);

    let job_title = [], job_location = [], job_link = [];

    // do {
        // Extracting job titles.
        // Extracting using very first class.
        await page.waitForSelector('.x1e096f4');
        job_title = [...job_title, ...(await page.$$eval(".x1e096f4", 
            element => element.map(
                    title => title.textContent.trim()
                )
        ))];
        // console.log(job_title);
    
        // Extracting job locations.
        await page.waitForSelector('.xcicffo+.x7z1be2');
        job_location = [...job_location, ...(await page.$$eval(".xcicffo+.x7z1be2", 
            element => element.map(
                location => location.textContent.trim()
            )
        ))];
        // console.log(job_location);
    
        // Extracting job link.
        await page.waitForSelector('.x1ypdohk[role="link"]');
        let cards = await page.$$('.x1ypdohk[role="link"]');
        for(let card of cards) {
            await card.click();
            await page.waitForNetworkIdle();
            let tabs = await browser.pages();
            let total_tabs = tabs.length;
            job_link = [ ...job_link, (await tabs[total_tabs - 1].url())];
        }
        // console.log(job_link);
        
    //     if(await page.$("._8se3>a")) {
    //         let pagination = await page.$$eval("._8se3>a", 
    //             element => element.map(
    //                 title => title.textContent
    //             )
    //         )
    //         if(pagination.at(pagination.length-1) === "Next") {
    //             await page.click("._8se3>a");
    //             await page.goto(page.url());
    //         } else {
    //             break;
    //         }
    //     } else {
    //         break;
    //     }
    // } while(true);

    browser.close();

    return {
        job_title,
        job_location,
        job_link
    }
}

async function print() {
    let meta = await scrapVacancies('https://www.metacareers.com/jobs');
    console.log(meta);
}
print();

// scrapVacancies('https://www.metacareers.com/jobs').then((data) => {
//     const fileData = fs.readFileSync('./src/data.json');
//     // console.log(fileData.length);
//     let newDataJSON = {meta: data};
//     if(fileData.length) {
//         newDataJSON = {...newDataJSON, ...(JSON.parse(fileData))};
//     }
//     // console.log(newDataJSON);
//     const newFileData = JSON.stringify(newDataJSON);
//     fs.writeFileSync('./src/data.json', newFileData, (error) => {
//         if(error) {
//             console.log(error);
//         }
//     });
//     console.log("[Meta] Data Saved Successfully!");
// }).catch((error) => {
//     console.log(error);
// });
