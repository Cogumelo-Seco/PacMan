export default async (canvas, game, Listener) => {
    const ctx = canvas.getContext('2d')

    if (game.state.gameStage == 'initial') {
        ctx.fillStyle = 'rgb(255, 202, 24)'
        ctx.font = `bold ${game.state.gameGlitched ? Math.floor(Math.random()*40+10) : 35}px game`
        ctx.fillText('READY!', canvas.width/2-(ctx.measureText('READY!').width/2), canvas.height/1.725);
    }

    if (game.state.gameStage == 'gameOver') {
        ctx.fillStyle = 'red'
        ctx.font = `bold ${game.state.gameGlitched ? Math.floor(Math.random()*40+10) : 35}px game`
        ctx.fillText('GAME OVER', canvas.width/2-(ctx.measureText('GAME OVER').width/2), canvas.height/1.725);
    }

    if (game.state.gameStage == 'pause') {
        ctx.fillStyle = game.state.darkTheme ? 'white' : 'black'
        ctx.font = `bold ${game.state.gameGlitched ? Math.floor(Math.random()*40+10) : 35}px game`
        ctx.fillText('PAUSE', canvas.width/2-(ctx.measureText('PAUSE').width/2), canvas.height/1.725);
    }
}