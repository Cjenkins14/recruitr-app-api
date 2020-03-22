const PlayerService = {
    getAllPlayers(knex) {
        return knex.select('*').from('player_info')
    },
    getById(knex, id) {
        return knex.from('player_info').select('*').where('playerid', id)
    },
    insertPlayer(knex, newPlayer) {
        return knex
            .insert(newPlayer)
            .into('player_info')
            .returning('*')
            .then(rows => rows[0])
    },
    deletePlayer(knex, id) {
        return knex('player_info')
            .where({
                id
            })
            .delete()
    },
    updatePlayer(knex, id, newPlayerFields) {
        return knex('player_info')
            .where({
                id
            })
            .update(newPlayerFields)
    }
}

module.exports = PlayerService;