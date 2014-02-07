function Controller() {
    function bofffContactsFadeOut() {
        animation.fadeAndRemove($.view_bofffContacts, 200, $.view_bofffContacts);
    }
    function openProfile() {
        var params = {
            fname: "Ahmad",
            lname: "Amin",
            phone_number: "01151162280",
            password: "test"
        };
        var url = "http://bofffme.com/api/index.php/home/insert/eslam/user_accounts";
        var xhr = Ti.Network.createHTTPClient({
            onload: function() {
                alert(this.responseText);
                var response = JSON.parse(this.responseText);
                alert(response);
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
        xhr.open("POST", url);
        xhr.send(params);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "bofffsList";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.view_bofffContacts = Ti.UI.createView({
        backgroundColor: "white",
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        layout: "vertical",
        id: "view_bofffContacts"
    });
    $.__views.view_bofffContacts && $.addTopLevelView($.__views.view_bofffContacts);
    $.__views.lbl_bofffContacts = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: "30dp",
        color: "blue",
        font: {
            fontSize: "20dp",
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        left: "5dp",
        text: "my bofffs",
        id: "lbl_bofffContacts"
    });
    $.__views.view_bofffContacts.add($.__views.lbl_bofffContacts);
    bofffContactsFadeOut ? $.__views.lbl_bofffContacts.addEventListener("click", bofffContactsFadeOut) : __defers["$.__views.lbl_bofffContacts!click!bofffContactsFadeOut"] = true;
    var __alloyId64 = {};
    var __alloyId66 = [];
    var __alloyId67 = {
        type: "Ti.UI.ImageView",
        bindId: "pic",
        properties: {
            width: "50dp",
            height: "50dp",
            left: 0,
            bindId: "pic"
        }
    };
    __alloyId66.push(__alloyId67);
    var __alloyId68 = {
        type: "Ti.UI.Label",
        bindId: "textLabel",
        properties: {
            width: Ti.UI.SIZE,
            height: "30dp",
            color: "#000",
            font: {
                fontSize: "20dp",
                fontFamily: "Helvetica Neue"
            },
            textAlign: "left",
            left: "60dp",
            top: 0,
            bindId: "textLabel"
        }
    };
    __alloyId66.push(__alloyId68);
    var __alloyId65 = {
        properties: {
            height: "56dp",
            name: "template1"
        },
        childTemplates: __alloyId66
    };
    __alloyId64["template1"] = __alloyId65;
    $.__views.listSection_bofffContacts = Ti.UI.createListSection({
        id: "listSection_bofffContacts"
    });
    var __alloyId70 = [];
    __alloyId70.push($.__views.listSection_bofffContacts);
    $.__views.list_bofffContacts = Ti.UI.createListView({
        sections: __alloyId70,
        templates: __alloyId64,
        id: "list_bofffContacts",
        defaultItemTemplate: "template1"
    });
    $.__views.view_bofffContacts.add($.__views.list_bofffContacts);
    openProfile ? $.__views.list_bofffContacts.addEventListener("itemclick", openProfile) : __defers["$.__views.list_bofffContacts!itemclick!openProfile"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var section = Ti.UI.createListSection({
        headerTitle: "Vegetables"
    });
    var sectionData = [ {
        template: "template1",
        textLabel: {
            text: "_data[i].fullName  "
        },
        properties: {
            itemId: "contactId"
        }
    } ];
    section.setItems(sectionData);
    var sections = [];
    sections.push(section);
    $.list_bofffContacts.sections = sections;
    arguments[0] || {};
    var animation = require("alloy/animation");
    __defers["$.__views.lbl_bofffContacts!click!bofffContactsFadeOut"] && $.__views.lbl_bofffContacts.addEventListener("click", bofffContactsFadeOut);
    __defers["$.__views.list_bofffContacts!itemclick!openProfile"] && $.__views.list_bofffContacts.addEventListener("itemclick", openProfile);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;