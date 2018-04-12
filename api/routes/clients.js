const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Client = require('../models/client');

// Получить список клиентов
// Тестируем ГИТ
router.get('/', (req, res, next) => {
    Client.find()
    .populate('visits')
    .exec()
    .then( docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

// Добавить нового клиента
router.post('/', (req, res, next) => {
    const client = new Client({
        // _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        phone: req.body.phone
    })
    client.save().then(result => {
        console.log(result);
        res.status(200).json({
            message: 'POST запрос /clients',
            createdClient: client
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

// Получить клиента по ID
router.get('/:clientId', (req, res, next) => {
    const id = req.params.clientId;
    Client.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({
                message: "Нет документов"
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
});

// Обновить клиента по ID
router.patch('/:clientId', (req, res, next) => {
    const id = req.params.clientId;
    Client.findByIdAndUpdate(id, req.body, {new: true})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({result});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
});

// Удалить клиента по ID
router.delete('/:clientId', (req, res, next) => {
    const id = req.params.clientId;
    Client.remove({_id: id})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: "Клиент удален",
            clientId: id
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    })
});

module.exports = router;