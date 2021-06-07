'use strict';

const express = require(`express`);

const request = require(`supertest`);
const category = require(`./category`);
const {CategoriesService} = require(`../data-service/categories`);
const {HttpCode} = require(`../constants`);

const mockData = [
  {
    id: `8MfXha`,
    title: `Как достигнуть успеха не вставая с кресла`,
    createdDate: `2021-4-6 15:15:31`,
    announce: `  Вы можете достичь всего. Стоит только немного постараться и запастись книгами.   Собрать камни бесконечности легко, если вы прирожденный герой.   Это один из лучших рок-музыкантов.   За последние 20 лет работа с компьютером стала очень распространённым явлением,`,
    fullText: `  Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.   и интерфейсы, построенные на языке (а когда-то это был единственный способ общения с компьютером)   За последние 20 лет работа с компьютером стала очень распространённым явлением,   Программировать не настолько сложно, как об этом говорят.   Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.   Золотое сечение — соотношение двух величин, гармоническая пропорция.   Вы можете достичь всего. Стоит только немного постараться и запастись книгами.   и потому доступен почти на каждом вычислительном устройстве.   Ёлки — это не просто красивое дерево. Это прочная древесина.   Это один из лучших рок-музыкантов.   Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.   Собрать камни бесконечности легко, если вы прирожденный герой.   Простые ежедневные упражнения помогут достичь успеха.   почти вытеснены графическими. Но они всё ещё есть – если вы знаете, где их искать.   Он написал больше 30 хитов.   Один из таких языков, JavaScript, встроен почти в любой веб-браузер,   Как начать действовать? Для начала просто соберитесь.`,
    category: [
      `  Вкусно`,
      `  IT`,
      `  Кино`,
      `  Программирование`,
      `  Деревья`,
      `  Без рамки`
    ],
    comments: [
      {
        id: `MX8Bkg`,
        text: ``
      },
      {
        id: `i9al0m`,
        text: ``
      },
      {
        id: `wuadOQ`,
        text: `Плюсую, но слишком много буквы!,Мне кажется или я уже читал это где-то?,Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.,`
      },
      {
        id: `J7brJK`,
        text: `Согласен с автором!,Это где ж такие красоты?,`
      },
      {
        id: `YvY-9a`,
        text: ``
      },
      {
        id: `rYyjEi`,
        text: `Это где ж такие красоты?,Мне кажется или я уже читал это где-то?,Совсем немного...,Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.,`
      },
      {
        id: `eM9F0A`,
        text: `Согласен с автором!,Совсем немного...,Хочу такую же футболку :-),`
      },
      {
        id: `CvlSKo`,
        text: `Планируете записать видосик на эту тему?Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.,Мне кажется или я уже читал это где-то?,Хочу такую же футболку :-),Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.,`
      },
      {
        id: `dXhJXp`,
        text: `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.,Совсем немного...,Хочу такую же футболку :-),Планируете записать видосик на эту тему?`
      },
      {
        id: `yuhwj6`,
        text: `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.,Хочу такую же футболку :-),`
      }
    ]
  },
  {
    id: `RMW8IT`,
    title: `Обзор новейшего смартфона`,
    createdDate: `2021-5-7 3:34:5`,
    announce: `  Он написал больше 30 хитов.   и интерфейсы, построенные на языке (а когда-то это был единственный способ общения с компьютером)   Вы можете достичь всего. Стоит только немного постараться и запастись книгами.   почти вытеснены графическими. Но они всё ещё есть – если вы знаете, где их искать.`,
    fullText: `  Как начать действовать? Для начала просто соберитесь.   Программировать не настолько сложно, как об этом говорят.   Один из таких языков, JavaScript, встроен почти в любой веб-браузер,   Вы можете достичь всего. Стоит только немного постараться и запастись книгами.   Золотое сечение — соотношение двух величин, гармоническая пропорция.   Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.   Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.   Из под его пера вышло 8 платиновых альбомов.`,
    category: [
      `  Домино`,
      `  Программирование`,
      `  Железо`,
      `  Без рамки`,
      `  Разное`,
      `  Гастроном`,
      `  IT`,
      `  За жизнь`
    ],
    comments: [
      {
        id: `1QQ8Tw`,
        text: `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.,Мне кажется или я уже читал это где-то?,Планируете записать видосик на эту тему?Плюсую, но слишком много буквы!,Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.,`
      },
      {
        id: `ba0uCE`,
        text: `Плюсую, но слишком много буквы!,Мне кажется или я уже читал это где-то?,Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.,`
      },
      {
        id: `oq1PKi`,
        text: ``
      },
      {
        id: `_DrN3I`,
        text: `Планируете записать видосик на эту тему?Хочу такую же футболку :-),`
      },
      {
        id: `awPAUB`,
        text: `Мне кажется или я уже читал это где-то?,Планируете записать видосик на эту тему?Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.,`
      },
      {
        id: `VW_DBv`,
        text: `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.,`
      },
      {
        id: `4dqBXd`,
        text: ``
      },
      {
        id: `G0ouNf`,
        text: ``
      },
      {
        id: `yf-c_l`,
        text: `Плюсую, но слишком много буквы!,Согласен с автором!,Совсем немного...,Хочу такую же футболку :-),`
      }
    ]
  },
  {
    id: `D6aDq9`,
    title: `Рок — это протест`,
    createdDate: `2021-3-16 20:8:16`,
    announce: `  Человеческие языки позволяют комбинировать слова великим множеством способов   Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.   почти вытеснены графическими. Но они всё ещё есть – если вы знаете, где их искать.   За последние 20 лет работа с компьютером стала очень распространённым явлением,`,
    fullText: `  Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.   Но мы не нашли хороший способ передавать компьютеру при помощи перемещений и нажатий   Эта книга рассказывает, как заставить компьютеры делать то, что вам от них нужно.   Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.   Он написал больше 30 хитов.   Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.   и потому доступен почти на каждом вычислительном устройстве.   Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?   Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
    category: [
      `  IT`,
      `  Деревья`,
      `  За жизнь`,
      `  Вкусно`
    ],
    comments: [
      {
        id: `KR7-eF`,
        text: `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.,Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.,`
      },
      {
        id: `5UDCe1`,
        text: ``
      }
    ]
  },
  {
    id: `6gRO82`,
    title: `Что такое золотое сечение`,
    createdDate: `2021-3-6 21:26:18`,
    announce: `  Как начать действовать? Для начала просто соберитесь.   Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.   и потому доступен почти на каждом вычислительном устройстве.   Программировать не настолько сложно, как об этом говорят.`,
    fullText: `  Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.   Один из таких языков, JavaScript, встроен почти в любой веб-браузер,   Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.   Простые ежедневные упражнения помогут достичь успеха.   Собрать камни бесконечности легко, если вы прирожденный герой.   и интерфейсы, построенные на языке (а когда-то это был единственный способ общения с компьютером)   Ёлки — это не просто красивое дерево. Это прочная древесина.   Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.   почти вытеснены графическими. Но они всё ещё есть – если вы знаете, где их искать.   Программировать не настолько сложно, как об этом говорят.   Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.   Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?   Он написал больше 30 хитов.   Как начать действовать? Для начала просто соберитесь.   Золотое сечение — соотношение двух величин, гармоническая пропорция.   Это один из лучших рок-музыкантов.   Достичь успеха помогут ежедневные повторения.   Вы можете достичь всего. Стоит только немного постараться и запастись книгами.   Но мы не нашли хороший способ передавать компьютеру при помощи перемещений и нажатий   Первая большая ёлка была установлена только в 1938 году.   Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`,
    category: [
      `  Гастроном`,
      `  Без рамки`,
      `  Кино`,
      `  Разное`,
      `  Деревья`,
      `  За жизнь`,
      `  IT`,
      `  Вкусно`
    ],
    comments: [
      {
        id: `eJYOpq`,
        text: `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.,Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.,Мне кажется или я уже читал это где-то?,`
      },
      {
        id: `w67tTs`,
        text: `Совсем немного...,Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.,Согласен с автором!,Плюсую, но слишком много буквы!,`
      },
      {
        id: `rh0SQ_`,
        text: ``
      },
      {
        id: `T3QDFv`,
        text: `Совсем немного...,`
      },
      {
        id: `Xc_O_D`,
        text: `Плюсую, но слишком много буквы!,Планируете записать видосик на эту тему?`
      },
      {
        id: `rMshC-`,
        text: `Плюсую, но слишком много буквы!,Это где ж такие красоты?,Хочу такую же футболку :-),Планируете записать видосик на эту тему?Мне кажется или я уже читал это где-то?,`
      },
      {
        id: `mdw38I`,
        text: `Планируете записать видосик на эту тему?Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.,Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.,`
      },
      {
        id: `xYc28t`,
        text: `Хочу такую же футболку :-),Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.,Планируете записать видосик на эту тему?Это где ж такие красоты?,Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.,Мне кажется или я уже читал это где-то?,`
      },
      {
        id: `pzNh0U`,
        text: `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.,Плюсую, но слишком много буквы!,Хочу такую же футболку :-),Согласен с автором!,Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.,Это где ж такие красоты?,`
      }
    ]
  },
  {
    id: `G-8V3b`,
    title: `Ёлки. История деревьев`,
    createdDate: `2021-2-7 1:26:53`,
    announce: `  и интерфейсы, построенные на языке (а когда-то это был единственный способ общения с компьютером)   Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.   Один из таких языков, JavaScript, встроен почти в любой веб-браузер,   Первая большая ёлка была установлена только в 1938 году.`,
    fullText: `  Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?   Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.   и потому доступен почти на каждом вычислительном устройстве.   Ёлки — это не просто красивое дерево. Это прочная древесина.   Вы можете достичь всего. Стоит только немного постараться и запастись книгами.   Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.   Это один из лучших рок-музыкантов.   Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.   Один из таких языков, JavaScript, встроен почти в любой веб-браузер,   Простые ежедневные упражнения помогут достичь успеха.   почти вытеснены графическими. Но они всё ещё есть – если вы знаете, где их искать.   Из под его пера вышло 8 платиновых альбомов.   Первая большая ёлка была установлена только в 1938 году.   Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.   За последние 20 лет работа с компьютером стала очень распространённым явлением,   Достичь успеха помогут ежедневные повторения.`,
    category: [
      `  IT`,
      `  Деревья`,
      `  Вкусно`,
      `  Кино`
    ],
    comments: []
  }
];

const app = express();
app.use(express.json());

category(app, new CategoriesService(mockData));

describe(`API returns category list`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/category`);
  });

  test(`Status code 200`, () => expect(response.status).toBe(HttpCode.OK));
  test(`Returns list of 11 categories`, () => expect(response.body.length).toBe(11));
  test(`Category names are in list`,
      () => {
        expect.arrayContaining([`Деревья`, `За жизнь`, `Без рамки`, `Разное`, `IT`, `Музыка`, `Кино`, `Программирование`, `Железо`, `Домино`, `Гастроном`, `Вкусно`]);
      });
});
