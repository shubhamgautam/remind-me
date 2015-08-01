
var Tiles = new Mongo.Collection("tiles");
if (Meteor.isServer){
  Meteor.methods({
       duckduckgo: function () {
           this.unblock();
           console.log("here");
           return HTTP.call("GET", "https://api.duckduckgo.com/?q=DuckDuckGo&format=json");
       }
   });

   JsonRoutes.add("get", "/testing", function (req, res, next) {
     var id = req.params.id;
     JsonRoutes.sendResult(res, 200, {"test":"successfull"});
  });
};
