const app = require('../src/app')
const knex = require('knex')


describe('School endpoints', function () {
    db = knex({
        client: 'pg',
        connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)


    after('disconnect from db', () => db.destroy())
    beforeEach('clean the table', () => db.raw('TRUNCATE schools, player_info RESTART IDENTITY CASCADE;'))
    afterEach('cleanup', () => db.raw('TRUNCATE schools, player_info RESTART IDENTITY CASCADE;'))

    describe('GET /main', () => {
        context('Given no schools', () => {
            it('responds with 200 and an empty list', () => {
                return supertest(app)
                    .get('/main')
                    .expect(200, [])
            })
        })
    })

})