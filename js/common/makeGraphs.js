
export function drawCoriolis(globalData, graphLen, divID, type, size, testData, testLen) {

  // Declare the chart dimensions and margins.
  const margin = { top: size / 35, right: 30, bottom: size / (35 / 3), left: 60 };
  const width = size - margin.left - margin.right;
  const height = size - margin.top - margin.bottom;
  const minX = d3.min(globalData.data, (d) => d.cor)
  const maxX = d3.max(globalData.data, (d) => d.cor)
  const minXTest = d3.min(testData.data, (d) => d.cor)
  const maxXTest = d3.max(testData.data, (d) => d.cor)
  // Declare the x (horizontal position) scale.
  let x;
  let y;
  if (testData.data.length > 5){
  x = d3.scaleLinear()
    .domain([0, Math.max(graphLen, testLen)])
    .range([margin.left, width + margin.left]);
  // const xAxis = d3.axisBottom(x).ticks(7)

  // Declare the y (vertical position) scale.
  y = d3.scaleLinear()
    .domain([Math.min(minX, minXTest), Math.max(maxX, maxXTest)])
    .range([height - margin.bottom, margin.bottom]);
  } else{
    x = d3.scaleLinear()
    .domain([0, graphLen])
    .range([margin.left, width + margin.left]);

  y = d3.scaleLinear()
    .domain([minX, maxX])
    .range([height - margin.bottom, margin.bottom]);
  }

  // append the svg object to the body of the page
  const svg = d3.select(`#${divID}`)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);

  // Instead of these, you can position the scenery Node containing the graph.
  // .append( 'g' )
  // .attr( 'transform', `translate(${margin.left},${margin.top})` );

  // Add the x-axis.
  svg.append('g')
    .attr('transform', `translate(0,${height - margin.bottom})`)
    // .call( d3.axisBottom( x ) );
    .call(d3.axisBottom(x).ticks(5));

  // Add the y-axis.
  svg.append('g')
    .attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(5));
  svg
    .append("path")
    .datum(globalData.data)
    .attr("fill", "none")
    .attr("stroke", "red")
    .style("stroke-dasharray", ("3, 3"))
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
      .x(function (d) { return x(d.time) })
      .y(function (d) { return y(d.cor) })
    )
  svg
    .append("path")
    .datum(testData.data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
      .x(function (d) { return x(d.time) })
      .y(function (d) { return y(d.cor) })
    )
  svg.append("text")
    .attr("transform", "rotate(-90)")
    // .attr("x", -(height/2))
    .attr("x", -(height / 2))
    .attr("y", 25)
    .style("text-anchor", "middle")
    .style("font-size", "15px")
    // .text("v<sub>x<sub>0</sub></sub>")
    // .text("v_x")
    // .text("v̇")
    .style("font-style", "italic")
    // .style("font-size", "10px")
    .text("Coriolis Force (N)")
    .append('tspan')
    // .attr('baseline-shift', 'sub')
    // .style('font-size', '12px') // Adjust font size for the subscript
    // .style("font-style", "italic")
    // .text('x');
  //       svg.select('text')
  // .append('tspan')
  // .attr('class', 'dot-above')
  // .text('\u0307');
  // svg.select('text')
  // .append('tspan')
  // .attr('dy', '0.5em') // Adjust vertical position
  // .attr('font-size', '0.8em') // Adjust font size if needed
  // .text('x');

  svg.append("text")
    .attr("transform", "translate(" + ((width + margin.left + margin.right) / 2) + "," + (height) + ")")
    .style("text-anchor", "middle")
    .style("font-size", "20px")
    .text("t (s)")
    .attr("y", 15)
    .attr("x", 13)

  // svg.append("text")
  // .attr("x", (height/2.5))
  // .attr("y", 20)
  // .style("text-anchor", "middle")
  // .style("font-size", "15px")
  // .text(`θ over time: ${type} eqn`)

  svg.selectAll("dot")
    .data([50, 50])
    .enter().append("circle")
    .attr("r", 3.5)
    .attr("cx", x(50) + margin.left)
    .attr("cy", y(50))
    .attr("fill", "blue")
    .attr("stroke", "blue")
  svg.selectAll("dot")
    .data([50, 50])
    .enter().append("circle")
    .attr("r", 3.5)
    .attr("cx", x(50) + margin.left)
    .attr("cy", y(50))
    .attr("fill", "red")
    .attr("stroke", "red")
  //   if (!Number.isNaN(globalData.data[1].theta)){
  //     d3.interval( () => {
  //       // console.log(ball)
  //       svg.selectAll("circle").remove();
  //       svg.selectAll("dot")
  //       .data([50,50])
  //       .enter().append("circle")
  //         .attr("r", 3.5)
  //         .attr("cx", x(ball.time)+margin.left)
  //         .attr("cy", y(ball.theta))
  //         .attr("fill", "red")
  //         .attr("stroke", "red")
  //     }, 5)
  // }
  return { node: svg.node(), x: x, y: y };
}

export function drawCen(globalData, graphLen, divID, type, size, testData, testLen) {

  // Declare the chart dimensions and margins.
  const margin = { top: size / 35, right: 30, bottom: size / (35 / 3), left: 60 };
  const width = size - margin.left - margin.right;
  const height = size - margin.top - margin.bottom;
  const minX = d3.min(globalData.data, (d) => d.cen)
  const maxX = d3.max(globalData.data, (d) => d.cen)
  const minXTest = d3.min(testData.data, (d) => d.cen)
  const maxXTest = d3.max(testData.data, (d) => d.cen)
  // Declare the x (horizontal position) scale.
  let x;
  let y;
  if (testData.data.length > 5){
  x = d3.scaleLinear()
    .domain([0, Math.max(graphLen, testLen)])
    .range([margin.left, width + margin.left]);
  // const xAxis = d3.axisBottom(x).ticks(7)

  // Declare the y (vertical position) scale.
  y = d3.scaleLinear()
    .domain([Math.min(minX, minXTest), Math.max(maxX, maxXTest)])
    .range([height - margin.bottom, margin.bottom]);
  } else{
    x = d3.scaleLinear()
    .domain([0, graphLen])
    .range([margin.left, width + margin.left]);

  y = d3.scaleLinear()
    .domain([minX, maxX])
    .range([height - margin.bottom, margin.bottom]);
  }

  // append the svg object to the body of the page
  const svg = d3.select(`#${divID}`)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);

  // Instead of these, you can position the scenery Node containing the graph.
  // .append( 'g' )
  // .attr( 'transform', `translate(${margin.left},${margin.top})` );

  // Add the x-axis.
  svg.append('g')
    .attr('transform', `translate(0,${height - margin.bottom})`)
    // .call( d3.axisBottom( x ) );
    .call(d3.axisBottom(x).ticks(5));

  // Add the y-axis.

  svg.append('g')
    .attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(5));
  svg
    .append("path")
    .datum(globalData.data)
    .attr("fill", "none")
    .attr("stroke", "red")
    .style("stroke-dasharray", ("3, 3"))
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
      .x(function (d) { return x(d.time) })
      .y(function (d) { return y(d.cen) })
      // .y(function (d) { return y(d.y) })
    )
  svg
    .append("path")
    .datum(testData.data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
      .x(function (d) { return x(d.time) })
      .y(function (d) { return y(d.cen) })
      // .y(function (d) { return y(d.y) })
    )
  svg.append("text")
    .attr("transform", "rotate(-90)")
    // .attr("x", -(height/2))
    .attr("x", -(height / 2))
    .attr("y", 25)
    .style("text-anchor", "middle")
    .style("font-size", "15px")
    .style("font-style", "italic")
    // .text("v<sub>x<sub>0</sub></sub>")
    .text("Centrifugal Force (N)")
  // .html("<li>x</li>")

  svg.append("text")
    .attr("transform", "translate(" + ((width + margin.left + margin.right) / 2) + "," + (height) + ")")
    .style("text-anchor", "middle")
    .style("font-size", "20px")
    .text("t (s)")
    .attr("y", 15)
    .attr("x", 13)

  // svg.append("text")
  // .attr("x", (height/2.5))
  // .attr("y", 20)
  // .style("text-anchor", "middle")
  // .style("font-size", "15px")
  // .text(`θ over time: ${type} eqn`)
  svg.selectAll("dot")
    .data([50, 50])
    .enter().append("circle")
    .attr("r", 3.5)
    .attr("cx", x(50) + margin.left)
    .attr("cy", y(50))
    .attr("fill", "blue")
    .attr("stroke", "blue")
  svg.selectAll("dot")
    .data([50, 50])
    .enter().append("circle")
    .attr("r", 3.5)
    .attr("cx", x(50) + margin.left)
    .attr("cy", y(50))
    .attr("fill", "red")
    .attr("stroke", "red")

  //   if (!Number.isNaN(globalData.data[1].theta)){
  //     d3.interval( () => {
  //       // console.log(ball)
  //       svg.selectAll("circle").remove();
  //       svg.selectAll("dot")
  //       .data([50,50])
  //       .enter().append("circle")
  //         .attr("r", 3.5)
  //         .attr("cx", x(ball.time)+margin.left)
  //         .attr("cy", y(ball.theta))
  //         .attr("fill", "red")
  //         .attr("stroke", "red")
  //     }, 5)
  // }
  return { node: svg.node(), x: x, y: y };
}
