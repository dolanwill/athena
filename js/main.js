$(document).ready(function(){

	$.ajax({
		type:'get',
	    url:"data/denials.json",
	    cache:false,
	    dataType:"json", 
	}).done(function(denials_json) {
  			makePie(denials_json);
		});	
	$.ajax({
		type:'get',
	    url:"data/rates.json",
	    cache:false,
	    dataType:"json", 
	}).done(function(rates_json) {
  			makeLine(rates_json);
		});
});

function makePie(data_json) {
	var pieData = [];

	data_json.forEach(function(item, index) {
		pieData.push({
					value: item.number,
					color:"#"+((1<<24)*Math.random()|0).toString(16),
					label: item.reason
				});
	});

	var ctx = document.getElementById("denials-pie").getContext("2d");
	window.myPie = new Chart(ctx).Pie(pieData);
}

function makeLine(data_json) {
	var date_labels = [];
	var rates = [];
	var industry_avg = [];

	data_json.forEach(function(item, index) {
		rates.push(item.rejection_rate);
		date_labels.push(item.month);
		industry_avg.push(.02)
	});
	console.log(rates)
	console.log(date_labels)
	var graph_data = {
	    labels: date_labels,	
	    datasets: [
			{
	            label: "Industry Average",
	            strokeColor: "rgba(0,128,0,1)",
	            pointColor: "rgba(0,128,0,1)",
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(220,220,220,1)",
	            data: industry_avg
	        },
	        {
	            label: "Insurance Company Rejection Rates",
	            strokeColor: "rgba(205,92,92,1)",
	            pointColor: "rgba(205,92,92,1)",
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(151,187,205,1)",
	            data: rates
	        }
	    ]};

	var ctx = document.getElementById("rejection_rates_time").getContext("2d");
	var myLineChart = new Chart(ctx).Line(graph_data, graph_options);
}

function getTopN(arr, prop, n) {
    // clone before sorting, to preserve the original array
    var clone = arr.slice(0); 

    // sort descending
    clone.sort(function(x, y) {
        if (x[prop] == y[prop]) return 0;
        else if (parseInt(x[prop]) < parseInt(y[prop])) return 1;
        else return -1;
    });

    return clone.slice(0, n || 1);
}