// src/CircularTracks.js
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const CircularTracks = () => {
  const svgRef = useRef();

  useEffect(() => {
    // Define the dimensions and margins
    const width = 800;
    const height = 800;
    const margin = 50;
    const radius = Math.min(width, height) / 2 - margin;

    // Clear the previous SVG content
    d3.select(svgRef.current).selectAll('*').remove();

    // Append the SVG object
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Generate random values and assign tracks
    const values = d3.range(20).map(() => Math.floor(Math.random() * 101));
    const trackRanges = [20, 40, 60, 80, 100];

    // Function to get the track number based on the value
    const getTrack = (value) => {
      for (let i = 0; i < trackRanges.length; i++) {
        if (value <= trackRanges[i]) return i + 1;
      }
      return 1;
    };

    // Create circular tracks
    trackRanges.forEach((range, i) => {
      svg.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', ((i + 1) * radius) / trackRanges.length)
        .style('fill', 'none')
        .style('stroke', '#000')
        .style('stroke-width', 1);
    });

    // Generate positions for triangles and check for overlaps
    const positions = [];
    const generatePosition = (trackNumber) => {
      let angle, x, y;
      do {
        angle = Math.random() * 2 * Math.PI;
        x = ((trackNumber * radius) / trackRanges.length) * Math.cos(angle);
        y = ((trackNumber * radius) / trackRanges.length) * Math.sin(angle);
      } while (positions.some(p => Math.hypot(p.x - x, p.y - y) < 30));
      positions.push({ x, y });
      return { x, y };
    };

    // Plot triangles
    values.forEach(value => {
      const trackNumber = getTrack(value);
      const { x, y } = generatePosition(trackNumber);
      svg.append('polygon')
        .attr('points', `${x},${y - 10} ${x - 10},${y + 10} ${x + 10},${y + 10}`)
        .style('fill', 'red');
    });
  }, []);

  return (
    <svg ref={svgRef}></svg>
  );
};

export default CircularTracks;
