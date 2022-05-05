module.exports = async (canvas, game, Listener) => {
    const ctx = canvas.getContext('2d')

    let tileSize = 55    

    ctx.font = 'bold 150px pacfont'
    ctx.fillStyle = game.state.rainbowMode ? `hsl(${game.state.rainbowColor}, 100%, 40%)` : 'rgb(255, 202, 24)'
    ctx.fillText('pac man', canvas.width/2-(ctx.measureText('pac man').width/2), 150);

    ctx.fillStyle = 'black'
    ctx.fillText('PAC MAN', canvas.width/2-(ctx.measureText('PAC MAN').width/2), 150);

    ctx.font = 'bold 50px game'
    ctx.fillStyle = game.state.rainbowMode ? `hsl(${game.state.rainbowColor}, 100%, 40%)` : game.state.darkTheme ? 'white' : 'black'
    ctx.fillText('START GAME', canvas.width/2-(ctx.measureText('START GAME').width/2), canvas.height/1.5);

    let pacManImageStage = 'closed'
    if (game.state.animations.pacMan.dalay <= +new Date()) {
        pacManImageStage = 'semiOpen'
        if (game.state.animations.pacMan.dalay+game.state.animations.pacMan.totalDalay/2 <= +new Date()) pacManImageStage = 'open'
        if (game.state.animations.pacMan.dalay+game.state.animations.pacMan.totalDalay <= +new Date()) game.state.animations.pacMan.dalay = +new Date()+game.state.animations.pacMan.totalDalay
    }
    let pacManImage = game.state.images[`pac-man-${pacManImageStage}`]

    let menuAnimationX = game.state.animations.menuAnimation.menuAnimationX-(tileSize*2)
    let ghostsAnimation = game.state.animations.menuGhosts.ghostsAnimation

    ctx.fillStyle = 'rgb(255, 202, 24)'
    if (game.state.lowMode) ctx.fillRect(menuAnimationX, game.state.gameGlitched ? canvas.height*Math.random()*0.1+canvas.height/3 : canvas.height/2.5, tileSize, tileSize);
    else if (pacManImage) ctx.drawImage(pacManImage, menuAnimationX, game.state.gameGlitched ? canvas.height*Math.random()*0.1+canvas.height/3 : canvas.height/2.5, tileSize, tileSize);
    menuAnimationX -= tileSize*2-tileSize/2

    for (let ghost of game.state.ghosts) {
        let ghostImage = game.state.images[`ghosts/${ghost.color}/ghost-right-${ghost.activeAnimation ? ghostsAnimation ? 1 : 2 : 1}`]
        if (ghost.scared) ghostImage = game.state.images[`ghosts/${ghost.color}/scared/scared-ghost-1`]

        ctx.fillStyle = 'purple'
        ctx.fillStyle = ghost.color
        if (game.state.lowMode) ctx.fillRect(menuAnimationX, game.state.gameGlitched ? canvas.height*Math.random()*0.1+canvas.height/3 : canvas.height/2.5, tileSize, tileSize)
        else if (ghostImage) ctx.drawImage(ghostImage, menuAnimationX, game.state.gameGlitched ? canvas.height*Math.random()*0.1+canvas.height/3 : canvas.height/2.5, tileSize, tileSize);
        menuAnimationX -= game.state.gameGlitched ? tileSize*Math.random()*2 : tileSize
    }

    if (game.state.animations.menuGhosts.dalay <= +new Date()) {
        game.state.animations.menuGhosts.ghostsAnimation = ghostsAnimation ? false : true
        game.state.animations.menuGhosts.dalay = +new Date()+game.state.animations.menuGhosts.totalDalay
    }

    if (game.state.animations.menuAnimation.dalay <= +new Date()) {
        if (menuAnimationX >= canvas.width) game.state.animations.menuAnimation.menuAnimationX = 0
        else game.state.animations.menuAnimation.menuAnimationX += tileSize/5
        game.state.animations.menuAnimation.dalay = +new Date()+game.state.animations.menuAnimation.totalDalay
    }
}