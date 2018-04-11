const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Получить посещения'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Добавить посещение'
    });
});

router.get('/:visitId', (req, res, next) => {
    res.status(200).json({
        message: 'Данные посещения',
        id: req.params.visitId
    });
});

router.delete('/:visitId', (req, res, next) => {
    res.status(200).json({
        message: 'Удалить посещение'
    });
});

module.exports = router;