function Controller() {
    function importImage() {
        $.img_contactImage.image = contact.getImage();
        if (null == $.img_contactImage.image) {
            $.img_contactImage.width = 0;
            $.img_contactImage.height = 0;
        } else {
            $.img_contactImage.width = "80dp";
            $.img_contactImage.height = "80dp";
        }
    }
    function importNumbers() {
        var mobileNumbers = contact.getPhone();
        $.view_dynamicLabels.removeAllChildren();
        if (!isEmpty(mobileNumbers)) {
            var lbl_Invite = Alloy.createController("label").getView();
            lbl_Invite.text = "Invite " + contact.getFullName() + " to Bofff Me";
            lbl_Invite.addEventListener("click", function() {
                inviteOrCall = "invite";
                openDialog();
            });
            var lbl_Call = Alloy.createController("label").getView();
            lbl_Call.text = "You can reach " + contact.getFullName() + " at:";
            $.view_dynamicLabels.add(lbl_Invite);
            $.view_dynamicLabels.add(lbl_Call);
            for (var i in mobileNumbers) for (var x in mobileNumbers[i]) {
                var lbl_Number = Alloy.createController("label").getView();
                lbl_Number.addEventListener("click", function(e) {
                    inviteOrCall = "call";
                    numberToCall = e.source.text;
                    openDialog();
                });
                lbl_Number.text = mobileNumbers[i][x];
                $.view_dynamicLabels.add(lbl_Number);
            }
        }
    }
    function isEmpty(obj) {
        for (var key in obj) if (obj.hasOwnProperty(key)) return false;
        return true;
    }
    function enlargeImage(e) {
        if (imageEnlarged) {
            e.source.width = "80dp";
            e.source.height = "80dp";
            imageEnlarged = false;
        } else {
            e.source.width = "160dp";
            e.source.height = "160dp";
            imageEnlarged = true;
        }
    }
    function openDialog() {
        if ("invite" == inviteOrCall) {
            $.dialog.buttonNames = [ "Invite", "Cancel" ], $.dialog.message = "Do you want to invite " + contact.getFullName();
            0/0;
            $.dialog.show();
        } else if ("call" == inviteOrCall) {
            $.dialog.buttonNames = [ "Call", "Cancel" ], $.dialog.message = "Are you sure want to call " + contact.getFullName() + " on this number: " + numberToCall + " ?";
            $.dialog.show();
        }
    }
    function dialog_Click(e) {
        if (0 == e.index) if ("invite" == inviteOrCall) alert("inviting"); else if ("call" == inviteOrCall) {
            alert("calling");
            callContact(numberToCall);
        }
    }
    function callContact(e) {
        e = e.replace(/\s+/g, "");
        Ti.Platform.openURL("tel:" + e);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "contactInfo";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win_contactInfo = Ti.UI.createWindow({
        id: "win_contactInfo",
        title: "Contact Info",
        navTintColor: "#2279bc",
        backgroundColor: "white"
    });
    $.__views.win_contactInfo && $.addTopLevelView($.__views.win_contactInfo);
    $.__views.view_container = Ti.UI.createScrollView({
        layout: "vertical",
        id: "view_container"
    });
    $.__views.win_contactInfo.add($.__views.view_container);
    $.__views.img_contactImage = Ti.UI.createImageView({
        left: 10,
        top: "30",
        id: "img_contactImage"
    });
    $.__views.view_container.add($.__views.img_contactImage);
    enlargeImage ? $.__views.img_contactImage.addEventListener("click", enlargeImage) : __defers["$.__views.img_contactImage!click!enlargeImage"] = true;
    $.__views.view_dynamicLabels = Ti.UI.createView({
        layout: "vertical",
        id: "view_dynamicLabels"
    });
    $.__views.view_container.add($.__views.view_dynamicLabels);
    $.__views.dialog = Ti.UI.createAlertDialog({
        id: "dialog",
        title: "Confirm"
    });
    dialog_Click ? $.__views.dialog.addEventListener("click", dialog_Click) : __defers["$.__views.dialog!click!dialog_Click"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var contact = args.contact;
    var prevButton = Titanium.UI.createButton({
        title: "Back"
    });
    prevButton.addEventListener("click", function() {
        $.win_contactInfo.close();
    });
    $.win_contactInfo.leftNavButton = prevButton;
    $.win_contactInfo.title = contact.getFullName();
    var inviteOrCall;
    var numberToCall;
    importImage();
    importNumbers();
    var imageEnlarged = false;
    __defers["$.__views.img_contactImage!click!enlargeImage"] && $.__views.img_contactImage.addEventListener("click", enlargeImage);
    __defers["$.__views.dialog!click!dialog_Click"] && $.__views.dialog.addEventListener("click", dialog_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;