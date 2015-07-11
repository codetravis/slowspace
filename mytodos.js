

Ships = new Mongo.Collection("ships");
Hulls = new Mongo.Collection("hulls");
Turrets = new Mongo.Collection("turrets");

if (Meteor.isClient) {
    Session.set("data", {});
    Template.body.helpers({
      ships: function () {
        return Ships.find({}, {sort: {createdAt: -1}} );
      },
      hulls: function () {
        return Hulls.find({}, {sort: {size: 1}});
      },
      turrets: function () {
        return Turrets.find({}, {sort: {value: -1}});
      },
      shipyard: function () {
        return Hulls.find({}, {sort: {name: 1}}).fetch();
      }
    });

  Template.hullinfo.helpers({
    getinfo: function () {
    return Hulls.findOne({name: Session.get("selected_name")});;
    }
  });

  Template.body.events({
    "submit .new-ship": function (event) {
      var name = event.target.name.value;
      var type = "";
      Ships.insert({
            name: name,
            type: type
      });
      // clear form
      event.target.name.value = "";

      return false;
    },
    "change #hull": function (event) {
      Session.set("selected_name", event.target.value);
    }
  });

  Template.ship.events({
    "click .toggle-checked": function() {
      Ships.update(this._id, {$set: {checked: ! this.checked}});
    },
    "click .delete": function() {
      Ships.remove(this._id);
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
      Ships.remove({});
      Hulls.remove({});
      Turrets.remove({});
      var parsed_json = EJSON.parse(Assets.getText("hulls.json"));
      for (var hull in parsed_json) {
        //console.log(parsed_json[hull]);
        Hulls.insert(parsed_json[hull]);
      }
      console.log(Hulls.find({}, {sort: {name: 1}}).fetch());
  });
}
