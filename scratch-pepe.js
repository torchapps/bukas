var agencies = [];

Papa.parse("adiaug2015.csv", {
	download: true,
	header: true,
	complete: function (results, file){

		var agencyNames = [];
		var agencyAbbrs = [];
		
		results.data.forEach(function (row){
			var agencyName = row.agency_name;
			if (!_.includes(agencyNames, agencyName)){
				var agencyAbbr = row.agency_abbrv;
				agencyNames.push(agencyName);
				agencyAbbrs.push(agencyAbbr);
			}
		});

		for(var i in agencyNames){
			agencies.push({
				name: agencyNames[i],
				abbr: agencyAbbrs[i]
			});
		}

	}
});
