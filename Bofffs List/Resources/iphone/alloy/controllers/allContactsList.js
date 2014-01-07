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
        pickerIsOpen = false;
        $.view_contactFieldsPicker.animate({
            left: -$.view_contactFieldsPicker.width,
            duration: 500
        });
        $.view_allContacts.animate({
            left: "0",
            duration: 500
        });
        $.search.blur();
        searchbarIsOnFocus = false;
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
    function showPickerView() {
        if (!pickerIsOpen) {
            $.search.width = Ti.Platform.displayCaps.platformWidth;
            $.search.blur();
            $.img_pickerShow.image = "/images/left arrow.png";
            pickerIsOpen = true;
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
    }
    function showPartOfPickerView() {
        searchbarIsOnFocus && $.search.focus();
        $.txt_customField.blur();
        $.search.width = Ti.UI.FILL;
        $.img_pickerShow.image = "/images/right arrow.png";
        pickerIsOpen = false;
        $.view_contactFieldsPicker.animate({
            left: -$.view_contactFieldsPicker.width + 50,
            duration: 500
        });
        $.view_allContacts.animate({
            left: "50dp",
            duration: 500
        });
    }
    function hidePickerView() {
        $.txt_customField.blur();
        $.search.width = Ti.UI.FILL;
        pickerIsOpen = false;
        $.view_contactFieldsPicker.animate({
            left: -$.view_contactFieldsPicker.width,
            duration: 500
        });
        $.view_allContacts.animate({
            left: "0",
            duration: 500
        });
    }
    function openPickerView() {
        showPickerView();
    }
    function openPickerViewWithSwipe(e) {
        "right" == e.direction ? showPickerView() : "left" == e.direction && hidePickerView();
    }
    function manipulatePicerView() {
        pickerIsOpen ? showPartOfPickerView() : showPickerView();
    }
    function narrowPickerView(e) {
        "left" == e.direction && showPartOfPickerView();
    }
    function closePicker() {
        hidePickerView();
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
        $.lbl_searchableField.text = e.row.title;
        if ("Custom" == e.row.title) {
            $.txt_customField.visible = true;
            $.txt_customField.addEventListener("change", function() {
                $.lbl_searchableField.text = "Custom: " + $.txt_customField.value;
                "" == $.txt_customField.value && ($.lbl_searchableField.text = "Custom");
            });
        } else $.txt_customField.visible = false;
    }
    function showContact(e) {
        if (profileOpen) closeProfile(); else {
            hidePickerView();
            $.search.blur();
            searchbarIsOnFocus = false;
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
        top: "0",
        backgroundColor: "lightgray"
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
    narrowPickerView ? $.__views.view_contactFieldsPicker.addEventListener("swipe", narrowPickerView) : __defers["$.__views.view_contactFieldsPicker!swipe!narrowPickerView"] = true;
    var __alloyId2 = [];
    $.__views.__alloyId3 = Ti.UI.createLabel({
        text: "Find by",
        left: "0",
        width: Ti.UI.SIZE,
        textAlign: "",
        id: "__alloyId3"
    });
    __alloyId2.push($.__views.__alloyId3);
    $.__views.__alloyId4 = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    __alloyId2.push($.__views.__alloyId4);
    $.__views.lbl_searchableField = Ti.UI.createLabel({
        text: "Name",
        id: "lbl_searchableField",
        width: "100dp",
        color: "#2279bc"
    });
    __alloyId2.push($.__views.lbl_searchableField);
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
        height: Ti.UI.FILL,
        id: "__alloyId6"
    });
    $.__views.view_contactFieldsPicker.add($.__views.__alloyId6);
    var __alloyId7 = [];
    $.__views.__alloyId8 = Ti.UI.createTableViewSection({
        id: "__alloyId8"
    });
    __alloyId7.push($.__views.__alloyId8);
    $.__views.__alloyId9 = Ti.UI.createTableViewRow({
        title: "Name",
        leftImage: "/images/name.png",
        selectedBackgroundColor: "darkgray",
        id: "__alloyId9"
    });
    $.__views.__alloyId8.add($.__views.__alloyId9);
    $.__views.__alloyId10 = Ti.UI.createTableViewRow({
        title: "Phone Number",
        leftImage: "/images/phone.png",
        selectedBackgroundColor: "darkgray",
        id: "__alloyId10"
    });
    $.__views.__alloyId8.add($.__views.__alloyId10);
    $.__views.__alloyId11 = Ti.UI.createTableViewRow({
        title: "E-mail",
        leftImage: "/images/e-mail.png",
        selectedBackgroundColor: "darkgray",
        id: "__alloyId11"
    });
    $.__views.__alloyId8.add($.__views.__alloyId11);
    $.__views.__alloyId12 = Ti.UI.createTableViewRow({
        title: "Social Network",
        leftImage: "/images/social.png",
        selectedBackgroundColor: "darkgray",
        id: "__alloyId12"
    });
    $.__views.__alloyId8.add($.__views.__alloyId12);
    $.__views.__alloyId13 = Ti.UI.createTableViewRow({
        title: "Job Title",
        leftImage: "/images/job.png",
        selectedBackgroundColor: "darkgray",
        id: "__alloyId13"
    });
    $.__views.__alloyId8.add($.__views.__alloyId13);
    $.__views.__alloyId14 = Ti.UI.createTableViewRow({
        title: "Company",
        leftImage: "/images/company.png",
        selectedBackgroundColor: "darkgray",
        id: "__alloyId14"
    });
    $.__views.__alloyId8.add($.__views.__alloyId14);
    $.__views.__alloyId15 = Ti.UI.createTableViewRow({
        title: "Interests",
        leftImage: "/images/interests.png",
        selectedBackgroundColor: "darkgray",
        id: "__alloyId15"
    });
    $.__views.__alloyId8.add($.__views.__alloyId15);
    $.__views.__alloyId16 = Ti.UI.createTableViewRow({
        title: "Education",
        leftImage: "/images/education.ico",
        selectedBackgroundColor: "darkgray",
        id: "__alloyId16"
    });
    $.__views.__alloyId8.add($.__views.__alloyId16);
    $.__views.__alloyId17 = Ti.UI.createTableViewRow({
        title: "Favorite Places",
        leftImage: "/images/favorite.png",
        selectedBackgroundColor: "darkgray",
        id: "__alloyId17"
    });
    $.__views.__alloyId8.add($.__views.__alloyId17);
    $.__views.__alloyId18 = Ti.UI.createTableViewRow({
        title: "Marital Status",
        leftImage: "/images/marital.png",
        selectedBackgroundColor: "darkgray",
        id: "__alloyId18"
    });
    $.__views.__alloyId8.add($.__views.__alloyId18);
    $.__views.__alloyId19 = Ti.UI.createTableViewRow({
        title: "Residence",
        leftImage: "/images/residence.png",
        selectedBackgroundColor: "darkgray",
        id: "__alloyId19"
    });
    $.__views.__alloyId8.add($.__views.__alloyId19);
    $.__views.__alloyId20 = Ti.UI.createTableViewRow({
        title: "Custom",
        leftImage: "/images/custom.png",
        height: Ti.UI.FILL,
        selectedBackgroundColor: "darkgray",
        id: "__alloyId20"
    });
    $.__views.__alloyId8.add($.__views.__alloyId20);
    $.__views.txt_customField = Ti.UI.createTextField({
        id: "txt_customField",
        hintText: "custom field",
        left: "130dp",
        borderColor: "darkgray",
        visible: "false",
        borderRadius: "5dp"
    });
    $.__views.__alloyId20.add($.__views.txt_customField);
    $.__views.table = Ti.UI.createTableView({
        data: __alloyId7,
        id: "table",
        width: "220",
        left: "0",
        backgroundColor: "transparent",
        showVerticalScrollIndicator: "false"
    });
    $.__views.__alloyId6.add($.__views.table);
    updateSearchableText ? $.__views.table.addEventListener("click", updateSearchableText) : __defers["$.__views.table!click!updateSearchableText"] = true;
    $.__views.img_pickerShow = Ti.UI.createImageView({
        id: "img_pickerShow",
        right: "0",
        top: "100dp",
        bubbleParent: "false"
    });
    $.__views.__alloyId6.add($.__views.img_pickerShow);
    manipulatePicerView ? $.__views.img_pickerShow.addEventListener("click", manipulatePicerView) : __defers["$.__views.img_pickerShow!click!manipulatePicerView"] = true;
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
    openPickerViewWithSwipe ? $.__views.view_allContacts.addEventListener("swipe", openPickerViewWithSwipe) : __defers["$.__views.view_allContacts!swipe!openPickerViewWithSwipe"] = true;
    $.__views.__alloyId21 = Ti.UI.createLabel({
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
        id: "__alloyId21"
    });
    $.__views.view_allContacts.add($.__views.__alloyId21);
    allContactsFadeOut ? $.__views.__alloyId21.addEventListener("click", allContactsFadeOut) : __defers["$.__views.__alloyId21!click!allContactsFadeOut"] = true;
    $.__views.search = Ti.UI.createSearchBar({
        id: "search",
        left: "0",
        hintText: "find a bofff",
        showCancel: "true",
        height: "43",
        width: Ti.UI.FILL
    });
    $.__views.view_allContacts.add($.__views.search);
    var __alloyId22 = {};
    var __alloyId24 = [];
    var __alloyId25 = {
        type: "Ti.UI.ImageView",
        bindId: "pic",
        properties: {
            width: "50dp",
            height: "50dp",
            left: 0,
            bindId: "pic"
        }
    };
    __alloyId24.push(__alloyId25);
    var __alloyId26 = {
        type: "Ti.UI.ImageView",
        bindId: "bofff_pic",
        properties: {
            right: 0,
            bindId: "bofff_pic"
        }
    };
    __alloyId24.push(__alloyId26);
    var __alloyId27 = {
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
    __alloyId24.push(__alloyId27);
    var __alloyId23 = {
        properties: {
            height: "56dp",
            name: "template1"
        },
        childTemplates: __alloyId24
    };
    __alloyId22["template1"] = __alloyId23;
    $.__views.list_allContacts = Ti.UI.createListView({
        width: Ti.Platform.displayCaps.platformWidth,
        templates: __alloyId22,
        id: "list_allContacts",
        left: "0",
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
    var pickerIsOpen = false;
    $.search.addEventListener("cancel", function() {
        $.search.blur();
        hidePickerView();
        searchbarIsOnFocus = false;
    });
    $.search.addEventListener("change", function(e) {
        $.list_allContacts.searchText = e.value;
    });
    var searchbarIsOnFocus = false;
    $.search.addEventListener("focus", function() {
        showPartOfPickerView();
        searchbarIsOnFocus = true;
    });
    $.list_allContacts.caseInsensitiveSearch = true;
    $.list_allContacts.keepSectionsInSearch = true;
    var contact;
    var profileOpen = false;
    var view_contactInfo;
    __defers["$.__views.view_contactFieldsPicker!click!openPickerView"] && $.__views.view_contactFieldsPicker.addEventListener("click", openPickerView);
    __defers["$.__views.view_contactFieldsPicker!swipe!narrowPickerView"] && $.__views.view_contactFieldsPicker.addEventListener("swipe", narrowPickerView);
    __defers["$.__views.btn_donePicker!click!closePicker"] && $.__views.btn_donePicker.addEventListener("click", closePicker);
    __defers["$.__views.table!click!updateSearchableText"] && $.__views.table.addEventListener("click", updateSearchableText);
    __defers["$.__views.img_pickerShow!click!manipulatePicerView"] && $.__views.img_pickerShow.addEventListener("click", manipulatePicerView);
    __defers["$.__views.view_allContacts!click!closeOpenProfile"] && $.__views.view_allContacts.addEventListener("click", closeOpenProfile);
    __defers["$.__views.view_allContacts!swipe!openPickerViewWithSwipe"] && $.__views.view_allContacts.addEventListener("swipe", openPickerViewWithSwipe);
    __defers["$.__views.__alloyId21!click!allContactsFadeOut"] && $.__views.__alloyId21.addEventListener("click", allContactsFadeOut);
    __defers["$.__views.list_allContacts!itemclick!showContact"] && $.__views.list_allContacts.addEventListener("itemclick", showContact);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;