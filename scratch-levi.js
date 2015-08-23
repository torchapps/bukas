Papa.parse("adiaug2015.csv", {
  download: true,
  header: true,
  complete: function (results, file){
    console.log(results.data, _, Set);
    const disclosiveValues = new Set(
      results.data.map(function(dataset){
        return dataset.disclosive
      })
    )

    const assessDisclosiveValue = function(disclosive) {
      if (disclosive.match(/\d{4}-\d{4}/)){
        return disclosive.split("-").map(function(year){
          return _.parseInt(year);
        });
      }
    }

    function processDisclosive(disclosive) {
      if (disclosive === "-") {
        return null;
      } else if (disclosive.match(/\d{4}-\d{4}/)){
        return disclosive.split("-").map(function(year){
          return _.parseInt(year);
        });
      } else {
        return disclosive;
      }
    }

    console.log(disclosiveValues);

    disclosiveValues.forEach(function(d){console.log(processDisclosive(d))});
  }
});