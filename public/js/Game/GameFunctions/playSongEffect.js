export default (type, command, state) => {
    if (state.songEffect) state.songEffect.pause()
    state.songEffect = state.sounds[type]
    if (!state.songEffect) return console.log(type)
    state.songEffect.currentTime = 0
    state.songEffect.loop = command?.loop ? true : false
    state.songEffect.volume = Number(command?.volume) || 1
    state.songEffect.play()
}