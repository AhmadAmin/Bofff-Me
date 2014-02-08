function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __alloyId7 = [];
    $.__views.boffsList_win = Ti.UI.createWindow({
        backgroundColor: "lightgray",
        title: "Bofffs List",
        id: "boffsList_win"
    });
    $.__views.__alloyId8 = Ti.UI.createTab({
        window: $.__views.boffsList_win,
        title: "Bofffs List",
        icon: "/images/bofffios.png",
        id: "__alloyId8"
    });
    __alloyId7.push($.__views.__alloyId8);
    $.__views.__alloyId10 = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: "Bofff Code",
        id: "__alloyId10"
    });
    $.__views.__alloyId11 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "Bofff Code",
        id: "__alloyId11"
    });
    $.__views.__alloyId10.add($.__views.__alloyId11);
    $.__views.__alloyId9 = Ti.UI.createTab({
        window: $.__views.__alloyId10,
        title: "Bofff Code",
        icon: "KS_nav_views.png",
        id: "__alloyId9"
    });
    __alloyId7.push($.__views.__alloyId9);
    $.__views.__alloyId13 = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: "Bofffs News",
        id: "__alloyId13"
    });
    $.__views.__alloyId14 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "Bofffs News",
        id: "__alloyId14"
    });
    $.__views.__alloyId13.add($.__views.__alloyId14);
    $.__views.__alloyId12 = Ti.UI.createTab({
        window: $.__views.__alloyId13,
        title: "Bofffs News",
        icon: "KS_nav_ui.png",
        id: "__alloyId12"
    });
    __alloyId7.push($.__views.__alloyId12);
    $.__views.__alloyId16 = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: "Bofff Map",
        id: "__alloyId16"
    });
    $.__views.__alloyId17 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "Bofff Map",
        id: "__alloyId17"
    });
    $.__views.__alloyId16.add($.__views.__alloyId17);
    $.__views.__alloyId15 = Ti.UI.createTab({
        window: $.__views.__alloyId16,
        title: "Bofff Map",
        icon: "KS_nav_views.png",
        id: "__alloyId15"
    });
    __alloyId7.push($.__views.__alloyId15);
    $.__views.index = Ti.UI.createTabGroup({
        tabs: __alloyId7,
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.boffsList_win.add(Alloy.createController("contacts").getView());
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;