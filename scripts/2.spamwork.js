const puppeteer = require('puppeteer');
const fs = require('fs');

const jsonData = require('../vacanciesResultWork.json');

(async () => {
  const values = Object.values(jsonData);
  let arrayLinksForScrap = [];
  let successfullyAppliedJobs = []; // New array to store successfully applied jobs

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: './tmp',
  });
  const page = await browser.newPage();

  values.forEach((vacancy) => {
    arrayLinksForScrap.push(vacancy);
  });
  console.log(arrayLinksForScrap);
  for (let i = 0; i < arrayLinksForScrap.length; i++) {
    const random =
      (Math.floor(Math.random() * 10) * (Math.random() * 2) + 1) * 1000;
    await page.goto(arrayLinksForScrap[i]);
    console.log(`1 transition to page ${arrayLinksForScrap[i]}`);
    await page.waitForTimeout(random);

    try {
      await page.waitForSelector(
        '#fix-block > div > div > div > div > div > div > div.pull-left > div > div:nth-child(2) > a',
        { visible: true },
      );
      await page.click(
        '#fix-block > div > div > div > div > div > div > div.pull-left > div > div:nth-child(2) > a',
      );
      console.log(`2 click respond`);
      await page.waitForTimeout(random);

      await page.waitForSelector('#addtextswtch', { visible: true });
      await page.click('#addtextswtch');
      console.log(`3 click textfeald`);
      await page.waitForTimeout(random);

      await page.waitForSelector('#addtext', { visible: true });
      await page.focus('#addtext');
      await page.keyboard.type(
        'Привіт. Мене звати Антон і мене зацікавила позиція  фронтенд - розробника у вашій компанії. Я хотів би знайти роботу на повний робочий день, де я зможу працювати або віддалено, або у вашому офісі в Києві. Із свого попереднього досвіду я набув навичок у Redux, React.js і Next.js, і  продовжую поглиблювати свої знання з Node.js.У моєму резюме можете переглянути деякі проекти, над якими я працював.Також хочу зазначити, що маю досвід як у волонтерських, так і в комерційних проектах.Я брав активну участь у Kharkiv IT Cluster, у волонтерському проекті для освіти.Крім того, я володію англійською мовою на рівні B1 - B2, що дозволяє ефективно спілкуватися з іноземними колегами та клієнтами.Дякую за розгляд моєї заявки.Я радий можливості приєднатися до вашої команди та зробити свій внесок в успіх вашої компанії.Я з нетерпінням чекаю можливості обговорити свою кваліфікацію.Тел.: +380960500722, +380634473878 Електронна адреса: naumenkoanton23@gmail.com',
      );
      console.log(`4 add text`);
      await page.waitForTimeout(random);
      await page.waitForSelector('#submitbtn', { visible: true });
      await page.click('#submitbtn');
      console.log(`5 apply job`);
      await page.waitForTimeout(random);

      successfullyAppliedJobs.push(arrayLinksForScrap[i]); // Add the job to the successfully applied jobs array
    } catch (error) {
      console.error('Interaction failed:', error);
    }

    arrayLinksForScrap.shift();

    let result = JSON.stringify(arrayLinksForScrap);

    fs.writeFile('vacanciesResultWork.json', result, function (err) {
      if (err) {
        console.log(err);
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

  console.log('4 refresh json done');

  await browser.close();
})();
