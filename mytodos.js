
Games = new Mongo.Collection("games");
Ships = new Mongo.Collection("ships");
Hulls = new Mongo.Collection("hulls");
Turrets = new Mongo.Collection("turrets");
Armory = new Mongo.Collection("armory");

Router.route('/', {
              name: 'home',
              template: 'home'
            });

Router.route('/register', {
              name: 'register',
              template: 'register'
            });

Router.route('/show_ship/:_id', {
              name: 'show_ship',
              template: 'show_ship',
              data: function() {
                var shipid = this.params._id;
                return Ships.findOne({_id: shipid});
              }
            });
Router.route('/add_turret/:_id', {
            name: 'add_turret',
            template: 'add_turret',
            data: function() {
              var shipid = this.params._id;
              return {_id: shipid};
            }
          });
Router.route('/game/:_id', {
            name: 'game',
            template: 'game'
          });
