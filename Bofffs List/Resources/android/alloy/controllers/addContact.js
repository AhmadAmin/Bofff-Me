function Controller() {
    function sendData() {
        var url = "http://www.bofffme.com/api/index.php/home/";
        var xhr = Ti.Network.createHTTPClient({
            onload: function() {
                alert(this.responseText);
                var response = JSON.parse(this.responseText);
                alert(response.rows);
            },
            onerror: function() {
                Ti.UI.createAlertDialog({
                    title: "Error",
                    message: "Check your internet connection.",
                    cancel: 0,
                    buttonNames: [ "Ok" ]
                }).show();
            }
        });
        xhr.open("POST", url + "send_invite_msg/");
        ({
            fname: $.txt_firstName.value,
            lname: $.txt_lastName.value,
            phone_number: $.txt_phoneNumber.value,
            mails: $.txt_mails.value,
            social_links: $.txt_socialLinks.value,
            profile_picture: $.img_profilePicture.image,
            password: "01024255",
            mails_privacy: $.txt_mailsPrivacy.value,
            social_links_privacy: $.txt_profilePicturePrivacy.value,
            profile_picture_privacy: $.txt_socialLinksPrivacy.value
        });
        var msgParams = {
            mobile: "201151162280",
            message: $.txt_firstName.value + " " + $.txt_lastName.value + " has just joined bofff me and he can't wait untill you become a bofff too join him and download the app at: http://www.bofffme.com"
        };
        xhr.send(msgParams);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "addContact";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.addContact = Ti.UI.createScrollView({
        backgroundColor: "#fff",
        layout: "vertical",
        width: Ti.UI.FULL,
        height: Ti.UI.FULL,
        id: "addContact"
    });
    $.__views.addContact && $.addTopLevelView($.__views.addContact);
    $.__views.view_firstName = Ti.UI.createView({
        backgroundColor: "transparent",
        layout: "horizontal",
        width: Ti.UI.FULL,
        height: Ti.UI.SIZE,
        top: 10,
        id: "view_firstName"
    });
    $.__views.addContact.add($.__views.view_firstName);
    $.__views.txt_firstName = Ti.UI.createTextField({
        left: "20",
        textAlign: "left",
        width: "50%",
        id: "txt_firstName",
        value: "Ahmed",
        hintText: "first name"
    });
    $.__views.view_firstName.add($.__views.txt_firstName);
    $.__views.view_lastName = Ti.UI.createView({
        backgroundColor: "transparent",
        layout: "horizontal",
        width: Ti.UI.FULL,
        height: Ti.UI.SIZE,
        top: 10,
        id: "view_lastName"
    });
    $.__views.addContact.add($.__views.view_lastName);
    $.__views.txt_lastName = Ti.UI.createTextField({
        left: "20",
        textAlign: "left",
        width: "50%",
        id: "txt_lastName",
        value: "Atif",
        hintText: "last name"
    });
    $.__views.view_lastName.add($.__views.txt_lastName);
    $.__views.view_phoneNumber = Ti.UI.createView({
        backgroundColor: "transparent",
        layout: "horizontal",
        width: Ti.UI.FULL,
        height: Ti.UI.SIZE,
        top: 10,
        id: "view_phoneNumber"
    });
    $.__views.addContact.add($.__views.view_phoneNumber);
    $.__views.txt_phoneNumber = Ti.UI.createTextField({
        left: "20",
        textAlign: "left",
        width: "50%",
        id: "txt_phoneNumber",
        value: "0020109091995",
        hintText: "phone number"
    });
    $.__views.view_phoneNumber.add($.__views.txt_phoneNumber);
    $.__views.view_mails = Ti.UI.createView({
        backgroundColor: "transparent",
        layout: "horizontal",
        width: Ti.UI.FULL,
        height: Ti.UI.SIZE,
        top: 10,
        id: "view_mails"
    });
    $.__views.addContact.add($.__views.view_mails);
    $.__views.txt_mails = Ti.UI.createTextField({
        left: "20",
        textAlign: "left",
        width: "50%",
        id: "txt_mails",
        value: "ahmed.atif15@gmail.com",
        hintText: "mails"
    });
    $.__views.view_mails.add($.__views.txt_mails);
    $.__views.txt_mailsPrivacy = Ti.UI.createTextField({
        left: "70%",
        hintText: "Privacy",
        id: "txt_mailsPrivacy",
        value: "friends"
    });
    $.__views.view_mails.add($.__views.txt_mailsPrivacy);
    $.__views.view_socialLinks = Ti.UI.createView({
        backgroundColor: "transparent",
        layout: "horizontal",
        width: Ti.UI.FULL,
        height: Ti.UI.SIZE,
        top: 10,
        id: "view_socialLinks"
    });
    $.__views.addContact.add($.__views.view_socialLinks);
    $.__views.txt_socialLinks = Ti.UI.createTextField({
        left: "20",
        textAlign: "left",
        width: "50%",
        id: "txt_socialLinks",
        value: "https://www.facebook.com/zabadyy",
        hintText: "social links"
    });
    $.__views.view_socialLinks.add($.__views.txt_socialLinks);
    $.__views.txt_socialLinksPrivacy = Ti.UI.createTextField({
        left: "70%",
        hintText: "Privacy",
        id: "txt_socialLinksPrivacy",
        value: "public"
    });
    $.__views.view_socialLinks.add($.__views.txt_socialLinksPrivacy);
    $.__views.view_profilePicture = Ti.UI.createView({
        backgroundColor: "transparent",
        layout: "horizontal",
        width: Ti.UI.FULL,
        height: Ti.UI.SIZE,
        top: 10,
        id: "view_profilePicture"
    });
    $.__views.addContact.add($.__views.view_profilePicture);
    $.__views.img_profilePicture = Ti.UI.createImageView({
        width: 100,
        height: 100,
        left: 20,
        backgroundColor: "red",
        id: "img_profilePicture"
    });
    $.__views.view_profilePicture.add($.__views.img_profilePicture);
    $.__views.txt_profilePicturePrivacy = Ti.UI.createTextField({
        left: "70%",
        hintText: "Privacy",
        id: "txt_profilePicturePrivacy",
        value: "favorites"
    });
    $.__views.view_profilePicture.add($.__views.txt_profilePicturePrivacy);
    $.__views.view_btnConfirm = Ti.UI.createView({
        backgroundColor: "transparent",
        layout: "horizontal",
        width: Ti.UI.FULL,
        height: Ti.UI.SIZE,
        top: 10,
        id: "view_btnConfirm"
    });
    $.__views.addContact.add($.__views.view_btnConfirm);
    $.__views.btn_confirm = Ti.UI.createButton({
        id: "btn_confirm",
        title: "confirm",
        left: "20"
    });
    $.__views.view_btnConfirm.add($.__views.btn_confirm);
    sendData ? $.__views.btn_confirm.addEventListener("click", sendData) : __defers["$.__views.btn_confirm!click!sendData"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.img_profilePicture.addEventListener("click", function() {
        photosOption.show();
    });
    var photosOption = Ti.UI.createOptionDialog({
        title: "Select ?",
        options: [ "Take Photo", "Choose from Library", "Cancel" ],
        cancel: 2
    });
    photosOption.addEventListener("click", function(e) {
        if (!e.hasOwnProperty("index")) return;
        0 == e.index ? Ti.Media.showCamera({
            success: function(event) {
                event.cropRect;
                event.media;
                Ti.API.debug("Our type was: " + event.mediaType);
                event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO ? $.img_profilePicture.image = event.media : alert("got the wrong type back =" + event.mediaType);
            },
            cancel: function() {},
            error: function(error) {
                var a = Ti.UI.createAlertDialog({
                    title: "Camera",
                    buttonNames: [ "Ok" ]
                });
                error.code == Ti.Media.NO_CAMERA ? a.setMessage("Please run this test on device") : a.setMessage("Unexpected error: " + error.code);
                a.show();
            },
            saveToPhotoGallery: true,
            allowEditing: true,
            mediaTypes: [ Ti.Media.MEDIA_TYPE_PHOTO ]
        }) : 1 == e.index && Ti.Media.openPhotoGallery({
            success: function(event) {
                event.cropRect;
                var image = event.media;
                alert(image.width);
                alert(image.height);
                image.width = "50%";
                image.height = "auto";
                alert(image.width);
                alert(image.height);
                $.img_profilePicture.image = image;
            },
            cancel: function() {},
            error: function() {},
            allowEditing: true,
            mediaTypes: [ Ti.Media.MEDIA_TYPE_PHOTO ]
        });
    });
    __defers["$.__views.btn_confirm!click!sendData"] && $.__views.btn_confirm.addEventListener("click", sendData);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;