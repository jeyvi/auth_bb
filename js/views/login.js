// File: web/js/views/login.js
window.LoginView = Backbone.View.extend({

    initialize:function () {
        console.log('Initializing Login View');
         this.template = _.template(tpl.get('login'));
    },

    events: {
        "click #loginButton": "login",
        "click #logout": "logout"
    },

    render:function () {
        $(this.el).html(this.template());
        return this;
    },

    logout:function (event) {
        event.preventDefault(); // Don't let this button submit the form
        
        var url = 'http://localhost/api/logout/';
        console.log('Loggin out... ');
        

        $.ajax({
            url:url,
            type:'POST',
            dataType:"json",            
            success:function (data) {
                console.log(["Logout request details: ", data]);
               
               
                 window.location.replace('#');
              
            }
        });
    },

    login:function (event) {
        event.preventDefault(); // Don't let this button submit the form
        
        var url = 'http://localhost/api/login/';
        console.log('Loggin in... ');
        var formValues = {
            email: $('#inputEmail').val(),
            password: $('#inputPassword').val()
        };

        $.ajax({
            url:url,
            type:'POST',
            dataType:"json",
            data: formValues,
            success:function (data) {
                console.log(["Login request details: ", data]);
               
                if(data.error) {  // If there is an error, show the error messages
                    Materialize.toast(data.error.text, 4000)
                }
                else { // If not, send them back to the home page
                    window.location.replace('#list');
                }
            }
        });
    }
});
