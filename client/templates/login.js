Template.login.onRendered(function(){
  $('ul.tabs').tabs();

});

Template.login.events({
  'click .sign-up':function(evt){
    evt.preventDefault();

    var username = $('#signup .username').val(),
        email = $('#signup .email').val(),
        password = $('#signup .password').val();


    Accounts.createUser({username : username, email : email, password : password},function(err){
       if(err){
         return fail;
       }else{
         alert("added");
         Router.go("/")
         return true;
       }
    });



  },

  'click .login': function(evt){
    evt.preventDefault();
    alert('login');


    var email = $('#login .username').val(),
        password = $('#login .password').val();

    Meteor.loginWithPassword(email,password, function(err){
      if(err){
        alert("user logging failed");
      }else{
        alert("successfully logged in");
        Router.go("/")
        return true;
      }
    })

  }

})
