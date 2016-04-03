$(document).ready(function(){

	$.ajax({
		type:'get',
	    url:"data/denials.json",
	    cache:false,
	    dataType:"json", 
	}).done(function(denials_json) {
  			makePie(denials_json);
		});
});

function makePie(data_json) {
	var pieData = [];
	var data_copy = data_json;

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