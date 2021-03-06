$(document).ready(function () {
    'use strict';

    // tai SDK khong dong do
    (function (d) {
        var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement('script'); js.id = id; js.async = true;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        ref.parentNode.insertBefore(js, ref);

    }(document));

    window.fbAsyncInit = function () {
        FB.init({
            appId: '1974007189550279', // ID cua App da tao
            status: true, // Kiem tra trang thai login
            cookie: true, // Cho phep cookies luu lai thong tin cua nguoi dung cho lan sau
            xfbml: true,  // phan tich XFBML
            version: 'v2.11'
        });
    };

    function Login() {
        FB.login(function (response) {
            if (response.authResponse) {
                getFacebookUserInfo();
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, {
                scope: 'email,user_photos,publish_actions'
            });
    }

    function getFacebookUserInfo() {
        FB.api('/me?fields=email,name', function (response) {
            var token = $('input[name="__RequestVerificationToken"]').val();
            $.ajax({
                url: "/Home/Login",
                headers: { "__RequestVerificationToken": token },
                type: "POST",
                data: { 'name': response.name, 'email': response.email },
                success: function (data) {
                    if (data.success === "True") {
                        location.reload();
                    }
                },
                error: function (data) {
                    console.log(data);
                }
            })
        });
    }

    function Logout() {
        FB.logout(function () { document.location.reload(); });
    }


    $('.lbtSignInFacebook').click(function () {
        Login();
    })

    $('.lbtLogOutFacebook').click(function () {
        Logout();
        var token = $('input[name="__RequestVerificationToken"]').val();
        $.ajax({
            url: "/Home/LogOut",
            headers: { "__RequestVerificationToken": token },
            type: "POST",
            success: function (data) {
                if (data.success === "True") {
                    location.reload();
                }
            },
            error: function (data) {
                console.log(data);
            }
        })
    })
});