import * as d3 from 'd3';

export const generateBg = (svg, xScale) => {
    for(let x = 0; x<8; x++) {
        for(let y = 0; y < 8; y++) {
            svg
                .selectAll(`.cell_${String.fromCharCode(65 + x)}${y}`)
                .data([null])
                .join('rect')
                .attr('class', `cell_${String.fromCharCode(65 + x)}${y}`)
                .attr('x', xScale(x))
                .attr('y', xScale(y))
                .attr('width', xScale(1) - xScale(0))
                .attr('height', xScale(1) - xScale(0))
                .attr('fill', (x+y%2)%2 === 0 ? 'white' : 'black');
        }
    }
}

export const getXScale = (dimensions, margin) => {
    const width = dimensions.width - (margin.right + margin.left) > dimensions.height - (margin.top + margin.bottom)
        ? dimensions.height - (margin.top + margin.bottom)
        : dimensions.width - (margin.right + margin.left);
    return d3.scaleLinear().domain([0, 8]).range([0 + margin.left, width - margin.right])
}

export const generateMoves = (svg, xScale, moves, setNextMove) => {
    cleanMoves(svg);
    for(let y = 0; y<8; y++) {
        for(let x = 0; x < 8; x++) {
            let currentMove = moves.find(move => move.to === `${String.fromCharCode(97 + x)}${8-y}`);
            currentMove && svg
                .selectAll(`.move_${String.fromCharCode(97 + x)}${8-y}`)
                .data([null])
                .join('rect')
                .attr('class', `move_${String.fromCharCode(97 + x)}${8-y}`)
                .attr('x', xScale(x))
                .attr('y', xScale(y))
                .attr('width', xScale(1) - xScale(0))
                .attr('height', xScale(1) - xScale(0))
                .attr('fill', 'rgba(86, 108, 143, 0.3)')
                .attr('style', (x+y%2)%2 === 0 ? 'filter: drop-shadow(0px 0px 3px black);' :'filter: drop-shadow(0px 0px 3px white);')
                .on('click', () => setNextMove(currentMove))
            currentMove && svg
                .selectAll(`.moveCircle_${String.fromCharCode(97 + x)}${8-y}`)
                .data([null])
                .join('circle')
                .attr('class', `moveCircle_${String.fromCharCode(97 + x)}${8-y}`)
                .attr('cx', xScale(x + 0.5))
                .attr('cy', xScale(y + 0.5))
                .attr('r', (xScale(1) - xScale(0))/12)
                .attr('fill', (x+y%2)%2 === 0 ? 'black' : 'white')
                .on('click', () => setNextMove(currentMove))
        }
    }
}

export const cleanMoves = (svg) => {
    svg
        .selectAll(`[class*="move"] `)
        .remove()
}

export const cleanPieces = (svg, selector='[class*="piece_"]') => {
    svg
        .selectAll(`[class*="piece_"]`)
        .remove()
}

export const generatePiecesWhite = (svg, xScale, chess, pieces, setMoves, setNextMove) => {
    cleanPieces(svg);
    for(let y = 0; y<8; y++) {
        for(let x = 0; x < 8; x++) {
            const currentPiece = chess.board()[y][x]
            currentPiece && svg
                .selectAll(`.piece_${currentPiece.type}${currentPiece.color}_${String.fromCharCode(97 + x)}${8-y}`)
                .data([null])
                .join('image')
                .attr('class', `piece_${currentPiece.type}${currentPiece.color}_${String.fromCharCode(97 + x)}${8-y}`)
                .attr('x', xScale(x))
                .attr('y', xScale(y))
                .attr('width', xScale(1) - xScale(0))
                .attr('height', xScale(1) - xScale(0))
                .attr('style', (x+y%2)%2 === 0 ? 'filter: drop-shadow(0px 0px 3px black);' :'filter: drop-shadow(0px 0px 3px white);')
                .attr("xlink:href", () => {
                    return pieces.getPiece(chess.board()[y][x])
                })
                .on('mousedown', () => {
                    setMoves(chess.moves({ verbose: true, square: `${String.fromCharCode(97 + x)}${8-y}` }));
                    console.log(`${String.fromCharCode(97 + x)}${8-y}`, chess.moves({ verbose: true, square: `${String.fromCharCode(97 + x)}${8-y}` }));
                })
        }
    }
}

export const generatePiecesBlack= (svg, xScale, chess, pieces, playAs) => {
    for(let y = 0; y<8; y++) {
        for(let x = 0; x < 8; x++) {
            svg
                .selectAll(`.piece_${String.fromCharCode(97 + x)}${y+1}`)
                .data([null])
                .join('image')
                .attr('class', `piece_${String.fromCharCode(97 + x)}${y+1}`)
                .attr('x', xScale(7-x))
                .attr('y', xScale(7-y))
                .attr('width', xScale(1) - xScale(0))
                .attr('height', xScale(1) - xScale(0))
                .attr('style', (x+y%2)%2 === 0 ? 'filter: drop-shadow(0px 0px 3px black);' :'filter: drop-shadow(0px 0px 3px white);')
                .attr("xlink:href", () => {
                    return pieces.getPiece(chess.board()[y][x])
                })
                .on('click', () => {
                    // console.log(`${String.fromCharCode(97 + x)}${8-y}`, chess.moves({ verbose: true, square: `${String.fromCharCode(97 + x)}${8-y}` }));
                })
        }
    }
}

export const movePiece = (svg, xScale, move, chess, setMoves, pieces) => {
    chess.move(move)
    const x = move.to.charCodeAt(0) - 97;
    const y = 8 - move.to.charAt(1);
    
    if (move.san.includes('x')) {
        svg
            .selectAll(`[class*=${move.to}]`)
            .remove()
    }

    svg
        .selectAll(`.piece_${move.piece}${move.color}_${move.from}`)
        .on('mousedown', () => {
            setMoves(chess.moves({ verbose: true, square: move.to }));
            console.log(move.to, chess.moves({ verbose: true, square: move.to }));
        })
        .transition()
        .attr('class', `piece_${move.san.includes('=Q') ? 'q' : move.piece}${move.color}_${move.to}`)
        .attr('x', xScale(x))
        .attr('y', xScale(y))
        .attr('style', (x+y%2)%2 === 0 ? 'filter: drop-shadow(0px 0px 3px black);' :'filter: drop-shadow(0px 0px 3px white);')
        .attr("xlink:href", () => pieces.getPiece(chess.board()[y][x]))
        .duration(400)
        
}