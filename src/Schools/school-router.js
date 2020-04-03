const express = require('express')
const SchoolService = require('./school-service')
const schoolRouter = express.Router()
const jsonParser = express.json()

schoolRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        SchoolService.getAllSchools(knexInstance)
            .then(schools => {
                res.json(schools.map(school => ({
                    id: school.id,
                    schoolname: school.schoolname
                })))
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { schoolname } = req.body
        const newSchool = {
            schoolname
        }
        if (schoolname == null) {
            return res.status(400).json({
                error: { message: 'Missing school name in request body' }
            })
        }
        SchoolService.insertSchool(
            req.app.get('db'),
            newSchool
        )
            .then(school => {
                res
                    .status(201)
                    .location(`${req.originalUrl}/${school.id}`)
                    .json(school)
            })
            .catch(next)
    })

schoolRouter
    .route('/:school_id')
    .all((req, res, next) => {
        SchoolService.getById(
            req.app.get('db'),
            req.params.school_id
        )
            .then(school => {
                if (!school) {
                    return res.status(404).json({
                        error: { message: 'School does not exist' }
                    })
                }
                req.school = school
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {
        SchoolService.getSchoolPlayer(
            req.app.get('db'),
            req.params.school_id
        )

            .then(Response => {

                if (!Response) {
                    return res.status(404).json({
                        error: { message: 'School does not exist' }
                    })
                }

                let school = Response.filter(school => school.id === Number(req.params.school_id))
                res.json(school)
            })
    })

    .delete((req, res, next) => {
        SchoolService.deleteSchool(
            req.app.get('db'),
            req.params.school_id
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = schoolRouter;