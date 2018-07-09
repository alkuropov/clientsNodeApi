const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth')

const Client = require('../models/client');

// Получить список клиентов
// Тестируем ГИТ
router.get('/', checkAuth, (req, res, next) => {
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
router.post('/', checkAuth, (req, res, next) => {
    const client = new Client({
        // _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        phone: req.body.phone,
        description: req.body.description
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
router.get('/:clientId', checkAuth, (req, res, next) => {
    const id = req.params.clientId;
    Client.findById(id)
    .populate('visits')
    .exec()
    .then(doc => {
        console.log(doc);
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({
                message: "Клиент не найден"
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
router.patch('/:clientId', checkAuth, (req, res, next) => {
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
router.delete('/:clientId', checkAuth, (req, res, next) => {
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