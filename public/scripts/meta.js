const puppeteer = require('puppeteer');
const fs = require('fs');

let job_title = [], job_location = [], job_link = [];
let nextCount = 0, sizeFactor = 20;

let getTitles = async (page) => {
    await page.waitForSelector('.x1e096f4');
    let titles = await page.$$('.x1e096f4');
    // console.log("Title len: "+ titles.length);
    for(let i = (sizeFactor * nextCount); i < titles.length; i++) {
        job_title = [...job_title, await titles[i].evaluate((title) => title.textContent.trim())];
    }
}

let getLocations = async (page) => {
    await page.waitForSelector('.xcicffo+.x7z1be2');
    let locations = await page.$$('.xcicffo+.x7z1be2');
    for(let i = (sizeFactor * nextCount); i < locations.length; i++) {
        job_location = [...job_location, await locations[i].evaluate((location) => location.textContent.trim())];
    }
}

let getLinks = async (browser, page) => {
    await page.waitForSelector('.x1ypdohk[role="link"]');
    let cards = await page.$$('.x1ypdohk[role="link"]');
    for(let i = (sizeFactor * nextCount); i < cards.length; i++) {
        await cards[i].click();
        // await page.waitForNetworkIdle();
        let tabs = await browser.pages();
        let total_tabs = tabs.length;
        let newTab = tabs[total_tabs - 1];
        newTab.setJavaScriptEnabled(false);
        job_link = [ ...job_link, (await newTab.url())];
    }
}

let loadMore = async (page) => {
    await page.waitForSelector('.xpyat2d div.x3nfvp2[role="none"]');
    if(await page.$('.xpyat2d div.x3nfvp2[role="none"]')) {
        await page.click('.xpyat2d div.x3nfvp2[role="none"]');
        await page.waitForNetworkIdle();
        nextCount += 1;
        if(nextCount === 2) return false;
        return true;
    } else {
        return false;
    }
}

let scrapVacancies = async (url) => {
    const browser = await puppeteer.launch(
        // { headless: false, defaultViewPort: null }
    );
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto(url);

    do {
        await Promise.allSettled([getTitles(page), getLocations(page), getLinks(browser, page)]);
        try {
            if(!await loadMore(page)) break;
        } catch(error) {
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
