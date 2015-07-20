
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
      return Hulls.findOne({name: Session.get("selected_name")});
    }
  });

  Template.body.events({
    "submit #new-ship": function (event) {
      var ship_name = event.target.name.value;
      console.log(ship_name);
      if (ship_name !== "") {
        Ships.insert({
              name: ship_name,
              hull: event.target.hull_name.value,
              speed: event.target.hull_speed.value,
              armor: event.target.hull_armor.value,
              battery: event.target.hull_battery.value,
              generator: event.target.hull_generator.value,
              hardpoints: event.target.hull_hardpoints.value
        });
      }
      // clear form
      event.target.name.value = "";
      $("#hull").selectedIndex = 0;

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
