// const amazon_data = require('../scripts/amazon');

/*global chrome*/
chrome.action.onClicked.addListener((tab) => {
    chrome.action.setPopup({
        popup: "index.html"
    });
    // console.log(typeof amazon_data.scrapVacancies);
    // amazon_data.scrapVacancies('https://www.amazon.jobs/en/teams/in');
});

