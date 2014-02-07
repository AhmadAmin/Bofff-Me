function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __alloyId71 = [];
    $.__views.win_contactList = Ti.UI.createWindow({
        backgroundColor: "#fff",
        layout: "vertical",
        title: "Contacts",
        id: "win_contactList"
    });
    $.__views.view_container = Ti.UI.createView({
        backgroundColor: "transparent",
        height: Ti.UI.SIZE,
        id: "view_container"
    });
    $.__views.win_contactList.add($.__views.view_container);
    $.__views.tab1 = Ti.UI.createTab({
        icon: "/images/bofffios.png",
        title: "Contacts",
        window: $.__views.win_contactList,
        id: "tab1"
    });
    __alloyId71.push($.__views.tab1);
    $.__views.win_addContact = Ti.UI.createWindow({
        backgroundColor: "#fff",
        layout: "vertical",
        title: "Add Contact",
        id: "win_addContact"
    });
    $.__views.tab_addContact = Ti.UI.createTab({
        window: $.__views.win_addContact,
        title: "Tab 2",
        icon: "KS_nav_views.png",
        id: "tab_addContact"
    });
    __alloyId71.push($.__views.tab_addContact);
    $.__views.index = Ti.UI.createTabGroup({
        tabs: __alloyId71,
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    var view_bofffContacts = Alloy.createController("bofffsList").getView();
    var view_addContact = Alloy.createController("addContact").getView();
    $.win_addContact.add(view_addContact);
    var allContactsPayload = {
        mainWindow: $,
        view_bofffContacts: view_bofffContacts
    };
    var view_allContacts = Alloy.createController("allContactsList", allContactsPayload).getView();
    $.view_container.add(view_allContacts);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;