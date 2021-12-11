module.exports = (state, checkCollision, command) => {
    let direction = command.direction
    let lineX = null
    let lineY = null

    for (let y in state.map) {
        if (state.map[y].includes(9)) {
            for (let i = 21; i <= state.map[y].length; i++) delete state.map[y][i]
            state.map[y] = state.map[y].filter(i => Number(i) >= 0 && Number(i) <= 20)
            if (lineX != null || lineY != null) state.map[Number(y)][state.map[Number(y)].indexOf(9)] = 3
            else {
                lineY = Number(y)
                lineX = state.map[y].indexOf(9)
            }
        }
    }

    if (lineX != null || lineY != null) {
        state.pacMan.withoutPacMan = 0
        state.pacMan.animate = false

        if (direction == 'up' && state.map[lineY-1][lineX] == 1) direction = command.oldDirection
        if (direction == 'down' && state.map[lineY+1][lineX] == 1) direction = command.oldDirection
        if (direction == 'left' && state.map[lineY][lineX-1] == 1) direction = command.oldDirection
        if (direction == 'right' && state.map[lineY][lineX+1] == 1) direction = command.oldDirection

        if (direction == 'up' && state.map[lineY-1][lineX] == 1) direction = null
        if (direction == 'down' && state.map[lineY+1][lineX] == 1) direction = null
        if (direction == 'left' && state.map[lineY][lineX-1] == 1) direction = null
        if (direction == 'right' && state.map[lineY][lineX+1] == 1) direction = null

        if (!direction) return;

        if (direction == 'left' && lineX <= 0) {
            state.map[lineY][lineX] = 3
            lineX = 21         
        } else if (direction == 'right' && lineX >= 20) {
            state.map[lineY][lineX] = 3
            lineX = -1
        } else state.map[lineY][lineX] = 3

        state.pacMan.animate = true
        state.pacMan.animDirection = direction
        state.pacMan.dalay = state.canvas.tileSize

        switch(direction) {
            case 'up':
                checkCollision([ state.map[lineY-1][lineX], lineY-1, lineX ])
                state.map[lineY-1][lineX] = 9
                break
            case 'down':
                checkCollision([ state.map[lineY+1][lineX], lineY+1, lineX ])
                state.map[lineY+1][lineX] = 9
                break
            case 'left':
                checkCollision([ state.map[lineY][lineX-1], lineY, lineX-1] )
                state.map[lineY][lineX-1] = 9
                break
            case 'right':
                checkCollision([ state.map[lineY][lineX+1], lineY, lineX+1 ])
                state.map[lineY][lineX+1] = 9
                break
        }
    } else {
        state.pacMan.withoutPacMan += 1
        if (state.pacMan.withoutPacMan >= 10) {
            state.pacMan.withoutPacMan = 0
            state.map[16][10] = 9
        }
    }
}