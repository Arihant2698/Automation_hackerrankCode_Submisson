const puppeteer = require("puppeteer");
let page;
const url = "https://www.hackerrank.com/auth/login";
const email = "xamot46817@stvbz.com";
const pass = "222525";

const hackerrank = puppeteer.launch({
  headless: false,
  args: ["--start-minimized"],
  defaultViewport: null,
});
hackerrank
  .then(function (browser) {
    const pages = browser.newPage();
    return pages;
  })

  .then(function (browserpage) {
    page = browserpage;
    let res = page.goto(url);
    return res;
  })
  .then(function () {
    const emailent = page.type("input[type='text']", email, { delay: 50 });
    return emailent;
  })
  .then(function () {
    const passent = page.type("input[type='password']", pass, { delay: 50 });
    return passent;
  })
  .then(function () {
    const login = page.click(
      ".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled"
    );
    return login;
  })
  .then(function () {
    const waitclick = waitAndClick(
      '.topic-card a[data-analytics="SelectTopic"]',
      page
    );
    return waitclick;
  })
  .then(function () {
    const warmupselect = waitAndClick("input[value='warmup']", page);
    return warmupselect;
  })
  .then(function () {
    let waitfor3secs = page.waitFor(3000);
    return waitfor3secs;
  })
  .then(function () {
    let allChallengesPremises = page.$$(
      ".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled"
    );
    return allChallengesPremises;
  })






  function waitAndClick(selector, currpage) {
    return new Promise(function (resolve, reject) {
      let waituntilfinish = currpage.waitForSelector(selector);
      waituntilfinish
        .then(function () {
          let clickModal = currpage.click(selector);
          return clickModal;
        })
        .then(function () {
          resolve();
        })
        
    });
  }
