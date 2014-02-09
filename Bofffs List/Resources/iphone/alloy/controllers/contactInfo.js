function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "contactInfo";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.contactInfo = Ti.UI.createWindow({
        title: "Contact Info",
        id: "contactInfo"
    });
    $.__views.contactInfo && $.addTopLevelView($.__views.contactInfo);
    $.__views.__alloyId71 = Ti.UI.createView({
        backgroundColor: "yellow",
        id: "__alloyId71"
    });
    $.__views.contactInfo.add($.__views.__alloyId71);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;