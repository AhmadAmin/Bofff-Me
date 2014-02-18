function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "view_customField";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.view_customField = Ti.UI.createView({
        backgroundColor: "#CEECF5",
        layout: "vertical",
        borderRadius: "10",
        borderColor: "black",
        width: "0",
        height: "0",
        id: "view_customField"
    });
    $.__views.view_customField && $.addTopLevelView($.__views.view_customField);
    $.__views.__alloyId51 = Ti.UI.createView({
        backgroundColor: "#2279bc",
        top: 0,
        width: "100%",
        height: Ti.UI.SIZE,
        id: "__alloyId51"
    });
    $.__views.view_customField.add($.__views.__alloyId51);
    $.__views.__alloyId52 = Ti.UI.createLabel({
        color: "black",
        left: "10",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "20dp"
        },
        text: "Custom Field",
        id: "__alloyId52"
    });
    $.__views.__alloyId51.add($.__views.__alloyId52);
    $.__views.img_closeCustomView = Ti.UI.createImageView({
        id: "img_closeCustomView",
        image: "/images/close-icon.png",
        right: "10",
        height: "40",
        width: "40"
    });
    $.__views.__alloyId51.add($.__views.img_closeCustomView);
    $.__views.txt_customField = Ti.UI.createTextField({
        id: "txt_customField",
        hintText: "Type in the custom attribute",
        height: Ti.UI.SIZE,
        width: "90%",
        bubbleParent: "false"
    });
    $.__views.view_customField.add($.__views.txt_customField);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;