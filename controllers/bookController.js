const Book = require('../models/Book');
const Firm = require('../models/Firm');

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().populate('firm_id');
        res.render('books/index', { layout: 'main', books });
    } catch (err) {
        res.status(500).send('Помилка при отриманні книг');
    }
};

exports.showAddForm = async (req, res) => {
    const firms = await Firm.find();
    res.render('books/add', { layout: 'main', firms });
};

exports.addBook = async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.redirect('/books');
    } catch (err) {
        res.status(400).send('Не вдалося додати книгу');
    }
};

exports.showEditForm = async (req, res) => {
    const book = await Book.findById(req.params.id);
    const firms = await Firm.find();
    res.render('books/edit', { layout: 'main', book, firms});
};

exports.updateBook = async (req, res) => {
    try {
        await Book.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/books');
    } catch (err) {
        res.status(400).send('Помилка при оновленні книги');
    }
};

exports.deleteBook = async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.redirect('/books');
    } catch (err) {
        res.status(400).send('Помилка при видаленні книги');
    }
};

exports.getBooksJson = async (req, res) => {
    try {
        const books = await Book.find().populate('firm_id');
        res.json(books);
    } catch (err) {
        res.status(500).json({error: 'Не вдалося отримати книги'});
    }
};

exports.getBooksJson = async (req, res) => {
    try {
        const books = await Book.find().populate('firm_id');
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: 'Не вдалося отримати книги у форматі JSON' });
    }
};

