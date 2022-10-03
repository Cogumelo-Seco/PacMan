export default async (canvas, game, Listener) => {
    const fpsDisplay = document.getElementById('fpsDisplay');
    const fps = Number(game.state.fps.split('-')[0])
    game.state.fps = `${fps + 1}-${game.state.fps.split('-')[1]}`    

    fpsDisplay.style.color = game.state.rainbowMode ? `hsl(${game.state.rainbowColor}, 100%, 50%)` : 'white'
    if (+new Date()-game.state.fps.split('-')[1] > 1000) {
        fpsDisplay.innerText = `${fps}FPS`        
        game.state.fps = `0-${+new Date()}`
    }

    const owner = document.getElementById('owner')
    owner.style.color = `hsl(${game.state.rainbowColor}, 100%, 50%)`
}