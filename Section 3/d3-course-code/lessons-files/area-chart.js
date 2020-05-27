const canvas = d3.select(".canva");

var revenueData = [
    52.13,
    53.98,
    67.00,
    89.70,
    99.00,
    130.28,
    166.70,
    234.98,
    345.44,
    443.34,
    543.70,
    556.13,  
];

var months = ["January", "February", "March", "April", "May", 
             "June", "July", "August", "September", "October",
              "November", "December"];


var parseMonths = d3.timeParse("%B");
//used d3.extent for it gives us the min and the max values
//console.log(d3.extent(months, (d) => parseMonths(d)))

//add an svg element
const svg = canvas.append("svg")
            .attr("width", 700 )
            .attr("height", 600);

const margin = {top: 20, right: 20, bottom: 70, left: 70};
const graphWidth = 600 - margin.left - margin.right;
const graphHeight = 650 - margin.top - margin.bottom;

const mainCanvas = svg.append("g")
                .attr("width", graphWidth)
                .attr("height",  graphHeight)
                .attr("transform", `translate(${margin.left},
                    ${margin.top})`); // creating a group


//Set the ranges and domains
var x = d3.scaleTime()
                    .domain(d3.extent(months, (d) => parseMonths(d)))
                    .range([0, graphWidth])

var y = d3.scaleLinear()
                    .range([graphHeight, 0])
                    .domain([0, d3.max(revenueData, (d) => d)])


var areaChart = d3.area()
                    .x( function(d, i){
                         console.log("dates",x(parseMonths(months[i])) );
                         console.log("Real dates",parseMonths(months[i]) );
                         
                        return x(parseMonths(months[i]))
                    } )
                    .y0(graphHeight)
                    .y1((d, i) => graphHeight - d)
//Define Graph line
var valueLine = d3.line()
                    .x(function(d, i) { return x(parseMonths(months[i]))} )
                    .y(function(d, i) { return y(d)});

//Add the valueLine path
mainCanvas.append("path")
                    .data([revenueData])
                    .attr("fill", "none")
                    .attr("class", "line")
                    .attr("d", valueLine)
    
mainCanvas.append("path")
                    .attr("fill", "orange")
                    .attr("class", "area")
                    .attr("d", areaChart(revenueData));

//Circles
var circles = mainCanvas.selectAll("circles")
                    .data(revenueData)
                    .enter()
                    .append("circle")
                    .attr("class", "circle")
                    .attr("cx", (d, i) => x(parseMonths(months[i])) )
                    .attr("cy", (d) => y(d))
                    .attr("r", 5)

        //Add Axis
        var xAxis = d3.axisBottom(x)
                    .tickFormat(d3.timeFormat("%b"));
        var yAxis = d3.axisLeft(y)
                            .tickSize(12)
                            .tickPadding(10)
                        //.ticks(4);

        mainCanvas.append("g")
                        .attr("transform", "translate(0, "+ graphHeight +")")
                        .call(xAxis)

        mainCanvas.append("g")
                    .call(yAxis);