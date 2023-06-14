### <a href="https://www.youtube.com/watch?v=jUO--kbLlhE&ab_channel=%D0%A1%D0%B2%D1%96%D1%82%D0%BE%D1%87%D0%A3%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D1%81%D1%8C%D0%BA%D0%BE%D0%B3%D0%BE%D0%91%D0%BB%D0%BE%D0%BA%D1%87%D0%B5%D0%B9%D0%BD%D1%83">IDEA Pt 1</a>

### <a href="https://www.youtube.com/watch?v=w9DcHsmi9Ug&t=933s&ab_channel=%D0%A1%D0%B2%D1%96%D1%82%D0%BE%D1%87%D0%A3%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D1%81%D1%8C%D0%BA%D0%BE%D0%B3%D0%BE%D0%91%D0%BB%D0%BE%D0%BA%D1%87%D0%B5%D0%B9%D0%BD%D1%83">IDEA Pt 2</a>

Це парсер вакансій, він зберігає вакансії по запитам і спамить резюме.

# TODO:

## A. Підібрати оптимальний пошуковий запит.

## B. Зробити версію для постійного моніторингу і подачу на нові вакансії.

- треба для цього розробити окремий скріпт, який буде поєднувати 2 початкові
- вакансія згори найновіша? якщо так, то треба парсити лише 1 сторінку, записувати в масив результати, порівнювати попарно всі 15 елементів нового масиву і старого массиву, якщо вони будуть відрізнятися, відсилати заявку по посиланню з нового масиву.

## C. Розширити на ворк юа і робота юа. ✅

---

Встановити і запустити, особливості:

<pre>
npm i
</pre>

- після 1 запуску треба у браузері увійти в аккаунт, наприклад через гітхаб або фейсбук
<pre>
npm run openbrowser
</pre>
- якщо браузер не закрився, скрипт ще працює, нічого не чіпати
- максимальне очікування - 30 секунд у разі помилки
- він обирає ваш збережений кавер леттер, клікаючи на нього (для джинні)

### Всі команди

<pre>
    "parse": парсинг на джинні,
    "spam": спам на джинні,
    "parsework": парсинг на ворк юа,
    "spamwork": спам на ворк юа,
    "parserabota": парсинг на робота юа,
    "spamrabota": спам на робота юа,
    "openbrowser": відкрити браузер.
</pre>

Варіанти посилань джинні:

- https://djinni.co/jobs/my-subs/?keywords=%28junior%7Ctrainee%7Cintern%29+react
- https://djinni.co/jobs/my-profile/
- https://djinni.co/jobs/?all-keywords=&any-of-keywords=&exclude-keywords=middle%2C+senior%2C+sinior%2C+angular&primary_keyword=JavaScript&keywords=-middle%2C+-senior%2C+-sinior%2C+-angular
