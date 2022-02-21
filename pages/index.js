import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Head from "next/head";
import createGame from '../public/js/Game/Game.js';
import createListener from '../public/js/Game/Listener.js';
import renderGame from '../public/js/Game/RenderGame/index.js';

const Game = (props) => {
    const router = useRouter()

    useEffect(() => {
        const canvas = document.getElementById('gameCanvas')        
        const Listener = createListener();
        const game = createGame(Listener);

        game.start({ Listener })

        canvas.addEventListener('click', (a) => {
            if (
                a.layerX > -84 && a.layerX < 84 && a.layerY > 25 && a.layerY < 45 && game.state.gameStage == 'home' && window.innerWidth >= 750 ||
                a.layerX > -50 && a.layerX < 50 && a.layerY > 188 && a.layerY < 200 && game.state.gameStage == 'home' && window.innerWidth <= 750
            ) {
                game.state.gameStage = 'initial'
                game.playSong('music1')

                document.getElementById('score').style.display = 'block'
                document.getElementById('highScoreTitle').style.display = 'block'
                document.getElementById('highScore').style.display = 'block'

                setTimeout(() => game.start({
                    Listener,
                    startGame: true
                }), 4500)
            }
        })

        renderGame(canvas, game, Listener);
    }, [])

    return (
        <html lang="pt-BR">
            <Head>
                <title>Game</title>

                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                
                <link rel="stylesheet" href="/css/game/fonts.css" />
                <link rel="stylesheet" href="/css/game/animations.css" />
                <link rel="stylesheet" href="/css/game/game.css" />
                <link rel="stylesheet" href="/css/game/resizable.css" />
            </Head>
            <body id="body">

                <section id="section">
                    <div id="codeMessage" />
                    <div id="fpsDisplay">?FPS</div>
                    
                    <div id="game">
                        <ul id="gameHUD">
                            <li id="score">0</li>
                            <li id="highScoreTitle">HIGH SCORE</li>
                            <li id="highScore">0</li>
                        </ul>
                        <canvas id="gameCanvas" />
                        <ul id="gameHUD2">
                            <li id="lifes" />
                        </ul>
                    </div>

                    <div id="mobileButtonsContaner">
                        <button className="mobileButtons" id="mobileButtonUp" />
                        <div className="mobileButtonsSeparator" />
                        <button className="mobileButtons" id="mobileButtonLeft" />
                        <button className="mobileButtons" id="mobileButtonDown" />
                        <button className="mobileButtons" id="mobileButtonRight" />
                    </div>
                </section>
                
            </body>
        </html>
    )
}

export async function getStaticProps() {
    return {
        props: {
            
        },
        revalidate: 1800
    }
}

export default Game