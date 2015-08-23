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

  this.agency = agencies[row.agency_name];
  this.agency.entries.add(this);

  this.title = row.title;
  this.description = row.description;
  this.onlinePub = row.online_publication == "Yes";
  this.maintainer = row.data_maintainer;
  this.url = row.location_or_url;
  this.source = row.original_data_owner;

  const dateReleased = new Date(row.date_released);
  this.dateReleased = !isNaN(dateReleased)
    ? dateReleased
    : row.date_released === "-" ? null : "Invalid Date: " + row.date_released

  if (isNaN(dateReleased) && this.dateReleased) {
    console.log(this.dateReleased, this, row);
  }

  function splitTrimFilter(field, agg){
    var r = field.split(",")
      .map(function (_){ return _.trim(); })
      .filter(function (_){ return _ != "-" ; });
    r.forEach(function (f){ agg.add(f); });
    return r;
  }

  function processDisclosive(disclosive) {
    if (disclosive === "-") {
      return null;
    } else if (disclosive.match(/\d{4}-\d{4}/)){
      return disclosive.split("-").map(function(year){
        return _.parseInt(year);
      });
    } else {
      console.log(disclosive, dateReleased);
      return disclosive;
    }
  }

  this.disclosive = processDisclosive(row.disclosive);
  this.fileFormats = splitTrimFilter(row.file_format, fileFormats);
  this.updateFreqs = splitTrimFilter(row.frequency_of_update, updateFreqs);

}

function EntrySet(entries){
  this.entries = entries || [];
  this.add = function(entry){
    this.entries.push(entry);
  }.bind(this);
}

var dataPromise = Papa.parsePromise("adiaug2015.csv", {download: true, header: true}).then(function(results){
  agencies = _.chain(results.data)
    .unique(false, function (row){
      return row.agency_name;
    }).map(function (row){
      return [row.agency_name, new Agency(row.agency_name, row.agency_abbrv)];
    })
    .zipObject()
    .value();

  entries = _.chain(results.data)
    .map(function (row){
      return new Entry(row);
    }).value();

  return {
    agencies: agencies,
    entries: entries,
    fileFormats: fileFormats,
    updateFreqs: updateFreqs
  }
})

// Papa.parse("adiaug2015.csv", {
//   download: true,
//   header: true,
//   complete: function (results, file){

//     agencies = _.chain(results.data)
//       .unique(false, function (row){
//         return row.agency_name;
//       }).map(function (row){
//         return [row.agency_name, new Agency(row.agency_name, row.agency_abbrv)];
//       })
//       .zipObject()
//       .value();

//     entries = _.chain(results.data)
//       .map(function (row){
//         return new Entry(row);
//       }).value();
//   }
// });
