module.exports = async (canvas, game, Listener,) => {
    const scoreHUD = document.getElementById('score')
    const highScoreHUD = document.getElementById('highScore')
    const highScoreTitle = document.getElementById('highScoreTitle')

    scoreHUD.style.color = game.state.darkTheme ? 'white' : 'black'
    highScoreHUD.style.color = game.state.darkTheme ? 'white' : 'black'
    highScoreTitle.style.color = game.state.darkTheme ? 'white' : 'black'

    scoreHUD.innerText = game.state.score
    highScoreHUD.innerText = game.state.highScore

    const lifesHUD = document.getElementById('lifes')
    lifesHUD.innerHTML = ''

    let pacmanLifeX = 20
    for (let i = 0; i < game.state.lifes; i++) {
        let pacmanLife = new Image()
        pacmanLife.src = '/images/pac-man-open.png'
        pacmanLife.className = 'pacmanLife'        
        pacmanLife.style.left = `${pacmanLifeX}px`
        lifesHUD.appendChild(pacmanLife)
        pacmanLifeX += 25
    }
}