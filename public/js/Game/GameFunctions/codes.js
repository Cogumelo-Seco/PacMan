module.exports = function codesFunction(state) {
    return {
        frog: function () {
            if (!state.ghosts.find(g => g.color == 'frog')) state.ghosts.push({
                color: 'frog',
                animDirection: 'up',
                activeAnimation: false,
                placeOfDeath: {
                    x: 0,
                    y: 0
                },
                images: {},
                withoutGhost: 0,
                defaultSpeed: 175,
                speed: 175,
                speedCounter: 0,
                death: false,
                locked: 0,
                oldMap: 3,
                dalay: 0,
                id: 13
            })
            else return 
            return true
        },
        cogu: function () {
            if (!state.ghosts.find(g => g.color == 'cogu')) state.ghosts.push({
                color: 'cogu',
                animDirection: 'up',
                activeAnimation: false,
                placeOfDeath: {
                    x: 0,
                    y: 0
                },
                images: {},
                withoutGhost: 0,
                defaultSpeed: 140,
                speed: 140,
                speedCounter: 0,
                death: false,
                locked: 0,
                oldMap: 3,
                dalay: 0,
                id: 11
            })
            else return 
            return true
        },
        applecat: function () {
            if (!state.ghosts.find(g => g.color == 'apple-cat')) state.ghosts.push({
                color: 'apple-cat',
                animDirection: 'up',
                activeAnimation: true,
                placeOfDeath: {
                    x: 0,
                    y: 0
                },
                images: {},
                withoutGhost: 0,
                defaultSpeed: 170,
                speed: 170,
                speedCounter: 0,
                death: false,
                locked: 0,
                oldMap: 3,
                dalay: 0,
                id: 12
            })
            else return 
            return true
        },
        gspeed: function () {
            if (state.ghosts[0].speed == 110) {
                for (let ghost of state.ghosts) {
                    ghost.speed = ghost.defaultSpeed
                }
                return false
            } else {
                for (let ghost of state.ghosts) {
                    ghost.speed = 110
                }
                return true
            }
        },
        speed: function () {
            if (state.pacMan.pacManSpeed == 110) {
                state.pacMan.pacManSpeed = state.pacMan.defaultPacManSpeed
                return false
            } else {
                state.pacMan.pacManSpeed = 110
                return true
            }
        },
        scared: function () {
            if (state.scaredAlways) {
                for (let i in state.ghosts) {
                    state.scaredAlways = false
                    state.ghosts[i].scared = false
                    state.ghosts[i].speed = state.ghosts[i].defaultSpeed
                }
                return false
            } else {
                for (let i in state.ghosts) {
                    state.scaredAlways = true
                    state.ghosts[i].scared = true
                    state.ghosts[i].speed = 400
                }
                return true
            }
        },
        codes: function () {
            let codesText = ''
            let codesList = codesFunction()
            for (let i in codesList) codesText += `${i}\n`
            return codesText
        }
    }
}