### <a href="https://www.youtube.com/watch?v=jUO--kbLlhE&ab_channel=%D0%A1%D0%B2%D1%96%D1%82%D0%BE%D1%87%D0%A3%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D1%81%D1%8C%D0%BA%D0%BE%D0%B3%D0%BE%D0%91%D0%BB%D0%BE%D0%BA%D1%87%D0%B5%D0%B9%D0%BD%D1%83">IDEA Pt 1</a>

### <a href="https://www.youtube.com/watch?v=w9DcHsmi9Ug&t=933s&ab_channel=%D0%A1%D0%B2%D1%96%D1%82%D0%BE%D1%87%D0%A3%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D1%81%D1%8C%D0%BA%D0%BE%D0%B3%D0%BE%D0%91%D0%BB%D0%BE%D0%BA%D1%87%D0%B5%D0%B9%D0%BD%D1%83">IDEA Pt 2</a>

Це парсер вакансій, він зберігає

# TODO:

## A. Підібрати оптимальний пошуковий запит.

## B. Зробити версію для постійного моніторингу і подачу на нові вакансії.

## C. Розширити на ворк юа і робота юа.

---

Встановити і запустити, особливості:

- після 1 запуску треба у браузері увійти в аккаунт, наприклад через гітхаб
- якщо браузер не закрився, скрипт ще працює, нічого не чіпати
- максимальне очікування - 30 секунд у разі помилки
- він обирає ваш збережений кавер леттер, клікаючи на нього
<pre>
npm i

node .\scripts\1.parse.js

node .\scripts\2.spam.js

</pre>

links variants:

- https://djinni.co/jobs/my-subs/?keywords=%28junior%7Ctrainee%7Cintern%29+react
- https://djinni.co/jobs/my-profile/
- https://djinni.co/jobs/?all-keywords=&any-of-keywords=&exclude-keywords=middle%2C+senior%2C+sinior%2C+angular&primary_keyword=JavaScript&keywords=-middle%2C+-senior%2C+-sinior%2C+-angular
