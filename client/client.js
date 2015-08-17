
  Template.home.helpers({
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

  Template.show_ship.helpers({
    turrets: function() {
      return Turrets.find({ship_id: this._id});
    }
  });

  Template.add_turret.helpers({
    armory: function() {
      return Armory.find({}, {sort: {value: -1}});
    }
  });

  Template.game.helpers({
    ships: function() {
      // need to get just this users ships
      var game_id = Router.current().params._id;
      return Ships.find({game_id: game_id});
    }
  });

  Template.register.events({
    'submit form': function(event) {
      event.preventDefault();
      var email = $('[name=email]').val();
      var password = $('[name=password]').val();
      Accounts.createUser({
        email: eamil,
        password: password
      });
      Router.go('home');
    }
  });

  Template.home.events({
    "submit #new-ship": function (event) {
      var ship_name = event.target.name.value;
      console.log(ship_name);
      if (ship_name !== "") {
        Ships.insert({
              name: ship_name,
              hull: event.target.hull_name.value,
              speed: event.target.hull_speed.value,
              armor: event.target.hull_armor.value,
              shield: event.target.hull_shield.value,
              battery: event.target.hull_battery.value,
              generator: event.target.hull_generator.value,
              hardpoints: event.target.hull_hardpoints.value,
              charge: 0
        });
      }
      // clear form
      event.target.name.value = "";
      $("#hull").selectedIndex = 0;

      return false;
    },
    "change #hull": function (event) {
      Session.set("selected_name", event.target.value);
    },
    "click #start_game": function (event) {
      // insert new game into db
      var game_id = Games.insert({});
      // give all ships for this user, the game id
      Meteor.call('SetGame', game_id);
      // go to game page for game id
      window.location.href = "game/" + game_id;
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

  Template.show_ship.events({
      "click #add_turret": function() {
        window.location.href = "../add_turret/" + this._id;
      },
      "click #shipyard": function() {
        window.location.href = "../";
      }
  });

  Template.add_turret.events({
    "submit form": function (event) {
      var ship_id = Router.current().params._id;
      console.log(ship_id);
      var max_turrets = Ships.findOne({_id: ship_id});
      var turret_count = Turrets.find({ship_id: ship_id}).fetch().length;
      console.log("max: " + max_turrets.hardpoints + " " + ship_id);
      console.log("current: " + turret_count);
      if ( turret_count < max_turrets.hardpoints) {
        Turrets.insert({
                  ship_id: $('#ship_id').val(),
                  name: event.target.name.value,
                  type: event.target.type.value,
                  power: event.target.power.value,
                  range: event.target.range.value,
                  code: event.target.code.value,
                  battery: event.target.battery.value
                  });
      }
    },
    "click #exit_armory": function (event) {
      window.location.href = "../show_ship/" + this._id;
    }
  });
