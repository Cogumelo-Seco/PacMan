module.exports = async (canvas, game, Listener) => {
    const ctx = canvas.getContext('2d')

    let tileSize = game.state.canvas.tileSize

    for (let i in game.state.ghosts) {
        let ghost = game.state.ghosts[i]

        if (ghost.death) {
            if (ghost.placeOfDeath.x == 10*tileSize && ghost.placeOfDeath.y == 10*tileSize) {
                ghost.death = false
                if (!game.state.scaredAlways) {
                    ghost.scared = false
                    ghost.speed = ghost.defaultSpeed
                }
                ghost.dalay = 0
            }

            if (ghost.placeOfDeath.x < 10*tileSize) ghost.placeOfDeath.x += tileSize/10
            if (ghost.placeOfDeath.x > 10*tileSize) ghost.placeOfDeath.x -= tileSize/10

            if (ghost.placeOfDeath.y < 10*tileSize) ghost.placeOfDeath.y += tileSize/10
            if (ghost.placeOfDeath.y > 10*tileSize) ghost.placeOfDeath.y -= tileSize/10

            let eyesImage = ghost.images.eyes
            if (!eyesImage) {
                eyesImage = new Image();
                eyesImage.src = `/images/ghosts/${ghost.color}/ghost-eyes.png`;
                ghost.images.eyes = eyesImage
            }
            ctx.drawImage(eyesImage, ghost.placeOfDeath.x, ghost.placeOfDeath.y, tileSize, tileSize);
        }
    }
}