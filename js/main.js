$(document).ready(function(){

	makeGraph();
		$.ajax({
			type:'get',
		    url:"data/denials.json",
		    cache:false,
		    dataType:"json", 
		}).done(makeGraph(denials_json)); 
});

function makeGraph() {

	var pieData = [
				{
					value: 300,
					color:"#F7464A",
					highlight: "#FF5A5E",
					label: "Red"
				},
				{
					value: 50,
					color: "#46BFBD",
					highlight: "#5AD3D1",
					label: "Green"
				},
				{
					value: 100,
					color: "#FDB45C",
					highlight: "#FFC870",
					label: "Yellow"
				},
				{
					value: 40,
					color: "#949FB1",
					highlight: "#A8B3C5",
					label: "Grey"
				},
				{
					value: 120,
					color: "#4D5360",
					highlight: "#616774",
					label: "Dark Grey"
				}

			];
	var ctx = document.getElementById("denials-pie").getContext("2d");
	window.myPie = new Chart(ctx).Pie(pieData);
}
