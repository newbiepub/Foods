import { Router } from 'meteor/iron:router'

Router.configure({
    layoutTemplate: "layout"
});

Router.route("/",{
   template: "home",
    name: "home"
});

Router.route("/login", {
    template: "login",
    name: "login"
});

Router.route("/signup",{
    name: "signup"
});
