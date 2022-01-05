module.exports = (state, checkPacManDeath, addPoints, [ type, lineY, lineX ]) => {
    let ghostsIds = state.ghosts.map(g => g.id)
    if (ghostsIds.includes(type)) checkPacManDeath([ type, lineY, lineX ])
    
    if (type == 0) {
        addPoints(10)
        state.songEffect = new Audio('/songs/coin.mp3');
        state.songEffect.play()
    }
    if (type == 2) {
        addPoints(150)
        state.pacManKills = +new Date()+4700
        for (let i in state.ghosts) {
            state.ghosts[i].scared = true
            state.ghosts[i].speed = 400
        }

        state.song.pause()
        state.song = new Audio('/songs/musicSpecial.mp3');
        state.song.volume = 1
        state.song.loop = false
        state.song.play()

        let interval = setInterval(() => {
            if (state.pacManKills <= +new Date()) {
                clearInterval(interval)                
                state.pacManKills = 0
                state.morePoints.oldPoints = 100
                for (let i in state.ghosts) {
                    if (!state.scaredAlways) {
                        state.ghosts[i].scared = false
                        state.ghosts[i].speed = state.ghosts[i].defaultSpeed
                    }
                }

                state.song.pause()
                state.song = new Audio('/songs/music2.mp3');
                state.song.volume = 0.3
                state.song.loop = true
                state.song.play()
            }
        }, 100)
    }
}