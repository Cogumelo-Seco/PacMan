module.exports = async (canvas, game, Listener) => {
    const ctx = canvas.getContext('2d')

    ctx.font = 'bold 30px game'
    ctx.fillStyle = 'white'
    ctx.globalAlpha = 0.2
    ctx.fillText(game.state.loading.msg, canvas.width-(ctx.measureText(game.state.loading.msg).width)-10, canvas.height-10);

    ctx.globalAlpha = 1
    ctx.lineWidth = 5;

    ctx.fillStyle = 'yellow'
    ctx.strokeStyle = 'rgb(127, 127, 127)';

    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, game.state.loading.loaded/game.state.loading.total*200, 0,  2 * Math.PI)
    ctx.fill();

    ctx.beginPath();    
    ctx.arc(canvas.width/2, canvas.height/2, 200+(ctx.lineWidth/2), 0, 2 * Math.PI);
    ctx.stroke();

    ctx.font = 'bold 100px game'
    ctx.fillStyle = 'rgb(127, 127, 127)'
    ctx.fillText(`${Number.parseInt(game.state.loading.loaded/game.state.loading.total*100)}%`, canvas.width/2-(ctx.measureText(`${Number.parseInt(game.state.loading.loaded/game.state.loading.total*100)}%`).width/2), canvas.height/2+25);
}