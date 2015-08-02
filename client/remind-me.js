var Tiles = new Mongo.Collection("tiles");

Tiles.allow({
      insert: function () {
         return true;
       },
      update: function () {
         return true;
      },
      remove: function () {
         return true;
      }
  });
if (Meteor.isClient) {
  // counter starts at 0
  value=0;

  Meteor.startup(function(){
    $(document).ready(function(){
        $('ul.tabs').tabs();
    });
  });

  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });

  Template.Home.helpers({
    tiles:function(){
      return Tiles.find({},{sort:{createdAt:-1}});

    }
  })

  Template.body.events({

  });
  Template.add.events({
    "click .submit-tile" : function(evt){
      evt.preventDefault();
      var tileName = $("#name").val();
      var tileVal = $("#val").val();

      Tiles.insert({
        tileName : tileName,
        tileVal : tileVal,
        owner: Meteor.userId(),           // _id of logged in user
        username: Meteor.user().username , // username of logged in user
        createdAt : new Date()
      });

      $("#name").val("");
      $("#val").val("");
    }
  })


  Template.header.events({
    'click button': function(){
      Router.go("login");

    }
  });

  Template.tileItem.events({
    "click .toggled-check": function(){
        Tiles.update(this._id,{
           $set:{checked: !this.checked}
        });
    },

    "click .delete": function(){
      Tiles.remove(this._id);
    },

    "click .tile1": function(evt){
       var targetElem = evt.target;
       $(targetElem).toggle();
       $(targetElem).siblings('.tile2').toggle();
    },

    "click .tile2": function(evt){
       var targetElem = evt.target;
       $(targetElem).toggle();
       $(targetElem).siblings('.tile1').toggle();
    }
  })

  Template.tileItem.onRendered(function(){
    if(value<=0){
    Meteor.call("duckduckgo", function(error, results) {
          console.log(results.content); //results.data should be a JSON object
          var duckObj =JSON.parse(results.content);

          // for(var x in duckObj.RelatedTopics){
          //       if(x == 0){
          //         Tiles.insert({
          //           tileName : duckObj.RelatedTopics[x].Text,
          //           tileVal : duckObj.RelatedTopics[x].FirstURL,
          //           createdAt : new Date()
          //         });
          //       }
          //       break;
          // }

      });
    };
    value++;

    HTTP.get("testing","",function(req,res){
    })
  });
 //
  Accounts.ui.config({
   passwordSignupFields: "USERNAME_ONLY"
 });

}
