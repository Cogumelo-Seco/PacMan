module.exports = function renderGame(canvas, game, Listener) {
    canvas.width = game.state.canvas.width
    canvas.height = game.state.canvas.height

    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    /*let backgroundImage = new Image();
    backgroundImage.src = '/images/background.png';
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);*/

    require('./RenderMap')(canvas, game, Listener)
    require('./RenderGhostDeath')(canvas, game, Listener)
    require('./RenderTexts')(canvas, game, Listener)
    require('./RenderHUD')(canvas, game, Listener)

    let rAF = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.requestAnimationFrame;

    rAF(() => {
        renderGame(canvas, game, Listener)
    })
}