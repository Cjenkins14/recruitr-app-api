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
                    name: school.name
                })))
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { name } = req.body
        const newSchool = {
            name
        }
        if (name == null) {
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

                let school = Response.find(school => school.id === Number(req.params.school_id))
                console.log(school)
                res.json({
                    id: school.id,
                    name: school.name,
                    playerid: school.playerid,
                    graddate: school.graddate,
                    position: school.position,
                    batthrow: school.batthrow,
                    platefirst: school.platefirst,
                    turntime: school.turntime,
                    exitvelo: school.exitvelo,
                    poptime: school.poptime,
                    notes: school.notes,
                    schoolid: school.schoolid
                })
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