import { Accounts } from "meteor/accounts-base"
/**
 * Fixture Users
 */

if(Meteor.users.find().count() === 0){
    let adminId = Accounts.createUser({
        profile: {
            name: "Admin"
        },
        username: "Admin",
        email: "lam@admin.com",
        password: "h1n2i3m4"
    });
    Roles.addUsersToRoles(adminId, 'admin');
}