function createGame(Listener) {
    const state = {
        lifes: 2,
        highScore: 0,
        score: 0,
        gameStage: 'home',
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
            },
            menuGhosts: {
                totalDalay: 200,
                dalay: 0,
                ghostsAnimation: true
            },
            menuAnimation: {
                totalDalay: 25,
                dalay: 0,
                menuAnimationX: 0
            },
        },
        pacMan: {
            defaultPacManSpeed: 185,
            pacManSpeed: 185,
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
                defaultSpeed: 170,
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
                defaultSpeed: 180,
                speed: 180,
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
                defaultSpeed: 185,
                speed: 185,
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
                defaultSpeed: 180,
                speed: 180,
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

    const addGhost = (command) => require('./GameFunctions/addGhost')(state, Listener, command)
    const resetGame = (command) => require('./GameFunctions/resetGame')(state, Listener, command)
    const checkPacManDeath = (command) => require('./GameFunctions/checkPacManDeath')(state, addPoints, resetGame, command)
    const movePacMan = (command) => require('./GameFunctions/movePacMan')(state, checkCollision, command)
    const moveGhosts = () => require('./GameFunctions/moveGhosts')(state, checkPacManDeath)
    const checkCollision = (command) => require('./GameFunctions/checkCollision')(state, checkPacManDeath, addPoints, command)
    const codes = require('./GameFunctions/codes')(state, checkPacManDeath, addGhost)

    function start(command) {
        state.gameStage = 'game'
        state.pauseMovement = false

        state.song = new Audio('/songs/music2.mp3');
        state.song.loop = true
        state.song.volume = 0.3
        state.song.play()

        if (state.gameInterval) clearInterval(state.gameInterval)
        state.gameInterval = setInterval(() => {
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
                setTimeout(() => resetGame([ true ]), 4000)                
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
                    let time = 0
                    if (code != undefined) {
                        if (code == true) codeMessage.innerText = 'Cheat activated'
                        if (code == false) codeMessage.innerText = 'Cheat disabled'
                        if (typeof code == 'string') codeMessage.innerText = code
                        codeMessage.style.display = 'block'
                        time = codeMessage.innerText.length*200
                        if (state.codesTimeout) clearTimeout(state.codesTimeout)
                        state.codesTimeout = setTimeout(() => codeMessage.style.display = 'none', time)
                    }
                }
            }

            for (let ghost of state.ghosts) ghost.dalay -= state.canvas.tileSize/ghost.speed*(state.canvas.tileSize/2-2)
            state.pacMan.dalay -= state.canvas.tileSize/(state.pacMan.pacManSpeed)*(state.canvas.tileSize/2-2)
        }, 1)
    }

    function addPoints(points) {
        let maxScore = 1000000000000000
        if (state.score < maxScore) state.score += points
        else state.score = maxScore
        if (state.highScore < maxScore && state.score >= state.highScore) state.highScore = state.score
        else if (state.highScore > maxScore) state.highScore = maxScore
    }
    
    return {
        start,
		movePacMan,
        state
    }
}

module.exports = createGame