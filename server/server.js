
  Meteor.startup(function () {
      Ships.remove({});
      Hulls.remove({});
      Turrets.remove({});
      var parsed_json = EJSON.parse(Assets.getText("hulls.json"));
      for (var hull in parsed_json) {
        //console.log(parsed_json[hull]);
        Hulls.insert(parsed_json[hull]);
      }
  });
