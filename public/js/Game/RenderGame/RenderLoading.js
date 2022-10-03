export default async (canvas, game, Listener) => {
    const ctx = canvas.getContext('2d')

    const percent = game.state.loading.loaded/game.state.loading.total

    ctx.font = 'bold 30px game'
    ctx.fillStyle = 'white'
    ctx.globalAlpha = 0.2
    ctx.fillText(game.state.loading.msg, canvas.width-(ctx.measureText(game.state.loading.msg).width)-10, canvas.height-10);

    ctx.lineWidth = 30;
    ctx.globalAlpha = 1

    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, 200, 0.2*Math.PI, (1.8*Math.PI)*percent+(0.2*Math.PI*(1-percent)));
    ctx.lineTo(canvas.width/2, canvas.height/2);
    ctx.closePath();

    ctx.fillStyle = 'rgb(255, 202, 24)';
    ctx.fill();

    ctx.font = 'bold 50px game'
    ctx.fillStyle = 'white'
    ctx.fillText(`${Number.parseInt(percent*100)}%`, canvas.width/2-(ctx.measureText(`${Number.parseInt(percent*100)}%`).width/2)+(200/2), canvas.height/2+12.5);
}