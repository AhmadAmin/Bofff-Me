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
    function findBofffs(contactNumbers) {
        var url = "http://www.bofffme.com/api/index.php/home/";
        var xhr = Ti.Network.createHTTPClient({
            onload: function() {
                var bofffsData = [];
                bofffFriends = JSON.parse(this.responseText);
                bofffFriends.sort(sortBofffs);
                for (var record in bofffFriends) {
                    var data = {
                        fullName: bofffFriends[record]["bofff"].fullName,
                        icon_image: bofffFriends[record]["bofff"].profile_picture,
                        friend_pin_code: bofffFriends[record]["bofff"].pin,
                        user_pin_code: "6f683f806ed1e612900d28de916eae2f"
                    };
                    bofffsData.push(data);
                }
                addFriend(bofffsData);
            },
            onerror: function() {
                alert(this.responseText);
            }
        });
        var params = {
            numbers: JSON.stringify(contactNumbers),
            pin: "6f683f806ed1e612900d28de916eae2f"
        };
        xhr.open("POST", url + "all_data_by_mobile/bofff");
        xhr.send(params);
    }
    function addFriend(data) {
        var url = "http://www.bofffme.com/api/index.php/home/";
        var xhr = Ti.Network.createHTTPClient({
            onload: function() {
                var response = JSON.parse(this.responseText);
                bofffsList = response.rows;
                if (bofffsList.length > 0) {
                    bofffsList.sort(sortContacts);
                    initializeBofffsList(bofffFriends, bofffsList);
                }
            },
            onerror: function() {
                alert(this.responseText);
            }
        });
        xhr.open("POST", url + "insert_friend/bofff/user_friends");
        var params = {
            friends: JSON.stringify(data)
        };
        xhr.send(params);
    }
    function isEmpty(obj) {
        for (var key in obj) if (obj.hasOwnProperty(key)) return false;
        return true;
    }
    function initializeBofffsList(bofffFriends, bofffsList) {
        var bofffContactsPayload = {
            mainView: $.scrollableview_mainContactsView,
            bofffFriends: bofffFriends,
            bofffsList: bofffsList
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
        }
    }
    findBofffs(contactNumbersAndIds);
    var bofffFriends = [];
    var bofffsList = [];
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