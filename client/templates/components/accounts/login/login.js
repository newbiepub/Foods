import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { $ } from 'meteor/jquery'
import './login.html' 

Template.login.events({
    'submit form' : function (e, t) {
        e.preventDefault();
        let email = t.$('[name="username"]').val();
        let password = t.$('[name="password"]').val();
       Meteor.loginWithPassword(email, password, function(err){
           console.log(err);
           if(!err){
               console.log(Meteor.user());
               Router.go("/admin");
           }
       })
    }
})

Template.login.helpers({
    
})