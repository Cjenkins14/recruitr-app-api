const express = require('express')
const PlayerService = require('./player-service')
const path = require('path')
const playerRouter = express.Router()
const jsonParser = express.json()

playerRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        PlayerService.getAllPlayers(knexInstance)
            .then(players => {

                res.json(players.map(player => ({
                    playerid: player.playerid,
                    name: player.name,
                    graddate: player.graddate,
                    position: player.position,
                    batthrow: player.batthrow,
                    date: player.date,
                    phone: player.phone,
                    url: player.url,
                    dash: player.dash,
                    platefirst: player.platefirst,
                    turntime: player.turntime,
                    exitvelo: player.exitvelo,
                    poptime: player.poptime,
                    notes: player.notes,
                    schoolid: player.schoolid
                })))
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const {
            name,
            schoolid,
            graddate,
            position,
            batthrow,
            date,
            phone,
            url,
            dash,
            platefirst,
            turntime,
            exitvelo,
            poptime,
            notes
        } = req.body
        const newPlayer = {
            name,
            graddate,
            position,
            batthrow,
            phone,
            url,
            date,
            dash,
            platefirst,
            turntime,
            exitvelo,
            poptime,
            schoolid,
            notes
        }
        for (const [key, value] of Object.entries(newPlayer))
            if (value == null)
                return res.status(400).json({
                    error: { message: `Missing ${key} in request body` }
                })
        PlayerService.insertPlayer(
            req.app.get('db'),
            newPlayer
        ).then(player => {
            res
                .status(201)
                .location(`${req.originalUrl}/${player.id}`)
                .json(player)
        })
    })

playerRouter
    .route('/:player_id')
    .all((req, res, next) => {
        PlayerService.getById(
            req.app.get('db'),
            req.params.player_id
        )
            .then(player => {
                if (!player) {
                    return res.status(404).json({
                        error: { message: 'Player does not exist' }
                    })
                }
                req.player = player;
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {
        PlayerService.getPlayerSchool(
            req.app.get('db'),
            req.params.player_id
        )
            .then(Response => {
                if (!Response) {
                    return res.status(404).json({
                        error: { message: 'Player does not exist' }
                    })
                }

                const player = Response.find(newPlayer => newPlayer.playerid === Number(req.params.player_id));
                console.log(player)
                res.json({
                    playerid: player.playerid,
                    name: player.name,
                    schoolname: player.schoolname,
                    graddate: player.graddate,
                    position: player.position,
                    batthrow: player.batthrow,
                    date: player.date,
                    phone: player.phone,
                    url: player.url,
                    dash: player.dash,
                    platefirst: player.platefirst,
                    turntime: player.turntime,
                    exitvelo: player.exitvelo,
                    poptime: player.poptime,
                    note: player.notes,
                    schoolid: player.schoolid
                })
            })


    })
    .delete((req, res, next) => {
        PlayerService.deletePlayer(
            req.app.get('db'),
            req.params.player_id
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
    })
    .patch(jsonParser, (req, res, next) => {
        const {
            name,
            graddate,
            position,
            batthrow,
            date,
            phone,
            url,
            dash,
            platefirst,
            turntime,
            exitvelo,
            poptime,
            notes,
            schoolid
        } = req.body
        const playerUpdate = {
            name,
            graddate,
            position,
            batthrow,
            date,
            phone,
            url,
            dash,
            platefirst,
            turntime,
            exitvelo,
            poptime,
            notes,
            schoolid
        }
        const numberOfValues = Object.values(playerUpdate).filter(Boolean).length

        if (numberOfValues === 0) {
            return res.status(400).json({
                error: {
                    message: `Request body must contain a new value`
                }
            })
        }
        PlayerService.updatePlayer(
            req.app.get('db'),
            req.params.player_id,
            playerUpdate
        )
            .then(player => {
                res
                    .status(200)
                    .json(player)
            })
            .catch(next)
    })
module.exports = playerRouter;