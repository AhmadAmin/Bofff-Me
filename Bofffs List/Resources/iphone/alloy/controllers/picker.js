function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "picker";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.pickerview = Ti.UI.createView({
        id: "pickerview",
        backgroundColor: "transparent",
        visible: "false",
        top: "250"
    });
    $.__views.pickerview && $.addTopLevelView($.__views.pickerview);
    var __alloyId35 = [];
    $.__views.toolbarBtn_cancel = Ti.UI.createButton({
        id: "toolbarBtn_cancel",
        systemButton: Ti.UI.iPhone.SystemButton.CANCEL
    });
    __alloyId35.push($.__views.toolbarBtn_cancel);
    $.__views.__alloyId36 = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    __alloyId35.push($.__views.__alloyId36);
    $.__views.toolbarBtn_done = Ti.UI.createButton({
        id: "toolbarBtn_done",
        systemButton: Ti.UI.iPhone.SystemButton.DONE
    });
    __alloyId35.push($.__views.toolbarBtn_done);
    $.__views.__alloyId33 = Ti.UI.iOS.createToolbar({
        items: __alloyId35,
        top: "0",
        id: "__alloyId33"
    });
    $.__views.pickerview.add($.__views.__alloyId33);
    $.__views.picker = Ti.UI.createPicker({
        id: "picker",
        selectionIndicator: "true",
        top: "40"
    });
    $.__views.pickerview.add($.__views.picker);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;