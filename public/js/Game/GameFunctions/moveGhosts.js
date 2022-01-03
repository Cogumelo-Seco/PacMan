module.exports = (state, checkPacManDeath) => {
    let blockedPlaces = [ 1, 8, 7, 6, 5 ]

    function newDirection(blockedDirection) {
        let directions = []

        if (!blockedPlaces.includes(state.map[lineY-1][lineX]) && blockedDirection != 'up') directions.push('up')
        if (!blockedPlaces.includes(state.map[lineY+1][lineX]) && blockedDirection != 'down') directions.push('down')
        if (!blockedPlaces.includes(state.map[lineY][lineX-1]) && blockedDirection != 'left') directions.push('left')
        if (!blockedPlaces.includes(state.map[lineY][lineX+1]) && blockedDirection != 'right') directions.push('right')

        return directions[Math.floor(Math.random() * directions.length)]
    }

    function regenerateGhost(i, ghostId) {
        if (state.ghosts[i].death) return;
        state.ghosts[i].oldMap = 3

        if (state.map[10][10] == 3) {
            state.ghosts[i].locked = 0
            state.map[10][10] = ghostId
            return true
        }
        if (state.map[10][9] == 3) {
            state.ghosts[i].locked = 0
            state.map[10][9] = ghostId
            return true
        }
        if (state.map[10][11] == 3) {
            state.ghosts[i].locked = 0
            state.map[10][11] = ghostId
            return true
        }
        if (state.map[9][10] == 3) {
            state.ghosts[i].locked = 0
            state.map[9][10] = ghostId
            return true
        }
    }

    for (let i in state.ghosts) {
        let ghostId = state.ghosts[i].id
        let lineX = null
        let lineY = null

        if (state.ghosts[i].speedCounter <= +new Date()) {
            state.ghosts[i].speedCounter = +new Date()+state.ghosts[i].speed

            if (state.ghosts[i].activeAnimation) state.ghosts[i].animation = state.ghosts[i].animation ? false : true        

            for (let y in state.map) {
                if (state.map[y].includes(ghostId)) {
                    for (let i = 21; i <= state.map[y].length; i++) delete state.map[y][i]
                    state.map[y] = state.map[y].filter(i => Number(i) >= 0 && Number(i) <= 20)
                    if (lineX != null || lineY != null) state.map[Number(y)][state.map[Number(y)].indexOf(ghostId)] = 3
                    else {
                        lineY = Number(y)
                        lineX = state.map[y].indexOf(ghostId)
                    }
                }
            }

            if (lineX != null || lineY != null) {
                let direction = state.ghosts[i].direction

                state.ghosts[i].direction = newDirection(
                    direction == 'up' ? 'down' :
                    direction == 'down' ? 'up' :
                    direction == 'left' ? 'right' :
                    direction == 'right' ? 'left' : null
                )
                direction = state.ghosts[i].direction
                state.ghosts[i].direction = direction

                if (!direction) {
                    state.ghosts[i].locked += 1
                    if (state.ghosts[i].locked >= 10) {
                        let regenerateGhostVerify = regenerateGhost(i, ghostId)
                        if (regenerateGhostVerify) state.map[lineY][lineX] = state.ghosts[i].oldMap
                    }
                } else {
                    if (direction == 'left' && lineX <= 0) {
                        state.map[lineY][lineX] = 3
                        lineX = 21
                    } else 
                    if (direction == 'right' && lineX >= 20) {
                        state.map[lineY][lineX] = 3
                        lineX = -1
                    } else state.map[lineY][lineX] = state.ghosts[i].oldMap 

                    state.ghosts[i].dalay = state.canvas.tileSize
                    state.ghosts[i].animDirection = direction    
                    
                    switch(direction) {
                        case 'up':
                            state.ghosts[i].oldMap = state.map[lineY-1][lineX]
                            if (state.map[lineY-1][lineX] == 9) checkPacManDeath([ ghostId, lineY-1, lineX ])
                            state.map[lineY-1][lineX] = ghostId
                            break
                        case 'down':
                            state.ghosts[i].oldMap = state.map[lineY+1][lineX]
                            if (state.map[lineY+1][lineX] == 9) checkPacManDeath([ ghostId, lineY+1, lineX ])
                            state.map[lineY+1][lineX] = ghostId
                            break
                        case 'left':
                            state.ghosts[i].oldMap = state.map[lineY][lineX-1]
                            if (state.map[lineY][lineX-1] == 9) checkPacManDeath([ ghostId, lineY, lineX-1 ])
                            state.map[lineY][lineX-1] = ghostId
                            break
                        case 'right':
                            state.ghosts[i].oldMap = state.map[lineY][lineX+1]
                            if (state.map[lineY][lineX+1] == 9) checkPacManDeath([ ghostId, lineY, lineX+1 ])
                            state.map[lineY][lineX+1] = ghostId
                            break
                    }
                }
            } else regenerateGhost(i, ghostId)
        }
    }
}