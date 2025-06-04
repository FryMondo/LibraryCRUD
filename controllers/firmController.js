const Firm = require('../models/Firm');

exports.getAllFirms = async (req, res) => {
    try {
        const firms = await Firm.find();
        res.render('firms/index', { layout: 'main', firms });
    } catch (err) {
        res.status(500).send('Помилка при отриманні фірм');
    }
};
