Template.registerHelper("objToPairs", function(obj) {
  return _.map(obj, function(value,key){
    return {
      key: key,
      value: value
    };
  });
});
