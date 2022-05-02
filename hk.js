/*
Automation using promise,webscrapper
*/
const puppet = require("puppeteer");
const codeObj = require("./codes");
let page;
//const url ="https://www.google.com"
const url = "https://www.hackerrank.com/auth/login";
const email = "xamot46817@stvbz.com";
const pass = "222525";


let hackerrank = puppet.launch({
  headless: false,
  slowMo: true,
  defaultViewport: null,
  args :["--start-maximized"]
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
  .then(function (questionsArr) {
    console.log("Size of Questions :", questionsArr.length);
    let questionWillbeSolved = questionSolver(
      page,
      questionsArr[0],
      codeObj.answers[0]
    )
    return questionWillbeSolved;
  });



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
      .catch(function (err) {
        reject();
      });
  });
}





function questionSolver(page, question, answer) {
  return new Promise(function (resolve, reject) {
    //Going to the question one
    let questionWillbeClicked = question.click();
    questionWillbeClicked
      .then(function () {
        //going to the editor of the question
        let EditorInFocusPromise = waitAndClick(".hr-monaco-editor-parent",page);
        return EditorInFocusPromise;
      })
      .then(function () {
        //selection checkbox of custom input
        // console.log("this is working2")
        // const warmupselect = waitAndClick("input[type='checkbox']", page);
      //  return warmupselect;
        let customcheck = waitAndClick("input[type='checkbox']", page); 
        return customcheck
      })
      .then(function () {
        /*First writting code in custom input box becoz in editor auto fill is working 
                so it will be hurdel if we write code directly 
                so first writting code in box then copy this in editor*/
                
        return page.waitForSelector("textarea.custominput", page);
      })
      .then(function () {
        return page.type("textarea.custominput", answer, { delay: 10 });
      })
      .then (function(){
        let ctrispressed = page.keyboard.down('Control')
        return ctrispressed
      }).then (function(){
        let Aispressed = page.keyboard.press('A')
        return Aispressed
      }).then (function(){
        let Xispressed = page.keyboard.press('X')
        return Xispressed
      }).then (function(){
        let ctrisuppressed = page.keyboard.up('Control')
        return ctrisuppressed
      })
      .then(function () {
        //going to the editor of the question
        let pastecodetomain = waitAndClick(".hr-monaco-editor-parent",page);
        return pastecodetomain;
    
      }).then (function(){
        let ctrispressed = page.keyboard.down("Control")
        return ctrispressed
      }).then (function(){
        let Aispressed = page.keyboard.press('A')
        return Aispressed
      }).then (function(){
        let Vispressed = page.keyboard.press('V')
       
        return Vispressed
      }).then (function(){
        let ctrisuppressed = page.keyboard.up('Control')
        return ctrisuppressed
      })
      .then (function(){
       return  page.click('.hr-monaco__run-code', { delay: 50 });
      })
      .then(function () {
        resolve();
      })
      .catch(function (err) {
        console.log(err);
        reject();
      });
  });
}
