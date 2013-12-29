function Controller() {
    function addressBookDisallowed() {
        alert("Failed");
    }
    function performAddressBookFunction() {
        var contacts = Ti.Contacts.getAllPeople();
        var sortedContacts = [];
        for (var x = 0; contacts.length > x; x++) sortedContacts.push(contacts[x]);
        sortedContacts.sort(sort);
        createListView(sortedContacts);
    }
    function sort(a, b) {
        if (a.fullName > b.fullName) return 1;
        if (a.fullName < b.fullName) return -1;
        return 0;
    }
    function createListView(_data) {
        var listSections = [];
        var lastCharacter = _data[0].fullName.substring(0, 1);
        var section = Ti.UI.createListSection({
            headerTitle: lastCharacter
        });
        var items = [];
        for (var i in _data) {
            nextCharacter = _data[i].fullName.substring(0, 1);
            if (lastCharacter != nextCharacter) {
                section.setItems(items);
                listSections.push(section);
                lastCharacter = nextCharacter;
                section = Ti.UI.createListSection({
                    headerTitle: lastCharacter
                });
                items = [];
            }
            var contactId;
            contactId = _data[i].recordId;
            items.push({
                template: "template1",
                textLabel: {
                    text: _data[i].fullName
                },
                pic: {
                    image: _data[i].image
                },
                properties: {
                    itemId: contactId
                }
            });
        }
        $.list_allContacts.sections = listSections;
    }
    function allContactsFadeOut() {
        if (profileOpen) {
            animation.fadeOut(view_contactInfo, 200);
            $.view_allContacts.opacity = 1;
            profileOpen = false;
        }
        animation.popIn(view_bofffContacts);
    }
    function showContact(e) {
        if (profileOpen) closeProfile(); else {
            contact = Ti.Contacts.getPersonByID(e.itemId);
            var params = {
                contact: contact
            };
            view_contactInfo = Alloy.createController("normalContactProfile", params).getView();
            mainWindow.view_container.add(view_contactInfo);
            $.view_allContacts.opacity = .3;
            animation.popIn(view_contactInfo);
            profileOpen = true;
        }
    }
    function closeProfile() {
        animation.fadeOut(view_contactInfo, 200);
        mainWindow.view_container.remove(view_contactInfo);
        $.view_allContacts.opacity = 1;
        profileOpen = false;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "allContactsList";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.view_allContacts = Ti.UI.createView({
        backgroundColor: "transparent",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        layout: "vertical",
        id: "view_allContacts"
    });
    $.__views.view_allContacts && $.addTopLevelView($.__views.view_allContacts);
    $.__views.__alloyId0 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: "30dp",
        color: "blue",
        font: {
            fontSize: "20dp",
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        left: "5dp",
        text: "all contacts",
        id: "__alloyId0"
    });
    $.__views.view_allContacts.add($.__views.__alloyId0);
    allContactsFadeOut ? $.__views.__alloyId0.addEventListener("click", allContactsFadeOut) : __defers["$.__views.__alloyId0!click!allContactsFadeOut"] = true;
    var __alloyId1 = {};
    var __alloyId3 = [];
    var __alloyId4 = {
        type: "Ti.UI.ImageView",
        bindId: "pic",
        properties: {
            width: "50dp",
            height: "50dp",
            left: 0,
            bindId: "pic"
        }
    };
    __alloyId3.push(__alloyId4);
    var __alloyId5 = {
        type: "Ti.UI.Label",
        bindId: "textLabel",
        properties: {
            color: "#000",
            left: "60dp",
            top: 0,
            textAlign: "left",
            font: {
                fontSize: "20dp"
            },
            bindId: "textLabel"
        }
    };
    __alloyId3.push(__alloyId5);
    var __alloyId2 = {
        properties: {
            height: "56dp",
            name: "template1"
        },
        childTemplates: __alloyId3
    };
    __alloyId1["template1"] = __alloyId2;
    $.__views.list_allContacts = Ti.UI.createListView({
        templates: __alloyId1,
        id: "list_allContacts",
        defaultItemTemplate: "template1"
    });
    $.__views.view_allContacts.add($.__views.list_allContacts);
    showContact ? $.__views.list_allContacts.addEventListener("itemclick", showContact) : __defers["$.__views.list_allContacts!itemclick!showContact"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var mainWindow = args.mainWindow;
    var view_bofffContacts = args.view_bofffContacts;
    var animation = require("alloy/animation");
    Ti.Contacts.contactsAuthorization == Ti.Contacts.AUTHORIZATION_AUTHORIZED ? performAddressBookFunction() : Ti.Contacts.contactsAuthorization == Ti.Contacts.AUTHORIZATION_UNKNOWN ? Ti.Contacts.requestAuthorization(function(e) {
        e.success ? performAddressBookFunction() : addressBookDisallowed();
    }) : addressBookDisallowed();
    Ti.Contacts.addEventListener("reload", function() {
        var contacts = Ti.Contacts.getAllPeople();
        var sortedContacts = [];
        for (var x = 0; contacts.length > x; x++) sortedContacts.push(contacts[x]);
        sortedContacts.sort(sort);
        createListView(sortedContacts);
    });
    var contact;
    var profileOpen = false;
    var view_contactInfo;
    __defers["$.__views.__alloyId0!click!allContactsFadeOut"] && $.__views.__alloyId0.addEventListener("click", allContactsFadeOut);
    __defers["$.__views.list_allContacts!itemclick!showContact"] && $.__views.list_allContacts.addEventListener("itemclick", showContact);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;