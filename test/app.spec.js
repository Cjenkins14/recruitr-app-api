const app = require('../src/app')
const knex = require('knex')
const { makeSchoolsArray } = require('./school.fixtures')

describe('School endpoints', function () {
    db = knex({
        client: 'pg',
        connection: process.env.TEST_DB_URL,
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

            it('responds with 200 and all of the articles', () => {
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

            it('responds with 200 and the specified folder', () => {
                const schoolId = 2
                const expectedSchool = testSchools[schoolId - 1]
                return supertest(app)
                    .get(`/school/${schoolId}`)
                    .expect(200, expectedSchool)
            })
        })
    })
})