import React, { useEffect, useRef } from 'react';
import useResizeObserver from '../hooks/useResizeObserver';
import * as d3 from 'd3';
import { generateBg, getXScale } from './Game.utils';
import styles from './Game.module.css'

const Game = ({chess, setChess}) => {
    const svgRef = useRef()
    const svgContainerRef = useRef()
    const dimensions = useResizeObserver(svgContainerRef);
    const margin = {
        top: dimensions.height * 0.015,
        left:  dimensions.width * 0.015,
        right:  dimensions.width * 0.015,
        bottom:  dimensions.height * 0.015
    }

    useEffect(() => {
        if (!dimensions) return;
        
        const svg = d3.select(svgRef.current)
        const xScale = getXScale(dimensions, margin);
        dimensions && generateBg(svg, xScale);
    }, [dimensions])

    return (
        <div ref={svgContainerRef} className={styles.svgContainer}>
            <svg width="100%" height="100%" ref={svgRef}></svg>
        </div>
    )
}

export default Game;
