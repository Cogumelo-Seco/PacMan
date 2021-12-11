module.exports = async (canvas, game, Listener,) => {
    const scoreHUD = document.getElementById('score')
    const highScoreHUD = document.getElementById('highScore')

    scoreHUD.innerText = game.state.score
    if (game.state.score >= game.state.highScore) highScoreHUD.innerText = game.state.score

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