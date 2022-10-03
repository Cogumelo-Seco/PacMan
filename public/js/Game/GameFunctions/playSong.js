export default (type, command, state) => {
    if (state.song) state.song.pause()
    state.song = state.sounds[type]
    if (!state.song) return console.log(type)
    state.song.currentTime = 0
    state.song.loop = command?.loop ? true : false
    state.song.volume = Number(command?.volume) || 1
    state.song.play()
}