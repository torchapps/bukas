function fif (cond, ifres, elseres) {
  // functional if

  return cond ? ifres : elseres;
}

dataPromise.then(function(results){
  console.log(results);

  const evaluateFileFormats = function(fileFormats){
    // fileFormats: Array

    /*
    
    csv is valuable, excel also, but a little less, since prone to stupid shit like merged cells.
    fuck powerpoint. pdf is not really usable.

    then, how do you evaluate the value of a specific dataset?

    we can assume that if the dataset is available in an open format, like csv or some kind of relational table, mission accomplished.
    An agency having a pdf on top of a csv has no added value, because we're operating on an open data framework.
    so, as soon as open data is reached, give the dataset as a whole, 100%.
  
    Only when a file format has less than ideal formats do we have to evaluate their value.
    Excel value gets a high score, since there's a high compatibility between that and CSVs.

    Is there value in having multiple unusable datasets? powerpoint + pdf scans?

    */
    //console.log(fileFormats);
    var val;

    if (fileFormats.has("CSV") || fileFormats.has("API")) {
      val = 1;
    } else if (fileFormats.has("Excel") || fileFormats.has("XML")) {
      val = 0.8;
    } else if (fileFormats.has("HTML")) {
      val = 0.3;
    } else if (fileFormats.has("PDF")) {
      val = 0.2;
    } else {
      val = 0;
    }

    return val
  }

  const fullDisclosiveScore = new Bukas.Score(results
    .entries
    .map(Bukas.scoreDisclosive)
    .reduce(function(acc, score) {
      return acc.add(score);
    }).value / results.entries.length,
    "Availability score. A score of 1.0 means all the datasets are available to the public."
  );

  const onlinePubScore = new Bukas.Score(_.chain(results.entries)
    .pluck("onlinePub")
    .compact()
    .value()
    .length / results.entries.length,
    "Fraction of all entries that are published or are slated for publishing online"
  );

  const fileFormatScore = _.chain(results.entries)
    .map(function(entry){
      return evaluateFileFormats(entry.fileFormats);
    })
    .reduce(_.add.bind(_))
    // .filter(function(entry){
    //   return _.contains(entry.fileFormats, "CSV")
    // })
    // .pluck("fileFormats")
    .value() / results.entries.length;

  console.log(fileFormatScore);

  // console.log(results.entries.filter(function(entry) {
  //   return entry.dateReleased > new Date();
  // }).length);
  console.log(results.entries);
})