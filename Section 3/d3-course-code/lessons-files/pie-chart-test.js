const canvas = d3.select(".canva");

//add an svg element
const svg = canvas.append("svg")
            .attr("width", 700 )
            .attr("height", 600);

const margin = {top: 20, right: 20, bottom: 70, left: 70};
const graphWidth = 600 - margin.left - margin.right;
const graphHeight = 600 - margin.top - margin.bottom;

const mainCanvas = svg.append("g")
                .attr("width", graphWidth / 2)
                .attr("height",  graphHeight / 2)
                .attr("transform", `translate(${margin.left + 220},
                    ${margin.top + 220})`);

//Define ordinal scale  
const mColors = d3.scaleOrdinal(d3['schemeSet3']);
var formatComma = d3.format(",");

//Define the div or the tooltip
var div = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);


//D3 Native Tip
//Source: https://github.com/Caged/d3-tip
var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([0, -3])
  .direction('e')
  .html(function(d) {
    return "Pending" + ": <span style='color:orange'>" + formatComma(d.data.pending) + "</span>"
           +"<p>Denied: " + "<span style='color:orangered'>" + formatComma(d.data.denied)+"</span> </p>"
           +"<p>Approved: " + "<span style='color:orange'>" + formatComma(d.data.approved)+"</span> </p>"
           +"<p>Total: " + "<span style='color:orange'>" +formatComma(d.data.total)+"</span> </p>";
  });

//add tooltip to canvas
mainCanvas.call(tip);

//outer-radius
const arcPath = d3.arc()
.outerRadius(190)
.innerRadius(100);


//Inspired by: https://stackoverflow.com/questions/50572762/how-do-i-read-a-csv-file-into-an-array-using-d3js-v5
function getCSVData() {
    d3.csv('/lessons-files/data/daca.csv', function(d){ 
        return d;

    }).then(drawPieChart);
}

getCSVData(); //call the asyn containing function

function drawPieChart(data){

    //update color scale domain
    mColors.domain(data.map(d => d.total));

   const pie = d3.pie()
   .sort(null) //no need to order each value 
   .value(data => data.total);//base the angles on approve

const angles = pie(data);//creating the actual angles.  Must
//put inside of an array!

console.log("Angles", angles);

//console.log("Before",arcPath(angles))

//Creating the actual paths and pie
const paths = mainCanvas.selectAll('path')
               .data(pie(data));


  
//Add DACA Title
svg.append("text")
            .attr("class", "daca-title")
            .attr("dy", "5%")
            .attr("dx", "5%")
            .style("opacity", 0.0)
            .transition()
                .duration(1000)
                .style("opacity", (d, i) => i+0.7)
            .attr("text-anchor", "right")
            .attr("fill", "white")
            //DACA_Receipts_Since_Injunction_August_31_2018
            .text("Deferred Action for Childhood Arrivals Receipts - August 31 2018")
//Add DACA text
mainCanvas.append("text")
            .attr("class", "daca-text")
            .attr("dy", ".85em")
            .style("opacity", 0.0)
            .transition()
                .duration(1000)
                .style("opacity", (d, i) => i+0.7)
            .attr("text-anchor", "middle")
            .attr("fill", "white")
            .text("DACA")

//The enter selection
console.log("ArchPath", paths);

paths.enter()
   .append("path")
   .attr("class", "arc")
   //.attr("d", arcPath) //if using animation no need for this!
//    .attr("fill", function(d, i) {console.log("colors", d);
//     return myColors[i]; })
/*
  Make sure we say d.data.total because
  the object d now has another property data!
*/
   .attr("fill", d => mColors(d.data.total))//make a color range!
   .attr("stroke", "#cde")
   .on("mouseover", tip.show)
   .on("mouseout", tip.hide)
   //    .on("mouseover", function(d, i, n){
//         d3.select(n[i])
//             .transition()
//             .duration(100)//in millisecond
//             .style("opacity", 0.7)
//         //console.log(d.data.total);

//         div.transition()
//             .duration(200)
//             .style("opacity", 0.9);

//     div.html("<p> Pending: "+ formatComma(d.data.pending) +"</p>"
//         + "<p> Denied: " + formatComma(d.data.denied) +"</p>" 
//         + "<p> Approved: " + formatComma(d.data.approved) +"</p>" 
//         + "<p> Total: " + formatComma(d.data.total) +"</p>")
//         .style("left", (d3.event.pageX) + "px" )
//         .style("top", (d3.event.pageY - 18)  + "px")
        
//     })
//     .on("mouseout", function(d,i,n){
//     d3.select(n[i])
//     .transition()
//     .duration(100)//in millisecond
//     .style("opacity", 1);

//     div.transition()
//         .duration(500)
//         .style("opacity", 0)
    
//     })
   .attr("stroke-width", 3)
   .transition()
   .duration(800)
   .attrTween("d", arcAnimation)
   
    
}


//Creating an animation for our angles and arcs
const arcAnimation = (d) => {
    //This is for the enterAnimation or Tweening
    var i = d3.interpolate(d.endAngle, d.startAngle);

    return function(t){ //pass our ticker t (0-1)
        d.startAngle = i(t); //at t=0 start angle is 0 - nothing is being shown
        return arcPath(d);
    }
}


