module.exports = (state, Listener, resetDots) => {
    for (let i in state.ghosts) {
        let ghostId = state.ghosts[i].id
        let lineX = null
        let lineY = null

        for (let y in state.map) {
            if (state.map[y].includes(ghostId)) {
                for (let i = 21; i <= state.map[y].length; i++) delete state.map[y][i]
                state.map[y] = state.map[y].filter(i => Number(i) >= 0 && Number(i) <= 20)
                lineY = Number(y)
                lineX = state.map[y].indexOf(ghostId)
            }
        }

        if (lineX != null && lineY != null) state.map[lineY][lineX] = state.ghosts[i].oldMap
    }

    let removePacManCount = 0
    let removePacManinterval = setInterval(() => {
        let pacManLineX = null
        let pacManLineY = null
        for (let y in state.map) {
            if (state.map[y].includes(9)) {
                pacManLineY = Number(y)
                pacManLineX = state.map[y].indexOf(9)
            }
        }

        if (pacManLineY != null && pacManLineX != null) {
            state.map[pacManLineY][pacManLineX] = 3
            state.map[16][10] = 9
            clearInterval(removePacManinterval)
        }
        else {
            removePacManCount += 1
            if (removePacManCount >= 50) clearInterval(removePacManinterval)
        }
    }, 100)

    state.map[9][10] = 5
    state.map[10][9] = 8
    state.map[10][10] = 7
    state.map[10][11] = 6    

    state.ghosts = [
        {
            color: 'red',
            animDirection: 'up',
            death: false,
            locked: 0,
            oldMap: 3,
            dalay: 0,
            id: 5
        },
        {
            color: 'pink',
            animDirection: 'up',
            death: false,
            locked: 0,
            oldMap: 3,
            dalay: 0,
            id: 6
        },
        {
            color: 'yellow',
            animDirection: 'up',
            death: false,
            locked: 0,
            oldMap: 3,
            dalay: 0,
            id: 7
        },
        {
            color: 'cyan',
            animDirection: 'up',
            death: false,
            locked: 0,
            oldMap: 3,
            dalay: 0,
            id: 8
        }
    ]

    state.morePoints = {
        oldPoints: 100,
        points: 0,
        time: 0,
        lineX: 0,
        lineY: 0
    }

    if (resetDots) state.map = [
        [ 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 ],
        [ 1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1 ],
        [ 1,2,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,2,1 ],
        [ 1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1 ],
        [ 1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1 ],
        [ 1,0,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,0,1 ],
        [ 1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,1 ],
        [ 1,1,1,1,1,0,1,1,1,3,1,3,1,1,1,0,1,1,1,1,1 ],
        [ 3,3,3,3,1,0,1,3,3,3,3,3,3,3,1,0,1,3,3,3,3 ],
        [ 1,1,1,1,1,0,1,3,1,1,5,1,1,3,1,0,1,1,1,1,1 ],
        [ 3,3,3,3,3,0,3,3,1,8,7,6,1,3,3,0,3,3,3,3,3 ],
        [ 1,1,1,1,1,0,1,3,1,1,1,1,1,3,1,0,1,1,1,1,1 ],
        [ 3,3,3,3,1,0,1,3,3,3,3,3,3,3,1,0,1,3,3,3,3 ],
        [ 1,1,1,1,1,0,1,3,1,1,1,1,1,3,1,0,1,1,1,1,1 ],
        [ 1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1 ],
        [ 1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1 ],
        [ 1,2,0,0,1,0,0,0,0,0,9,0,0,0,0,0,1,0,0,2,1 ],
        [ 1,1,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,1,1 ],
        [ 1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,1 ],
        [ 1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1 ],
        [ 1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1 ],
        [ 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 ],
    ]

    state.pacMan.animate = false
    state.pacMan.animDirection = 'right'
    Listener.state.direction = 'left'
    Listener.state.oldDirection = 'up'    

    state.song.pause()
    state.song = new Audio('/songs/music1.mp3');
    state.song.loop = false
    state.song.volume = 1
    state.song.play()
    state.gameStage = 'initial'

    setTimeout(() => {
        state.gameStage = 'game'
        state.pauseMovement = false

        state.song = new Audio('/songs/music2.mp3');
        state.song.loop = true
        state.song.volume = 0.3
        state.song.play()
    }, 4500)
}