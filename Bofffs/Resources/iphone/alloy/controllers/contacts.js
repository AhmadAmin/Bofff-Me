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
        sortedContacts.sort(sortContacts);
    }
    function sortContacts(a, b) {
        if (a.fullName.toUpperCase() > b.fullName.toUpperCase()) return 1;
        if (a.fullName.toUpperCase() < b.fullName.toUpperCase()) return -1;
        return 0;
    }
    function sortBofffs(a, b) {
        if (a["bofff"].fullName.toUpperCase() > b["bofff"].fullName.toUpperCase()) return 1;
        if (a["bofff"].fullName.toUpperCase() < b["bofff"].fullName.toUpperCase()) return -1;
        return 0;
    }
    function findBofffsTwo(contactNumbers) {
        var url = "http://www.bofffme.com/api/index.php/home/";
        var xhr = Ti.Network.createHTTPClient({
            onload: function() {
                bofffFriends = JSON.parse(this.responseText);
                bofffFriends.sort(sortBofffs);
                for (var record in bofffFriends) {
                    var fullName = bofffFriends[record]["bofff"].fullName;
                    var icon_image = bofffFriends[record]["bofff"].profile_picture;
                    var pin = bofffFriends[record]["bofff"].pin;
                    addFriend(fullName, icon_image, pin);
                }
                initializeBofffsList(bofffFriends);
            },
            onerror: function() {
                alert(this.responseText);
            }
        });
        var params = {
            numbers: JSON.stringify(contactNumbers)
        };
        xhr.open("POST", url + "all_data_by_mobile/bofff");
        xhr.send(params);
    }
    function addFriend(fullName, iconImage, pin) {
        if ("fbea0803a7d79e402d0557dcb7063a03" != pin) {
            var url = "http://www.bofffme.com/api/index.php/home/";
            var xhr = Ti.Network.createHTTPClient({
                onload: function() {
                    JSON.parse(this.responseText);
                },
                onerror: function() {
                    alert(this.responseText);
                }
            });
            xhr.open("POST", url + "insert_friend/bofff/user_friends");
            var params = {
                fullName: fullName,
                icon_image: iconImage,
                friend_pin_code: pin,
                user_pin_code: "fbea0803a7d79e402d0557dcb7063a03"
            };
            xhr.send(params);
        }
    }
    function isEmpty(obj) {
        for (var key in obj) if (obj.hasOwnProperty(key)) return false;
        return true;
    }
    function initializeBofffsList(bofffFriends) {
        var bofffContactsPayload = {
            mainView: $.scrollableview_mainContactsView,
            bofffFriends: bofffFriends
        };
        bofffsContacts = Alloy.createController("bofffsContacts", bofffContactsPayload);
        var views = [ bofffsContacts.getView(), allContacts.getView() ];
        $.scrollableview_mainContactsView.setViews(views);
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
        sortedContacts.sort(sortContacts);
    });
    var contactNumbersAndIds = [];
    var contactNumbers = [];
    var mobileNumbers;
    var expression = /^\d+$/;
    for (var contact in sortedContacts) {
        mobileNumbers = sortedContacts[contact].getPhone();
        if (!isEmpty(mobileNumbers)) for (var i in mobileNumbers) for (var x in mobileNumbers[i]) {
            var trimmedNumber = "";
            if (expression.test(mobileNumbers[i][x])) trimmedNumber = mobileNumbers[i][x]; else for (var character in mobileNumbers[i][x]) expression.test(mobileNumbers[i][x][character]) && (trimmedNumber += mobileNumbers[i][x][character]);
            var numberAndId;
            var numberAndId = {
                number: trimmedNumber,
                id: sortedContacts[contact].recordId
            };
            contactNumbersAndIds.push(numberAndId);
            var number = new Object();
            number.number = trimmedNumber;
            contactNumbers.push(number);
        }
    }
    findBofffsTwo(contactNumbersAndIds);
    var bofffFriends = [];
    var allContactsPayload = {
        mainView: $.scrollableview_mainContactsView,
        sortedContacts: sortedContacts
    };
    var bofffContactsPayload = {
        mainView: $.scrollableview_mainContactsView,
        sortedContacts: sortedContacts
    };
    var bofffsContacts = Alloy.createController("bofffsContacts", bofffContactsPayload);
    $.scrollableview_mainContactsView.addView(bofffsContacts.getView());
    var allContacts = Alloy.createController("allContacts", allContactsPayload);
    $.scrollableview_mainContactsView.addView(allContacts.getView());
    __defers["$.__views.scrollableview_mainContactsView!scrollend!changeRightNavButton"] && $.__views.scrollableview_mainContactsView.addEventListener("scrollend", changeRightNavButton);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;