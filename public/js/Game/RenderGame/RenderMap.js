module.exports = async (canvas, game, Listener, glitchedColor) => {
    const ctx = canvas.getContext('2d')

    let glitchedPercent = Math.floor(Math.random()*100)
    let ghostsIds = game.state.ghosts.map(g => g.id)
    let tileSize = game.state.canvas.tileSize
    let map = game.state.map
    let x = 0
    let y = 0
    
    for (let lineY in map) {
        for (let lineX in map[lineY]) {
            let column = map[lineY][lineX]
            lineY = Number(lineY)
            lineX = Number(lineX)
            if (column == 0) {
                ctx.fillStyle = game.state.gameGlitched ? glitchedColor() : '#ffb897'

                ctx.beginPath();
                ctx.arc(x+(tileSize/2), y+(tileSize/2), game.state.gameGlitched ? Math.floor(Math.random()*6) : 5, 0, 2 * Math.PI)
                ctx.fill();
            } else if (column == 1) {
                let wallLineSize = game.state.gameGlitched ? Math.floor(Math.random()*10) : 6
                let wallColor = game.state.gameGlitched && glitchedPercent > 80 ? glitchedColor() : '#141484'

                if (game.state.gameStage == 'levelWon') {
                    if (game.state.animations.walls.dalay <= +new Date()) {
                        ctx.fillStyle = 'white'
                        if (game.state.animations.walls.dalay+game.state.animations.walls.totalDalay <= +new Date()) game.state.animations.walls.dalay = +new Date()+game.state.animations.walls.totalDalay
                    } else ctx.fillStyle = wallColor
                } else ctx.fillStyle = wallColor

                if (map[lineY][lineX-1] != 1) ctx.fillRect(x, y, wallLineSize, tileSize)
                if (map[lineY][lineX+1] != 1) ctx.fillRect(x+tileSize-wallLineSize, y, wallLineSize, tileSize)
                if (!map[lineY-1] || map[lineY-1][lineX] != 1) ctx.fillRect(x, y, tileSize, wallLineSize)
                if (!map[lineY+1] || map[lineY+1][lineX] != 1) ctx.fillRect(x, y+tileSize-wallLineSize, tileSize, wallLineSize)
            } else if (column == 2) {
                if (game.state.animations.specialDots.dalay <= +new Date() && game.state.gameStage != 'pause') {
                    ctx.fillStyle = 'transparent'
                    if (game.state.animations.specialDots.dalay+game.state.animations.specialDots.totalDalay <= +new Date()) game.state.animations.specialDots.dalay = +new Date()+game.state.animations.specialDots.totalDalay
                } else ctx.fillStyle = game.state.gameGlitched ? glitchedColor() : '#ffb897'

                ctx.beginPath();
                ctx.arc(x+(tileSize/2), y+(tileSize/2), game.state.gameGlitched ? Math.floor(Math.random()*10+5) : 15, 0, 2 * Math.PI)
                ctx.fill();
            } else if (column == 3) {
                ctx.fillStyle = 'transparent'
                ctx.fillRect(x, y, tileSize, tileSize)
            } else if (ghostsIds.includes(column)) {
                let ghost = game.state.ghosts.find(g => g.id == column)

                let ghostImage = ghost.images[ghost.color+ghost.animDirection+(ghost.activeAnimation ? ghost.animation ? 2 : 1 : 1)]
                if (ghost.scared) ghostImage = ghost.images[ghost.color+(game.state.pacManKills-1800 <= +new Date() ? ghost.animation ? 1 : 2 : 1)]

                if (!ghostImage) {
                    if (ghost.scared) {
                        ghostImage = new Image();
                        ghostImage.src = `/images/ghosts/${ghost.color}/scared/scared-ghost-${game.state.pacManKills-1800 <= +new Date() ? ghost.animation ? 1 : 2 : 1}.png`;
                        ghost.images[ghost.color+(game.state.pacManKills-1800 <= +new Date() ? ghost.animation ? 1 : 2 : 1)] = ghostImage
                    } else {
                        ghostImage = new Image();
                        ghostImage.src = `/images/ghosts/${ghost.color}/ghost-${ghost.animDirection}-${ghost.activeAnimation ? ghost.animation ? 2 : 1 : 1}.png`;
                        ghost.images[ghost.color+ghost.animDirection+(ghost.activeAnimation ? ghost.animation ? 2 : 1 : 1)] = ghostImage
                    }
                }

                let ghostY = y
                let ghostX = x

                switch(ghost.animDirection) {
                    case 'up':
                        if (ghost.dalay > 0) ghostY += ghost.dalay
                        break
                    case 'down':
                        if (ghost.dalay > 0) ghostY -= ghost.dalay
                        break
                    case 'left':
                        if (ghost.dalay > 0) ghostX += ghost.dalay
                        break
                    case 'right':
                        if (ghost.dalay > 0) ghostX -= ghost.dalay
                        break
                }

                if (game.state.gameGlitched) {
                    ghostY += Math.floor(Math.random()*10)
                    ghostY -= Math.floor(Math.random()*10)
                    ghostX += Math.floor(Math.random()*10)
                    ghostX -= Math.floor(Math.random()*10)
                }

                ctx.drawImage(ghostImage, ghostX, ghostY, tileSize, tileSize);
            } else if (column == 9) {
                let pacManImage = new Image();
                let pacManImageStage = 'closed'
                if (game.state.animations.pacMan.dalay <= +new Date() && game.state.pacMan.animate && !game.state.pauseMovement && game.state.gameStage != 'pause') {
                    pacManImageStage = 'semiOpen'
                    if (game.state.animations.pacMan.dalay+game.state.animations.pacMan.totalDalay/2 <= +new Date()) pacManImageStage = 'open'
                    if (game.state.animations.pacMan.dalay+game.state.animations.pacMan.totalDalay <= +new Date()) game.state.animations.pacMan.dalay = +new Date()+game.state.animations.pacMan.totalDalay
                }
                pacManImage.src = `/images/pac-man-${pacManImageStage}.png`;
                let rotate = 0
                let pacManX = x
                let pacManY = y

                switch(game.state.pacMan.animDirection) {
                    case 'up':
                        rotate = -90
                        if (game.state.pacMan.dalay > 0) pacManY += game.state.pacMan.dalay
                        break
                    case 'down':
                        rotate = 90
                        if (game.state.pacMan.dalay > 0) pacManY -= game.state.pacMan.dalay
                        break
                    case 'left':
                        rotate = 180
                        if (game.state.pacMan.dalay > 0) pacManX += game.state.pacMan.dalay
                        break
                    case 'right':
                        rotate = 0
                        if (game.state.pacMan.dalay > 0) pacManX -= game.state.pacMan.dalay
                        break
                }

                if (game.state.gameGlitched) {
                    rotate = Math.floor(Math.random()*360)
                    pacManY += Math.floor(Math.random()*10)
                    pacManY -= Math.floor(Math.random()*10)
                    pacManX += Math.floor(Math.random()*10)
                    pacManX -= Math.floor(Math.random()*10)
                }

                ctx.save()

                ctx.setTransform(1, 0, 0, 1, pacManX+(tileSize/2), pacManY+(tileSize/2));
                ctx.rotate(rotate*Math.PI/180);
                ctx.drawImage(pacManImage, -tileSize/2, -tileSize/2, tileSize, tileSize);

                ctx.restore()
            } else {
                let glitchImage = game.state.images.glitchImage
                if (!glitchImage) {
                    glitchImage = new Image()
                    glitchImage.src = '/images/glitch.png'
                    game.state.images.glitchImage = glitchImage
                }
                let glitchX = x
                let glitchY = y

                glitchY += Math.floor(Math.random()*(tileSize*2/2))
                glitchY -= Math.floor(Math.random()*(tileSize*2/2))
                glitchX += Math.floor(Math.random()*(tileSize*2/2))
                glitchX -= Math.floor(Math.random()*(tileSize*2/2))

                ctx.drawImage(glitchImage, glitchX, glitchY, tileSize*(Math.random()+0.8), tileSize*(Math.random()+0.8));
            }

            if (game.state.morePoints.points && game.state.morePoints.lineX == lineX && game.state.morePoints.lineY == lineY) {
                ctx.fillStyle = 'cyan'
                ctx.font = 'bold 30px game'
                ctx.fillText(game.state.morePoints.points, x+(tileSize/2)-(ctx.measureText(game.state.morePoints.points).width/2), y+35);
                if (game.state.morePoints.time <= +new Date()) game.state.morePoints.points = 0
            }

            x += tileSize
        }
        y += tileSize
        x = 0
    }
}