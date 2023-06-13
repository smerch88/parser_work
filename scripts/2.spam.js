const puppeteer = require('puppeteer');
const fs = require('fs');

const jsonData = require('../vacanciesResult.json');

(async () => {
  const values = Object.values(jsonData);
  let arrayLinksForScrap = [];

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: './tmp',
  });
  const page = await browser.newPage();

  values.forEach((vacancy) => {
    arrayLinksForScrap.push(vacancy);
  });

  for (let i = 0; i < arrayLinksForScrap.length; i++) {
    const random =
      (Math.floor(Math.random() * 10) * (Math.random() * 2) + 1) * 1000;
    await page.goto(arrayLinksForScrap[i]);
    console.log(`1 transition to page ${arrayLinksForScrap[i]}`);
    await page.waitForTimeout(random);

    try {
      await page.waitForSelector(
        'div.col-sm-4.row-mobile-order-1 > div.js-inbox-action-btns > div',
        { visible: true },
      );
      await page.click(
        'div.col-sm-4.row-mobile-order-1 > div.js-inbox-action-btns > div',
      );
      console.log(`2 click respond`);
      await page.waitForTimeout(random);

      await page.waitForSelector('#tr_541584 > td.js-template-put', {
        visible: true,
      });
      await page.click('#tr_541584 > td.js-template-put');
      console.log(`3 cover letter chosen`);
      await page.waitForTimeout(random);

      await page.waitForSelector('#job_apply', { visible: true });
      await page.click('#job_apply');
      console.log(`4 apply job`);
      await page.waitForTimeout(random);
    } catch (error) {
      console.error('Interaction failed:', error);
    }

    arrayLinksForScrap.shift();

    let result = JSON.stringify(arrayLinksForScrap);

    fs.writeFile('vacanciesResult.json', result, function (err) {
      if (err) {
        console.log(err);
      }
    });
  }

  console.log('5 refresh json done');

  await browser.close();
})();
