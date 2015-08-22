var entries = [];
var agencies = [];

var fileFormats = new Set();
var updateFreqs = new Set();

function Agency(name, abbr){
	this.name = name;
	this.abbr = abbr;
	this.entries = new EntrySet();
}

function Entry(row){

	this.agency = _.find(agencies, function (agency){
		return agency.name == row.agency_name;
	});

	this.agency.entries.add(this);

	this.title = row.title;
	this.description = row.description;
	this.onlinePub = row.online_publication == "Yes";
	this.disclosive = row.disclosive;
	this.maintainer = row.data_maintainer;
	this.url = row.location_or_url;
	this.source = row.original_data_owner;

	this.dateReleased = new Date(row.date_released);
	if (isNaN(this.dateReleased)){
		this.dateReleased += ": " + row.date_released;
		console.error(this.dateReleased);
	}

	function splitTrimFilter(field, agg){
		var r = field.split(",")
			.map(function (_){ return _.trim(); })
			.filter(function (_){ return _ != "-" ; });
		r.forEach(function (f){ agg.add(f); });
		return r;
	}

	this.fileFormats = splitTrimFilter(row.file_format, fileFormats);
	this.updateFreqs = splitTrimFilter(row.frequency_of_update, updateFreqs);

}

function EntrySet(entries){
	entries = entries || [];
	this.add = function(entry){
		entries.push(entry);
	}
}

Papa.parse("adiaug2015.csv", {
	download: true,
	header: true,
	complete: function (results, file){

		agencies = _.chain(results.data).unique(false, function (row){
			return row.agency_name;
		}).map(function (row){
			return new Agency(row.agency_name, row.agency_abbrv);
		}).value();

		entries = _.chain(results.data).map(function (row){
			return new Entry(row);
		}).value();

	}
});
