module.exports = async (canvas, game, Listener) => {
    const ctx = canvas.getContext('2d')

    let tileSize = 55
    ctx.fillStyle = 'white'

    ctx.font = 'bold 150px pacfont'
    ctx.fillText('PAC MAN', canvas.width/2-(ctx.measureText('PAC MAN').width/2), 150);

    ctx.font = 'bold 50px game'
    ctx.fillText('START GAME', canvas.width/2-(ctx.measureText('START GAME').width/2), canvas.height/1.5);


    let pacManImage = new Image();
    let pacManImageStage = 'closed'
    if (game.state.animations.pacMan.dalay <= +new Date()) {
        pacManImageStage = 'semiOpen'
        if (game.state.animations.pacMan.dalay+game.state.animations.pacMan.totalDalay/2 <= +new Date()) pacManImageStage = 'open'
        if (game.state.animations.pacMan.dalay+game.state.animations.pacMan.totalDalay <= +new Date()) game.state.animations.pacMan.dalay = +new Date()+game.state.animations.pacMan.totalDalay
    }
    pacManImage.src = `/images/pac-man-${pacManImageStage}.png`;

    let menuAnimationX = game.state.animations.menuAnimation.menuAnimationX-(tileSize*2)
    let ghostsAnimation = game.state.animations.menuGhosts.ghostsAnimation

    ctx.fillStyle = '#ffb897'

    ctx.drawImage(pacManImage, menuAnimationX, canvas.height/2.5, tileSize, tileSize);
    menuAnimationX -= tileSize*2-tileSize/2

    for (let ghost of game.state.ghosts) {
        let ghostImage = new Image();
        ghostImage.src = `/images/ghosts/${ghost.color}/ghost-right-${ghostsAnimation ? 1 : 2}.png`
        ctx.drawImage(ghostImage, menuAnimationX, canvas.height/2.5, tileSize, tileSize);
        menuAnimationX -= tileSize
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