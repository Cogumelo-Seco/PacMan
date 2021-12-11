module.exports = (state, addPoints, resetGame, [ ghostId, lineY, lineX ]) => {
    let ghost = state.ghosts.find(g => g.id == ghostId)
    state.pauseMovement = true

    if (state.pacManKills) {
        state.morePoints.points = state.morePoints.oldPoints < 10000 ? Math.floor(state.morePoints.oldPoints*2) : state.morePoints.oldPoints
        state.morePoints.oldPoints = state.morePoints.points
        addPoints(state.morePoints.points)

        state.morePoints.time = +new Date()+2000
        state.morePoints.lineX = lineX
        state.morePoints.lineY = lineY

        let removeGhostAndAddPacManCount = 0
        let removeGhostAndAddPacManinterval = setInterval(() => {
            let ghostLineY = null
            let ghostLineX = null
            for (let y in state.map) {
                if (state.map[y].includes(ghostId)) {
                    ghostLineY = Number(y)
                    ghostLineX = state.map[y].indexOf(ghostId)
                }
            }
            if (ghostLineY != null && ghostLineX != null) {
                state.map[ghostLineY][ghostLineX] = 3

                let pacManLineX = null
                let pacManLineY = null
                for (let y in state.map) {
                    if (state.map[y].includes(9)) {
                        pacManLineY = Number(y)
                        pacManLineX = state.map[y].indexOf(9)
                    }
                }

                if (pacManLineY == null && pacManLineX == null) {
                    state.pacMan.dalay = 0
                    state.map[lineY][lineX] = 9
                }

                clearInterval(removeGhostAndAddPacManinterval)
            } else {
                removeGhostAndAddPacManCount += 1
                if (removeGhostAndAddPacManCount >= 50) clearInterval(removeGhostAndAddPacManinterval)
            }
        }, 100)

        setTimeout(() => state.pauseMovement = false, 1000)
        state.pacManKills += 500

        state.song.pause()
        state.song = new Audio('/songs/deathGhost.mp3');
        state.song.volume = 1
        state.song.loop = false
        state.song.play()        

        if (ghost) ghost.death = true
        setTimeout(() => {
            if (ghost) ghost.death = false
        }, 5000)

        if (state.playeMusic2Timeout) clearTimeout(state.playeMusic2Timeout)
        state.playeMusic2Timeout = setTimeout(() => {
            state.song.pause()
            state.song = new Audio('/songs/music2.mp3');
            state.song.volume = 0.3
            state.song.loop = true
            state.song.play()
        }, 5000)
    } else {
        state.song.pause()
        state.song = new Audio('/songs/death.mp3');
        state.song.volume = 1
        state.song.loop = false
        state.song.play()

        state.pacMan.animate = false
        state.lifes -= 1
        state.gameStage = 'pacManDeath'
        
        if (state.lifes > 0) setTimeout(resetGame, 2000)
        else state.gameStage = 'gameOver'
    }
}