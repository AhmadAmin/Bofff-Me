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
            $.table.width = platformWidth - 100;
            $.search.width = platformWidth;
            $.list_allContacts.width = platformWidth;
            $.search.blur();
            $.img_pickerShow.image = "/images/left arrow.png";
            pickerIsOpen = true;
            $.view_contactFieldsPicker.width = platformWidth - 50;
            $.view_contactFieldsPicker.animate({
                left: "0dp",
                duration: 500
            });
            $.view_allContacts.animate({
                left: platformWidth - 50,
                duration: 500
            });
        }
    }
    function showPartOfPickerView() {
        searchbarIsOnFocus && $.search.focus();
        $.txt_customField.blur();
        $.search.width = platformWidth - 50;
        $.list_allContacts.width = platformWidth;
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
        $.list_allContacts.width = platformWidth;
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
    function openFieldsPicker() {
        $.view_picker.left = 0;
        $.view_picker.width = Ti.UI.SIZE;
        $.view_picker.height = Ti.UI.SIZE;
    }
    function updateFieldSearch(e) {
        $.lbl_findBy.text = "Find By\n" + e.selectedValue[0];
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
                    image: "/images/bofffios.png"
                },
                properties: {
                    itemId: contactId,
                    searchableText: _data[i][textToSearchFor],
                    backgroundColor: "#40bae9"
                }
            });
        }
        section.setItems(items);
        listSections.push(section);
        $.list_allContacts.sections = listSections;
    }
    function updateSearchableText(e) {
        createListView(sortedContacts, "fullName");
        var rowText = e.source.text;
        $.lbl_searchableField.text = rowText;
        if ("Custom" == rowText) {
            $.txt_customField.visible = true;
            $.txt_customField.focus();
            $.txt_customField.focus();
            $.txt_customField.addEventListener("change", function() {
                $.lbl_searchableField.text = "Custom: " + $.txt_customField.value;
                "" == $.txt_customField.value && ($.lbl_searchableField.text = "Custom");
            });
        } else {
            $.txt_customField.visible = false;
            $.txt_customField.blur();
        }
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
    $.__views.view_toolbar = Ti.UI.createView({
        backgroundColor: "gray",
        height: "50",
        id: "view_toolbar",
        left: "0"
    });
    $.__views.view_contactFieldsPicker.add($.__views.view_toolbar);
    $.__views.__alloyId0 = Ti.UI.createLabel({
        color: "black",
        font: {
            fontSize: "20dp",
            fontFamily: "Helvetica Neue"
        },
        left: "10",
        text: "Find by",
        width: Ti.UI.SIZE,
        id: "__alloyId0"
    });
    $.__views.view_toolbar.add($.__views.__alloyId0);
    $.__views.lbl_searchableField = Ti.UI.createLabel({
        color: "#2279bc",
        font: {
            fontSize: "20dp",
            fontFamily: "Helvetica Neue"
        },
        left: "90",
        text: "Name",
        id: "lbl_searchableField",
        width: "130",
        height: Ti.UI.FILL
    });
    $.__views.view_toolbar.add($.__views.lbl_searchableField);
    $.__views.btn_donePicker = Ti.UI.createButton({
        font: {
            fontSize: "20dp"
        },
        right: "5",
        id: "btn_donePicker",
        bubbleParent: "false",
        title: "Done"
    });
    $.__views.view_toolbar.add($.__views.btn_donePicker);
    closePicker ? $.__views.btn_donePicker.addEventListener("click", closePicker) : __defers["$.__views.btn_donePicker!click!closePicker"] = true;
    $.__views.view_tableview = Ti.UI.createView({
        height: Ti.UI.FILL,
        id: "view_tableview",
        left: "0"
    });
    $.__views.view_contactFieldsPicker.add($.__views.view_tableview);
    var __alloyId1 = [];
    $.__views.__alloyId2 = Ti.UI.createTableViewSection({
        id: "__alloyId2"
    });
    __alloyId1.push($.__views.__alloyId2);
    $.__views.__alloyId3 = Ti.UI.createTableViewRow({
        left: "5",
        text: "Name",
        selectedBackgroundColor: "darkgray",
        color: "black",
        height: "50",
        id: "__alloyId3"
    });
    $.__views.__alloyId2.add($.__views.__alloyId3);
    updateSearchableText ? $.__views.__alloyId3.addEventListener("click", updateSearchableText) : __defers["$.__views.__alloyId3!click!updateSearchableText"] = true;
    $.__views.__alloyId4 = Ti.UI.createImageView({
        text: "Name",
        left: "15",
        width: "25",
        height: "25",
        image: "/images/name.png",
        id: "__alloyId4"
    });
    $.__views.__alloyId3.add($.__views.__alloyId4);
    $.__views.__alloyId5 = Ti.UI.createLabel({
        color: "black",
        font: {
            fontSize: "20dp",
            fontFamily: "Helvetica Neue"
        },
        left: 50,
        text: "Name",
        id: "__alloyId5"
    });
    $.__views.__alloyId3.add($.__views.__alloyId5);
    $.__views.__alloyId6 = Ti.UI.createTableViewRow({
        text: "Phone Number",
        selectedBackgroundColor: "darkgray",
        color: "black",
        height: "50",
        id: "__alloyId6"
    });
    $.__views.__alloyId2.add($.__views.__alloyId6);
    updateSearchableText ? $.__views.__alloyId6.addEventListener("click", updateSearchableText) : __defers["$.__views.__alloyId6!click!updateSearchableText"] = true;
    $.__views.__alloyId7 = Ti.UI.createImageView({
        text: "Phone Number",
        left: "5",
        width: "25",
        height: "25",
        image: "/images/phone.png",
        id: "__alloyId7"
    });
    $.__views.__alloyId6.add($.__views.__alloyId7);
    $.__views.__alloyId8 = Ti.UI.createLabel({
        color: "black",
        font: {
            fontSize: "20dp",
            fontFamily: "Helvetica Neue"
        },
        left: 50,
        text: "Phone Number",
        id: "__alloyId8"
    });
    $.__views.__alloyId6.add($.__views.__alloyId8);
    $.__views.__alloyId9 = Ti.UI.createTableViewRow({
        text: "E-mail",
        left: "10",
        selectedBackgroundColor: "darkgray",
        color: "black",
        height: "50",
        id: "__alloyId9"
    });
    $.__views.__alloyId2.add($.__views.__alloyId9);
    updateSearchableText ? $.__views.__alloyId9.addEventListener("click", updateSearchableText) : __defers["$.__views.__alloyId9!click!updateSearchableText"] = true;
    $.__views.__alloyId10 = Ti.UI.createImageView({
        text: "E-mail",
        left: "5",
        width: "25",
        height: "25",
        image: "/images/e-mail.png",
        id: "__alloyId10"
    });
    $.__views.__alloyId9.add($.__views.__alloyId10);
    $.__views.__alloyId11 = Ti.UI.createLabel({
        color: "black",
        font: {
            fontSize: "20dp",
            fontFamily: "Helvetica Neue"
        },
        left: 50,
        text: "E-mail",
        id: "__alloyId11"
    });
    $.__views.__alloyId9.add($.__views.__alloyId11);
    $.__views.__alloyId12 = Ti.UI.createTableViewRow({
        text: "Social Network",
        left: "10",
        selectedBackgroundColor: "darkgray",
        color: "black",
        height: "50",
        id: "__alloyId12"
    });
    $.__views.__alloyId2.add($.__views.__alloyId12);
    updateSearchableText ? $.__views.__alloyId12.addEventListener("click", updateSearchableText) : __defers["$.__views.__alloyId12!click!updateSearchableText"] = true;
    $.__views.__alloyId13 = Ti.UI.createImageView({
        text: "Social Network",
        left: "5",
        width: "25",
        height: "25",
        image: "/images/social.png",
        id: "__alloyId13"
    });
    $.__views.__alloyId12.add($.__views.__alloyId13);
    $.__views.__alloyId14 = Ti.UI.createLabel({
        color: "black",
        font: {
            fontSize: "20dp",
            fontFamily: "Helvetica Neue"
        },
        left: 50,
        text: "Social Network",
        id: "__alloyId14"
    });
    $.__views.__alloyId12.add($.__views.__alloyId14);
    $.__views.__alloyId15 = Ti.UI.createTableViewRow({
        text: "Job Title",
        left: "10",
        selectedBackgroundColor: "darkgray",
        color: "black",
        height: "50",
        id: "__alloyId15"
    });
    $.__views.__alloyId2.add($.__views.__alloyId15);
    updateSearchableText ? $.__views.__alloyId15.addEventListener("click", updateSearchableText) : __defers["$.__views.__alloyId15!click!updateSearchableText"] = true;
    $.__views.__alloyId16 = Ti.UI.createImageView({
        text: "Job Title",
        left: "5",
        width: "25",
        height: "25",
        image: "/images/job.png",
        id: "__alloyId16"
    });
    $.__views.__alloyId15.add($.__views.__alloyId16);
    $.__views.__alloyId17 = Ti.UI.createLabel({
        color: "black",
        font: {
            fontSize: "20dp",
            fontFamily: "Helvetica Neue"
        },
        left: 50,
        text: "Job Title",
        id: "__alloyId17"
    });
    $.__views.__alloyId15.add($.__views.__alloyId17);
    $.__views.__alloyId18 = Ti.UI.createTableViewRow({
        text: "Company",
        left: "10",
        selectedBackgroundColor: "darkgray",
        color: "black",
        height: "50",
        id: "__alloyId18"
    });
    $.__views.__alloyId2.add($.__views.__alloyId18);
    updateSearchableText ? $.__views.__alloyId18.addEventListener("click", updateSearchableText) : __defers["$.__views.__alloyId18!click!updateSearchableText"] = true;
    $.__views.__alloyId19 = Ti.UI.createImageView({
        text: "Company",
        left: "5",
        width: "25",
        height: "25",
        image: "/images/company.png",
        id: "__alloyId19"
    });
    $.__views.__alloyId18.add($.__views.__alloyId19);
    $.__views.__alloyId20 = Ti.UI.createLabel({
        color: "black",
        font: {
            fontSize: "20dp",
            fontFamily: "Helvetica Neue"
        },
        left: 50,
        text: "Company",
        id: "__alloyId20"
    });
    $.__views.__alloyId18.add($.__views.__alloyId20);
    $.__views.__alloyId21 = Ti.UI.createTableViewRow({
        text: "Interests",
        left: "10",
        selectedBackgroundColor: "darkgray",
        color: "black",
        height: "50",
        id: "__alloyId21"
    });
    $.__views.__alloyId2.add($.__views.__alloyId21);
    updateSearchableText ? $.__views.__alloyId21.addEventListener("click", updateSearchableText) : __defers["$.__views.__alloyId21!click!updateSearchableText"] = true;
    $.__views.__alloyId22 = Ti.UI.createImageView({
        text: "Interests",
        left: "5",
        width: "25",
        height: "25",
        image: "/images/interests.png",
        id: "__alloyId22"
    });
    $.__views.__alloyId21.add($.__views.__alloyId22);
    $.__views.__alloyId23 = Ti.UI.createLabel({
        color: "black",
        font: {
            fontSize: "20dp",
            fontFamily: "Helvetica Neue"
        },
        left: 50,
        text: "Interests",
        id: "__alloyId23"
    });
    $.__views.__alloyId21.add($.__views.__alloyId23);
    $.__views.__alloyId24 = Ti.UI.createTableViewRow({
        text: "Education",
        left: "10",
        selectedBackgroundColor: "darkgray",
        color: "black",
        height: "50",
        id: "__alloyId24"
    });
    $.__views.__alloyId2.add($.__views.__alloyId24);
    updateSearchableText ? $.__views.__alloyId24.addEventListener("click", updateSearchableText) : __defers["$.__views.__alloyId24!click!updateSearchableText"] = true;
    $.__views.__alloyId25 = Ti.UI.createImageView({
        text: "Education",
        left: "5",
        width: "25",
        height: "25",
        image: "/images/education.ico",
        id: "__alloyId25"
    });
    $.__views.__alloyId24.add($.__views.__alloyId25);
    $.__views.__alloyId26 = Ti.UI.createLabel({
        color: "black",
        font: {
            fontSize: "20dp",
            fontFamily: "Helvetica Neue"
        },
        left: 50,
        text: "Education",
        id: "__alloyId26"
    });
    $.__views.__alloyId24.add($.__views.__alloyId26);
    $.__views.__alloyId27 = Ti.UI.createTableViewRow({
        text: "Favorite Places",
        left: "10",
        selectedBackgroundColor: "darkgray",
        color: "black",
        height: "50",
        id: "__alloyId27"
    });
    $.__views.__alloyId2.add($.__views.__alloyId27);
    updateSearchableText ? $.__views.__alloyId27.addEventListener("click", updateSearchableText) : __defers["$.__views.__alloyId27!click!updateSearchableText"] = true;
    $.__views.__alloyId28 = Ti.UI.createImageView({
        text: "Favorite Places",
        left: "5",
        width: "25",
        height: "25",
        image: "/images/favorite.png",
        id: "__alloyId28"
    });
    $.__views.__alloyId27.add($.__views.__alloyId28);
    $.__views.__alloyId29 = Ti.UI.createLabel({
        color: "black",
        font: {
            fontSize: "20dp",
            fontFamily: "Helvetica Neue"
        },
        left: 50,
        text: "Favorite Places",
        id: "__alloyId29"
    });
    $.__views.__alloyId27.add($.__views.__alloyId29);
    $.__views.__alloyId30 = Ti.UI.createTableViewRow({
        left: "10",
        text: "Marital Status",
        selectedBackgroundColor: "darkgray",
        color: "black",
        height: "50",
        id: "__alloyId30"
    });
    $.__views.__alloyId2.add($.__views.__alloyId30);
    updateSearchableText ? $.__views.__alloyId30.addEventListener("click", updateSearchableText) : __defers["$.__views.__alloyId30!click!updateSearchableText"] = true;
    $.__views.__alloyId31 = Ti.UI.createImageView({
        text: "Marital Status",
        left: "5",
        width: "25",
        height: "25",
        image: "/images/marital.png",
        id: "__alloyId31"
    });
    $.__views.__alloyId30.add($.__views.__alloyId31);
    $.__views.__alloyId32 = Ti.UI.createLabel({
        color: "black",
        font: {
            fontSize: "20dp",
            fontFamily: "Helvetica Neue"
        },
        left: 50,
        text: "Marital Status",
        id: "__alloyId32"
    });
    $.__views.__alloyId30.add($.__views.__alloyId32);
    $.__views.__alloyId33 = Ti.UI.createTableViewRow({
        text: "Residence",
        left: "10",
        selectedBackgroundColor: "darkgray",
        color: "black",
        height: "50",
        id: "__alloyId33"
    });
    $.__views.__alloyId2.add($.__views.__alloyId33);
    updateSearchableText ? $.__views.__alloyId33.addEventListener("click", updateSearchableText) : __defers["$.__views.__alloyId33!click!updateSearchableText"] = true;
    $.__views.__alloyId34 = Ti.UI.createImageView({
        text: "Residence",
        left: "5",
        width: "25",
        height: "25",
        image: "/images/residence.png",
        id: "__alloyId34"
    });
    $.__views.__alloyId33.add($.__views.__alloyId34);
    $.__views.__alloyId35 = Ti.UI.createLabel({
        color: "black",
        font: {
            fontSize: "20dp",
            fontFamily: "Helvetica Neue"
        },
        left: 50,
        text: "Residence",
        id: "__alloyId35"
    });
    $.__views.__alloyId33.add($.__views.__alloyId35);
    $.__views.__alloyId36 = Ti.UI.createTableViewRow({
        text: "Gender",
        left: "10",
        selectedBackgroundColor: "darkgray",
        color: "black",
        height: "50",
        id: "__alloyId36"
    });
    $.__views.__alloyId2.add($.__views.__alloyId36);
    updateSearchableText ? $.__views.__alloyId36.addEventListener("click", updateSearchableText) : __defers["$.__views.__alloyId36!click!updateSearchableText"] = true;
    $.__views.__alloyId37 = Ti.UI.createImageView({
        text: "Gender",
        left: "5",
        width: "25",
        height: "25",
        image: "/images/gender.png",
        id: "__alloyId37"
    });
    $.__views.__alloyId36.add($.__views.__alloyId37);
    $.__views.__alloyId38 = Ti.UI.createLabel({
        color: "black",
        font: {
            fontSize: "20dp",
            fontFamily: "Helvetica Neue"
        },
        left: 50,
        text: "Gender",
        id: "__alloyId38"
    });
    $.__views.__alloyId36.add($.__views.__alloyId38);
    $.__views.__alloyId39 = Ti.UI.createTableViewRow({
        text: "Custom",
        left: "10",
        height: "50",
        selectedBackgroundColor: "darkgray",
        color: "black",
        id: "__alloyId39"
    });
    $.__views.__alloyId2.add($.__views.__alloyId39);
    updateSearchableText ? $.__views.__alloyId39.addEventListener("click", updateSearchableText) : __defers["$.__views.__alloyId39!click!updateSearchableText"] = true;
    $.__views.__alloyId40 = Ti.UI.createImageView({
        text: "Custom",
        left: "5",
        width: "25",
        height: "25",
        image: "/images/custom.png",
        id: "__alloyId40"
    });
    $.__views.__alloyId39.add($.__views.__alloyId40);
    $.__views.__alloyId41 = Ti.UI.createLabel({
        color: "black",
        font: {
            fontSize: "20dp",
            fontFamily: "Helvetica Neue"
        },
        left: 50,
        text: "Custom",
        id: "__alloyId41"
    });
    $.__views.__alloyId39.add($.__views.__alloyId41);
    $.__views.__alloyId42 = Ti.UI.createView({
        left: "130dp",
        id: "__alloyId42"
    });
    $.__views.__alloyId39.add($.__views.__alloyId42);
    $.__views.txt_customField = Ti.UI.createTextField({
        id: "txt_customField",
        hintText: "custom field",
        borderColor: "darkgray",
        visible: "false",
        borderRadius: "5dp"
    });
    $.__views.__alloyId42.add($.__views.txt_customField);
    $.__views.table = Ti.UI.createTableView({
        data: __alloyId1,
        id: "table",
        left: "0",
        width: "0",
        backgroundColor: "transparent"
    });
    $.__views.view_tableview.add($.__views.table);
    $.__views.img_pickerShow = Ti.UI.createImageView({
        id: "img_pickerShow",
        width: "50",
        right: "0",
        top: "100dp",
        bubbleParent: "false"
    });
    $.__views.view_tableview.add($.__views.img_pickerShow);
    manipulatePicerView ? $.__views.img_pickerShow.addEventListener("click", manipulatePicerView) : __defers["$.__views.img_pickerShow!click!manipulatePicerView"] = true;
    $.__views.view_allContacts = Ti.UI.createView({
        backgroundColor: "#40bae9",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        layout: "vertical",
        id: "view_allContacts",
        top: "0"
    });
    $.__views.view_container.add($.__views.view_allContacts);
    closeOpenProfile ? $.__views.view_allContacts.addEventListener("click", closeOpenProfile) : __defers["$.__views.view_allContacts!click!closeOpenProfile"] = true;
    openPickerViewWithSwipe ? $.__views.view_allContacts.addEventListener("swipe", openPickerViewWithSwipe) : __defers["$.__views.view_allContacts!swipe!openPickerViewWithSwipe"] = true;
    $.__views.__alloyId43 = Ti.UI.createLabel({
        color: "blue",
        font: {
            fontSize: "20dp",
            fontFamily: "Helvetica Neue"
        },
        left: "5dp",
        width: Ti.UI.SIZE,
        height: "30dp",
        textAlign: "center",
        text: "all contacts",
        backgroundColor: "transparent",
        id: "__alloyId43"
    });
    $.__views.view_allContacts.add($.__views.__alloyId43);
    allContactsFadeOut ? $.__views.__alloyId43.addEventListener("click", allContactsFadeOut) : __defers["$.__views.__alloyId43!click!allContactsFadeOut"] = true;
    $.__views.lbl_findBy = Ti.UI.createLabel({
        color: "black",
        font: {
            fontSize: "20dp",
            fontFamily: "Helvetica Neue"
        },
        left: 50,
        text: "Find By\nName",
        id: "lbl_findBy",
        width: "0",
        height: "0"
    });
    $.__views.view_allContacts.add($.__views.lbl_findBy);
    openFieldsPicker ? $.__views.lbl_findBy.addEventListener("click", openFieldsPicker) : __defers["$.__views.lbl_findBy!click!openFieldsPicker"] = true;
    $.__views.search = Ti.UI.createSearchBar({
        backgroundColor: "transparent",
        id: "search",
        left: "0",
        hintText: "find a bofff",
        height: "43",
        width: Ti.UI.FILL
    });
    $.__views.view_allContacts.add($.__views.search);
    $.__views.view_picker = Ti.UI.createView({
        id: "view_picker",
        width: "0",
        height: "0",
        borderColor: "green",
        left: "100%"
    });
    $.__views.view_allContacts.add($.__views.view_picker);
    $.__views.picker = Ti.UI.createPicker({
        id: "picker",
        top: "0",
        selectionIndicator: "true",
        useSpinner: "true"
    });
    $.__views.view_picker.add($.__views.picker);
    var __alloyId44 = [];
    $.__views.__alloyId45 = Ti.UI.createPickerRow({
        title: "Name",
        id: "__alloyId45"
    });
    __alloyId44.push($.__views.__alloyId45);
    $.__views.__alloyId46 = Ti.UI.createPickerRow({
        title: "Phone Number",
        id: "__alloyId46"
    });
    __alloyId44.push($.__views.__alloyId46);
    $.__views.__alloyId47 = Ti.UI.createPickerRow({
        title: "E-mail",
        id: "__alloyId47"
    });
    __alloyId44.push($.__views.__alloyId47);
    $.__views.__alloyId48 = Ti.UI.createPickerRow({
        title: "Social Network",
        id: "__alloyId48"
    });
    __alloyId44.push($.__views.__alloyId48);
    $.__views.__alloyId49 = Ti.UI.createPickerRow({
        title: "Job Title",
        id: "__alloyId49"
    });
    __alloyId44.push($.__views.__alloyId49);
    $.__views.__alloyId50 = Ti.UI.createPickerRow({
        title: "Company",
        id: "__alloyId50"
    });
    __alloyId44.push($.__views.__alloyId50);
    $.__views.__alloyId51 = Ti.UI.createPickerRow({
        title: "Interests",
        id: "__alloyId51"
    });
    __alloyId44.push($.__views.__alloyId51);
    $.__views.__alloyId52 = Ti.UI.createPickerRow({
        title: "Education",
        id: "__alloyId52"
    });
    __alloyId44.push($.__views.__alloyId52);
    $.__views.__alloyId53 = Ti.UI.createPickerRow({
        title: "Favorite Places",
        id: "__alloyId53"
    });
    __alloyId44.push($.__views.__alloyId53);
    $.__views.__alloyId54 = Ti.UI.createPickerRow({
        title: "Marital Status",
        id: "__alloyId54"
    });
    __alloyId44.push($.__views.__alloyId54);
    $.__views.__alloyId55 = Ti.UI.createPickerRow({
        title: "Residence",
        id: "__alloyId55"
    });
    __alloyId44.push($.__views.__alloyId55);
    $.__views.__alloyId56 = Ti.UI.createPickerRow({
        title: "Gender",
        id: "__alloyId56"
    });
    __alloyId44.push($.__views.__alloyId56);
    $.__views.__alloyId57 = Ti.UI.createPickerRow({
        title: "Custom",
        id: "__alloyId57"
    });
    __alloyId44.push($.__views.__alloyId57);
    $.__views.picker.add(__alloyId44);
    updateFieldSearch ? $.__views.picker.addEventListener("change", updateFieldSearch) : __defers["$.__views.picker!change!updateFieldSearch"] = true;
    var __alloyId58 = {};
    var __alloyId60 = [];
    var __alloyId61 = {
        type: "Ti.UI.ImageView",
        bindId: "pic",
        properties: {
            width: "50dp",
            height: "50dp",
            left: 0,
            bindId: "pic"
        }
    };
    __alloyId60.push(__alloyId61);
    var __alloyId62 = {
        type: "Ti.UI.ImageView",
        bindId: "bofff_pic",
        properties: {
            width: "37dp",
            height: "34dp",
            right: 0,
            bindId: "bofff_pic"
        }
    };
    __alloyId60.push(__alloyId62);
    var __alloyId63 = {
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
    __alloyId60.push(__alloyId63);
    var __alloyId59 = {
        properties: {
            height: "56dp",
            name: "template1"
        },
        childTemplates: __alloyId60
    };
    __alloyId58["template1"] = __alloyId59;
    $.__views.list_allContacts = Ti.UI.createListView({
        width: "100%",
        templates: __alloyId58,
        backgroundColor: "#2279bc",
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
    var platformWidth = 0;
    platformWidth = Ti.Platform.displayCaps.platformWidth;
    var pickerIsOpen = false;
    $.search.addEventListener("cancel", function() {
        $.search.blur();
        hidePickerView();
        searchbarIsOnFocus = false;
        $.search.showCancel = "false";
    });
    $.search.addEventListener("change", function(e) {
        $.list_allContacts.searchText = e.value;
    });
    var searchbarIsOnFocus = false;
    $.search.addEventListener("focus", function() {
        $.lbl_findBy.width = Ti.UI.SIZE;
        $.lbl_findBy.height = Ti.UI.SIZE;
        searchbarIsOnFocus = true;
        $.search.showCancel = "true";
    });
    $.search.addEventListener("blur", function() {
        $.lbl_findBy.width = 0;
        $.lbl_findBy.height = 0;
        $.view_picker.animate({
            left: "100%",
            duration: 500
        }, function() {
            $.view_picker.width = 0;
            $.view_picker.height = 0;
        });
    });
    $.list_allContacts.caseInsensitiveSearch = true;
    $.list_allContacts.keepSectionsInSearch = true;
    var contact;
    var profileOpen = false;
    var view_contactInfo;
    __defers["$.__views.view_contactFieldsPicker!click!openPickerView"] && $.__views.view_contactFieldsPicker.addEventListener("click", openPickerView);
    __defers["$.__views.view_contactFieldsPicker!swipe!narrowPickerView"] && $.__views.view_contactFieldsPicker.addEventListener("swipe", narrowPickerView);
    __defers["$.__views.btn_donePicker!click!closePicker"] && $.__views.btn_donePicker.addEventListener("click", closePicker);
    __defers["$.__views.__alloyId3!click!updateSearchableText"] && $.__views.__alloyId3.addEventListener("click", updateSearchableText);
    __defers["$.__views.__alloyId6!click!updateSearchableText"] && $.__views.__alloyId6.addEventListener("click", updateSearchableText);
    __defers["$.__views.__alloyId9!click!updateSearchableText"] && $.__views.__alloyId9.addEventListener("click", updateSearchableText);
    __defers["$.__views.__alloyId12!click!updateSearchableText"] && $.__views.__alloyId12.addEventListener("click", updateSearchableText);
    __defers["$.__views.__alloyId15!click!updateSearchableText"] && $.__views.__alloyId15.addEventListener("click", updateSearchableText);
    __defers["$.__views.__alloyId18!click!updateSearchableText"] && $.__views.__alloyId18.addEventListener("click", updateSearchableText);
    __defers["$.__views.__alloyId21!click!updateSearchableText"] && $.__views.__alloyId21.addEventListener("click", updateSearchableText);
    __defers["$.__views.__alloyId24!click!updateSearchableText"] && $.__views.__alloyId24.addEventListener("click", updateSearchableText);
    __defers["$.__views.__alloyId27!click!updateSearchableText"] && $.__views.__alloyId27.addEventListener("click", updateSearchableText);
    __defers["$.__views.__alloyId30!click!updateSearchableText"] && $.__views.__alloyId30.addEventListener("click", updateSearchableText);
    __defers["$.__views.__alloyId33!click!updateSearchableText"] && $.__views.__alloyId33.addEventListener("click", updateSearchableText);
    __defers["$.__views.__alloyId36!click!updateSearchableText"] && $.__views.__alloyId36.addEventListener("click", updateSearchableText);
    __defers["$.__views.__alloyId39!click!updateSearchableText"] && $.__views.__alloyId39.addEventListener("click", updateSearchableText);
    __defers["$.__views.img_pickerShow!click!manipulatePicerView"] && $.__views.img_pickerShow.addEventListener("click", manipulatePicerView);
    __defers["$.__views.view_allContacts!click!closeOpenProfile"] && $.__views.view_allContacts.addEventListener("click", closeOpenProfile);
    __defers["$.__views.view_allContacts!swipe!openPickerViewWithSwipe"] && $.__views.view_allContacts.addEventListener("swipe", openPickerViewWithSwipe);
    __defers["$.__views.__alloyId43!click!allContactsFadeOut"] && $.__views.__alloyId43.addEventListener("click", allContactsFadeOut);
    __defers["$.__views.lbl_findBy!click!openFieldsPicker"] && $.__views.lbl_findBy.addEventListener("click", openFieldsPicker);
    __defers["$.__views.picker!change!updateFieldSearch"] && $.__views.picker.addEventListener("change", updateFieldSearch);
    __defers["$.__views.list_allContacts!itemclick!showContact"] && $.__views.list_allContacts.addEventListener("itemclick", showContact);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;