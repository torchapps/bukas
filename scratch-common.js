Papa.parsePromise = function(file, config) {
  config = config || {};
  return new Promise(function(resolve, reject) {
    config.complete = resolve;
    Papa.parse(file, config);
  });
};

var Bukas = {};

Bukas.Score = function(value, explanation){
  this.value = value;
  this.explanation = explanation;

  this.combine = function(func, BukasScore) {
    return func(this.value, BukasScore.value);
  }.bind(this);

  this.add = this.combine.bind(this, function(thisValue, BukasScoreValue) {
    return new Bukas.Score(thisValue + BukasScoreValue);
  }.bind(this));


}

Bukas.scoreDisclosive= function(entry) {
  const disclosive = entry.disclosive;
  // null || [date1, date2] || For agency releases only || Not yet available;
  // numbers subject to change of course

  if (disclosive === "For agency releases only") {
    // available only to agency releases
    return new Bukas.Score(0.67, "Available only to agencies, but not to the rest of the public.");
  } else if (disclosive === "Not yet available") {
    // not available
    return new Bukas.Score(0.33, "Not exactly useless as the dataset exists.");
  } else {
    // available to the public.
    return new Bukas.Score(1, "Available to everyone.");
  }
}