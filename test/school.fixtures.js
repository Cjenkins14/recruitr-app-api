function makeSchoolsArray() {
    return [
        {
            id: 1,
            schoolname: 'DHS'
        },
        {
            id: 2,
            schoolname: 'RHS'
        },
        {
            id: 3,
            schoolname: 'GHS'
        }
    ]
}

function makePlayersArray() {
    return [
        {
            name: "Babe Ruth",
            graddate: 1913,
            position: "Center Field",
            batthrow: "Bat",
            phone: '9725555555',
            url: "https://www.youtube.com/watch?v=7WfVREOHaAk",
            dash: 1,
            platefirst: 1,
            turntime: 1,
            exitvelo: 1,
            poptime: 1,
            notes: 'note',
            schoolid: 1
        },
        {
            name: "Lou Gherig",
            graddate: 1920,
            position: "Left Field",
            batthrow: "Bat",
            phone: '9725555555',
            url: "https://www.youtube.com/watch?v=7WfVREOHaAk",
            dash: 1,
            platefirst: 1,
            turntime: 1,
            exitvelo: 1,
            poptime: 1,
            notes: 'note',
            schoolid: 2
        },
        {
            name: "Jackie Robinson",
            graddate: 1930,
            position: "Right Field",
            batthrow: "Bat",
            phone: '9725555555',
            url: "https://www.youtube.com/watch?v=7WfVREOHaAk",
            dash: 1,
            platefirst: 1,
            turntime: 1,
            exitvelo: 1,
            poptime: 1,
            notes: 'note',
            schoolid: 3
        },
        {
            name: "Derek Jeter",
            graddate: 1970,
            position: "Infield",
            batthrow: "Bat",
            phone: '9725555555',
            url: "https://www.youtube.com/watch?v=7WfVREOHaAk",
            dash: 1,
            platefirst: 1,
            turntime: 1,
            exitvelo: 1,
            poptime: 1,
            notes: 'note',
            schoolid: 1
        }
    ]
}

module.exports = { makeSchoolsArray, makePlayersArray }