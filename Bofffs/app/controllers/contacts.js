var args = arguments[0] || {};
var payload=
{
	mainView:$.scrollableview_mainContactsView
};
$.scrollableview_mainContactsView.addView(Alloy.createController("allContacts",payload).getView());
$.scrollableview_mainContactsView.addView(Alloy.createController("bofffsContacts",payload).getView());

