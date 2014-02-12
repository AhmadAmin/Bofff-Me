function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "searchByFieldPicker";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.view_picker = Ti.UI.createView({
        id: "view_picker",
        width: "0",
        height: "0",
        backgroundColor: "white"
    });
    $.__views.view_picker && $.addTopLevelView($.__views.view_picker);
    $.__views.picker = Ti.UI.createPicker({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "picker",
        selectionIndicator: "true"
    });
    $.__views.view_picker.add($.__views.picker);
    var __alloyId17 = [];
    $.__views.__alloyId18 = Ti.UI.createPickerRow({
        title: "Name",
        id: "__alloyId18"
    });
    __alloyId17.push($.__views.__alloyId18);
    $.__views.__alloyId19 = Ti.UI.createPickerRow({
        title: "Phone Number",
        id: "__alloyId19"
    });
    __alloyId17.push($.__views.__alloyId19);
    $.__views.__alloyId20 = Ti.UI.createPickerRow({
        title: "E-mail",
        id: "__alloyId20"
    });
    __alloyId17.push($.__views.__alloyId20);
    $.__views.__alloyId21 = Ti.UI.createPickerRow({
        title: "Social Network",
        id: "__alloyId21"
    });
    __alloyId17.push($.__views.__alloyId21);
    $.__views.__alloyId22 = Ti.UI.createPickerRow({
        title: "Job Title",
        id: "__alloyId22"
    });
    __alloyId17.push($.__views.__alloyId22);
    $.__views.__alloyId23 = Ti.UI.createPickerRow({
        title: "Company",
        id: "__alloyId23"
    });
    __alloyId17.push($.__views.__alloyId23);
    $.__views.__alloyId24 = Ti.UI.createPickerRow({
        title: "Interests",
        id: "__alloyId24"
    });
    __alloyId17.push($.__views.__alloyId24);
    $.__views.__alloyId25 = Ti.UI.createPickerRow({
        title: "Education",
        id: "__alloyId25"
    });
    __alloyId17.push($.__views.__alloyId25);
    $.__views.__alloyId26 = Ti.UI.createPickerRow({
        title: "Favorite Places",
        id: "__alloyId26"
    });
    __alloyId17.push($.__views.__alloyId26);
    $.__views.__alloyId27 = Ti.UI.createPickerRow({
        title: "Marital Status",
        id: "__alloyId27"
    });
    __alloyId17.push($.__views.__alloyId27);
    $.__views.__alloyId28 = Ti.UI.createPickerRow({
        title: "Residence",
        id: "__alloyId28"
    });
    __alloyId17.push($.__views.__alloyId28);
    $.__views.__alloyId29 = Ti.UI.createPickerRow({
        title: "Gender",
        id: "__alloyId29"
    });
    __alloyId17.push($.__views.__alloyId29);
    $.__views.__alloyId30 = Ti.UI.createPickerRow({
        title: "Custom",
        id: "__alloyId30"
    });
    __alloyId17.push($.__views.__alloyId30);
    $.__views.picker.add(__alloyId17);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;