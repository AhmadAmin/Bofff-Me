function Controller() {
    function allContactsFadeOut() {
        if (profileOpen) {
            animation.fadeOut(view_contactInfo, 200);
            $.view_allContacts.opacity = 1;
            profileOpen = false;
        }
        mainWindow.view_container.remove(view_bofffContacts);
        mainWindow.view_container.add(view_bofffContacts);
        animation.popIn(view_bofffContacts);
        search.blur(0);
    }
    function addressBookDisallowed() {
        alert("Failed");
    }
    function performAddressBookFunction() {
        var contacts = Ti.Contacts.getAllPeople();
        sortedContacts = [];
        for (var x = 0; contacts.length > x; x++) sortedContacts.push(contacts[x]);
        sortedContacts.sort(sort);
        createListView(sortedContacts, "fullName");
    }
    function sort(a, b) {
        if (a.fullName.toUpperCase() > b.fullName.toUpperCase()) return 1;
        if (a.fullName.toUpperCase() < b.fullName.toUpperCase()) return -1;
        return 0;
    }
    function createListView(_data, textToSearchFor) {
        var listSections = [];
        var lastCharacter = _data[0].fullName.substring(0, 1).toUpperCase();
        var section = Ti.UI.createListSection({
            headerTitle: lastCharacter
        });
        var items = [];
        for (var i in _data) {
            nextCharacter = _data[i].fullName.substring(0, 1).toUpperCase();
            if (lastCharacter != nextCharacter) {
                section.setItems(items);
                listSections.push(section);
                lastCharacter = nextCharacter;
                section = Ti.UI.createListSection({
                    headerTitle: lastCharacter
                });
                items = [];
            }
            var number = null;
            try {
                number = _data[i].getPhone().mobile[0];
            } catch (error) {
                number = "";
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
                    itemId: contactId,
                    searchableText: _data[i][textToSearchFor]
                }
            });
        }
        $.list_allContacts.sections = listSections;
    }
    function updateSearchableText() {
        createListView(sortedContacts, "fullName");
    }
    function showContact(e) {
        if (profileOpen) closeProfile(); else {
            contact = Ti.Contacts.getPersonByID(e.itemId);
            var params = {
                contact: contact,
                close: closeProfile
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
    function closeOpenProfile() {
        profileOpen && closeProfile();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "allContactsList";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.view_container = Ti.UI.createView({
        layout: "horizontal",
        id: "view_container",
        top: "0"
    });
    $.__views.view_container && $.addTopLevelView($.__views.view_container);
    $.__views.view_contactFieldsPicker = Ti.UI.createView({
        top: 0,
        height: Ti.UI.FILL,
        width: 0,
        backgroundColor: "gray",
        id: "view_contactFieldsPicker"
    });
    $.__views.view_container.add($.__views.view_contactFieldsPicker);
    $.__views.picker = Ti.UI.createPicker({
        id: "picker",
        left: "0",
        selectionIndicator: "true",
        useSpinner: "true",
        top: "0dp"
    });
    $.__views.view_contactFieldsPicker.add($.__views.picker);
    var __alloyId0 = [];
    $.__views.__alloyId1 = Ti.UI.createPickerRow({
        title: "Bananas",
        id: "__alloyId1"
    });
    __alloyId0.push($.__views.__alloyId1);
    $.__views.__alloyId2 = Ti.UI.createPickerRow({
        title: "Strawberries",
        id: "__alloyId2"
    });
    __alloyId0.push($.__views.__alloyId2);
    $.__views.__alloyId3 = Ti.UI.createPickerRow({
        title: "Mangos",
        id: "__alloyId3"
    });
    __alloyId0.push($.__views.__alloyId3);
    $.__views.__alloyId4 = Ti.UI.createPickerRow({
        title: "Grapes",
        id: "__alloyId4"
    });
    __alloyId0.push($.__views.__alloyId4);
    $.__views.__alloyId5 = Ti.UI.createPickerRow({
        title: "red",
        id: "__alloyId5"
    });
    __alloyId0.push($.__views.__alloyId5);
    $.__views.__alloyId6 = Ti.UI.createPickerRow({
        title: "green",
        id: "__alloyId6"
    });
    __alloyId0.push($.__views.__alloyId6);
    $.__views.__alloyId7 = Ti.UI.createPickerRow({
        title: "blue",
        id: "__alloyId7"
    });
    __alloyId0.push($.__views.__alloyId7);
    $.__views.__alloyId8 = Ti.UI.createPickerRow({
        title: "orange",
        id: "__alloyId8"
    });
    __alloyId0.push($.__views.__alloyId8);
    $.__views.picker.add(__alloyId0);
    updateSearchableText ? $.__views.picker.addEventListener("change", updateSearchableText) : __defers["$.__views.picker!change!updateSearchableText"] = true;
    $.__views.view_allContacts = Ti.UI.createView({
        backgroundColor: "white",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        layout: "vertical",
        id: "view_allContacts",
        top: "0"
    });
    $.__views.view_container.add($.__views.view_allContacts);
    closeOpenProfile ? $.__views.view_allContacts.addEventListener("click", closeOpenProfile) : __defers["$.__views.view_allContacts!click!closeOpenProfile"] = true;
    $.__views.__alloyId9 = Ti.UI.createLabel({
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
        id: "__alloyId9"
    });
    $.__views.view_allContacts.add($.__views.__alloyId9);
    allContactsFadeOut ? $.__views.__alloyId9.addEventListener("click", allContactsFadeOut) : __defers["$.__views.__alloyId9!click!allContactsFadeOut"] = true;
    var __alloyId10 = {};
    var __alloyId12 = [];
    var __alloyId13 = {
        type: "Ti.UI.ImageView",
        bindId: "pic",
        properties: {
            width: "50dp",
            height: "50dp",
            left: 0,
            bindId: "pic"
        }
    };
    __alloyId12.push(__alloyId13);
    var __alloyId14 = {
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
    __alloyId12.push(__alloyId14);
    var __alloyId11 = {
        properties: {
            height: "56dp",
            name: "template1"
        },
        childTemplates: __alloyId12
    };
    __alloyId10["template1"] = __alloyId11;
    $.__views.list_allContacts = Ti.UI.createListView({
        templates: __alloyId10,
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
    var sortedContacts;
    Ti.Contacts.addEventListener("reload", function() {
        var contacts = Ti.Contacts.getAllPeople();
        sortedContacts = [];
        for (var x = 0; contacts.length > x; x++) sortedContacts.push(contacts[x]);
        sortedContacts.sort(sort);
        createListView(sortedContacts, "fullName");
    });
    var search = Titanium.UI.createSearchBar({
        barColor: "black",
        showCancel: true,
        height: 43,
        top: 0,
        left: 0
    });
    search.addEventListener("cancel", function() {
        search.blur();
    });
    search.addEventListener("change", function(e) {
        $.list_allContacts.searchText = e.value;
    });
    search.addEventListener("blur", function() {
        $.view_contactFieldsPicker.width = 0;
    });
    search.addEventListener("focus", function() {
        $.view_contactFieldsPicker.width = "50%";
    });
    $.list_allContacts.searchView = search;
    $.list_allContacts.caseInsensitiveSearch = true;
    $.list_allContacts.keepSectionsInSearch = true;
    var contact;
    var profileOpen = false;
    var view_contactInfo;
    __defers["$.__views.picker!change!updateSearchableText"] && $.__views.picker.addEventListener("change", updateSearchableText);
    __defers["$.__views.view_allContacts!click!closeOpenProfile"] && $.__views.view_allContacts.addEventListener("click", closeOpenProfile);
    __defers["$.__views.__alloyId9!click!allContactsFadeOut"] && $.__views.__alloyId9.addEventListener("click", allContactsFadeOut);
    __defers["$.__views.list_allContacts!itemclick!showContact"] && $.__views.list_allContacts.addEventListener("itemclick", showContact);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;