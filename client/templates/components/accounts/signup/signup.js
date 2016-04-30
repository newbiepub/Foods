import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import "./signup.html"

Template.signup.onRendered(function () {
    var signup_form = $("#signup_form");
    if(signup_form.length){
        let validator = signup_form.validate({
            submitHandler: function(events){
                let fullname = $('[name=fullname]').val();
                let email = $('[name=email]').val();
                let password = $('[name=password]').val();
                let user = {'email': email, password: password, profile: {name: fullname}};
                Accounts.createUser(user, function(err) {
                    if (!err) {
                        Meteor.loginWithPassword(user.email, user.password, function(errors){
                            if(!errors){                               
                                Router.go("/")
                            }
                        })
                    } else {
                        if (err.reason == "Email already exists.") {
                            validator.showErrors({
                                email: i18n('form.email_exist')
                            });
                        }
                    }
                });
       
            }
        })
    }
});

Template.signup.events({
    "submit form": function(e, t){
        e.preventDefault();
    }
})