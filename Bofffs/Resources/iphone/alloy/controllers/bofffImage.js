function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "bofffImage";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.win_bofffImage = Ti.UI.createWindow({
        id: "win_bofffImage",
        title: "Bofff Info",
        navTintColor: "#2279bc",
        backgroundColor: "white"
    });
    $.__views.win_bofffImage && $.addTopLevelView($.__views.win_bofffImage);
    $.__views.img_bofffImage = Ti.UI.createImageView({
        id: "img_bofffImage",
        width: "500",
        height: Ti.UI.SIZE
    });
    $.__views.win_bofffImage.add($.__views.img_bofffImage);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var image = args.image;
    var bofffName = args.bofffName;
    var iconImage = args.iconImage;
    var prevButton = Titanium.UI.createButton({
        title: "Back"
    });
    prevButton.addEventListener("click", function() {
        $.win_bofffImage.close();
    });
    $.win_bofffImage.leftNavButton = prevButton;
    $.win_bofffImage.title = bofffName;
    $.img_bofffImage.defaultImage = iconImage;
    $.img_bofffImage.touchEnabled = true;
    $.img_bofffImage.enableZoomControls = true;
    $.img_bofffImage.image = image;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;