module.exports = async (canvas, game, Listener) => {
    const ctx = canvas.getContext('2d')

    if (game.state.gameStage == 'initial') {
        ctx.fillStyle = 'yellow'
        ctx.font = 'bold 35px game'
        ctx.fillText('READY!', canvas.width/2-(ctx.measureText('READY!').width/2), canvas.height/1.725);
    }

    if (game.state.gameStage == 'gameOver') {
        ctx.fillStyle = 'red'
        ctx.font = 'bold 35px game'
        ctx.fillText('GAME OVER', canvas.width/2-(ctx.measureText('GAME OVER').width/2), canvas.height/1.725);
    }
}