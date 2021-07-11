import React, { useEffect, useRef, useState } from 'react';
import useResizeObserver from '../hooks/useResizeObserver';
import * as d3 from 'd3';
import { generateBg, getXScale, generatePieces } from './Game.utils';
import styles from './Game.module.css'
import { Pieces } from '../Pieces'

const Game = ({chess, setChess}) => {
    const svgRef = useRef()
    const svgContainerRef = useRef()
    const dimensions = useResizeObserver(svgContainerRef);
    const [pieces, setPieces] = useState(new Pieces())

    useEffect(() => {
        if (!dimensions || !chess) return;
        const margin = {
            top: dimensions.height * 0.015,
            left:  dimensions.width * 0.015,
            right:  dimensions.width * 0.015,
            bottom:  dimensions.height * 0.015
        }
        const svg = d3.select(svgRef.current)
        const xScale = getXScale(dimensions, margin);
        generateBg(svg, xScale);
        generatePieces(svg, xScale, chess.board(), pieces)
    }, [dimensions, pieces, chess])

    return (
        <div ref={svgContainerRef} className={styles.svgContainer}>
            <svg width="100%" height="100%" ref={svgRef}></svg>
        </div>
    )
}

export default Game;
