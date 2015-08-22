var entries = [];
var agencies = [];

function Agency(name, abbr){
	this.name = name;
	this.abbr = abbr;
}

function Entry(row){

	this.title = row.title;
	this.description = row.description;
	this.onlinePub = row.online_publication == "Yes";
	this.disclosive = row.disclosive;
	this.maintainer = row.data_maintainer;
	this.url = row.location_or_url;
	this.source = row.original_data_owner;

	// TODO - this.agency = findAgency(row.agency_name)

	// TODO - file format
	this.fileFormat = row.file_format;
	
	// TODO - standardize date released
	this.dateReleased = row.date_released;
	
	// TODO - preprocess frequency of update
	this.updateFreq = row.frequency_of_update

}

function EntrySet(entries){

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
		});

	}
});
