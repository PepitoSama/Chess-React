import React, { useEffect, useRef, useState } from 'react';
import useResizeObserver from '../hooks/useResizeObserver';
import * as d3 from 'd3';
import { generateBg, getXScale, generatePiecesWhite, generatePiecesBlack } from './Game.utils';
import styles from './Game.module.css'
import { Pieces } from '../Pieces'

const Game = ({chess, setChess, playAs="white", setMessage}) => {
    const svgRef = useRef()
    const svgContainerRef = useRef()
    const dimensions = useResizeObserver(svgContainerRef);
    const [pieces, setPieces] = useState(new Pieces())
    const [generatedPieces, setGeneratedPieces] = useState(false);
    const [update, setUpdate] = useState(true)

    useEffect(() => {
        if (!dimensions || !chess || !update) return;
        const margin = {
            top: dimensions.height * 0.015,
            left:  dimensions.width * 0.015,
            right:  dimensions.width * 0.015,
            bottom:  dimensions.height * 0.015
        }
        const svg = d3.select(svgRef.current)
        const xScale = getXScale(dimensions, margin);
        svg.attr("width", () => xScale(8) - xScale(0) + margin.left + margin.right)
        svg.attr("height", () => xScale(8) - xScale(0) + margin.bottom  + margin.top)
        generateBg(svg, xScale);
        if(true) {
            playAs === "white"
                ? generatePiecesWhite(svg, xScale, chess, pieces)
                : generatePiecesBlack(svg, xScale, chess, pieces)
            setGeneratedPieces(true);
        }
        if(chess.game_over()) {
            setChess(null);
            setMessage("Game Over !")
        };
        setUpdate(false);
    }, [dimensions, pieces, chess, update, setChess])

    const randomMove = () => {
        const moves = chess.moves()
        const move = moves[Math.floor(Math.random() * moves.length)]
        chess.move(move)
        setUpdate(true);
    }

    return (
        <div ref={svgContainerRef} className={styles.svgContainer}>
            <svg width="100%" height="100%" ref={svgRef}></svg>
            <button onClick={() => randomMove()}>test</button>
        </div>
    )
}

export default Game;
