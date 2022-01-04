function createGame(Listener) {
    const state = {
        lifes: 2,
        highScore: 0,
        score: 0,
        gameStage: 'initial',
        pacManKills: 0,
        pauseMovement: false,
        canvas: {
            width: 1050,
            height: 1100,
            tileSize: 50
        },
        morePoints: {
            oldPoints: 100,
            points: 0,
            time: 0,
            lineX: 0,
            lineY: 0
        },
        animations: {
            pacMan: {
                totalDalay: 80,
                dalay: 0
            },
            walls: {
                totalDalay: 170,
                dalay: 0
            },
            specialDots: {
                totalDalay: 170,
                dalay: 0
            }
        },
        pacMan: {
            defaultPacManSpeed: 190,
            pacManSpeed: 190,
            pacManSpeedCounter: 0,
            withoutPacMan: 0,
            dalay: 0
        },
        ghosts: [
            {
                color: 'red',
                animDirection: 'up',
                activeAnimation: true,
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
                id: 5
            },
            {
                color: 'pink',
                animDirection: 'up',
                activeAnimation: true,
                placeOfDeath: {
                    x: 0,
                    y: 0
                },
                images: {},
                withoutGhost: 0,
                defaultSpeed: 185,
                speed: 185,
                speedCounter: 0,
                death: false,
                locked: 0,
                oldMap: 3,
                dalay: 0,
                id: 6
            },
            {
                color: 'orange',
                animDirection: 'up',
                activeAnimation: true,
                placeOfDeath: {
                    x: 0,
                    y: 0
                },
                images: {},
                withoutGhost: 0,
                defaultSpeed: 190,
                speed: 190,
                speedCounter: 0,
                death: false,
                locked: 0,
                oldMap: 3,
                dalay: 0,
                id: 7
            },
            {
                color: 'cyan',
                animDirection: 'up',
                activeAnimation: true,
                placeOfDeath: {
                    x: 0,
                    y: 0
                },
                images: {},
                withoutGhost: 0,
                defaultSpeed: 185,
                speed: 185,
                speedCounter: 0,
                death: false,
                locked: 0,
                oldMap: 3,
                dalay: 0,
                id: 8
            }
        ],
        map: [
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
    }

    const resetGame = (command) => require('./GameFunctions/resetGame')(state, Listener, command)
    const checkPacManDeath = (command) => require('./GameFunctions/checkPacManDeath')(state, addPoints, resetGame, command)
    const movePacMan = (command) => require('./GameFunctions/movePacMan')(state, checkCollision, command)
    const moveGhosts = () => require('./GameFunctions/moveGhosts')(state, checkPacManDeath)
    const checkCollision = (command) => require('./GameFunctions/checkCollision')(state, checkPacManDeath, addPoints, command)
    const codes = require('./GameFunctions/codes')(state)

    function start(command) {
        state.gameStage = 'game'

        state.song = new Audio('/songs/music2.mp3');
        state.song.loop = true
        state.song.volume = 0.3
        state.song.play()

        setInterval(() => {
            let dots = 0

            for (let y in state.map) {
                for (let x in state.map[y]) {
                    if (state.map[y][x] == 0 || state.map[y][x] == 2) dots += 1
                }
            }
            dots += state.ghosts.filter(g => g.oldMap == 0).length

            if (dots <= 0 && state.gameStage != 'levelWon') {
                state.song.pause()
                state.pauseMovement = true
                state.gameStage = 'levelWon'
                setTimeout(() => resetGame(true), 4000)                
            }
            
            if (!state.pauseMovement) {
                if (state.pacMan.pacManSpeedCounter <= +new Date()) {
                    state.pacMan.pacManSpeedCounter = +new Date()+state.pacMan.pacManSpeed
                    movePacMan(
                        {
                            Listener: command.Listener,
                            direction: command.Listener.state.direction,
                            oldDirection: command.Listener.state.oldDirection
                        }
                    )
                }
                moveGhosts()
            }

            for (let i in codes) {
                if (Listener.state.codeText.toLowerCase().includes(i)) {
                    let codeMessage = document.getElementById('codeMessage')                    
                    Listener.state.codeText = ''
                    let code = codes[i]()
                    if (code != undefined) {
                        if (code == true) codeMessage.innerText = 'Cheat activated'
                        if (code == false) codeMessage.innerText = 'Cheat disabled'
                        codeMessage.style.display = 'block'
                        setTimeout(() => codeMessage.style.display = 'none', 3000)
                    }
                }
            }
        }, 1)
    }

    function addPoints(points) {
        state.score += points
        if (state.score >= state.highScore) state.highScore = state.score
    }
    
    return {
        start,
		movePacMan,
        state
    }
}

module.exports = createGame