const puppeteer = require('puppeteer');
const fs = require('fs');

const jsonData = require('../vacanciesResultRabota.json');

(async () => {
  const values = Object.values(jsonData);
  let arrayLinkForScrap = [];
  let successfullyAppliedJobs = []; // New array to store successfully applied jobs
  let skippedLinks = []; // New array to store skipped links

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: './tmp',
  });
  const page = await browser.newPage();

  values.forEach((vacancy) => {
    arrayLinkForScrap.push(vacancy);
  });

  for (let i = 0; i < arrayLinkForScrap.length; i++) {
    const random =
      (Math.floor(Math.random() * 10) * (Math.random() * 2) + 1) * 1000;
    await page.goto(arrayLinkForScrap[i]);
    console.log(`1. transition to page done ${arrayLinkForScrap[i]}`);
    await page.waitForTimeout(random);
    try {
      await page.waitForSelector(
        'div > div > lib-top-bar > div > div > santa-button > button',
        { visible: true },
      );
      await page.click(
        'div > div > lib-top-bar > div > div > santa-button > button',
      );
      console.log('2. click respond');
      await page.waitForTimeout(random);

      await page.waitForSelector(
        'body app-root div alliance-apply-page-shell alliance-apply-page main div.santa-mx-auto div alliance-apply-action-buttons div santa-button-spinner div santa-button button',
        { visible: true },
      );

      await page.click(
        'body app-root div alliance-apply-page-shell alliance-apply-page main div.santa-mx-auto div alliance-apply-action-buttons div santa-button-spinner div santa-button button',
      );

      console.log('2. respond done');
      await page.waitForTimeout(random);

      successfullyAppliedJobs.push(arrayLinkForScrap[i]); // Add the job to the successfully applied jobs array
    } catch (error) {
      console.error('Interaction failed:', error);
      skippedLinks.push(arrayLinkForScrap[i]); // Add the skipped link to the skipped links array
    }

    arrayLinkForScrap.shift();

    let result = JSON.stringify(arrayLinkForScrap);

    fs.writeFile('vacanciesResultRabota.json', result, function (error) {
      if (error) {
        console.log(error);
      }
    });
  }

  // Write the successfully applied jobs to another file
  let appliedJobsResult = JSON.stringify(successfullyAppliedJobs);
  fs.writeFile(
    'successfullyAppliedJobsRabota.json',
    appliedJobsResult,
    function (err) {
      if (err) {
        console.log(err);
      }
    },
  );

  // Write the skipped links to another file
  let skippedLinksResult = JSON.stringify(skippedLinks);
  fs.writeFile('skippedLinks.json', skippedLinksResult, function (err) {
    if (err) {
      console.log(err);
    }
  });

  console.log('4. Refresh json done');

  await browser.close();
})();
