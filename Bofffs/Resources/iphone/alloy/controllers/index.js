function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __alloyId7 = [];
    $.__views.win_boffsList = Ti.UI.createWindow({
        backgroundColor: "lightgray",
        title: "Bofffs List",
        id: "win_boffsList"
    });
    $.__views.tab_boffsList = Ti.UI.createTab({
        window: $.__views.win_boffsList,
        title: "Bofffs List",
        id: "tab_boffsList",
        icon: "/images/bofffios.png"
    });
    __alloyId7.push($.__views.tab_boffsList);
    $.__views.__alloyId9 = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: "Bofff Code",
        id: "__alloyId9"
    });
    $.__views.__alloyId10 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "Bofff Code",
        id: "__alloyId10"
    });
    $.__views.__alloyId9.add($.__views.__alloyId10);
    $.__views.__alloyId8 = Ti.UI.createTab({
        window: $.__views.__alloyId9,
        title: "Bofff Code",
        icon: "KS_nav_views.png",
        id: "__alloyId8"
    });
    __alloyId7.push($.__views.__alloyId8);
    $.__views.__alloyId12 = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: "Bofffs News",
        id: "__alloyId12"
    });
    $.__views.__alloyId13 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "Bofffs News",
        id: "__alloyId13"
    });
    $.__views.__alloyId12.add($.__views.__alloyId13);
    $.__views.__alloyId11 = Ti.UI.createTab({
        window: $.__views.__alloyId12,
        title: "Bofffs News",
        icon: "KS_nav_ui.png",
        id: "__alloyId11"
    });
    __alloyId7.push($.__views.__alloyId11);
    $.__views.__alloyId15 = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: "Bofff Map",
        id: "__alloyId15"
    });
    $.__views.__alloyId16 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "Bofff Map",
        id: "__alloyId16"
    });
    $.__views.__alloyId15.add($.__views.__alloyId16);
    $.__views.__alloyId14 = Ti.UI.createTab({
        window: $.__views.__alloyId15,
        title: "Bofff Map",
        icon: "KS_nav_views.png",
        id: "__alloyId14"
    });
    __alloyId7.push($.__views.__alloyId14);
    $.__views.index = Ti.UI.createTabGroup({
        tabs: __alloyId7,
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.win_boffsList.add(Alloy.createController("contacts").getView());
    Ti.App.bofffsListTab = $.tab_boffsList;
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;