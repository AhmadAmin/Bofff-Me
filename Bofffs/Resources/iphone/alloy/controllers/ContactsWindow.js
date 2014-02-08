function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ContactsWindow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.container_view = Ti.UI.createView({
        backgroundColor: "green",
        id: "container_view"
    });
    $.__views.container_view && $.addTopLevelView($.__views.container_view);
    $.__views.__alloyId0 = Ti.UI.createLabel({
        text: "Contacts View",
        id: "__alloyId0"
    });
    $.__views.container_view.add($.__views.__alloyId0);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;