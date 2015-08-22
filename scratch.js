console.log("Hello world!");

Papa.parse("adiaug2015.csv", {
	download: true,
	complete: function (results, file){
		console.log(results);
	}
});
