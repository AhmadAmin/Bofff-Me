function Controller() {
    function changeRightNavButton() {
        var currentView = $.scrollableview_mainContactsView.getCurrentPage();
        args.win_boffsList.rightNavButton = 1 == currentView ? myBofffsButton : allContactsButton;
    }
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
    var __defers = {};
    var __alloyId12 = [];
    $.__views.scrollableview_mainContactsView = Ti.UI.createScrollableView({
        views: __alloyId12,
        showPagingControl: "true",
        id: "scrollableview_mainContactsView"
    });
    $.__views.scrollableview_mainContactsView && $.addTopLevelView($.__views.scrollableview_mainContactsView);
    changeRightNavButton ? $.__views.scrollableview_mainContactsView.addEventListener("scrollend", changeRightNavButton) : __defers["$.__views.scrollableview_mainContactsView!scrollend!changeRightNavButton"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var allContactsButton = Titanium.UI.createButton({
        title: "all contacts"
    });
    var myBofffsButton = Titanium.UI.createButton({
        title: "my bofffs"
    });
    args.win_boffsList.rightNavButton = allContactsButton;
    allContactsButton.addEventListener("click", function() {
        $.scrollableview_mainContactsView.scrollToView(1);
    });
    myBofffsButton.addEventListener("click", function() {
        $.scrollableview_mainContactsView.scrollToView(0);
    });
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
    __defers["$.__views.scrollableview_mainContactsView!scrollend!changeRightNavButton"] && $.__views.scrollableview_mainContactsView.addEventListener("scrollend", changeRightNavButton);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;