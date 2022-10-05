export default function codesFunction(state, checkPacManDeath, addGhost) {
    return {
        mario: function () {
            state.pacManStyle = state.pacManStyle == 'mario' ? 'default' : 'mario'
            return state.pacManStyle == 'mario' ? true : false
        },
        guto: function () {
            state.pacManStyle = state.pacManStyle == 'guto' ? 'default' : 'guto'
            return state.pacManStyle == 'guto' ? true : false
        },
        frog: function () {            
            if (!state.ghosts.find(g => g.color == 'frog')) addGhost([ 'frog', 11, false, 170 ])
            else return
            return true
        },        
        applecat: function () {
            if (!state.ghosts.find(g => g.color == 'apple-cat')) addGhost([ 'apple-cat', 12, true, 160 ])
            else return 
            return true
        },
        cogu: function () {
            if (!state.ghosts.find(g => g.color == 'cogu')) addGhost([ 'cogu', 13, false, 140 ])
            else return 
            return true
        },
        gspeed: function () {
            if (state.ghosts[0].speed == 100) {
                for (let ghost of state.ghosts) {
                    ghost.speed = ghost.defaultSpeed
                }
                return false
            } else {
                for (let ghost of state.ghosts) {
                    ghost.speed = 100
                }
                return true
            }
        },        
        speed: function () {
            if (state.pacMan.pacManSpeed == 100) {
                state.pacMan.pacManSpeed = state.pacMan.defaultPacManSpeed
                return false
            } else {
                state.pacMan.pacManSpeed = 100
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
        win: function () {
            if (state.gameStage != 'game') return
            for (let y in state.map) {
                for (let x in state.map[y]) {
                    if (state.map[y][x] == 0 || state.map[y][x] == 2) state.map[y][x] = 3
                }
            }
            for (let ghost of state.ghosts) ghost.oldTile = 3
            return true
        },
        kill: function () {
            if (state.gameStage != 'game') return
            checkPacManDeath([ true ])
            return true
        },
        glitch: function () {
            state.gameGlitched = state.gameGlitched ? false : true
            return state.gameGlitched
        },
        lighttheme: function () {
            state.darkTheme = state.darkTheme ? false : true
            return state.darkTheme ? false : true
        },
        rainbow: function () {
            state.rainbowMode = state.rainbowMode ? false : true
            return state.rainbowMode ? true : false
        },
        lowmode: function () {
            state.lowMode = state.lowMode ? false : true
            return state.lowMode ? true : false
        },
        codes: function () {
            let codesText = ''
            let codesList = codesFunction()
            for (let i in codesList) codesText += `${i}\n`
            console.log(codesText)

            return 'Codes are in the console (F12)'
        }
    }
}