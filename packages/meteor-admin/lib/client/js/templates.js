var subs = new SubsManager({
    // maximum number of cache subscriptions
    cacheLimit: 10,
    // any subscription will be expire after 5 minute, if it's not subscribed again
    expireIn: 5
});
Template.AdminDashboardViewWrapper.rendered = function () {
    var node;
    node = this.firstNode;
    return this.autorun(function () {
        var data;
        data = Template.currentData();
        if (data.view) {
            Blaze.remove(data.view);
        }
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
        return data.view = Blaze.renderWithData(Template.AdminDashboardView, data, node);
    });
};

Template.AdminDashboardViewWrapper.destroyed = function () {
    return Blaze.remove(this.data.view);
};

Template.AdminDashboardView.rendered = function () {
    subs.subscribe("images");
    subs.subscribe("original");
    var filter, length, table;
    table = this.$('.dataTable').DataTable();
    filter = this.$('.dataTables_filter');
    length = this.$('.dataTables_length');
    filter.html('<div class="input-group"> <input type="search" class="form-control input-sm" placeholder="Search"></input> <div class="input-group-btn"> <button class="btn btn-sm btn-default"> <i class="fa fa-search"></i> </button> </div> </div>');
    length.html('<select class="form-control input-sm"> <option value="10">10</option> <option value="25">25</option> <option value="50">50</option> <option value="100">100</option> </select>');
    filter.find('input').on('keyup', function () {
        return table.search(this.value).draw();
    });
    return length.find('select').on('change', function () {
        return table.page.len(parseInt(this.value)).draw();
    });
};

Template.AdminDashboardNew.helpers({
    isAdmin: function(){
        var isUser = false;
        if(Meteor.userId)
            isUser = true;
        return isUser;
    },
    isAbout: function(){
        var isAbout = false;
        if(Roles.userIsInRole(Meteor.userId(), ['admin']) && Router.current().route._path === "/admin/NavTabs/about/collection")
            isAbout = true;
        return isAbout;
    },
    isIntro: function(){
        var isIntro = false;
        if(Roles.userIsInRole(Meteor.userId(), ['admin']) && Router.current().route._path === "/admin/NavTabs/nav/collection")
            isIntro = true;
        return isIntro;
    },
    isPageTitle: function(){
        var isTitle = false;
        if(Roles.userIsInRole(Meteor.userId(), ['admin']) && Router.current().route._path === "/admin/NavTabs/title/collection")
            isTitle = true;
        return isTitle;
    }
});


Template.AdminDashboardView.helpers({
    hasDocuments: function () {
        var ref;
        return ((ref = AdminCollectionsCount.findOne({
            collection: Session.get('admin_collection_name')
        })) != null ? ref.count : void 0) > 0;
    },
    newPath: function () {
        return Router.path('adminDashboard' + Session.get('admin_collection_name') + 'New');
    }
});

Template.adminEditBtn.helpers({
    path: function () {
        return Router.path("adminDashboard" + Session.get('admin_collection_name') + "Edit", {
            _id: this._id
        });
    }
});

// ---
// generated by coffee-script 1.9.2