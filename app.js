$.ajaxSetup({
    statusCode: {
        401: function(){
            // Redirec the to the login page.
            window.location.replace('#');
         
        },
        403: function() {
            // 403 -- Access denied
            window.location.replace('#');
        }
    }
});

var ApplicationRouter = Backbone.Router.extend({
	routes: {
        "":"list",
		"list": "list",
        "login": "login"
	},
	initialize: function() {
		this.headerView = new HeaderView();
		this.headerView.render();
        $(".button-collapse").sideNav();
	},

    login: function() {
        $('#content').html(new LoginView().render().el);
    },
 
    list:function () {
        this.userList = new UserList();
        
        $('#content').html(new LoginView().render().el).removeClass('logged');
        $('#sidebar').html('');
        this.userList.fetch({success: function() {
            $('#sidebar').html(new UserListView({model:app.userList}).render().el);
            $('#content').addClass('logged');
        }});
    },

    checkClass: function(callback) {
        if (this.userList) {
            if (callback) callback();
        } else {
            this.userList = new UserList();
       		this.userList.fetch({success: function() {
               $('#sidebar').html( new UserListView({model: app.userList}).render().el );
               if (callback) callback();
            }});
        }
    }
});


tpl.loadTemplates(['header', 'item', 'login'], function() {
	window.app = new ApplicationRouter();
	Backbone.history.start();
});


