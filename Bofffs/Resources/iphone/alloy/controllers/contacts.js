function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "contacts";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __alloyId12 = [];
    $.__views.scrollableview_mainContactsView = Ti.UI.createScrollableView({
        views: __alloyId12,
        showPagingControl: "true",
        id: "scrollableview_mainContactsView"
    });
    $.__views.scrollableview_mainContactsView && $.addTopLevelView($.__views.scrollableview_mainContactsView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var payload = {
        mainView: $.scrollableview_mainContactsView
    };
    $.scrollableview_mainContactsView.addView(Alloy.createController("allContacts", payload).getView());
    $.scrollableview_mainContactsView.addView(Alloy.createController("bofffsContacts", payload).getView());
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;