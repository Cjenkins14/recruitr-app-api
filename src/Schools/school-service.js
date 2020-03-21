const SchoolService = {
    getAllSchools(knex) {
        return knex.select('*').from('schools')
    },

    insertSchool(knex, newSchool) {
        return knex
            .insert(newSchool)
            .into('schools')
            .returning('*')
            .then(rows => rows[0])
    },
    getById(knex, id) {
        return knex.from('schools').select('*').where('id', id).first()
    }
}

module.exports = SchoolService;