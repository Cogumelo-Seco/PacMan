export default function renderGame(canvas, game, Listener) {
    let glitchedPercent = Math.floor(Math.random()*100)
    canvas.width = game.state.gameGlitched && glitchedPercent > 95 ? game.state.canvas.width*Math.random() : game.state.canvas.width
    canvas.height = game.state.gameGlitched && glitchedPercent > 95  ? game.state.canvas.height*Math.random() : game.state.canvas.height

    const ctx = canvas.getContext('2d')
    const randomColor = () => '#'+Math.floor(Math.random()*16777215).toString(16);

    ctx.fillStyle = game.state.gameGlitched ? randomColor() : game.state.darkTheme ? 'black' : 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    if (game.state.gameGlitched && glitchedPercent < 98) {
        ctx.fillStyle = game.state.darkTheme ? 'black' : 'white'
        ctx.globalAlpha = 0.95
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.globalAlpha = 1
    }

    document.getElementById('game').style.backgroundColor = game.state.darkTheme ? 'black' : 'white'
    document.getElementById('body').style.backgroundColor = game.state.darkTheme ? '#222' : 'rgb(150, 150, 150)'
    document.getElementById('section').style.backgroundColor = game.state.darkTheme ? '#222' : 'rgb(150, 150, 150)'

    switch (game.state.gameStage) {
        case 'home':
            require('./RenderHome').default(canvas, game, Listener)
            break
        case 'loading':
            require('./RenderLoading').default(canvas, game, Listener)
            break
        default:
            require('./RenderMap').default(canvas, game, Listener, randomColor)
            require('./RenderGhostDeath').default(canvas, game, Listener)
            require('./RenderTexts').default(canvas, game, Listener)
            require('./RenderHUD').default(canvas, game, Listener)
            break
    }

    require('./RenderInformationTexts').default(canvas, game, Listener)
    
    setTimeout(() => renderGame(canvas, game, Listener), 0)
}