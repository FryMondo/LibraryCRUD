const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');

hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

const app = express();

// 1. Підключення до MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/library', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Підключено до MongoDB'))
    .catch(err => console.error('Помилка підключення до MongoDB:', err));

// 2. Налаштування шаблонізатора hbs
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerHelper('eq', function (a, b) {
    return String(a) === String(b);
});

// 3. Статичні файли (CSS)
app.use(express.static(path.join(__dirname, 'public')));

// 4. Парсинг даних з форм
app.use(bodyParser.urlencoded({extended: true}));

// 5. Роутінг
const bookRoutes = require('./routes/books');
const firmRoutes = require('./routes/firms');

app.use('/books', bookRoutes);
app.use('/firms', firmRoutes);

// 6. GraphQL
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

// 7. Головна сторінка
app.get('/', (req, res) => {
    res.redirect('/books');
});

// 8. Запуск сервера
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущено на http://localhost:${PORT}`);
});

