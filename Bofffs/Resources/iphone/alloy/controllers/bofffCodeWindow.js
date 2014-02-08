function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "bofffCodeWindow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.bofffCodeWindow = Ti.UI.createView({
        backgroundColor: "purple",
        id: "bofffCodeWindow"
    });
    $.__views.bofffCodeWindow && $.addTopLevelView($.__views.bofffCodeWindow);
    $.__views.__alloyId0 = Ti.UI.createLabel({
        text: "Bofff Code",
        id: "__alloyId0"
    });
    $.__views.bofffCodeWindow.add($.__views.__alloyId0);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;