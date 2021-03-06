function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "bofffsListWindow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.view_container = Ti.UI.createView({
        backgroundColor: "lightgray",
        id: "view_container"
    });
    $.__views.view_container && $.addTopLevelView($.__views.view_container);
    $.__views.view_contacts = Ti.UI.createView({
        backgroundColor: "transparent",
        layout: "vertical",
        id: "view_contacts"
    });
    $.__views.view_container.add($.__views.view_contacts);
    $.__views.lb_contactsType = Ti.UI.createLabel({
        color: "blue",
        font: {
            fontSize: "15dp",
            fontFamily: "Helvetica Neue"
        },
        left: 5,
        text: "All Contacts",
        id: "lb_contactsType"
    });
    $.__views.view_contacts.add($.__views.lb_contactsType);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;