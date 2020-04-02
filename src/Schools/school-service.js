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
    },
    getSchoolPlayer(knex, id) {
        return knex.from('schools').innerJoin('player_info', 'schools.id', 'player_info.playerid').where('schools.id', id)
    },
    deleteSchool(knex, id) {
        return knex('schools')
            .where({
                id
            })
            .delete()
    }
}

module.exports = SchoolService;