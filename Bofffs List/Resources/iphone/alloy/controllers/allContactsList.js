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
        $.search.blur(0);
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
    function openPickerView() {
        $.img_pickerShow.visible = false;
        $.view_contactFieldsPicker.width = Ti.Platform.displayCaps.platformWidth - 50;
        $.view_contactFieldsPicker.animate({
            left: "0dp",
            duration: 500
        });
        $.view_allContacts.animate({
            left: Ti.Platform.displayCaps.platformWidth - 50,
            duration: 500
        });
    }
    function closePicker() {
        $.view_contactFieldsPicker.animate({
            left: -$.view_contactFieldsPicker.width,
            duration: 500
        });
        $.view_allContacts.animate({
            left: "0",
            duration: 500
        });
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
                bofff_pic: {
                    image: "/images/bofffios.png"
                },
                properties: {
                    itemId: contactId,
                    searchableText: _data[i][textToSearchFor]
                }
            });
        }
        $.list_allContacts.sections = listSections;
    }
    function updateSearchableText(e) {
        createListView(sortedContacts, "fullName");
        $.lbl_searchableField.text = e.selectedValue[0];
    }
    function showContact(e) {
        if (profileOpen) closeProfile(); else {
            $.search.blur();
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
        id: "view_container",
        top: "0"
    });
    $.__views.view_container && $.addTopLevelView($.__views.view_container);
    $.__views.view_contactFieldsPicker = Ti.UI.createView({
        top: 0,
        height: Ti.UI.FILL,
        width: Ti.Platform.displayCaps.platformWidth,
        backgroundColor: "transparent",
        left: "-100%",
        layout: "vertical",
        id: "view_contactFieldsPicker"
    });
    $.__views.view_container.add($.__views.view_contactFieldsPicker);
    openPickerView ? $.__views.view_contactFieldsPicker.addEventListener("click", openPickerView) : __defers["$.__views.view_contactFieldsPicker!click!openPickerView"] = true;
    var __alloyId2 = [];
    $.__views.__alloyId3 = Ti.UI.createLabel({
        text: "Find by",
        left: "0",
        id: "__alloyId3"
    });
    __alloyId2.push($.__views.__alloyId3);
    $.__views.lbl_searchableField = Ti.UI.createLabel({
        text: "Name",
        id: "lbl_searchableField",
        color: "#2279bc"
    });
    __alloyId2.push($.__views.lbl_searchableField);
    $.__views.__alloyId4 = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    __alloyId2.push($.__views.__alloyId4);
    $.__views.__alloyId5 = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    __alloyId2.push($.__views.__alloyId5);
    $.__views.btn_donePicker = Ti.UI.createButton({
        id: "btn_donePicker",
        title: "Done",
        style: Ti.UI.iPhone.SystemButtonStyle.DONE
    });
    __alloyId2.push($.__views.btn_donePicker);
    closePicker ? $.__views.btn_donePicker.addEventListener("click", closePicker) : __defers["$.__views.btn_donePicker!click!closePicker"] = true;
    $.__views.__alloyId0 = Ti.UI.iOS.createToolbar({
        items: __alloyId2,
        id: "__alloyId0"
    });
    $.__views.view_contactFieldsPicker.add($.__views.__alloyId0);
    $.__views.__alloyId6 = Ti.UI.createView({
        id: "__alloyId6"
    });
    $.__views.view_contactFieldsPicker.add($.__views.__alloyId6);
    $.__views.picker = Ti.UI.createPicker({
        id: "picker",
        left: "0",
        selectionIndicator: "true",
        useSpinner: "true",
        top: "0dp",
        width: "70%"
    });
    $.__views.__alloyId6.add($.__views.picker);
    var __alloyId7 = [];
    $.__views.__alloyId8 = Ti.UI.createPickerRow({
        title: "Name",
        id: "__alloyId8"
    });
    __alloyId7.push($.__views.__alloyId8);
    $.__views.__alloyId9 = Ti.UI.createPickerRow({
        title: "Job Title",
        id: "__alloyId9"
    });
    __alloyId7.push($.__views.__alloyId9);
    $.__views.__alloyId10 = Ti.UI.createPickerRow({
        title: "Company",
        id: "__alloyId10"
    });
    __alloyId7.push($.__views.__alloyId10);
    $.__views.__alloyId11 = Ti.UI.createPickerRow({
        title: "Interests",
        id: "__alloyId11"
    });
    __alloyId7.push($.__views.__alloyId11);
    $.__views.__alloyId12 = Ti.UI.createPickerRow({
        title: "Education",
        id: "__alloyId12"
    });
    __alloyId7.push($.__views.__alloyId12);
    $.__views.__alloyId13 = Ti.UI.createPickerRow({
        title: "Favorite Places",
        id: "__alloyId13"
    });
    __alloyId7.push($.__views.__alloyId13);
    $.__views.__alloyId14 = Ti.UI.createPickerRow({
        title: "Marital Status",
        id: "__alloyId14"
    });
    __alloyId7.push($.__views.__alloyId14);
    $.__views.__alloyId15 = Ti.UI.createPickerRow({
        title: "Residence",
        id: "__alloyId15"
    });
    __alloyId7.push($.__views.__alloyId15);
    $.__views.picker.add(__alloyId7);
    updateSearchableText ? $.__views.picker.addEventListener("change", updateSearchableText) : __defers["$.__views.picker!change!updateSearchableText"] = true;
    $.__views.img_pickerShow = Ti.UI.createImageView({
        id: "img_pickerShow",
        image: "/images/bofff.png",
        right: "0",
        top: "25%"
    });
    $.__views.__alloyId6.add($.__views.img_pickerShow);
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
    $.__views.__alloyId16 = Ti.UI.createLabel({
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
        id: "__alloyId16"
    });
    $.__views.view_allContacts.add($.__views.__alloyId16);
    allContactsFadeOut ? $.__views.__alloyId16.addEventListener("click", allContactsFadeOut) : __defers["$.__views.__alloyId16!click!allContactsFadeOut"] = true;
    $.__views.search = Ti.UI.createSearchBar({
        id: "search",
        hintText: "find a bofff",
        showCancel: "true",
        height: "43"
    });
    $.__views.view_allContacts.add($.__views.search);
    var __alloyId17 = {};
    var __alloyId19 = [];
    var __alloyId20 = {
        type: "Ti.UI.ImageView",
        bindId: "pic",
        properties: {
            width: "50dp",
            height: "50dp",
            left: 0,
            bindId: "pic"
        }
    };
    __alloyId19.push(__alloyId20);
    var __alloyId21 = {
        type: "Ti.UI.ImageView",
        bindId: "bofff_pic",
        properties: {
            right: 0,
            bindId: "bofff_pic"
        }
    };
    __alloyId19.push(__alloyId21);
    var __alloyId22 = {
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
    __alloyId19.push(__alloyId22);
    var __alloyId18 = {
        properties: {
            height: "56dp",
            name: "template1"
        },
        childTemplates: __alloyId19
    };
    __alloyId17["template1"] = __alloyId18;
    $.__views.list_allContacts = Ti.UI.createListView({
        templates: __alloyId17,
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
    $.picker.setSelectedRow(0, 0, true);
    $.search.addEventListener("cancel", function() {
        $.search.blur();
    });
    $.search.addEventListener("change", function(e) {
        $.list_allContacts.searchText = e.value;
    });
    $.search.addEventListener("blur", function() {
        $.view_contactFieldsPicker.animate({
            left: -$.view_contactFieldsPicker.width,
            duration: 500
        });
        $.view_allContacts.animate({
            left: "0",
            duration: 500
        });
    });
    $.search.addEventListener("focus", function() {
        $.img_pickerShow.visible = true;
        $.view_contactFieldsPicker.animate({
            left: -$.view_contactFieldsPicker.width + 50,
            duration: 500
        });
        $.view_allContacts.animate({
            left: "50dp",
            duration: 500
        });
    });
    $.list_allContacts.caseInsensitiveSearch = true;
    $.list_allContacts.keepSectionsInSearch = true;
    var contact;
    var profileOpen = false;
    var view_contactInfo;
    __defers["$.__views.view_contactFieldsPicker!click!openPickerView"] && $.__views.view_contactFieldsPicker.addEventListener("click", openPickerView);
    __defers["$.__views.btn_donePicker!click!closePicker"] && $.__views.btn_donePicker.addEventListener("click", closePicker);
    __defers["$.__views.picker!change!updateSearchableText"] && $.__views.picker.addEventListener("change", updateSearchableText);
    __defers["$.__views.view_allContacts!click!closeOpenProfile"] && $.__views.view_allContacts.addEventListener("click", closeOpenProfile);
    __defers["$.__views.__alloyId16!click!allContactsFadeOut"] && $.__views.__alloyId16.addEventListener("click", allContactsFadeOut);
    __defers["$.__views.list_allContacts!itemclick!showContact"] && $.__views.list_allContacts.addEventListener("itemclick", showContact);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;