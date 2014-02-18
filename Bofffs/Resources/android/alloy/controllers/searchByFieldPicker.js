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
    var __alloyId23 = [];
    $.__views.__alloyId24 = Ti.UI.createPickerRow({
        title: "Name",
        id: "__alloyId24"
    });
    __alloyId23.push($.__views.__alloyId24);
    $.__views.__alloyId25 = Ti.UI.createPickerRow({
        title: "Phone Number",
        id: "__alloyId25"
    });
    __alloyId23.push($.__views.__alloyId25);
    $.__views.__alloyId26 = Ti.UI.createPickerRow({
        title: "E-mail",
        id: "__alloyId26"
    });
    __alloyId23.push($.__views.__alloyId26);
    $.__views.__alloyId27 = Ti.UI.createPickerRow({
        title: "Social Network",
        id: "__alloyId27"
    });
    __alloyId23.push($.__views.__alloyId27);
    $.__views.__alloyId28 = Ti.UI.createPickerRow({
        title: "Job Title",
        id: "__alloyId28"
    });
    __alloyId23.push($.__views.__alloyId28);
    $.__views.__alloyId29 = Ti.UI.createPickerRow({
        title: "Company",
        id: "__alloyId29"
    });
    __alloyId23.push($.__views.__alloyId29);
    $.__views.__alloyId30 = Ti.UI.createPickerRow({
        title: "Interests",
        id: "__alloyId30"
    });
    __alloyId23.push($.__views.__alloyId30);
    $.__views.__alloyId31 = Ti.UI.createPickerRow({
        title: "Education",
        id: "__alloyId31"
    });
    __alloyId23.push($.__views.__alloyId31);
    $.__views.__alloyId32 = Ti.UI.createPickerRow({
        title: "Favorite Places",
        id: "__alloyId32"
    });
    __alloyId23.push($.__views.__alloyId32);
    $.__views.__alloyId33 = Ti.UI.createPickerRow({
        title: "Marital Status",
        id: "__alloyId33"
    });
    __alloyId23.push($.__views.__alloyId33);
    $.__views.__alloyId34 = Ti.UI.createPickerRow({
        title: "Residence",
        id: "__alloyId34"
    });
    __alloyId23.push($.__views.__alloyId34);
    $.__views.__alloyId35 = Ti.UI.createPickerRow({
        title: "Gender",
        id: "__alloyId35"
    });
    __alloyId23.push($.__views.__alloyId35);
    $.__views.__alloyId36 = Ti.UI.createPickerRow({
        title: "Custom",
        id: "__alloyId36"
    });
    __alloyId23.push($.__views.__alloyId36);
    $.__views.picker.add(__alloyId23);
    $.__views.picker = Ti.UI.createPicker({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "picker",
        selectionIndicator: "true"
    });
    var __alloyId37 = [];
    $.__views.__alloyId38 = Ti.UI.createPickerRow({
        title: "Name",
        id: "__alloyId38"
    });
    __alloyId37.push($.__views.__alloyId38);
    $.__views.__alloyId39 = Ti.UI.createPickerRow({
        title: "Phone Number",
        id: "__alloyId39"
    });
    __alloyId37.push($.__views.__alloyId39);
    $.__views.__alloyId40 = Ti.UI.createPickerRow({
        title: "E-mail",
        id: "__alloyId40"
    });
    __alloyId37.push($.__views.__alloyId40);
    $.__views.__alloyId41 = Ti.UI.createPickerRow({
        title: "Social Network",
        id: "__alloyId41"
    });
    __alloyId37.push($.__views.__alloyId41);
    $.__views.__alloyId42 = Ti.UI.createPickerRow({
        title: "Job Title",
        id: "__alloyId42"
    });
    __alloyId37.push($.__views.__alloyId42);
    $.__views.__alloyId43 = Ti.UI.createPickerRow({
        title: "Company",
        id: "__alloyId43"
    });
    __alloyId37.push($.__views.__alloyId43);
    $.__views.__alloyId44 = Ti.UI.createPickerRow({
        title: "Interests",
        id: "__alloyId44"
    });
    __alloyId37.push($.__views.__alloyId44);
    $.__views.__alloyId45 = Ti.UI.createPickerRow({
        title: "Education",
        id: "__alloyId45"
    });
    __alloyId37.push($.__views.__alloyId45);
    $.__views.__alloyId46 = Ti.UI.createPickerRow({
        title: "Favorite Places",
        id: "__alloyId46"
    });
    __alloyId37.push($.__views.__alloyId46);
    $.__views.__alloyId47 = Ti.UI.createPickerRow({
        title: "Marital Status",
        id: "__alloyId47"
    });
    __alloyId37.push($.__views.__alloyId47);
    $.__views.__alloyId48 = Ti.UI.createPickerRow({
        title: "Residence",
        id: "__alloyId48"
    });
    __alloyId37.push($.__views.__alloyId48);
    $.__views.__alloyId49 = Ti.UI.createPickerRow({
        title: "Gender",
        id: "__alloyId49"
    });
    __alloyId37.push($.__views.__alloyId49);
    $.__views.__alloyId50 = Ti.UI.createPickerRow({
        title: "Custom",
        id: "__alloyId50"
    });
    __alloyId37.push($.__views.__alloyId50);
    $.__views.picker.add(__alloyId37);
    $.__views.picker && $.addTopLevelView($.__views.picker);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;