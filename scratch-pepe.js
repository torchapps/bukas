Papa.parse("adiaug2015.csv", {
	download: true,
	complete: function (results, file){
		console.log(results);
	}
});

console.log("May kuko sa titi ko");