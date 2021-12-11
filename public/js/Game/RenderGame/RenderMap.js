module.exports = async (canvas, game, Listener) => {
    const ctx = canvas.getContext('2d')

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
                ctx.fillStyle = '#ffb897'

                ctx.beginPath();
                ctx.arc(x+(tileSize/2), y+(tileSize/2), 5, 0, 2 * Math.PI)
                ctx.fill();
                ctx.stroke();
            }
            if (column == 1) {
                let wallLineSize = 6
                if (game.state.gameStage == 'levelWon') {
                    if (game.state.animations.walls.dalay <= +new Date()) {
                        ctx.fillStyle = 'white'
                        if (game.state.animations.walls.dalay+game.state.animations.walls.totalDalay <= +new Date()) game.state.animations.walls.dalay = +new Date()+game.state.animations.walls.totalDalay
                    } else ctx.fillStyle = '#141484'
                }else ctx.fillStyle = '#141484'

                if (map[lineY][lineX-1] != 1) ctx.fillRect(x, y, wallLineSize, tileSize)
                if (map[lineY][lineX+1] != 1) ctx.fillRect(x+tileSize-wallLineSize, y, wallLineSize, tileSize)
                if (!map[lineY-1] || map[lineY-1][lineX] != 1) ctx.fillRect(x, y, tileSize, wallLineSize)
                if (!map[lineY+1] || map[lineY+1][lineX] != 1) ctx.fillRect(x, y+tileSize-wallLineSize, tileSize, wallLineSize)
            }
            if (column == 2) {
                if (game.state.animations.specialDots.dalay <= +new Date()) {
                    ctx.fillStyle = 'black'
                    if (game.state.animations.specialDots.dalay+game.state.animations.specialDots.totalDalay <= +new Date()) game.state.animations.specialDots.dalay = +new Date()+game.state.animations.specialDots.totalDalay
                } else ctx.fillStyle = '#ffb897'

                ctx.beginPath();
                ctx.arc(x+(tileSize/2), y+(tileSize/2), 15, 0, 2 * Math.PI)
                ctx.fill();
                ctx.stroke();
            }
            if (column == 3) {
                ctx.fillStyle = 'transparent'
                ctx.fillRect(x, y, tileSize, tileSize)
            }
            if (column >= 5 && column <= 8) {
                let ghost = game.state.ghosts.find(g => g.id == column)
                let ghostImage = new Image();
                if (!ghost.scared) ghostImage.src = `/images/ghosts/${ghost.color}/ghost-${ghost.animDirection}-${ghost.animation ? 1 : 2}.png`;
                else ghostImage.src = `/images/ghosts/scared-ghost-${game.state.pacManKills-1500 <= +new Date() ? ghost.animation ? 1 : 2 : 1}.png`;
                let ghostY = y
                let ghostX = x

                switch(ghost.animDirection) {
                    case 'up':
                        if (ghost.dalay > 0) {
                            ghostY += ghost.dalay
                            ghost.dalay -= tileSize/game.state.ghostsSettings.ghostsSpeed*tileSize/2
                        }
                        break
                    case 'down':
                        if (ghost.dalay > 0) {
                            ghostY -= ghost.dalay
                            ghost.dalay -= tileSize/game.state.ghostsSettings.ghostsSpeed*tileSize/2
                        }
                        break
                    case 'left':
                        if (ghost.dalay > 0) {
                            ghostX += ghost.dalay
                            ghost.dalay -= tileSize/game.state.ghostsSettings.ghostsSpeed*tileSize/2
                        }
                        break
                    case 'right':
                        if (ghost.dalay > 0) {
                            ghostX -= ghost.dalay
                            ghost.dalay -= tileSize/game.state.ghostsSettings.ghostsSpeed*tileSize/2
                        }
                        break
                }

                ctx.drawImage(ghostImage, ghostX, ghostY, tileSize, tileSize);
            }
            if (column == 9) {
                let pacManImage = new Image();
                let pacManImageStage = 'closed'
                if (game.state.animations.pacMan.dalay <= +new Date() && game.state.pacMan.animate && !game.state.pauseMovement) {
                    pacManImageStage = 'semiOpen'
                    if (game.state.animations.pacMan.dalay+game.state.animations.pacMan.totalDalay/2 <= +new Date()) pacManImageStage = 'open'
                    if (game.state.animations.pacMan.dalay+game.state.animations.pacMan.totalDalay <= +new Date()) game.state.animations.pacMan.dalay = +new Date()+game.state.animations.pacMan.totalDalay
                }
                pacManImage.src = `/images/pac-man-${pacManImageStage}.png`;
                let rotate = 0
                let pacManTraceX = x
                let pacManTraceY = y
                let pacManX = x
                let pacManY = y

                switch(game.state.pacMan.animDirection) {
                    case 'up':
                        rotate = -90
                        if (game.state.pacMan.dalay > 0) {
                            pacManY += game.state.pacMan.dalay
                            pacManTraceY = pacManY+15
                            game.state.pacMan.dalay -= tileSize/game.state.pacMan.pacManSpeed*tileSize/2
                        }
                        break
                    case 'down':
                        rotate = 90
                        if (game.state.pacMan.dalay > 0) {
                            pacManY -= game.state.pacMan.dalay
                            pacManTraceY = pacManY-20
                            game.state.pacMan.dalay -= tileSize/game.state.pacMan.pacManSpeed*tileSize/2
                        }
                        break
                    case 'left':
                        rotate = 180
                        if (game.state.pacMan.dalay > 0) {
                            pacManX += game.state.pacMan.dalay
                            pacManTraceX = pacManX+15
                            game.state.pacMan.dalay -= tileSize/game.state.pacMan.pacManSpeed*tileSize/2
                        }
                        break
                    case 'right':
                        rotate = 0
                        if (game.state.pacMan.dalay > 0) {
                            pacManX -= game.state.pacMan.dalay
                            pacManTraceX = pacManX-15
                            game.state.pacMan.dalay -= tileSize/game.state.pacMan.pacManSpeed*tileSize/2
                        }
                        break
                }

                ctx.save()

                ctx.globalAlpha = 0.25
                ctx.setTransform(1, 0, 0, 1, pacManTraceX+(tileSize/2), pacManTraceY+(tileSize/2));
                ctx.rotate(rotate*Math.PI/180);
                if (game.state.pacManKills) ctx.drawImage(pacManImage, -tileSize/2, -tileSize/2, tileSize, tileSize);

                ctx.globalAlpha = 1

                ctx.setTransform(1, 0, 0, 1, pacManX+(tileSize/2), pacManY+(tileSize/2));
                ctx.rotate(rotate*Math.PI/180);
                ctx.drawImage(pacManImage, -tileSize/2, -tileSize/2, tileSize, tileSize);

                ctx.restore()
            }            

            if (game.state.morePoints.points && game.state.morePoints.lineX == lineX && game.state.morePoints.lineY == lineY) {
                ctx.fillStyle = 'cyan'
                ctx.font = 'bold 30px Arial'
                ctx.fillText(game.state.morePoints.points, x+(tileSize/2)-(ctx.measureText(game.state.morePoints.points).width/2), y+35);
                if (game.state.morePoints.time <= +new Date()) game.state.morePoints.points = 0
            }

            x += tileSize
        }
        y += tileSize
        x = 0
    }
}