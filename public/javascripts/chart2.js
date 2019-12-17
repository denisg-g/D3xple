
var margin = {top: 20, right: 20, bottom: 30, left: 40},
width = 960 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;


var groupBy1 = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
const groupBy = key => array =>
  array.reduce(
    (objectsByKeyValue, obj) => ({
      ...objectsByKeyValue,
      [obj[key]]: (objectsByKeyValue[obj[key]] || []).concat(obj)
    }),
    {}
  );

var x0 = d3.scale.ordinal()
.rangeRoundBands([0, width], .1);

var x1 = d3.scale.ordinal();

var y = d3.scale.linear()
.range([height, 0]);

var xAxis = d3.svg.axis()
.scale(x0)
.tickSize(0)
.orient("bottom");

var yAxis = d3.svg.axis()
.scale(y)
.orient("left");

var color = d3.scale.ordinal()
.range(["#ca0020","#f4a582","#d5d5d5","#92c5de","#0571b0"]);

var svg = d3.select('body').append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("/CursosComputacion2015-2018.csv", function(error, data) {
if (error) throw error;

var nameReal = data.map(function(d) { return d.ALCodigo; });
var categoriesNames = [...new Set(nameReal)]; // filter unique
console.log(categoriesNames)

var rateReal = data.map(function(d) { return d.Asignatura; });
var rateNames = [...new Set(rateReal)]
// console.log(categoriesNames);
// console.log(rateNames);


x0.domain(categoriesNames);
x1.domain(rateNames).rangeRoundBands([0, x0.rangeBand()]);
y.domain([0, 150]);

svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);

svg.append("g")
  .attr("class", "y axis")
  .style('opacity','0')
  .call(yAxis)
.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", ".71em")
  .style("text-anchor", "end")
  .style('font-weight','bold')
  .text("Value");
  /* data */
  var datosasignatura = data.map(function(d) { return { Asignatura: d.Asignatura } });
  var fulldata = data.map(function(d) { return { Asig: d.Asignatura, Anio: d.ALCodigo, valor: d.NotaPromedio } });
  const groupByAsignatura = groupBy('Asignatura');
  var ccarsByBrand = groupByAsignatura(datosasignatura);
  
  var ddata = [];
  var anios = ["2015","2016","2017","2018"],counter =0;
  for (var element in ccarsByBrand){
    var values=[];
    for (var i = 0; i < anios.length; i++){

      let sum = 0, filt; 
      filt = fulldata.filter(function(val) { return val.Asig == element && val.Anio == anios[i] })
      
      filt.forEach((obj) => {
        for (let property in obj) {
            if(property == "valor"){

              sum += parseFloat(obj[property]);
              
            }
        }
      })
      sum = sum / 4;

      values.push({ value: sum, rate: element  }) 
      
      ddata.push( 
        { 
          categorie: anios[i], 
          values: values
        })
    }
    
  }
  console.log(ddata);

svg.select('.y').transition().duration(500).delay(1300).style('opacity','1');
var slice = svg.selectAll(".slice")
  .data(ddata)
  .enter().append("g")
  .attr("class", "g")
  .attr("transform",function(d) { console.log(d);return "translate(" + x0(d.categorie) + ",0)"; });

slice.selectAll("rect")
  .data(function(d) { return d.values; })
  .enter().append("rect")
  .attr("width", x1.rangeBand())
  .attr("x", function(d) { return x1(d.rate); })
  .style("fill", function(d) { return color(d.rate) })
  .attr("y", function(d) { return y(0); })
  .attr("height", function(d) { return height - y(0); })
  .on("mouseover", function(d) {
      d3.select(this).style("fill", d3.rgb(color(d.rate)).darker(2));
  })
  .on("mouseout", function(d) {
      d3.select(this).style("fill", color(d.rate));
  });


slice.selectAll("rect")
  .transition()
  .delay(function (d) {return Math.random()*1000;})
  .duration(1000)
  .attr("y", function(d) { return y(d.value); })
  .attr("height", function(d) { return height - y(d.value); });

//Legend
var legend = svg.selectAll(".legend")
  .data(data.map(function(d) { return d.Asignatura; }).reverse())
.enter().append("g")
  .attr("class", "legend")
  .attr("transform", function(d,i) { return "translate(0," + i * 20 + ")"; })
  .style("opacity","0");

legend.append("rect")
  .attr("x", width - 18)
  .attr("width", 18)
  .attr("height", 18)
  .style("fill", function(d) { return color(d); });

legend.append("text")
  .attr("x", width - 24)
  .attr("y", 9)
  .attr("dy", ".35em")
  .style("text-anchor", "end")
  .text(function(d) {return d; });

legend.transition().duration(500).delay(function(d,i){ return 1300 + 100 * i; }).style("opacity","1");

});
























// var margin = {top: 20, right: 20, bottom: 30, left: 40},
//     width = 960 - margin.left - margin.right,
//     height = 500 - margin.top - margin.bottom;

// var x0 = d3.scale.ordinal()
//     .rangeRoundBands([0, width], .1);

// var x1 = d3.scale.ordinal();

// var y = d3.scale.linear()
//     .range([height, 0]);

// var xAxis = d3.svg.axis()
//     .scale(x0)
//     .tickSize(0)
//     .orient("bottom");

// var yAxis = d3.svg.axis()
//     .scale(y)
//     .orient("left");

// var color = d3.scale.ordinal()
//     .range(["#ca0020","#f4a582","#d5d5d5","#92c5de","#0571b0"]);

// var svg = d3.select('body').append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// d3.json("/data.json", function(error, data) {

//   var categoriesNames = data.map(function(d) { return d.categorie; });
//   var rateNames = data[0].values.map(function(d) { return d.rate; });

//   x0.domain(categoriesNames);
//   x1.domain(rateNames).rangeRoundBands([0, x0.rangeBand()]);
//   y.domain([0, d3.max(data, function(categorie) { return d3.max(categorie.values, function(d) { return d.value; }); })]);

//   svg.append("g")
//       .attr("class", "x axis")
//       .attr("transform", "translate(0," + height + ")")
//       .call(xAxis);

//   svg.append("g")
//       .attr("class", "y axis")
//       .style('opacity','0')
//       .call(yAxis)
//   .append("text")
//       .attr("transform", "rotate(-90)")
//       .attr("y", 6)
//       .attr("dy", ".71em")
//       .style("text-anchor", "end")
//       .style('font-weight','bold')
//       .text("Value");

//   svg.select('.y').transition().duration(500).delay(1300).style('opacity','1');

//   var slice = svg.selectAll(".slice")
//       .data(data)
//       .enter().append("g")
//       .attr("class", "g")
//       .attr("transform",function(d) { console.log(d.categorie);return "translate(" + x0(d.categorie) + ",0)"; });

//   slice.selectAll("rect")
//       .data(function(d) { return d.values; })
//   .enter().append("rect")
//       .attr("width", x1.rangeBand())
//       .attr("x", function(d) { return x1(d.rate); })
//       .style("fill", function(d) { return color(d.rate) })
//       .attr("y", function(d) { return y(0); })
//       .attr("height", function(d) { return height - y(0); })
//       .on("mouseover", function(d) {
//           d3.select(this).style("fill", d3.rgb(color(d.rate)).darker(2));
//       })
//       .on("mouseout", function(d) {
//           d3.select(this).style("fill", color(d.rate));
//       });

//   slice.selectAll("rect")
//       .transition()
//       .delay(function (d) {return Math.random()*1000;})
//       .duration(1000)
//       .attr("y", function(d) { return y(d.value); })
//       .attr("height", function(d) { return height - y(d.value); });

//   //Legend
//   var legend = svg.selectAll(".legend")
//       .data(data[0].values.map(function(d) { return d.rate; }).reverse())
//   .enter().append("g")
//       .attr("class", "legend")
//       .attr("transform", function(d,i) { return "translate(0," + i * 20 + ")"; })
//       .style("opacity","0");

//   legend.append("rect")
//       .attr("x", width - 18)
//       .attr("width", 18)
//       .attr("height", 18)
//       .style("fill", function(d) { return color(d); });

//   legend.append("text")
//       .attr("x", width - 24)
//       .attr("y", 9)
//       .attr("dy", ".35em")
//       .style("text-anchor", "end")
//       .text(function(d) {return d; });

//   legend.transition().duration(500).delay(function(d,i){ return 1300 + 100 * i; }).style("opacity","1");

// });