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
                .attr("transform", `translate(${margin.left + 200 },
                    ${margin.top + 300})`);

//Number formatter
var formatComma = d3.format(",");



//D3-Tootip: https://github.com/Caged/d3-tip
var tip = d3.tip()
            .attr("class", "d3-tip")
            .offset([0,-3])
            .direction("e")
            .html(function(d) {
                return "Pending" + ": <span style='color:orange'>" + formatComma(d.data.pending) + "</span>"
                       +"<p>Denied: " + "<span style='color:orangered'>" + formatComma(d.data.denied)+"</span> </p>"
                       +"<p>Approved: " + "<span style='color:orange'>" + formatComma(d.data.approved)+"</span> </p>"
                       +"<p>Total: " + "<span style='color:orange'>" +formatComma(d.data.total)+"</span> </p>";
              });
            
//Add tip to Canvas
mainCanvas.call(tip);

//create our pie
const pie = d3.pie()
    .sort(null)
    .value(data => data.denied)

//Radius and the arc
const arcPath = d3.arc()
                .outerRadius(200)
                .innerRadius(100)


//Title
svg.append("text")
            .attr("class", "daca-title")
            .attr("dy", "10%")
            .style("opacity", 0.0)
            .transition()
                .duration(1000)
                .style("opacity", (d, i) => i+0.7)
            .text("Deferred Action for Childhood Arrivals Reciept - August 31 2018 ")
            .attr("fill", "white")
//Adding Daca
mainCanvas.append("text")
            .attr("class", "daca-text")
            .attr("dy", ".85em")
            .style("opacity", 0.0)
            .transition()
                .duration(1000)
                .style("opacity", (d,i) => i+0.7)
            
            .text("DACA")
            .attr("text-anchor", "middle")
            .attr("fill", "white")


//Define ordinal scale
const colorScale = d3.scaleOrdinal(d3["schemeSet3"])

function getCSVData(){
    d3.csv("/lessons-files/data/daca.csv", function(d){
            
        return d;

    }).then(drawPieChart);
}

getCSVData();

function drawPieChart(data){
 //2129 => red
  //Update color scale domain
  colorScale.domain(data.map(d => d.total))
  
  const angles = pie(data);

  //Create the actual paths and pie on screen
  const paths = mainCanvas.selectAll("path")
                    .data(angles)

  paths.enter()
            .append("path")
            .attr("class", "arc")
            .attr("stroke", "#cde")
            .attr("fill", d => colorScale(d.data.total))
            //.attr("d", arcPath)
            .on("mouseover", tip.show)
            .on("mouseout", tip.hide)
            .transition()
                .duration(750)
                .attrTween("d", arcAnimation)
            
/// [whatever you want] + "data set"
    console.log("Paths", paths)

//   console.log(arcPath(angles[3])) 

}


//Tween Animation
const arcAnimation = (d) => {
     var i = d3.interpolate(d.endAngle, d.startAngle);

     return function(t) {
         d.startAngle = i(t);

         return arcPath(d);
     }
}