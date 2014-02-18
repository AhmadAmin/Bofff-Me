var args = arguments[0] || {};

//rightNavButton for the win_bofffsList in case the current viewed list is my bofffs
var allContactsButton = Titanium.UI.createButton({
    title:'all contacts' 
});
//rightNavButton for the win_bofffsList in case the current viewed list is all contacts
var myBofffsButton = Titanium.UI.createButton({
    title:'my bofffs' 
});

//assigning the allContactsButton to the current window because the app always starts on my bofffs view as default
args.win_boffsList.rightNavButton= allContactsButton;

//this is to go to scroll to all contacts list
allContactsButton.addEventListener('click',function(e)
{
  $.scrollableview_mainContactsView.scrollToView(1);
 });

//this is to go to scroll to my bofffs list
myBofffsButton.addEventListener('click', function(e)
{
	$.scrollableview_mainContactsView.scrollToView(0);
});

//this is to check the current viewed List to decide which rightNavButton to show whether it is all contacts or my bofffs
function changeRightNavButton(e)
{
	var currentView=$.scrollableview_mainContactsView.getCurrentPage();
	if(currentView==1)
	{
		args.win_boffsList.rightNavButton= myBofffsButton;
	}
	else
	{
		args.win_boffsList.rightNavButton= allContactsButton;
	}
}

//This is to check if the user allows the access to his phonebook or not
if (Ti.Contacts.contactsAuthorization == Ti.Contacts.AUTHORIZATION_AUTHORIZED){
    performAddressBookFunction();
} else if (Ti.Contacts.contactsAuthorization == Ti.Contacts.AUTHORIZATION_UNKNOWN){
    Ti.Contacts.requestAuthorization(function(e){
        if (e.success) {
            performAddressBookFunction();
        } else {
            addressBookDisallowed();
        }
    });
} else {
    addressBookDisallowed();
}
//This is in case the user didn't allow to access his phonebook
function addressBookDisallowed(){alert("Failed");};

var sortedContacts ;
//This is to collect the contacts from the user's phonebook
function performAddressBookFunction()
{  
	var contacts = Ti.Contacts.getAllPeople();
 	sortedContacts = [];
    for (var x = 0; x < contacts.length; x++)
    {
        sortedContacts.push(contacts[x]);
    }
 	sortedContacts.sort(sort);
 	
};

//This listens for any change in the user's phonebook if that happens it reloads the whole contact list
Ti.Contacts.addEventListener('reload', function(e)
{
    //alert('Reloading contacts. Your contacts were changed externally!');
    var contacts = Ti.Contacts.getAllPeople();
    sortedContacts = [];
    for (var x = 0; x < contacts.length; x++) 
    {
        sortedContacts.push(contacts[x]);
    }
 	sortedContacts.sort(sort);
});

// This is to sort the contacts alphabetically
function sort(a, b) {
    if (a.fullName.toUpperCase() > b.fullName.toUpperCase())
    {
        return 1;
    } 
    else if (a.fullName.toUpperCase() < b.fullName.toUpperCase()) 
    {
        return -1;
    }
    return 0;
}


var payload=
{
	mainView:$.scrollableview_mainContactsView,
	sortedContacts:sortedContacts,
};
var allContacts=Alloy.createController("allContacts",payload);
var bofffsContacts=Alloy.createController("bofffsContacts",payload);
$.scrollableview_mainContactsView.addView(bofffsContacts.getView());
$.scrollableview_mainContactsView.addView(allContacts.getView());


