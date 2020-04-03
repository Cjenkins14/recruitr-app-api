const app = require('../src/app')
const knex = require('knex')
const { makeSchoolsArray, makePlayersArray } = require('./school.fixtures')

describe('School endpoints', function () {
    db = knex({
        client: 'pg',
        connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)


    after('disconnect from db', () => db.destroy())
    beforeEach('clean the table', () => db.raw('TRUNCATE schools, player_info RESTART IDENTITY CASCADE;'))
    afterEach('cleanup', () => db.raw('TRUNCATE schools, player_info RESTART IDENTITY CASCADE;'))

    describe('GET /school', () => {
        context('Given no schools', () => {
            it('responds with 200 and an empty list', () => {
                return supertest(app)
                    .get('/school')
                    .expect(200, [])
            })
        })

        context('Given there are folders in the database', () => {
            const testSchools = makeSchoolsArray()
            beforeEach('insert schools', () => {
                return db
                    .into('schools')
                    .insert(testSchools)
            })

            it('responds with 200 and all of the schools', () => {
                return supertest(app)
                    .get('/school')
                    .expect(200, testSchools)
            })
        })
    })

    describe('GET /school/:school_id', () => {
        context('Given no schools', () => {
            it('responds with 404', () => {
                const schoolId = 1234
                return supertest(app)
                    .get(`/school/${schoolId}`)
                    .expect(404, { error: { message: 'School does not exist' } })
            })
        })

        context('Given there are schools in the database', () => {
            const testSchools = makeSchoolsArray()

            beforeEach('insert schools', () => {
                return db
                    .into('schools')
                    .insert(testSchools)
            })

            it('responds with 200 and the specified school', () => {
                const schoolId = 2
                const expectedSchool = testSchools[schoolId - 1]
                return supertest(app)
                    .get(`/school/${schoolId}`)
                    .expect(200, expectedSchool)
            })
        })
    })

    describe('POST /school', () => {
        const testSchools = makeSchoolsArray()

        before('insert schools', () => {
            return db
                .into('schools')
                .insert(testSchools)
        })

        it('creates a schools, responds with 201 and new school', () => {
            const newSchool = {
                schoolname: 'post test school'
            }

            return supertest(app)
                .post('/school')
                .send(newSchool)
                .expect(201)
                .expect(res => {
                    expect(res.body.schoolname).to.eql(newSchool.schoolname)
                })
                .then(res => {
                    supertest(app)
                        .get(`/school/${res.body.id}`)
                        .expect(res.body)
                })
        })

        const missingField = {
            id: 9,
            // name: null
        }
        it('responds with 400 and an error message when missing name', () => {
            before('insert school', () => {
                return db
                    .into('schools')
                    .insert(missingField)
            })

            return supertest(app)
                .post('/school')
                .send(missingField)
                .expect(400, { error: { message: 'Missing school name in request body' } })
        })
    })
})

describe('Player endpoints', () => {
    let db

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())
    beforeEach('clean the table', () => db.raw('TRUNCATE schools, player_info RESTART IDENTITY CASCADE;'))
    afterEach('cleanup', () => db.raw('TRUNCATE schools, player_info RESTART IDENTITY CASCADE;'))

    describe('GET /player', () => {
        context('Given no players', () => {
            it('responds with 200 and an empty list', () => {
                return supertest(app)
                    .get('/player')
                    .expect(200, [])
            })
        })

        // context('Given there are players', () => {
        // const testSchools = makeSchoolsArray()
        // const testPlayers = makePlayersArray()
        // 
        // before('insert schools, then players', () => {
        // return db
        // .into('schools')
        // .insert(testSchools)
        // .then(() => {
        // return db
        // .into('player_info')
        // .insert(testPlayers)
        // })
        // })
        // it('responds with 200 and all the players', () => {
        // return supertest(app)
        // .get('/player')
        // .expect(200, testPlayers)
        // })
        // })

    })

    describe('GET /:player_id', () => {
        context('Given no players', () => {
            it('responds with 404', () => {
                const playerId = 1234
                return supertest(app)
                    .get(`/player/${playerId}`)
                    .expect(404)
            })
        })

        context('Given there are players', () => {
            const testSchools = makeSchoolsArray()
            const testPlayers = makePlayersArray()

            beforeEach('insert schools, players', (done) => {
                db
                    .into('schools')
                    .insert(testSchools)
                    .then(() => {
                        db
                            .into('player_info')
                            .insert(testPlayers)
                            .then(() => done())
                    })
            })
            // it('responds with 200 and the player', () => {
            // const playerId = 1
            // const expectedPlayer = testPlayers[playerId - 1]
            // 
            // return supertest(app)
            // .get(`/player/${playerId}`)
            // .expect(200, expectedPlayer)
            // })
        })
    })

    describe('POST /player', () => {
        const testSchools = makeSchoolsArray()
        const testPlayers = makePlayersArray()

        beforeEach('insert schools', (done) => {
            db
                .into('schools')
                .insert(testSchools)
                .then(() => done())
        })
        it('Creates a new player repsonding with 201 and player', () => {
            const newPlayer = {
                name: "Babe Ruth",
                graddate: 1913,
                position: "Center Field",
                batthrow: "Bat",
                date: "2020-03-20T05:00:00.000Z",
                phone: '9725555555',
                url: "https://www.youtube.com/watch?v=7WfVREOHaAk",
                dash: 3,
                platefirst: 3,
                turntime: 3,
                exitvelo: 3,
                poptime: 3,
                notes: 'note',
                schoolid: 1
            }

            return supertest(app)
                .post('/player')
                .send(newPlayer)
                .expect(201)
                .expect(res => {
                    expect(res.body.name).to.eql(newPlayer.name)
                    expect(res.body.graddate).to.eql(newPlayer.graddate)
                    expect(res.body.position).to.eql(newPlayer.position)
                    expect(res.body.batthrow).to.eql(newPlayer.batthrow)
                    expect(res.body.date).to.eql(newPlayer.date)
                    expect(res.body.phone).to.eql(newPlayer.phone)
                    expect(res.body.url).to.eql(newPlayer.url)
                    expect(res.body.dash).to.eql(newPlayer.dash)
                    expect(res.body.platefirst).to.eql(newPlayer.platefirst)
                    expect(res.body.turntime).to.eql(newPlayer.turntime)
                    expect(res.body.exitvelo).to.eql(newPlayer.exitvelo)
                    expect(res.body.poptime).to.eql(newPlayer.poptime)
                    expect(res.body.schoolid).to.eql(newPlayer.schoolid)
                })

        })
    })
})