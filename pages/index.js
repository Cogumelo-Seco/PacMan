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

        setTimeout(() => {
            game.state.song = new Audio('/songs/music1.mp3');
            game.state.song.play()

            setTimeout(() => game.start({
                Listener,
            }), 4500)
        }, 3000)

        renderGame(canvas, game, Listener);
    }, [])

    return (
        <html lang="pt-BR">
            <Head>
                <title>Game</title>

                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                
                <link rel="stylesheet" href="/css/game/animations.css" />
                <link rel="stylesheet" href="/css/game/game.css" />
                <link rel="stylesheet" href="/css/game/resizable.css" />
            </Head>
            <body>

                <section>
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