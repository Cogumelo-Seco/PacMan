function createGame(Listener) {
    const state = {
        fps: '0-0',
        lifes: 2,
        highScore: 0,
        score: 0,
        gameStage: 'home',
        pacManKills: 0,
        gameGlitched: false,
        gameGlitchedStage: 1,
        pauseMovement: true,
        darkTheme: true,
        rainbowMode: false,
        rainbowColor: 0,
        images: [],
        sounds: [],
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
            oldTile: 3,
            dalay: 0
        },
        ghosts: [
            {
                color: 'red',
                animDirection: 'up',
                activeAnimation: true,
                scared: false,
                placeOfDeath: {
                    x: 0,
                    y: 0
                },
                defaultSpeed: 170,
                speed: 175,
                speedCounter: 0,
                death: false,
                locked: 0,
                oldTile: 3,
                dalay: 0,
                id: 5
            },
            {
                color: 'pink',
                animDirection: 'up',
                activeAnimation: true,
                scared: false,
                placeOfDeath: {
                    x: 0,
                    y: 0
                },
                defaultSpeed: 180,
                speed: 180,
                speedCounter: 0,
                death: false,
                locked: 0,
                oldTile: 3,
                dalay: 0,
                id: 6
            },
            {
                color: 'orange',
                animDirection: 'up',
                activeAnimation: true,
                scared: false,
                placeOfDeath: {
                    x: 0,
                    y: 0
                },
                defaultSpeed: 185,
                speed: 185,
                speedCounter: 0,
                death: false,
                locked: 0,
                oldTile: 3,
                dalay: 0,
                id: 7
            },
            {
                color: 'cyan',
                animDirection: 'up',
                activeAnimation: true,
                scared: false,
                placeOfDeath: {
                    x: 0,
                    y: 0
                },
                defaultSpeed: 180,
                speed: 180,
                speedCounter: 0,
                death: false,
                locked: 0,
                oldTile: 3,
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

    const addImages = (command) => require('./GameFunctions/addImages')(state)
    const addSounds = (command) => require('./GameFunctions/addSounds')(state)

    const playSongEffect = (type, command) => require('./GameFunctions/playSongEffect')(type, command, state)
    const playSong = (type, command) => require('./GameFunctions/playSong')(type, command, state)
    state.playSongEffect = playSongEffect
    state.playSong = playSong

    const addGhost = (command) => require('./GameFunctions/addGhost')(state, Listener, command)
    const resetGame = (command) => require('./GameFunctions/resetGame')(state, Listener, command)
    const checkPacManDeath = (command) => require('./GameFunctions/checkPacManDeath')(state, addPoints, resetGame, command)
    const movePacMan = (command) => require('./GameFunctions/movePacMan')(state, checkCollision, command)
    const moveGhosts = () => require('./GameFunctions/moveGhosts')(state, checkPacManDeath)
    const checkCollision = (command) => require('./GameFunctions/checkCollision')(state, checkPacManDeath, addPoints, command)
    const codes = require('./GameFunctions/codes')(state, checkPacManDeath, addGhost)

    async function start(command) {
        await loading()

        if (command.startGame) {
            state.gameStage = 'game'
            state.pauseMovement = false

            playSong('music2', { loop: true, volume: 0.3 })
        }

        if (state.gameInterval) clearInterval(state.gameInterval)
        state.gameInterval = setInterval(() => {
            for (let ghost of state.ghosts) {
                if (ghost.dalay > 0) ghost.dalay -= state.canvas.tileSize/ghost.speed*(state.canvas.tileSize/2-2)
            }
            if (state.pacMan.dalay > 0) state.pacMan.dalay -= state.canvas.tileSize/(state.pacMan.pacManSpeed)*(state.canvas.tileSize/2-2)

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
            
            if (!state.pauseMovement && state.gameStage != 'pause') {
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

            if (Listener.state.keys.escape && state.gameStage == 'game') {
                state.gameStage = 'pause'
                state.song.pause()
                state.scaredPauseTime = state.pacManKills-+new Date()
                Listener.state.keys.escape = false
            } else if (Listener.state.keys.escape && state.gameStage == 'pause') {
                state.gameStage = 'game'
                state.song.play()
                state.pacManKills = +new Date()+state.scaredPauseTime
                Listener.state.keys.escape = false
            } else if (state.gameStage == 'pause') state.pacManKills += 1000

            if (state.gameGlitched && state.gameStage != 'pause' && state.gameStage != 'home') {
                let percent = Math.floor(Math.random()*100)
                if (percent >= 100-state.gameGlitchedStage) {
                    let x = Math.floor(Math.random()*state.map.length)
                    let y = Math.floor(Math.random()*state.map[x].length)
                    state.map[x][y] = Math.floor(Math.random()*20)
                    state.gameGlitchedStage += 0.15
                }
            }

            state.rainbowColor = state.rainbowColor >= 360 ? 0 : state.rainbowColor+1
        }, 17)
    }

    async function loading() {
        await addImages()
        await addSounds()

        for (let i of state.images) {
            let img = new Image()
            img.src = `/images/${i}.png`
            state.images[i] = img
        }

        for (let i of state.sounds) {
            let sound = new Audio(`/sounds/${i}.mp3`)
            state.sounds[i] = sound
        }
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
        playSongEffect,
        playSong,
        state
    }
}

module.exports = createGame