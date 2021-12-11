module.exports = (state, checkPacManDeath, addPoints, [ type, lineY, lineX ]) => {
    if (type == 5 || type == 6 || type == 7 || type == 8) {
        checkPacManDeath([ type, lineY, lineX ])
    }
    if (type == 0) {
        addPoints(10)
        state.songEffect = new Audio('/songs/coin.mp3');
        state.songEffect.play()
    }
    if (type == 2) {
        addPoints(150)
        state.pacManKills = +new Date()+4700
        state.pacMan.pacManSpeed = 190
        state.song.pause()
        state.song = new Audio('/songs/musicSpecial.mp3');
        state.song.volume = 1
        state.song.loop = false
        state.song.play()
        let interval = setInterval(() => {
            if (state.pacManKills <= +new Date) {
                clearInterval(interval)
                state.pacManKills = 0
                state.pacMan.pacManSpeed = 250
                state.song.pause()
                state.song = new Audio('/songs/music2.mp3');
                state.song.volume = 0.3
                state.song.loop = true
                state.song.play()
            }
        }, 100)
    }
}