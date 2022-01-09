module.exports = (state, Listener, [ name, id, activeAnimation, speed ]) => {
    state.ghosts.push({
        color: name,
        animDirection: 'up',
        activeAnimation,
        scared: false,
        placeOfDeath: {
            x: 0,
            y: 0
        },
        images: {},
        withoutGhost: 0,
        defaultSpeed: speed,
        speed: speed,
        speedCounter: 0,
        death: false,
        locked: 0,
        oldTile: 3,
        dalay: 0,
        id
    })
}