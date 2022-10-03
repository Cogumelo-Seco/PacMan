export default async (state) => {
    state.sounds = [
        'coin.mp3',
        'death.mp3',
        'deathGhost.mp3',
        'music1.mp3',
        'music2.mp3',
        'musicSpecial.mp3',
    ]

    return state.sounds.length
}