import { Template } from 'meteor/templating'
import { Meteor } from "meteor/meteor"
import './header.html'

Template.header.events({
    "click .userbox": function (e, t) {
        var button = t.$('.userbox');
        var box = t.$('.user_box_action');
        box.toggle();
        button.toggleClass('active');
    },
    "click .logout": function (e, t) {
        Meteor.logout();
    }
});