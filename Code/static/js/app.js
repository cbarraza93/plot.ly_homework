var data = {};

var ind = 0;               

d3.json("data/samples.json").then((updatedData) => {
  console.log(updatedData);
  data = updatedData;
  metadata = updatedData.metadata;
  
  d3.select("#selDataset")
      .selectAll(null)
      .data(data.names)
      .enter()
      .append('option')
      .text(function (d) { return d; })
      .attr("value", function (d) { return d; }) 
  optionChanged(data.metadata[0].id);
  }) 
 
function populateDemoGraphic() {  
  var divText = 'ID: ' + data.metadata[ind].id + '<br>';
      divText = divText + 'Ethnicity: ' + data.metadata[ind].ethnicity + '<br>';
      divText = divText + 'Gender: ' + data.metadata[ind].gender + '<br>';
      divText = divText + 'Age: ' + data.metadata[ind].age + '<br>';
      divText = divText + 'Location: ' + data.metadata[ind].location + '<br>';
      divText = divText + 'Belly Button Type: ' + data.metadata[ind].bbtype + '<br>';
      divText = divText + 'Wash Frequency: ' + data.metadata[ind].wfreq + '<br>';
      d3.select("#sample-metadata").html('');
      d3.select("#sample-metadata").html(divText);
}

function plotHorizontalBar() {
  barOtu_ids = otu_ids.map(function(e) {return 'OTU ' + e});
  console.log(barOtu_ids.slice(0,10));
  console.log(samples.sample_values.slice(0,10));
  console.log(samples.otu_labels.slice(0,10));

  var bar_data = [{
    type: 'bar',
    x: samples.sample_values.slice(0,10).reverse(),
    y: barOtu_ids.slice(0,10).reverse(),
    text : samples.otu_labels.slice(0,10).reverse(),
    orientation: 'h'
  }]

Plotly.newPlot('bar', bar_data);
}

function plotBubbleChart() {
  
  console.log(otu_ids);

  var trace1 = {
    x: samples.otu_ids,
    y: samples.sample_values,
    mode: 'markers',
    marker: {
      size: samples.sample_values,
      color: samples.otu_ids
    },
    text: samples.otu_labels
    };
    
  var bubble_data = [trace1];
    
  var layout = {
    title: "<b>OTU ID and Bacteria",
    showlegend: false,
    xaxis: {
      title: {
      text: 'OTU ID'
      }
    }
    };
    
  Plotly.newPlot('bubble', bubble_data, layout);
}

function displayGaugeChart() {

  var pathArr = {
    '0': 'M 0.17 0.5 L 0.34 0.5 L 0.35 0.5 Z', //0
    '1': 'M 0.33 0.5 L 0.175 0.565 L 0.35 0.5 Z', //1
    '2': 'M 0.33 0.5 L 0.205 0.625 L 0.35 0.5 Z', //2
    '3': 'M 0.33 0.5 L 0.26 0.665 L 0.35 0.5 Z', //3
    '4': 'M 0.33 0.5 L 0.315 0.685 L 0.35 0.5 Z', //4
    '5': 'M 0.33 0.5 L 0.37 0.685 L 0.35 0.5 Z', //5
    '6': 'M 0.33 0.5 L 0.43 0.665 L 0.35 0.5 Z', //6
    '7': 'M 0.33 0.5 L 0.475 0.625 L 0.35 0.5 Z', //7
    '8': 'M 0.33 0.5 L 0.505 0.56 L 0.35 0.5 Z', //8
    '9': 'M 0.33 0.5 L 0.51 0.5 L 0.35 0.5 Z'}; //9   
 
     
  var meter_chart = [{
    values: [90, 10, 10, 10, 10, 10,10, 10, 10,10],
    labels: [" ", "0-1", "1-2", "2-3", "3-4", "4-5","5-6","6-7","7-8","8-9"],
    marker: {
      colors: [
        'rgb(255, 255, 255)',
        'rgb(247, 242, 236)',
        'rgb(243, 240, 229)',
        'rgb(233, 231, 201)',
        'rgb(229, 233, 177)',
        'rgb(213, 229, 149)',
        'rgb(183, 205, 139)',
        'rgb(135, 192, 128)',
        'rgb(133, 189, 139)',
        'rgb(128, 182, 134)'
      ]
    },
    domain: {"x": [0, 0.68]},
    name: "Gauge",
    hole: .5,
    type: "pie",
    direction: "clockwise",
    rotation: 90,
    showlegend: false,
    textinfo: "label",
    textposition: "inside",
    hoverinfo: "none"
  }]
 
  var layout = {
    title: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
    shapes: [
      {
        'type': 'path',
        'path': pathArr[data.metadata[ind].wfreq],
        'fillcolor': 'rgba(134,0,0,255)',
        'line': {
          'width': 0.5
        },
        'xref': 'paper',
        'yref': 'paper'
      }
    ],
    annotations: [
      {
        'xref': 'paper',
        'yref': 'paper',
        'x': 0.34,
        'y': 0.45,
        'text': data.metadata[ind].wfreq,
        'showarrow': false
      }
    ]
  };
 
  Plotly.newPlot('gauge', meter_chart, layout);
}


function optionChanged(selectedName) {
  console.log(selectedName);
  ind = data.metadata.findIndex(x => x.id === parseInt(selectedName));
  samples = data.samples[ind];
  otu_ids = samples.otu_ids;
  console.log(ind, samples, otu_ids);
   
  populateDemoGraphic();
  plotHorizontalBar();
  plotBubbleChart();
  displayGaugeChart()
}



