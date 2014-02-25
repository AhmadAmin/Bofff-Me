function Controller() {
    function initializeSearch() {
        if (firstFocus && false) {
            firstFocus = false;
            $.search.blur();
        } else {
            $.view_search.width = Ti.UI.SIZE;
            $.view_search.height = Ti.UI.SIZE;
            searchbarIsOnFocus = true;
            $.search.showCancel = "true";
        }
    }
    function cancelSearch() {
        $.search.blur();
        $.search.value = "";
        $.list_bofffContacts.searchText = "";
        searchbarIsOnFocus = false;
        $.search.showCancel = "false";
    }
    function updateSearch(e) {
        $.list_bofffContacts.searchText = e.value;
    }
    function searchBofff(e) {
        $.list_bofffContacts.searchText = e.value;
        searchButtonPressed = true;
        $.search.blur();
    }
    function stopSearch() {
        if (searchButtonPressed) searchButtonPressed = false; else {
            $.search.showCancel = "false";
            if (!pickerVisible) {
                $.view_search.width = 0;
                $.view_search.height = 0;
            }
        }
    }
    function openSearchPicker() {
        if (pickerVisible) {
            animation.fadeOut($.picker_searchBy.view_picker, 500, function() {
                $.picker_searchBy.view_picker.width = 0;
                $.picker_searchBy.view_picker.height = 0;
                pickerVisible = false;
                $.search.focus();
            });
            changeSearchableText(searchableText, searchableTextPrivacy);
        } else {
            $.picker_searchBy.view_picker.width = Ti.UI.SIZE;
            $.picker_searchBy.view_picker.height = Ti.UI.FILL;
            animation.popIn($.picker_searchBy.view_picker);
            pickerVisible = true;
            $.search.blur();
        }
    }
    function changeSearchableText(searchableText, searchableTextPrivacy) {
        for (var sectionCounter in $.list_bofffContacts.sections) {
            var section = $.list_bofffContacts.sections[sectionCounter];
            var items = [];
            for (var itemCounter in section.items) {
                var item = section.items[itemCounter];
                var itemId = item.properties.itemId;
                var privacyOfBofff = bofffsList[itemId].privacy_of_friend;
                var privacyOfField = bofffs[itemId].bofff[searchableTextPrivacy];
                item.properties.searchableText = privacyNumber[privacyOfBofff] >= privacyNumber[privacyOfField] ? bofffs[itemId].bofff[searchableText] : "";
                items.push(item);
            }
            $.list_bofffContacts.sections[sectionCounter].replaceItemsAt(0, section.items.length, items);
        }
    }
    function createBofffListView(_data) {
        var listSections = [];
        var lastCharacter = _data[0].contactName.substring(0, 1).toUpperCase();
        var section = Ti.UI.createListSection({
            headerTitle: lastCharacter
        });
        var items = [];
        for (var i in _data) {
            nextCharacter = _data[i].contactName.substring(0, 1).toUpperCase();
            if (lastCharacter != nextCharacter) {
                section.setItems(items);
                listSections.push(section);
                lastCharacter = nextCharacter;
                section = Ti.UI.createListSection({
                    headerTitle: lastCharacter
                });
                items = [];
            }
            imageFavorite = "favorite" == _data[i].status ? "/images/favoritecontact.png" : "/images/notfavoritecontact.png";
            items.push({
                template: "template1",
                textLabel: {
                    text: _data[i].contactName
                },
                pic: {
                    image: _data[i].icon_image
                },
                bofff_pic: {
                    image: imageFavorite
                },
                status: _data[i].status,
                properties: {
                    itemId: i,
                    searchableText: _data[i].contactName,
                    backgroundColor: "transparent"
                }
            });
        }
        section.setItems(items);
        listSections.push(section);
        $.list_bofffContacts.sections = listSections;
    }
    function starClicked() {
        privacyClicked = true;
    }
    function changeStar(listItem) {
        privacyClicked = false;
        var item = listItem.section.getItemAt(listItem.itemIndex);
        if ("not favorite" == item.status) {
            item.status = "favorite";
            item.bofff_pic.image = "/images/favoritecontact.png";
            listItem.section.updateItemAt(listItem.itemIndex, item);
        } else {
            item.status = "not favorite";
            item.bofff_pic.image = "/images/notfavoritecontact.png";
            listItem.section.updateItemAt(listItem.itemIndex, item);
        }
    }
    function updatePrivacy(listItem) {
        var item = listItem.section.getItemAt(listItem.itemIndex);
        var newStatus = "not favorite";
        "not favorite" == item.status && (newStatus = "favorite");
        var url = "http://www.bofffme.com/api/index.php/home/";
        var xhr = Ti.Network.createHTTPClient({
            onload: function() {
                JSON.parse(this.responseText);
                changeStar(listItem);
            },
            onerror: function() {
                alert("error");
            }
        });
        xhr.open("POST", url + "update_friend/bofff/user_friends/" + bofffsList[listItem.itemId].id);
        var params = {
            status: newStatus
        };
        xhr.send(params);
    }
    function showContact(e) {
        if (privacyClicked) updatePrivacy(e); else if (ifImageClicked) {
            ifImageClicked = false;
            var bofffId = bofffs[e.itemId].contact_id;
            updateNumber(bofffId, "123456754745854");
        } else {
            $.search.blur();
            var bofff;
            bofff = bofffs[e.itemId]["bofff"];
            var image = e.section.getItemAt(e.itemIndex).pic.image;
            var params = {
                bofff: bofff,
                image: image
            };
            Ti.App.bofffsListTab.open(Alloy.createController("bofffInfo", params).getView());
        }
    }
    function imageClicked() {
        ifImageClicked = true;
    }
    function updateNumber(id, value) {
        var contact = Titanium.Contacts.getPersonByID(id);
        var phoneNumbers = contact.phone.mobile;
        phoneNumbers.push(value);
        var phone = {
            mobile: phoneNumbers
        };
        contact.setPhone(phone);
        Titanium.Contacts.save();
        alert("contact updated");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "bofffsContacts";
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
    $.__views.view_bofffsContacts = Ti.UI.createView({
        backgroundColor: "transparent",
        layout: "vertical",
        id: "view_bofffsContacts"
    });
    $.__views.view_container.add($.__views.view_bofffsContacts);
    $.__views.view_search = Ti.UI.createView({
        id: "view_search",
        layout: "horizontal",
        width: "0",
        height: "0"
    });
    $.__views.view_bofffsContacts.add($.__views.view_search);
    $.__views.lbl_findBy = Ti.UI.createLabel({
        color: "black",
        font: {
            fontSize: "20dp",
            fontFamily: "Helvetica Neue"
        },
        left: "10",
        text: "Find By",
        id: "lbl_findBy",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE
    });
    $.__views.view_search.add($.__views.lbl_findBy);
    $.__views.lbl_searchField = Ti.UI.createLabel({
        color: "black",
        font: {
            fontSize: "20dp",
            fontFamily: "Helvetica Neue"
        },
        left: "10",
        text: "Name",
        id: "lbl_searchField",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE
    });
    $.__views.view_search.add($.__views.lbl_searchField);
    openSearchPicker ? $.__views.lbl_searchField.addEventListener("click", openSearchPicker) : __defers["$.__views.lbl_searchField!click!openSearchPicker"] = true;
    $.__views.picker_searchBy = Alloy.createController("searchByFieldPicker", {
        id: "picker_searchBy",
        __parentSymbol: $.__views.view_bofffsContacts
    });
    $.__views.picker_searchBy.setParent($.__views.view_bofffsContacts);
    $.__views.search = Ti.UI.createSearchBar({
        backgroundColor: "transparent",
        id: "search",
        left: "0",
        height: "43",
        width: Ti.UI.FILL,
        hintText: "find a bofff"
    });
    $.__views.view_bofffsContacts.add($.__views.search);
    initializeSearch ? $.__views.search.addEventListener("focus", initializeSearch) : __defers["$.__views.search!focus!initializeSearch"] = true;
    cancelSearch ? $.__views.search.addEventListener("cancel", cancelSearch) : __defers["$.__views.search!cancel!cancelSearch"] = true;
    updateSearch ? $.__views.search.addEventListener("change", updateSearch) : __defers["$.__views.search!change!updateSearch"] = true;
    stopSearch ? $.__views.search.addEventListener("blur", stopSearch) : __defers["$.__views.search!blur!stopSearch"] = true;
    searchBofff ? $.__views.search.addEventListener("return", searchBofff) : __defers["$.__views.search!return!searchBofff"] = true;
    var __alloyId6 = {};
    var __alloyId8 = [];
    var __alloyId9 = {
        type: "Ti.UI.ImageView",
        bindId: "pic",
        properties: {
            width: "50dp",
            height: "50dp",
            left: 0,
            bindId: "pic"
        },
        events: {
            click: imageClicked
        }
    };
    __alloyId8.push(__alloyId9);
    var __alloyId10 = {
        type: "Ti.UI.ImageView",
        bindId: "bofff_pic",
        properties: {
            width: "37dp",
            height: "34dp",
            right: 0,
            bindId: "bofff_pic"
        },
        events: {
            click: starClicked
        }
    };
    __alloyId8.push(__alloyId10);
    var __alloyId11 = {
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
    __alloyId8.push(__alloyId11);
    var __alloyId7 = {
        properties: {
            height: "56dp",
            name: "template1"
        },
        childTemplates: __alloyId8
    };
    __alloyId6["template1"] = __alloyId7;
    $.__views.list_bofffContacts = Ti.UI.createListView({
        width: "100%",
        templates: __alloyId6,
        id: "list_bofffContacts",
        left: "0",
        defaultItemTemplate: "template1"
    });
    $.__views.view_bofffsContacts.add($.__views.list_bofffContacts);
    showContact ? $.__views.list_bofffContacts.addEventListener("itemclick", showContact) : __defers["$.__views.list_bofffContacts!itemclick!showContact"] = true;
    $.__views.view_customField = Alloy.createController("view_customField", {
        id: "view_customField",
        __parentSymbol: $.__views.view_container
    });
    $.__views.view_customField.setParent($.__views.view_container);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    args.mainView;
    try {
        var bofffs = args.bofffFriends;
        var bofffsList = args.bofffsList;
        createBofffListView(bofffsList, "fullName");
    } catch (error) {}
    var searchbarIsOnFocus = false;
    var firstFocus = true;
    var searchButtonPressed = false;
    $.list_bofffContacts.caseInsensitiveSearch = true;
    $.list_bofffContacts.keepSectionsInSearch = true;
    var pickerVisible = false;
    var animation = require("alloy/animation");
    var searchableText;
    var searchableTextPrivacy;
    $.picker_searchBy.picker.addEventListener("change", function(e) {
        searchableText = e.row.dbName;
        searchableTextPrivacy = e.row.dbPrivacy;
        $.lbl_searchField.text = e.selectedValue[0];
        if ("Custom" == e.selectedValue[0]) {
            $.view_customField.view_customField.width = "90%";
            $.view_customField.view_customField.height = "40%";
            animation.popIn($.view_customField.view_customField);
            $.view_customField.txt_customField.focus();
        }
    });
    var privacyNumber = {
        "public": 0,
        "not favorite": 1,
        friends: 1,
        favorite: 2,
        favorites: 2,
        onlyMe: 3
    };
    $.view_customField.img_closeCustomView.addEventListener("click", function() {
        animation.fadeOut($.view_customField.view_customField, 200, function() {
            $.view_customField.view_customField.width = 0;
            $.view_customField.view_customField.height = 0;
            $.lbl_searchField.text = $.view_customField.txt_customField.value;
            "" == $.lbl_searchField.text && ($.lbl_searchField.text = "Custom");
            $.view_customField.txt_customField.blur();
        });
    });
    var imageFavorite;
    var privacyClicked = false;
    var ifImageClicked = false;
    __defers["$.__views.lbl_searchField!click!openSearchPicker"] && $.__views.lbl_searchField.addEventListener("click", openSearchPicker);
    __defers["$.__views.search!focus!initializeSearch"] && $.__views.search.addEventListener("focus", initializeSearch);
    __defers["$.__views.search!cancel!cancelSearch"] && $.__views.search.addEventListener("cancel", cancelSearch);
    __defers["$.__views.search!change!updateSearch"] && $.__views.search.addEventListener("change", updateSearch);
    __defers["$.__views.search!blur!stopSearch"] && $.__views.search.addEventListener("blur", stopSearch);
    __defers["$.__views.search!return!searchBofff"] && $.__views.search.addEventListener("return", searchBofff);
    __defers["$.__views.list_bofffContacts!itemclick!showContact"] && $.__views.list_bofffContacts.addEventListener("itemclick", showContact);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;