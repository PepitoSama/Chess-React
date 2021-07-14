import React, { useEffect, useRef, useState } from 'react';
import useResizeObserver from '../hooks/useResizeObserver';
import * as d3 from 'd3';
import { generateBg, getXScale, generatePiecesWhite, generatePiecesBlack, generateMoves, cleanMoves, movePiece } from './Game.utils';
import styles from './Game.module.css'
import { Pieces } from '../Pieces'

const Game = ({chess, setChess, playAs="white", setMessage}) => {
    const svgRef = useRef()
    const svgContainerRef = useRef()
    const dimensions = useResizeObserver(svgContainerRef);
    const [pieces] = useState(new Pieces())
    const [generatedPieces, setGeneratedPieces] = useState(false);
    const [generatedBg, setGeneratedBg] = useState(false);
    const [update, setUpdate] = useState(true)
    const [moves, setMoves] = useState(null);
    const [nextMove, setNextMove] = useState(null);

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

        // Generate board
        if(!generatedBg) {
            generateBg(svg, xScale);
            setGeneratedBg(true);
        }

        // If player requested next move, do it
        if (nextMove) {
            movePiece(svg, xScale, nextMove, chess, setMoves, pieces);
            setMoves(null);
            setNextMove(null)
        } else {
            cleanMoves(svg);
        }

        // Generate all pieces on chess board
        if(!generatedPieces) {
            playAs === "white"
                ? generatePiecesWhite(svg, xScale, chess, pieces, setMoves)
                : generatePiecesBlack(svg, xScale, chess, pieces, setMoves)
            setGeneratedPieces(true);
        }

        // If any moves possible, show them
        moves && generateMoves(svg, xScale, moves, setNextMove);


        // If Game Over, return to menu
        if(chess.game_over()) {
            setChess(null);
            setMessage("Game Over !")
        };
        setUpdate(false);
    })

    useEffect(() => {
        setUpdate(true);
        setGeneratedBg(false);
    }, [dimensions, moves, nextMove])

    const move = (to) => {
        chess.move(to);
        setUpdate(true);
    }

    return (
        <div ref={svgContainerRef} className={styles.svgContainer}>
            <svg width="100%" height="100%" ref={svgRef}></svg>
        </div>
    )
}

export default Game;
