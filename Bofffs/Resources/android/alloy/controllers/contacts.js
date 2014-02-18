function Controller() {
    function addressBookDisallowed() {
        alert("Failed");
    }
    function performAddressBookFunction() {
        var contacts = Ti.Contacts.getAllPeople();
        sortedContacts = [];
        for (var x = 0; contacts.length > x; x++) sortedContacts.push(contacts[x]);
        sortedContacts.sort(sort);
    }
    function sort(a, b) {
        if (a.fullName.toUpperCase() > b.fullName.toUpperCase()) return 1;
        if (a.fullName.toUpperCase() < b.fullName.toUpperCase()) return -1;
        return 0;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "contacts";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __alloyId12 = [];
    $.__views.scrollableview_mainContactsView = Ti.UI.createScrollableView({
        views: __alloyId12,
        showPagingControl: "true",
        id: "scrollableview_mainContactsView"
    });
    $.__views.scrollableview_mainContactsView && $.addTopLevelView($.__views.scrollableview_mainContactsView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    Ti.Contacts.contactsAuthorization == Ti.Contacts.AUTHORIZATION_AUTHORIZED ? performAddressBookFunction() : Ti.Contacts.contactsAuthorization == Ti.Contacts.AUTHORIZATION_UNKNOWN ? Ti.Contacts.requestAuthorization(function(e) {
        e.success ? performAddressBookFunction() : addressBookDisallowed();
    }) : addressBookDisallowed();
    var sortedContacts;
    Ti.Contacts.addEventListener("reload", function() {
        var contacts = Ti.Contacts.getAllPeople();
        sortedContacts = [];
        for (var x = 0; contacts.length > x; x++) sortedContacts.push(contacts[x]);
        sortedContacts.sort(sort);
    });
    var payload = {
        mainView: $.scrollableview_mainContactsView,
        sortedContacts: sortedContacts
    };
    var allContacts = Alloy.createController("allContacts", payload);
    var bofffsContacts = Alloy.createController("bofffsContacts", payload);
    $.scrollableview_mainContactsView.addView(bofffsContacts.getView());
    $.scrollableview_mainContactsView.addView(allContacts.getView());
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;