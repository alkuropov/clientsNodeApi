const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Client = require('../models/client');
const Visit = require('../models/visit');

// Список всех визитов
router.get('/', (req, res, next) => {
    Visit.find()
    .populate('clientId')
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

// Создание нового визита
router.post('/', (req, res, next) => {
    const visit = new Visit({
        _id: new mongoose.Types.ObjectId(),
        clientId: req.body.clientId,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        status: req.body.status,
        amount: req.body.amount,
    })
    visit.save().then(result => {
        console.log(result);

        // Ищем клиента по ID и добавляем новый визит
        Client.findByIdAndUpdate(result.clientId, { $push: { "visits": result._id} })
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

        res.status(200).json({
            message: 'Визит добавлен',
            createdVisit: visit
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

// Получить визит по ID
router.get('/:visitId', (req, res, next) => {
    const id = req.params.visitId;
    Visit.findById(id)
    .populate('clientId')
    .exec()
    .then(doc => {
        console.log(doc);
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({
                message: "Визит не найден",
                visitId: id
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

// Обновить визит по ID
router.patch('/:visitId', (req, res, next) => {
    const id = req.params.visitId;
    Visit.findByIdAndUpdate(id, req.body, {new: true})
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

// Удалить визит по ID
router.delete('/:visitId', (req, res, next) => {
    const id = req.params.visitId;
    Visit.remove({_id: id})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: "Визит удален",
            visitId: id
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    })
});

module.exports = router;