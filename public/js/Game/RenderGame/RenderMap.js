export default async (canvas, game, Listener, randomColor) => {
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
            switch (column) {
                case 0:
                    ctx.fillStyle = game.state.gameGlitched || game.state.rainbowMode ? randomColor() : game.state.darkTheme ? '#ffb897' : 'rgb(50, 50, 50)'

                    if (game.state.lowMode) ctx.fillRect(x+(tileSize*0.37), y+(tileSize*0.37), tileSize*0.25, tileSize*0.25)
                    else {
                        ctx.beginPath();
                        ctx.arc(x+(tileSize/2), y+(tileSize/2), game.state.gameGlitched ? Math.floor(Math.random()*6) : 5, 0, 2 * Math.PI)
                        ctx.fill();
                    }
                    break
                case 1:
                    let wallLineSize = game.state.gameGlitched ? Math.floor(Math.random()*10) : 6
                    let wallColor = game.state.gameGlitched && glitchedPercent > 80 ? randomColor() : game.state.rainbowMode ? `hsl(${game.state.rainbowColor}, 100%, 40%)` : '#141484'

                    if (game.state.gameStage == 'levelWon') {
                        if (game.state.animations.walls.dalay <= +new Date()) {
                            ctx.fillStyle = game.state.darkTheme ? 'white' : 'black'
                            if (game.state.animations.walls.dalay+game.state.animations.walls.totalDalay <= +new Date()) game.state.animations.walls.dalay = +new Date()+game.state.animations.walls.totalDalay
                        } else ctx.fillStyle = wallColor
                    } else ctx.fillStyle = wallColor

                    if (game.state.lowMode) ctx.fillRect(x, y, tileSize, tileSize)
                    else {
                        if (map[lineY][lineX-1] != 1) ctx.fillRect(x, y, wallLineSize, tileSize)
                        if (map[lineY][lineX+1] != 1) ctx.fillRect(x+tileSize-wallLineSize, y, wallLineSize, tileSize)
                        if (!map[lineY-1] || map[lineY-1][lineX] != 1) ctx.fillRect(x, y, tileSize, wallLineSize)
                        if (!map[lineY+1] || map[lineY+1][lineX] != 1) ctx.fillRect(x, y+tileSize-wallLineSize, tileSize, wallLineSize)
                    }
                    break
                case 2:
                    if (game.state.animations.specialDots.dalay <= +new Date() && game.state.gameStage != 'pause') {
                        ctx.fillStyle = 'transparent'
                        if (game.state.animations.specialDots.dalay+game.state.animations.specialDots.totalDalay <= +new Date()) game.state.animations.specialDots.dalay = +new Date()+game.state.animations.specialDots.totalDalay
                    } else ctx.fillStyle = game.state.gameGlitched || game.state.rainbowMode ? randomColor() : game.state.darkTheme ? '#ffb897' : 'rgb(50, 50, 50)'

                    if (game.state.lowMode) ctx.fillRect(x+(tileSize*0.25), y+(tileSize*0.25), tileSize*0.50, tileSize*0.50)
                    else {
                        ctx.beginPath();
                        ctx.arc(x+(tileSize/2), y+(tileSize/2), game.state.gameGlitched ? Math.floor(Math.random()*10+5) : 15, 0, 2 * Math.PI)
                        ctx.fill();
                    }
                    break
                case 3:
                    ctx.fillStyle = 'transparent'
                    ctx.fillRect(x, y, tileSize, tileSize)
                    break
                case 9:
                    let pacManImageStage = 'closed'
                    if (game.state.animations.pacMan.dalay <= +new Date() && game.state.pacMan.animate && !game.state.pauseMovement && game.state.gameStage != 'pause') {
                        pacManImageStage = 'semiOpen'
                        if (game.state.animations.pacMan.dalay+game.state.animations.pacMan.totalDalay/2 <= +new Date()) pacManImageStage = 'open'
                        if (game.state.animations.pacMan.dalay+game.state.animations.pacMan.totalDalay <= +new Date()) game.state.animations.pacMan.dalay = +new Date()+game.state.animations.pacMan.totalDalay
                    }
                    let pacManImage = game.state.images[`PacMan/${game.state.pacManStyle}/${pacManImageStage}.png`]
                    let rotate = false
                    let flipY = false
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
                            flipY = true
                            if (game.state.pacMan.dalay > 0) pacManX += game.state.pacMan.dalay
                            break
                        case 'right':
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

                    ctx.fillStyle = 'yellow'
                    if (game.state.lowMode) ctx.fillRect(x, y, tileSize, tileSize)
                    else {
                        ctx.save()

                        if (flipY && pacManImage) {
                            ctx.scale(-1, 1);
                            ctx.drawImage(pacManImage, (tileSize+pacManX)* -1, pacManY, tileSize, tileSize)
                        } else if (pacManImage) {
                            ctx.setTransform(1, 0, 0, 1, pacManX+(tileSize/2), pacManY+(tileSize/2));
                            ctx.rotate(rotate*Math.PI/180);
                            ctx.drawImage(pacManImage, -tileSize/2, -tileSize/2, tileSize, tileSize);
                        }

                        ctx.restore()
                    }
                    break
                default:
                    if (ghostsIds.includes(column)) {
                        let ghost = game.state.ghosts.find(g => g.id == column)
        
                        let ghostImage = game.state.images[`ghosts/${ghost.color}/ghost-${ghost.animDirection}-${ghost.activeAnimation ? ghost.animation ? 2 : 1 : 1}.png`]
                        if (ghost.scared) ghostImage = game.state.images[`ghosts/${ghost.color}/scared/scared-ghost-${game.state.pacManKills-1800 <= +new Date() ? ghost.animation ? 1 : 2 : 1}.png`]
        
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
        
                        ctx.fillStyle = 'purple'
                        ctx.fillStyle = ghost.scared ? game.state.pacManKills-1800 <= +new Date() ? ghost.animation ? 'blue' : 'cyan' : 'blue' : ghost.color
                        if (game.state.lowMode) ctx.fillRect(x, y, tileSize, tileSize)
                        else if (ghostImage) ctx.drawImage(ghostImage, ghostX, ghostY, tileSize, tileSize);
                    } else {
                        let image = game.state.images[game.state.images[Math.floor(Math.random()*game.state.images.length)]+'.png']

                        ctx.fillStyle = randomColor()
                        ctx.fillRect(x, y, tileSize, tileSize)
                        if (image && !game.state.lowMode) ctx.drawImage(image, x, y, tileSize, tileSize);
                    }
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