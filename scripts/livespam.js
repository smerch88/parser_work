const puppeteer = require('puppeteer');
const fs = require('fs');

const linkWithFilter =
  'https://djinni.co/jobs/?all-keywords=front&any-of-keywords=&exclude-keywords=&exp_level=1y&keywords=front';

let previousVacancies = []; // Store previous vacancies

// Helper function to append data to a JSON file
function appendToJSONFile(filename, data) {
  fs.readFile(filename, 'utf8', (err, fileData) => {
    if (err) {
      console.error(err);
    } else {
      let jsonData = [];
      if (fileData) {
        jsonData = JSON.parse(fileData);
      }
      jsonData.push(data);

      fs.writeFile(filename, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`Data appended to ${filename}`);
        }
      });
    }
  });
}

async function scanPage() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: './tmp',
  });
  const page = await browser.newPage();

  await page.goto(linkWithFilter);

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

  const vacancies = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(
        'div.d-flex.align-items-md-center.flex-column.flex-sm-row > div.list-jobs__title.list__title.order-1 > a.profile',
      ),
    ).map((a) => a.href),
  );

  console.log('Parsed vacancies:');
  console.log(vacancies);

  // Compare with previous vacancies
  const newVacancies = vacancies.filter(
    (link) => !previousVacancies.includes(link),
  );
  console.log('New vacancies:');
  console.log(newVacancies);

  // Apply to new vacancies
  await applyToVacancies(newVacancies, page);

  previousVacancies = vacancies; // Update previous vacancies

  await browser.close();

  // Schedule the next scan at a random time between 20 seconds and 10 minutes
  const randomTime = Math.floor(
    Math.random() * (10 * 60 * 1000 - 20 * 1000 + 1) + 20 * 1000,
  );
  const relaunchTime = new Date(Date.now() + randomTime).toLocaleTimeString();
  console.log(`Scheduled next scan at: ${relaunchTime}`);
  appendToJSONFile('relaunchLog.json', { time: relaunchTime });
  setTimeout(scanPage, randomTime);
}

async function applyToVacancies(vacancies, page) {
  console.log('start applying function');

  for (const vacancy of vacancies) {
    try {
      await page.goto(vacancy);

      const randomTimeout = Math.floor(Math.random() * 25000) + 5000; // Random timeout between 5 and 30 seconds

      await page.waitForSelector(
        'div.col-sm-4.row-mobile-order-1 > div.js-inbox-action-btns > div',
        { visible: true },
      );
      await page.click(
        'div.col-sm-4.row-mobile-order-1 > div.js-inbox-action-btns > div',
      );
      console.log('2. Clicked respond');

      await page.waitForTimeout(randomTimeout);

      await page.waitForSelector('#tr_541584 > td.js-template-put', {
        visible: true,
        timeout: randomTimeout,
      });
      await page.click('#tr_541584 > td.js-template-put');
      console.log('3. Chosen cover letter');

      await page.waitForTimeout(randomTimeout);

      await page.waitForSelector('#job_apply', {
        visible: true,
        timeout: randomTimeout,
      });
      await page.click('#job_apply');
      console.log('4. Applied to job');

      await page.waitForTimeout(randomTimeout);

      const timestamp = new Date().toLocaleTimeString();
      const appliedData = { vacancy, timestamp };
      console.log('Successfully applied to job:');
      console.log(appliedData);
      appendToJSONFile('appliedJobsLog.json', appliedData);
    } catch (error) {
      console.error('Interaction failed:', error);
    }
  }
}

console.log('Script launched at:', new Date().toLocaleTimeString());
appendToJSONFile('relaunchLog.json', { time: new Date().toLocaleTimeString() });

setTimeout(scanPage, 0); // Start the initial scan immediately
