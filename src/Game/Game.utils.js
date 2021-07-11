import * as d3 from 'd3';
import { Pieces } from '../Pieces';

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

export const generatePieces = (svg, xScale, board, pieces) => {
    console.log(board);
    for(let y = 0; y<8; y++) {
        for(let x = 0; x < 8; x++) {
            svg
                .selectAll(`.piece_${String.fromCharCode(65 + x)}${y}`)
                .data([null])
                .join('image')
                .attr('class', `piece_${String.fromCharCode(65 + x)}${y}`)
                .attr('x', xScale(y))
                .attr('y', xScale(x))
                .attr('width', xScale(1) - xScale(0))
                .attr('height', xScale(1) - xScale(0))
                .attr('style', (x+y%2)%2 === 0 ? 'filter: drop-shadow(0px 0px 3px black);' :'filter: drop-shadow(0px 0px 3px white);')
                .attr("xlink:href", () => {
                    return pieces.getPiece(board[x][y])
                });
        }
    }
}
