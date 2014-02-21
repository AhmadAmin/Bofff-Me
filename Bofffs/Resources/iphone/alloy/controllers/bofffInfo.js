function Controller() {
    function importImage() {
        $.img_bofffImage.image = image;
        if (null == $.img_bofffImage.image) {
            $.img_bofffImage.width = 0;
            $.img_bofffImage.height = 0;
        } else {
            $.img_bofffImage.width = "80dp";
            $.img_bofffImage.height = "80dp";
        }
    }
    function enlargeImage() {
        var params = {
            bofffName: bofff.fullName,
            image: image
        };
        Ti.App.bofffsListTab.open(Alloy.createController("bofffImage", params).getView());
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "bofffInfo";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win_bofffInfo = Ti.UI.createWindow({
        id: "win_bofffInfo",
        title: "Bofff Info",
        navTintColor: "#2279bc",
        backgroundColor: "white",
        layout: "vertical"
    });
    $.__views.win_bofffInfo && $.addTopLevelView($.__views.win_bofffInfo);
    $.__views.img_bofffImage = Ti.UI.createImageView({
        left: 10,
        top: "30",
        id: "img_bofffImage"
    });
    $.__views.win_bofffInfo.add($.__views.img_bofffImage);
    enlargeImage ? $.__views.img_bofffImage.addEventListener("click", enlargeImage) : __defers["$.__views.img_bofffImage!click!enlargeImage"] = true;
    $.__views.view_container = Ti.UI.createScrollView({
        layout: "vertical",
        id: "view_container"
    });
    $.__views.win_bofffInfo.add($.__views.view_container);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var bofff = args.bofff;
    var image = args.image;
    var prevButton = Titanium.UI.createButton({
        title: "Back"
    });
    prevButton.addEventListener("click", function() {
        $.win_bofffInfo.close();
    });
    $.win_bofffInfo.leftNavButton = prevButton;
    $.win_bofffInfo.title = bofff.fullName;
    importImage();
    __defers["$.__views.img_bofffImage!click!enlargeImage"] && $.__views.img_bofffImage.addEventListener("click", enlargeImage);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;