function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __alloyId13 = [];
    $.__views.win_boffsList = Ti.UI.createWindow({
        backgroundColor: "white",
        title: "Bofffs List",
        id: "win_boffsList"
    });
    $.__views.tab_boffsList = Ti.UI.createTab({
        window: $.__views.win_boffsList,
        title: "Bofffs List",
        id: "tab_boffsList",
        icon: "/images/bofffios.png"
    });
    __alloyId13.push($.__views.tab_boffsList);
    $.__views.__alloyId15 = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: "Bofff Code",
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
        text: "Bofff Code",
        id: "__alloyId16"
    });
    $.__views.__alloyId15.add($.__views.__alloyId16);
    $.__views.__alloyId14 = Ti.UI.createTab({
        window: $.__views.__alloyId15,
        title: "Bofff Code",
        icon: "/images/QRscannerios.png",
        id: "__alloyId14"
    });
    __alloyId13.push($.__views.__alloyId14);
    $.__views.__alloyId18 = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: "Bofffs News",
        id: "__alloyId18"
    });
    $.__views.__alloyId19 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "Bofffs News",
        id: "__alloyId19"
    });
    $.__views.__alloyId18.add($.__views.__alloyId19);
    $.__views.__alloyId17 = Ti.UI.createTab({
        window: $.__views.__alloyId18,
        title: "Bofffs News",
        icon: "/images/notificationsios.png",
        id: "__alloyId17"
    });
    __alloyId13.push($.__views.__alloyId17);
    $.__views.__alloyId21 = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: "Bofff Map",
        id: "__alloyId21"
    });
    $.__views.__alloyId22 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "Bofff Map",
        id: "__alloyId22"
    });
    $.__views.__alloyId21.add($.__views.__alloyId22);
    $.__views.__alloyId20 = Ti.UI.createTab({
        window: $.__views.__alloyId21,
        title: "Bofff Map",
        icon: "/images/mapsios.png",
        id: "__alloyId20"
    });
    __alloyId13.push($.__views.__alloyId20);
    $.__views.index = Ti.UI.createTabGroup({
        tabs: __alloyId13,
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