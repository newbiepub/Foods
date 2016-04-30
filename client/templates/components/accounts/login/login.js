import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { $ } from 'meteor/jquery'
import { Mongo } from 'meteor/mongo'
import './login.html'

Template.login.events({
    'submit form': function (e, t) {
        e.preventDefault();
    }
});

Template.login.onRendered(function () {
    var instance = this;
    var login_form = $("#login_form");
    if (login_form.length) {
        var validator = login_form.validate({
            submitHandler: function (e) {
                let email = instance.$('[name="email"]').val();
                let password = instance.$('[name="password"]').val();
               
               // Meteor login
                Meteor.loginWithPassword(email, password, function (err) {
                    if (!err) {
                        if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
                            Router.go("/admin");
                        } else {
                            Router.go("/");
                        }
                    } else {
                        if (err.reason == "User not found") {
                            validator.showErrors({
                                email: i18n('form.email_not_found')
                            });
                        }
                        if (err.reason == "Incorrect password") {
                            validator.showErrors({
                                password: i18n('form.password_error')
                            });
                        }
                    }
                })
            }
        })
    }

})