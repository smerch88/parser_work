const puppeteer = require('puppeteer');
const fs = require('fs');

const jsonData = require('../vacanciesResult.json');

(async () => {
  const values = Object.values(jsonData);
  let arrayLinkForScrap = [];
  let skippedVacancies = [];
  let successfullyAppliedJobs = []; // New array to store successfully applied jobs

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

      const url = await page.url();
      console.log('url1:', url);

      if (url.endsWith('/apply')) {
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
      } else {
        console.log('Skipping non-apply link:', url);
        skippedVacancies.push(arrayLinkForScrap[i]); //add to array skipped vacancies
        continue; // Перейти к следующему элементу массива
      }
    } catch (error) {
      console.error('Interaction failed:', error);
    }

    arrayLinkForScrap.shift();

    let result = JSON.stringify(arrayLinkForScrap);
    fs.writeFile('vacanciesResult.json', result, function (error) {
      if (error) {
        console.log(error);
      }
    });

    let skipped = JSON.stringify(skippedVacancies);
    fs.writeFile('skippedVacancies.json', skipped, function (error) {
      if (error) {
        console.log(error);
      }
    });
  }

  // Write the successfully applied jobs to another file

  let existingContent = '';
  try {
    existingContent = fs.readFileSync('successfullyAppliedJobs.json', 'utf8');
  } catch (err) {
    console.error(err);
  }

  let existingVacancies = [];
  if (existingContent) {
    try {
      existingVacancies = JSON.parse(existingContent);
    } catch (err) {
      console.error(err);
    }
  }

  successfullyAppliedJobs = [
    ...new Set([...existingVacancies, ...successfullyAppliedJobs]),
  ];

  let appliedJobsResult = JSON.stringify(successfullyAppliedJobs);
  fs.writeFile(
    'successfullyAppliedJobs.json',
    appliedJobsResult,
    function (err) {
      if (err) {
        console.log(err);
      }
    },
  );

  console.log('4. Refresh json done');

  await browser.close();
})();
