<h1 style="text-align: center;">Tomato-timer, реализованный на класах</h1>

<p>Стильный tomato-timer с возможностью добавлять неограниченное колиечество задач.</p>

<p>Что может:</p>
<ul>
  <li>Добавление задач в список;</li>
  <li>Установка приоритета и название задачи;</li>
  <li>Запуск, пауза и остановка задачи;</li>
  <li>Выбор задачи для запуска таймера;</li>
  <li>Удаление задачи с подтверждением в отдельном модальном окне;</li>
  <li>На текущей задаче тикает счетчик помидорок при выполнении.</li>
</ul>

:warning: В задеплоеной версии для демонстрации работы приложения установлены таймеры в 18 секунд на задачу и 5 секунд на отдых.

:arrow_right:<a href="https://tomato-timer-webpack.vercel.app" style="text-align: center;">Развернутое приложение на Vercel</a>

<img style="text-align: center; max-width: 600px;"
  src="https://github.com/din366/images/blob/main/readme%20images/tomato-timer.png" alt="project image">

## Конфиг Вебпака:
# 4 варианта сборки:
<ul>
  <li>start - сборка development билда с запуском сервера webpack-dev-server + hot reload</li>
  <li>dev - сборка development билда без запуска сервера</li>
  <li>build - сборка production билда</li>
  <li>clear - очистка папки dist</li>
</ul>

# Дополнительные параметры:
<ul>
  <li>Обработка файлов стилей - css, scss, sass</li>
  <li>Обработка изображений - jpg, jpeg, png, gif, svg</li>
  <li>Обработка шрифтов - woff2, woff, eot, ttf, otf</li>
  <li>Обработка html файлов</li>
  <li>Имена файлов при сборке формируются при помощи hash и являются уникальными при обновлении</li>
  <li>Подключен babel + полифил (babel-polyfill)</li>
</ul>

<p>Для работы с приложением:</p>

## Запуск production сборки:
### `npm run build`

- сборка и оптимизация приложения в папке dist для деплоя.

## Запуск dev-сборки с запуском сервера:
### `npm run start`

## Запуск dev-сборки без запуска сервера:
### `npm run build`

## Очистка папки dist:
### `npm run clear`