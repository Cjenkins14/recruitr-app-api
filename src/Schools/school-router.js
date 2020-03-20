const express = require('express')
const SchoolService = require('./school-service')
const path = require('path')
const schoolRouter = express.Router()


schoolRouter
    .route('/main')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        SchoolService.getAllSchools(knexInstance)
            .then(schools => {
                res.json(schools.map(school => ({
                    name: school.name
                })))
            })
            .catch(next)
    })

module.exports = schoolRouter;