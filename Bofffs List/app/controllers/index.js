$.index.open();
var view_bofffContacts = Alloy.createController("bofffsList").getView();
var view_addContact = Alloy.createController("addContact").getView();
$.win_addContact.add(view_addContact);
var allContactsPayload={
		mainWindow: $,
		view_bofffContacts : view_bofffContacts,
	};
var view_allContacts = Alloy.createController("allContactsList",allContactsPayload).getView();
$.view_container.add(view_allContacts);
//$.view_container.add(view_bofffContacts);








