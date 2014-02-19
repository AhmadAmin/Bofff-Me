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
    function findBofffs(contactNumber) {
        var url = "http://www.bofffme.com/api/index.php/home/";
        var xhr = Ti.Network.createHTTPClient({
            onload: function() {
                $.lbl_serverTest.text = "on load+" + contactNumber;
                var response = JSON.parse(this.responseText);
                "not found" != response && addFriend(response.rows[0].pin);
            },
            onerror: function() {
                $.lbl_serverTest.text = "ERROR+" + contactNumber;
            }
        });
        xhr.open("POST", url + "search_user_by/eslam/user_accounts/primary_mobile/" + contactNumber);
        xhr.send();
    }
    function addFriend(pin) {
        var url = "http://www.bofffme.com/api/index.php/home/";
        var xhr = Ti.Network.createHTTPClient({
            onload: function() {
                alert("friend added");
                JSON.parse(this.responseText);
            },
            onerror: function() {
                alert("didn't add friend");
            }
        });
        xhr.open("POST", url + "insert/eslam/user_friends");
        var params = {
            friend_of_user_pin_code: pin,
            pin_code: "a8e7fec219c1b9e33ecb340c197ad15c"
        };
        xhr.send(params);
    }
    function isEmpty(obj) {
        for (var key in obj) if (obj.hasOwnProperty(key)) return false;
        return true;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "contacts";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.contacts = Ti.UI.createView({
        layout: "vertical",
        id: "contacts"
    });
    $.__views.contacts && $.addTopLevelView($.__views.contacts);
    $.__views.lbl_serverTest = Ti.UI.createLabel({
        id: "lbl_serverTest"
    });
    $.__views.contacts.add($.__views.lbl_serverTest);
    var __alloyId12 = [];
    $.__views.scrollableview_mainContactsView = Ti.UI.createScrollableView({
        views: __alloyId12,
        showPagingControl: "true",
        id: "scrollableview_mainContactsView"
    });
    $.__views.contacts.add($.__views.scrollableview_mainContactsView);
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
    var contactsNumbers = [];
    var mobileNumbers;
    var expression = /^\d+$/;
    for (var contact in sortedContacts) {
        mobileNumbers = sortedContacts[contact].getPhone();
        if (!isEmpty(mobileNumbers)) for (var i in mobileNumbers) for (var x in mobileNumbers[i]) {
            var trimmedNumber = "";
            if (expression.test(mobileNumbers[i][x])) trimmedNumber = mobileNumbers[i][x]; else for (var character in mobileNumbers[i][x]) expression.test(mobileNumbers[i][x][character]) && (trimmedNumber += mobileNumbers[i][x][character]);
            contactsNumbers.push(trimmedNumber);
        }
    }
    for (var number in contactsNumbers) findBofffs(contactsNumbers[number]);
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