//https://d3js.org/d3.v5.js --> to copy the entire library and add it locally


const canvas = d3.select(".canva");

/*
 JSON - JavaScript Object Notation
*/
// var dataArray = [
//       {
//         width: 25,
//         height: 4,
//         fill: "pink"
//     },
//       {width: 25, height: 14, fill: "purple"},
//       {width: 25, height: 44, fill: "orange"},
//       {width: 25, height: 124, fill: "green"},
//       {width: 25, height: 12, fill: "grey"},
//       {width: 25, height: 32, fill: "red"}
// ];

//add an svg element
const svg = canvas.append("svg")
            .attr("width",600)
            .attr("height",  600);


const rect = svg.selectAll("rect")

d3.json('text.json')
   .then(data =>{
       console.log(data);
       //code here to actually draw elements on screen
       // create margins & dimensions
       // create axes groups
       rect.data(data)
                       .enter().append("rect")
                       .transition()
                         .attr("y", d => y(d.height))
                         .delay(function(d, i, n) {

                           return i * 100} )
                         .ease(d3.easeElasticOut)
                       .attr("width", x.bandwidth)
                       .attr("height", (d, i) => graphHeight - y(d.height))
                       .attr("fill", (d) => d.fill)
                       .attr("x", (d,i) => x(d.fill))
                       
                       //.attr("y", d => y(d.height))

rect.data(data)
        .enter().append("rect")
        .attr("width", 24)
        .attr("fill", (d, i) => d.fill)
        .attr("height", function(d){

            return d.height*2;
        })

        .attr("x", function(d, i) {
            console.log(d);
            return i*25;
        })
        .attr("y", function(d, i) {
            return 200 - (d.height*2);
        })





})



























// svg.append("circle")
//                .attr("cx", 100)
//                .attr("cy", 100)
//                .attr("r", 50)
//                .attr("fill", "blue");

// svg.append("rect")
//     .attr("width", 100)
//     .attr("height", 100)
//     .attr("x", 120)
//     .attr("y",0)
//     .attr("fill", "green")
//     .attr("rx", 15)
//     .attr("ry", 15);

// svg.append("line")
//     .attr("x1", 129)
//     .attr("x2", 45)
//     .attr("y1", 100)
//     .attr("y2", 46)
//     .attr("stroke", "gray");

// svg.append("text")
//     .text("Hello!")
//     .attr("text-anchor", "start")
//     .attr("fill", "grey")
//     .attr("stroke", "green")
//     .attr("font-size", 23)
//     .attr("x", 110)
//     .attr("y", 80);

//     svg.append("text")
//     .text("There")
//     .attr("fill", "grey")
//     .attr("text-anchor", "middle")
//     .attr("font-size", 12)
//     .attr("x", 110)
//     .attr("y", 30);

//     svg.append("text")
//     .text("James!")
//     .attr("fill", "grey")
//     .attr("text-anchor", "end")
//     .attr("font-size", 12)
//     .attr("x", 110)
//     .attr("y", 50);
