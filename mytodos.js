

Ships = new Mongo.Collection("ships");
Hulls = new Mongo.Collection("hulls");
Turrets = new Mongo.Collection("turrets");

Router.route('/', {
              template: 'home'
            });
Router.route('/show_ship/:_id', {
              template: 'show_ship',
              data: function() {
                var shipid = this.params._id;
                return Ships.findOne({_id: shipid});
              }
            });
