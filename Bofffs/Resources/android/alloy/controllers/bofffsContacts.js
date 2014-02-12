function Controller() {
    function goToAllContacts() {
        mainView.scrollToView(0);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "bofffsContacts";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.view_container = Ti.UI.createView({
        backgroundColor: "white",
        id: "view_container"
    });
    $.__views.view_container && $.addTopLevelView($.__views.view_container);
    $.__views.view_bofffsContacts = Ti.UI.createView({
        backgroundColor: "transparent",
        layout: "vertical",
        id: "view_bofffsContacts"
    });
    $.__views.view_container.add($.__views.view_bofffsContacts);
    $.__views.lb_contactsType = Ti.UI.createLabel({
        color: "blue",
        font: {
            fontSize: "15dp",
            fontFamily: "Helvetica Neue"
        },
        left: 5,
        text: "my bofffs",
        id: "lb_contactsType"
    });
    $.__views.view_bofffsContacts.add($.__views.lb_contactsType);
    goToAllContacts ? $.__views.lb_contactsType.addEventListener("click", goToAllContacts) : __defers["$.__views.lb_contactsType!click!goToAllContacts"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var mainView = args.mainView;
    __defers["$.__views.lb_contactsType!click!goToAllContacts"] && $.__views.lb_contactsType.addEventListener("click", goToAllContacts);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;