const puppeteer = require('puppeteer');
const fs = require('fs');

const linkWithFilteredVacancies = 'https://rabota.ua/ua/zapros/javascript';

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: './tmp',
  });
  const page = await browser.newPage();
  await page.goto(linkWithFilteredVacancies);

  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      let totalHeight = 0;
      const distance = 300;

      const scrollInterval = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(scrollInterval);
          resolve();
        }
      }, 100);
    });
  });

  const pages = await page.$$('santa-pagination > div > div');

  pages.shift();

  let vacancies = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(
        'body > app-root > div > alliance-jobseeker-vacancies-root-page > div > alliance-jobseeker-desktop-vacancies-page > main > section > div > alliance-jobseeker-desktop-vacancies-list > div > div > alliance-vacancy-card-desktop > a',
      ),
    ).map((a) => a.href),
  );

  for (const page of pages) {
    await page.click();

    await page.evaluate(async () => {
      await new Promise((resolve, reject) => {
        let totalHeight = 0;
        const distance = 300;

        const scrollInterval = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(scrollInterval);
            resolve();
          }
        }, 100);
      });
    });

    let vacanciesNew = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll(
          'body > app-root > div > alliance-jobseeker-vacancies-root-page > div > alliance-jobseeker-desktop-vacancies-page > main > section > div > alliance-jobseeker-desktop-vacancies-list > div > div > alliance-vacancy-card-desktop > a',
        ),
      ).map((a) => a.href),
    );

    vacancies = vacancies.concat(vacanciesNew);
  }

  // Read existing file content
  let existingContent = '';
  try {
    existingContent = fs.readFileSync('vacanciesResult.json', 'utf8');
  } catch (err) {
    console.error(err);
  }

  // Parse existing content as JSON
  let existingVacancies = [];
  if (existingContent) {
    try {
      existingVacancies = JSON.parse(existingContent);
    } catch (err) {
      console.error(err);
    }
  }

  // Merge new vacancies with existing vacancies
  vacancies = [...new Set([...existingVacancies, ...vacancies])];

  let result = JSON.stringify(vacancies);

  fs.writeFile('vacanciesResult.json', result, function (error) {
    if (error) {
      console.log('error', error);
    }
  });
  console.log('Parse and save JSON done!');

  await browser.close();
})();
