module.exports = async (state) => {
    state.sounds = [
        'coin',
        'death',
        'deathGhost',
        'music1',
        'music2',
        'musicSpecial',
    ]

    return state.sounds.length
}