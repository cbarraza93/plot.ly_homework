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

function optionChanged(selectedName) {
  console.log(selectedName);
  ind = data.metadata.findIndex(x => x.id === parseInt(selectedName));
  samples = data.samples[ind];
  otu_ids = samples.otu_ids;
  console.log(ind, samples, otu_ids);
   
  populateDemoGraphic();
  plotHorizontalBar();
}


