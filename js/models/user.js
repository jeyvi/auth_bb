// Models
window.User = Backbone.Model.extend({
    urlRoot:"http://localhost/api/users/",
    defaults:{
        "user_id":null,
        "user_name":"",
        "user_custom":"",
        "email":"",
        "register_date":(new Date().toISOString()),
        "balance":0,
        "enabled":false
    },    
    idAttribute: "user_id"
});
 
window.UserList = Backbone.Collection.extend({
    model:User,
    url:"http://localhost/api/users/",
	parse: function(resp, xhr) {
		return resp.data;
	}
});