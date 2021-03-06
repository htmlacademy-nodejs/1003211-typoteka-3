INSERT INTO users(email, password_hash, first_name, last_name, avatar) VALUES
('ivanov@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Иван', 'Иванов', 'avatar1.jpg'),
('petrov@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Пётр', 'Петров', 'avatar2.jpg');


INSERT INTO categories(name) VALUES
  ('Деревья'),
  ('За жизнь'),
  ('Без рамки'),
  ('Разное'),
  ('IT'),
  ('Музыка');


INSERT INTO articles(title, announce, full_text, picture, user_id) VALUES
( 'Учим HTML и CSS',
  'Вы можете достичь всего. Стоит только немного постараться и запастись книгами.   Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.   Собрать камни бесконечности легко, если вы прирожденный герой.   Человеческие языки позволяют комбинировать слова великим множеством способов',
  'и интерфейсы, построенные на языке (а когда-то это был единственный способ общения с компьютером)   Достичь успеха помогут ежедневные повторения.   Собрать камни бесконечности легко, если вы прирожденный герой.   Человеческие языки позволяют комбинировать слова великим множеством способов   Первая большая ёлка была установлена только в 1938 году.',
  'img/forest@1x.jpg',
  1
),
( 'Как начать программировать',
  'Достичь успеха помогут ежедневные повторения.   Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.   Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.   Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.',
  'Из под его пера вышло 8 платиновых альбомов.   Ёлки — это не просто красивое дерево. Это прочная древесина.   Первая большая ёлка была установлена только в 1938 году.   Эта книга рассказывает, как заставить компьютеры делать то, что вам от них нужно.   Программировать не настолько сложно, как об этом говорят.   Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.   почти вытеснены графическими. Но они всё ещё есть – если вы знаете, где их искать.   За последние 20 лет работа с компьютером стала очень распространённым явлением,   Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?   Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.   Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.   Один из таких языков, JavaScript, встроен почти в любой веб-браузер,   Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.   Золотое сечение — соотношение двух величин, гармоническая пропорция.   Но мы не нашли хороший способ передавать компьютеру при помощи перемещений и нажатий   Простые ежедневные упражнения помогут достичь успеха.',
  'img/skyscraper@1x.jpg',
  2
),
( 'Как достигнуть успеха не вставая с кресла',
  'Достичь успеха помогут ежедневные повторения.   Первая большая ёлка была установлена только в 1938 году.   Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.   Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.',
  'Как начать действовать? Для начала просто соберитесь.   Из под его пера вышло 8 платиновых альбомов.   Но мы не нашли хороший способ передавать компьютеру при помощи перемещений и нажатий   За последние 20 лет работа с компьютером стала очень распространённым явлением,   почти вытеснены графическими. Но они всё ещё есть – если вы знаете, где их искать.   Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?   Один из таких языков, JavaScript, встроен почти в любой веб-браузер,   Это один из лучших рок-музыкантов.   Собрать камни бесконечности легко, если вы прирожденный герой.   Ёлки — это не просто красивое дерево. Это прочная древесина.   Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.   Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.   Он написал больше 30 хитов.   Достичь успеха помогут ежедневные повторения.   Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.   Программировать не настолько сложно, как об этом говорят.   Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.   Простые ежедневные упражнения помогут достичь успеха.   Эта книга рассказывает, как заставить компьютеры делать то, что вам от них нужно.   Первая большая ёлка была установлена только в 1938 году.   Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.   Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.   Вы можете достичь всего. Стоит только немного постараться и запастись книгами.',
  'img/sea@1x.jpg',
  2
);


INSERT INTO article_categories(article_id, category_id) VALUES
(1, 2),
(1, 3),
(1, 5),
(2, 1),
(2, 3),
(2, 2),
(2, 6),
(2, 4),
(3, 4),
(3, 1),
(3, 2);

INSERT INTO comments(user_id, article_id, text)  VALUES
(1, 1, 'Это где ж такие красоты?,'),
(1, 1, 'Совсем немного...,'),
(2, 1, 'Согласен с автором!,'),
(2, 2, 'Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.,'),
(2, 3, 'Планируете записать видосик на эту тему?'),
(2, 1, 'Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.,');

SELECT * FROM categories;
SELECT * FROM users;
SELECT * FROM articles;
SELECT * FROM article_categories;