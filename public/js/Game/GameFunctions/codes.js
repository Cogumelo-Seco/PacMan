module.exports = (state) => {
    return {
        sapo: function () {
            if (!state.ghosts.find(g => g.color == 'frog')) state.ghosts.push({
                color: 'frog',
                animDirection: 'up',
                placeOfDeath: {
                    x: 0,
                    y: 0
                },
                images: {},
                defaultSpeed: 110,
                speed: 110,
                speedCounter: 0,
                death: false,
                locked: 0,
                oldMap: 3,
                dalay: 0,
                id: 13
            })
        }
    }
}