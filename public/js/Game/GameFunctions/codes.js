module.exports = (state) => {
    return {
        sapo: function () {
            if (!state.ghosts.find(g => g.color == 'frog')) state.ghosts.push({
                color: 'frog',
                animDirection: 'up',
                activeAnimation: false,
                placeOfDeath: {
                    x: 0,
                    y: 0
                },
                images: {},
                defaultSpeed: 170,
                speed: 170,
                speedCounter: 0,
                death: false,
                locked: 0,
                oldMap: 3,
                dalay: 0,
                id: 13
            })
            else return false 
            return true
        }
    }
}