"use strict";

const express = require(`express`);
const articles = require(`./articles`);
const { ArticlesService, CommentService } = require(`../data-service`);
const request = require(`supertest`);
const { HttpCode } = require(`../constants`);

const Sequelize = require(`sequelize`);
const initDB = require(`../lib/init-db`);
const passwordUtils = require(`../lib/password`);

const usersRow = async () => [
  {
    name: `Иван Иванов`,
    email: `ivanov@example.com`,
    passwordHash: await passwordUtils.hash(`ivanov`),
    avatar: `avatar01.jpg`,
  },
  {
    name: `Пётр Петров`,
    email: `petrov@example.com`,
    passwordHash: await passwordUtils.hash(`petrov`),
    avatar: `avatar02.jpg`,
  },
];

const mockCategories = [
  { name: `Деревья` },
  { name: `За жизнь` },
  { name: `Без рамки` },
  { name: `Разное` },
  { name: `IT` },
  { name: `Музыка` },
  { name: `Кино` },
  { name: `Программирование` },
  { name: `Домино` },
  { name: `Гастроном` },
  { name: `Вкусно` },
  { name: `Железо` },
];

const mockArticles = [
  {
    user: "ivanov@example.com",
    title: `Как собрать камни бесконечности`,
    announce: `Простые ежедневные упражнения помогут достичь успеха.   Первая большая ёлка была установлена только в 1938 году.`,
    fullText: `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.   Один из таких языков, JavaScript, встроен почти в любой веб-браузер,   почти вытеснены графическими. Но они всё ещё есть – если вы знаете, где их искать.   Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.   и потому доступен почти на каждом вычислительном устройстве.   Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?   Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.   Как начать действовать? Для начала просто соберитесь.   Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.   Простые ежедневные упражнения помогут достичь успеха.   Человеческие языки позволяют комбинировать слова великим множеством способов   Он написал больше 30 хитов.`,
    categories: [
      { name: `Деревья` },
      { name: `За жизнь` },
      { name: `Без рамки` },
      { name: `Разное` },
    ],
    comments: [
      {
        text: ``,
        user: "ivanov@example.com",
      },
      {
        text: `Мне кажется или я уже читал это где-то?,Согласен с автором!,Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.,Это где ж такие красоты?,Совсем немного...,Хочу такую же футболку :-),`,
        user: "ivanov@example.com",
      },
      {
        text: `Совсем немного...,Планируете записать видосик на эту тему?Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.,`,
        user: "petrov@example.com",
      },
    ],
  },
  {
    user: "petrov@example.com",
    title: `Как начать программировать`,
    announce: `  Но мы не нашли хороший способ передавать компьютеру при помощи перемещений и нажатий   Ёлки — это не просто красивое дерево. Это прочная древесина.`,
    fullText: `  и потому доступен почти на каждом вычислительном устройстве.   Первая большая ёлка была установлена только в 1938 году.   Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?   Эта книга рассказывает, как заставить компьютеры делать то, что вам от них нужно.   Достичь успеха помогут ежедневные повторения.   Из под его пера вышло 8 платиновых альбомов.   почти вытеснены графическими. Но они всё ещё есть – если вы знаете, где их искать.   Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.   Программировать не настолько сложно, как об этом говорят.   Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.   Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.   Золотое сечение — соотношение двух величин, гармоническая пропорция.   Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.   Это один из лучших рок-музыкантов.`,
    categories: [
      { name: `Кино` },
      { name: `Программирование` },
      { name: `Домино` },
      { name: `Гастроном` },
      { name: `Вкусно` },
    ],
    comments: [
      {
        text: `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.,Мне кажется или я уже читал это где-то?,Хочу такую же футболку :-),Плюсую, но слишком много буквы!,Согласен с автором!,Совсем немного...,Это где ж такие красоты?,`,
        user: "petrov@example.com",
      },
      {
        text: `Совсем немного...,Согласен с автором!,Плюсую, но слишком много буквы!,Это где ж такие красоты?,Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.,`,
        user: "petrov@example.com",
      },
      {
        text: `Мне кажется или я уже читал это где-то?,Планируете записать видосик на эту тему?Это где ж такие красоты?,Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.,`,
        user: "ivanov@example.com",
      },
    ],
  },
  {
    user: "ivanov@example.com",
    title: `Как достигнуть успеха не вставая с кресла`,
    announce: `  и интерфейсы, построенные на языке (а когда-то это был единственный способ общения с компьютером)`,
    fullText: `  Вы можете достичь всего. Стоит только немного постараться и запастись книгами.   Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.   Он написал больше 30 хитов.   Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?   Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.   Это один из лучших рок-музыкантов.   Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.   Эта книга рассказывает, как заставить компьютеры делать то, что вам от них нужно.   Простые ежедневные упражнения помогут достичь успеха.   Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.   Первая большая ёлка была установлена только в 1938 году.   Ёлки — это не просто красивое дерево. Это прочная древесина.   почти вытеснены графическими. Но они всё ещё есть – если вы знаете, где их искать.`,
    categories: [
      { name: `Деревья` },
      { name: `За жизнь` },
      { name: `Без рамки` },
      { name: `Разное` },
      { name: `Программирование` },
      { name: `Домино` },
      { name: `Вкусно` },
    ],
    comments: [
      {
        text: `Плюсую, но слишком много буквы!,Это где ж такие красоты?,Согласен с автором!,Планируете записать видосик на эту тему?Мне кажется или я уже читал это где-то?,Совсем немного...,`,
        user: "ivanov@example.com",
      },
      {
        text: `Планируете записать видосик на эту тему?`,
        user: "petrov@example.com",
      },
      {
        text: ``,
        user: "petrov@example.com",
      },
    ],
  },
  {
    user: "petrov@example.com",
    title: `Обзор новейшего смартфона`,
    announce: `  Из под его пера вышло 8 платиновых альбомов.   Но мы не нашли хороший способ передавать компьютеру при `,
    fullText: `  Ёлки — это не просто красивое дерево. Это прочная древесина.   Эта книга рассказывает, как заставить компьютеры делать то, что вам от них нужно.   Программировать не настолько сложно, как об этом говорят.   Простые ежедневные упражнения помогут достичь успеха.   Первая большая ёлка была установлена только в 1938 году.   Он написал больше 30 хитов.`,
    categories: [
      { name: `Без рамки` },
      { name: `Разное` },
      { name: `IT` },
      { name: `Кино` },
      { name: `Программирование` },
      { name: `Домино` },
    ],
    comments: [
      {
        text: `Это где ж такие красоты?,Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.,`,
        user: "petrov@example.com",
      },
      {
        text: `Плюсую, но слишком много буквы!,Это где ж такие красоты?,Мне кажется или я уже читал это где-то?,Хочу такую же футболку :-),Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.,Совсем немного...,`,
        user: "ivanov@example.com",
      },
      {
        text: ``,
        user: "ivanov@example.com",
      },
      {
        text: ``,
        user: "petrov@example.com",
      },
      {
        text: `Мне кажется или я уже читал это где-то?,Согласен с автором!,Хочу такую же футболку :-),Это где ж такие красоты?,Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.,Планируете записать видосик на эту тему?Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.,`,
        user: "petrov@example.com",
      },
    ],
  },
  {
    user: "ivanov@example.com",
    title: `Как перестать беспокоиться и начать жить`,
    announce: `  Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
    fullText: `  Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.   Один из таких языков, JavaScript, встроен почти в любой веб-браузер,   и потому доступен почти на каждом вычислительном устройстве.   За последние 20 лет работа с компьютером стала очень распространённым явлением,   Простые ежедневные упражнения помогут достичь успеха.   Человеческие языки позволяют комбинировать слова великим множеством способов   и интерфейсы, построенные на языке (а когда-то это был единственный способ общения с компьютером)   Но мы не нашли хороший способ передавать компьютеру при помощи перемещений и нажатий`,
    categories: [],
    comments: [
      {
        text: ``,
        user: "petrov@example.com",
      },
      {
        text: ``,
        user: "ivanov@example.com",
      },
      {
        text: `Плюсую, но слишком много буквы!,Совсем немного...,Мне кажется или я уже читал это где-то?,Это где ж такие красоты?,Планируете записать видосик на эту тему?Хочу такую же футболку :-),Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.,`,
        user: "petrov@example.com",
      },
      {
        text: ``,
        user: "petrov@example.com",
      },
      {
        text: `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.,Согласен с автором!,Мне кажется или я уже читал это где-то?,`,
        user: "petrov@example.com",
      },
      {
        text: `Хочу такую же футболку :-),Совсем немного...,Планируете записать видосик на эту тему?Согласен с автором!,Мне кажется или я уже читал это где-то?,Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.,`,
        user: "ivanov@example.com",
      },
    ],
  },
];

const sortCategories = (a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
};

const createAPI = async () => {
  const mockDB = new Sequelize(`sqlite::memory:`, { logging: false });

  const users = await usersRow();

  await initDB(mockDB, {
    categories: mockCategories,
    articles: mockArticles,
    users,
  });
  const app = express();

  app.use(express.json());
  articles(app, new ArticlesService(mockDB), new CommentService(mockDB));
  return app;
};

describe(`API returns a list of all articles`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).get(`/articles`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns a list of 5 articles`, () =>
    expect(response.body.length).toBe(5));
});

describe(`API returns an article with given id`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).get(`/articles/1`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Article's title is "Как собрать камни бесконечности"`, () =>
    expect(response.body.title).toBe(`Как собрать камни бесконечности`));
});

describe(`API returns an article with given id and comments`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).get(`/articles/1`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Article's title is "Как собрать камни бесконечности"`, () =>
    expect(response.body.title).toBe(`Как собрать камни бесконечности`));
});

describe(`API creates an article if data is valid`, () => {
  const newArticle = {
    userId: 1,
    user: "ivanov@example.com",
    title: `aaa Самый лучший музыкальный альбом этого года`,
    announce: `  Достичь успеха помогут ежедневные повторения.   Первая большая ёлка была установлена только в 1938 году.`,
    fullText: `  Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.   Это один из лучших рок-музыкантов.   Ёлки — это не просто красивое дерево. Это прочная древесина.   Как начать действовать? Для начала просто соберитесь.   Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.   Вы можете достичь всего. Стоит только немного постараться и запастись книгами.   Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
    categories: [`Программирование`, `Железо`, `Домино`, `Гастроном`, `Вкусно`],
  };

  const resultArticle = {
    userId: 1,
    user: "ivanov@example.com",
    title: `aaa Самый лучший музыкальный альбом этого года`,
    announce: `  Достичь успеха помогут ежедневные повторения.   Первая большая ёлка была установлена только в 1938 году.`,
    fullText: `  Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.   Это один из лучших рок-музыкантов.   Ёлки — это не просто красивое дерево. Это прочная древесина.   Как начать действовать? Для начала просто соберитесь.   Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.   Вы можете достичь всего. Стоит только немного постараться и запастись книгами.   Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
    categories: [
      { name: `Программирование` },
      { name: `Железо` },
      { name: `Домино` },
      { name: `Гастроном` },
      { name: `Вкусно` },
    ],
  };

  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).post(`/articles`).send(newArticle);

    newArticle.categories.sort((a, b) => {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    });

    response.body.categories.sort(sortCategories);
    resultArticle.categories.sort(sortCategories);
  });

  test(`Status code 201`, () =>
    expect(response.statusCode).toBe(HttpCode.CREATED));
  test(`Returns acticle created`, () => {
    expect(response.body).toEqual(resultArticle);
  });

  test(`Articles count is changed`, () =>
    request(app)
      .get(`/articles`)
      .expect((res) => {
        return expect(res.body.length).toBe(6);
      }));
});

describe(`API refuses to create an article if data is invalid`, () => {
  const newArticle = {
    userId: 1,
    user: "ivanov@example.com",
    title: `aaa Самый лучший музыкальный kdjfk альбом этого года`,
    announce: `  Достичь успеха помогут jkdjf ежедневные повторения.   Первая большая ёлка была установлена только в 1938 году.`,
    fullText: `  Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.   Это один из лучших рок-музыкантов.   Ёлки — это не просто красивое дерево. Это прочная древесина.   Как начать действовать? Для начала просто соберитесь.   Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.   Вы можете достичь всего. Стоит только немного постараться и запастись книгами.   Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
    categories: [
      `Без рамки`,
      `Разное`,
      `IT`,
      `Музыка`,
      `Кино`,
      `Программирование`,
      `Домино`,
      `Гастроном`,
      `Вкусно`,
      `Железо`,
    ],
  };

  let app;

  beforeAll(async () => {
    app = await createAPI();
  });

  test(`Without any required property response code is 400`, async () => {
    const app = await createAPI();
    for (const key of Object.keys(newArticle)) {
      const badArticle = { ...newArticle };
      delete badArticle[key];

      await request(app)
        .post(`/articles`)
        .send(badArticle)
        .expect(HttpCode.BAD_REQUEST);
    }
  });

  test(`When field type is wrong response code is 400`, async () => {
    const badArticles = [
      { ...newArticle, title: true },
      { ...newArticle, announce: 12345 },
      { ...newArticle, fullText: 1 },
      { ...newArticle, categories: "" },
    ];
    for (const badArticle of badArticles) {
      await request(app)
        .post(`/articles`)
        .send(badArticle)
        .expect(HttpCode.BAD_REQUEST);
    }
  });

  test(`When field value is wrong response code is 400`, async () => {
    const badArticles = [
      { ...newArticle, title: "jj" },
      { ...newArticle, announce: `too short` },
      { ...newArticle, fullText: "" },
      { ...newArticle, categories: [] },
    ];
    for (const badArticle of badArticles) {
      await request(app)
        .post(`/articles`)
        .send(badArticle)
        .expect(HttpCode.BAD_REQUEST);
    }
  });
});

describe(`API changes existent article`, () => {
  const validArticle = {
    userId: 1,
    user: "ivanov@example.com",
    title: `Кто Самый лучший музыкальный kdjfk альбом этого года`,
    announce: `  Достичь успеха помогут jkdjf ежедневные повторения.   Первая большая ёлка была установлена только в 1938 году.   Собрать камни бесконечности легко, если вы прирожденный герой.`,
    fullText: `  Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.   Это один из лучших рок-музыкантов.   Ёлки — это не просто красивое дерево. Это прочная древесина.   Как начать действовать? Для начала просто соберитесь.   Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.   Вы можете достичь всего. Стоит только немного постараться и запастись книгами.   Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
    categories: [`Программирование`, `Домино`, `Гастроном`],
  };
  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    try {
      response = await request(app).put(`/articles/1`).send(validArticle);
    } catch (error) {
      console.log("error in ", error);
    }
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns changed article`, () => expect(response.body).toEqual(true));
  test(`Article is really changed`, () =>
    request(app)
      .get(`/articles/1`)
      .expect((res) => {
        return expect(res.body.title).toBe(
          `Кто Самый лучший музыкальный kdjfk альбом этого года`
        );
      }));
});

test(`API returns status code 404 when trying to change non-existent article`, async () => {
  const app = await createAPI();

  const validArticle = {
    userId: 1,
    user: "ivanov@example.com",
    title: `Кто Самый тот лучше музыкальный kdjfk альбом этого года`,
    announce: `Достичь успеха помогут jkdjf ежедневные повторения.   Первая большая ёлка была установлена только в 1938 году.   Собрать камни`,
    fullText: `  Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.   Это один из лучших рок-музыкантов.   Ёлки — это не просто красивое дерево. Это прочная древесина.   Как начать действовать? Для начала просто соберитесь.   Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.   Вы можете достичь всего. Стоит только немного постараться и запастись книгами.   Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
    categories: [`Деревья`, `Домино`, `Железо`, `Кино`],
  };

  return request(app)
    .put(`/articles/NOEXIST`)
    .send(validArticle)
    .expect(HttpCode.NOT_FOUND);
});

test(`API returns status 400 when trying to change an article with invalid data`, async () => {
  const app = await createAPI();

  const invalidArticle = {
    userId: 1,
    user: "ivanov@example.com",
    title: `Кто Самый тот лучше музыкальный kdjfk альбом этого года`,
    announce: `Достичь успеха помогут jkdjf ежедневные повторения.   Первая большая ёлка была установлена только в 1938 году.   Собрать камни бесконечности легко, если вы прирожденный герой.`,
    fullText: `  Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.   Это один из лучших рок-музыкантов.   Ёлки — это не просто красивое дерево. Это прочная древесина.   Как начать действовать? Для начала просто соберитесь.   Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.   Вы можете достичь всего. Стоит только немного постараться и запастись книгами.   Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
  };

  return request(app)
    .put(`/articles/1`)
    .send(invalidArticle)
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API correcty deletes an article`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).delete(`/articles/1`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns deleted article`, () => expect(response.body).toBe(true));
  test(`Article count is 4 now`, () => {
    return request(app)
      .get(`/articles`)
      .expect((res) => expect(res.body.length).toBe(4));
  });

  test(`API refuses to delete non-existent article`, async () => {
    const app = await createAPI();

    return request(app).delete(`/articles/NOEXIST`).expect(HttpCode.NOT_FOUND);
  });
});

describe(`API creates a comment if data is valid`, () => {
  const newComment = {
    userId: 1,
    text: `Добавленный комент!!`,
  };

  let app;

  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).post(`/articles/1/comments`).send(newComment);
  });

  test(`Status code 201`, () =>
    expect(response.statusCode).toBe(HttpCode.CREATED));
  test(`Returns comment created`, () =>
    expect(response.body).toEqual(expect.objectContaining(newComment)));
  test(`Comments count is changed`, () =>
    request(app)
      .get(`/articles/1/comments`)
      .expect((res) => {
        return expect(res.body.length).toBe(4);
      }));
});

describe(`API refuses to create a comment if data is invalid`, () => {
  const newComment = {
    text: `Тот самый коммент нужно больше символов что бы прошла валидация`,
  };

  let app;

  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .post(`/articles/1/comments?comments=true`)
      .send(newComment);
  });

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newComment)) {
      const badArticle = { ...newComment };
      delete badArticle[key];

      await request(app)
        .post(`/articles/1/comments`)
        .send(badArticle)
        .expect(HttpCode.BAD_REQUEST);
    }
  });
});

test(`API refuses to delete non-existent comment`, async () => {
  const app = await createAPI();

  return await request(app)
    .delete(`/articles/1/comments/kk`)
    .expect(HttpCode.NOT_FOUND);
});

describe(`API correcty deletes a comment`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).delete(
      `/articles/1/comments/1?comments=true`
    );
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns deleted article`, () => expect(response.body).toBe(true));
  test(`Comment count is 2 now`, () => {
    return request(app)
      .get(`/articles/1/comments`)
      .expect((res) => expect(res.body.length).toBe(2));
  });
});
