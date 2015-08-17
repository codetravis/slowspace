
  Meteor.startup(function () {
      Ships.remove({});
      Hulls.remove({});
      Turrets.remove({});
      Armory.remove({});
      var parsed_json = EJSON.parse(Assets.getText("hulls.json"));
      for (var hull in parsed_json) {
        //console.log(parsed_json[hull]);
        Hulls.insert(parsed_json[hull]);
      }
      var parsed_armory = EJSON.parse(Assets.getText("armory.json"));
      for (var unit in parsed_armory) {
        Armory.insert(parsed_armory[unit]);
      }
  });
  
  Meteor.methods({

    SetGame: function(game_id) { 
      // add userid to this later
      Ships.update({}, {$set: {game_id: game_id}}, {multi: true});
      return "ready";
    }

  });
