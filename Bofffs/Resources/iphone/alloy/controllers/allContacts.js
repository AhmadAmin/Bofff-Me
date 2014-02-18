function Controller() {
    function initializeSearch() {
        if (firstFocus && false) {
            firstFocus = false;
            $.search.blur();
        } else {
            searchbarIsOnFocus = true;
            $.search.showCancel = "true";
        }
    }
    function cancelSearch() {
        $.search.blur();
        $.search.value = "";
        $.list_allContacts.searchText = "";
        searchbarIsOnFocus = false;
        $.search.showCancel = "false";
    }
    function updateSearch(e) {
        $.list_allContacts.searchText = e.value;
    }
    function searchContact(e) {
        $.list_allContacts.searchText = e.value;
        searchButtonPressed = true;
        $.search.blur();
    }
    function stopSearch() {
        searchButtonPressed ? searchButtonPressed = false : $.search.showCancel = "false";
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
                bofff_pic: {
                    image: "/images/bofffcontact.png"
                },
                properties: {
                    itemId: contactId,
                    searchableText: _data[i][textToSearchFor],
                    backgroundColor: "transparent"
                }
            });
        }
        section.setItems(items);
        listSections.push(section);
        $.list_allContacts.sections = listSections;
    }
    function showContact(e) {
        $.search.blur();
        contact = Ti.Contacts.getPersonByID(e.itemId);
        var params = {
            contact: contact
        };
        Ti.App.bofffsListTab.open(Alloy.createController("contactInfo", params).getView());
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "allContacts";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.view_container = Ti.UI.createView({
        backgroundColor: "white",
        id: "view_container"
    });
    $.__views.view_container && $.addTopLevelView($.__views.view_container);
    $.__views.view_contacts = Ti.UI.createView({
        backgroundColor: "transparent",
        layout: "vertical",
        id: "view_contacts"
    });
    $.__views.view_container.add($.__views.view_contacts);
    $.__views.search = Ti.UI.createSearchBar({
        backgroundColor: "transparent",
        id: "search",
        left: "0",
        height: "43",
        width: Ti.UI.FILL,
        hintText: "find a bofff"
    });
    $.__views.view_contacts.add($.__views.search);
    initializeSearch ? $.__views.search.addEventListener("focus", initializeSearch) : __defers["$.__views.search!focus!initializeSearch"] = true;
    cancelSearch ? $.__views.search.addEventListener("cancel", cancelSearch) : __defers["$.__views.search!cancel!cancelSearch"] = true;
    updateSearch ? $.__views.search.addEventListener("change", updateSearch) : __defers["$.__views.search!change!updateSearch"] = true;
    stopSearch ? $.__views.search.addEventListener("blur", stopSearch) : __defers["$.__views.search!blur!stopSearch"] = true;
    searchContact ? $.__views.search.addEventListener("return", searchContact) : __defers["$.__views.search!return!searchContact"] = true;
    var __alloyId0 = {};
    var __alloyId2 = [];
    var __alloyId3 = {
        type: "Ti.UI.ImageView",
        bindId: "pic",
        properties: {
            width: "50dp",
            height: "50dp",
            left: 0,
            bindId: "pic"
        }
    };
    __alloyId2.push(__alloyId3);
    var __alloyId4 = {
        type: "Ti.UI.ImageView",
        bindId: "bofff_pic",
        properties: {
            width: "37dp",
            height: "34dp",
            right: 0,
            bindId: "bofff_pic"
        }
    };
    __alloyId2.push(__alloyId4);
    var __alloyId5 = {
        type: "Ti.UI.Label",
        bindId: "textLabel",
        properties: {
            color: "#000",
            font: {
                fontSize: "20dp"
            },
            left: "60dp",
            top: 0,
            textAlign: "left",
            bindId: "textLabel"
        }
    };
    __alloyId2.push(__alloyId5);
    var __alloyId1 = {
        properties: {
            height: "56dp",
            name: "template1"
        },
        childTemplates: __alloyId2
    };
    __alloyId0["template1"] = __alloyId1;
    $.__views.list_allContacts = Ti.UI.createListView({
        width: "100%",
        templates: __alloyId0,
        id: "list_allContacts",
        left: "0",
        defaultItemTemplate: "template1"
    });
    $.__views.view_contacts.add($.__views.list_allContacts);
    showContact ? $.__views.list_allContacts.addEventListener("itemclick", showContact) : __defers["$.__views.list_allContacts!itemclick!showContact"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    args.mainView;
    var sortedContacts = args.sortedContacts;
    createListView(sortedContacts, "fullName");
    var searchbarIsOnFocus = false;
    var firstFocus = true;
    var searchButtonPressed = false;
    $.list_allContacts.caseInsensitiveSearch = true;
    $.list_allContacts.keepSectionsInSearch = true;
    __defers["$.__views.search!focus!initializeSearch"] && $.__views.search.addEventListener("focus", initializeSearch);
    __defers["$.__views.search!cancel!cancelSearch"] && $.__views.search.addEventListener("cancel", cancelSearch);
    __defers["$.__views.search!change!updateSearch"] && $.__views.search.addEventListener("change", updateSearch);
    __defers["$.__views.search!blur!stopSearch"] && $.__views.search.addEventListener("blur", stopSearch);
    __defers["$.__views.search!return!searchContact"] && $.__views.search.addEventListener("return", searchContact);
    __defers["$.__views.list_allContacts!itemclick!showContact"] && $.__views.list_allContacts.addEventListener("itemclick", showContact);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;