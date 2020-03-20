const SchoolService = {
    getAllSchools(knex) {
        return knex.select('*').from('schools')
    },

    // insertSchool(knex, newSchool) {
    // return knex
    // .insert(newSchool)
    // .into('schools')
    // .returning('*')
    // .then(rows => rows[0])
    // }
}

module.exports = SchoolService;