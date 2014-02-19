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
var bofffContacts=[];
var contactsNumbers=[];
var mobileNumbers;
var expression = /^\d+$/;
for(var contact in sortedContacts)
{
	mobileNumbers= sortedContacts[contact].getPhone();
	if (!isEmpty(mobileNumbers))
	{
		for (var i in mobileNumbers)
		{
			for (var x in mobileNumbers[i])
			{
				var trimmedNumber="";
				if(!expression.test(mobileNumbers[i][x]))
				{
					for(var character in mobileNumbers[i][x])
					{
						if(expression.test(mobileNumbers[i][x][character]))
						{
							trimmedNumber+=mobileNumbers[i][x][character];
						}
					}
				}
				else
				{
					trimmedNumber=mobileNumbers[i][x];
				}
				contactsNumbers.push(trimmedNumber);
			}
		}
	}
}

for(var number in contactsNumbers)
{
	findBofffs(contactsNumbers[number]);
}

function findBofffs(contactNumber)
{
	var url =  'http://www.bofffme.com/api/index.php/home/';
	var xhr = Ti.Network.createHTTPClient(
	{
	    onload: function(e) 
	    {
	    	$.lbl_serverTest.text="on load+"+contactNumber;
	    	var response = JSON.parse(this.responseText);
			if(response!="not found")
			{
				addFriend(response.rows[0].pin);
				//alert(response.rows[0].fname+" "+response.rows[0].pin);
				//addFriend(response.rows[0].pin);
			}			
		 },
	    onerror: function(e) 
	    {
	    	$.lbl_serverTest.text="ERROR+"+contactNumber;	
	    	// Ti.UI.createAlertDialog(
			// {
				// title : 'Error',
			    // message : 'Check your internet connection.',
				// cancel : 0,
				// buttonNames : ['Ok']
	        // }).show();
	    },
	   // timeout:5000  /* in milliseconds */
	});
	
	xhr.open("POST", url+"search_user_by/eslam/user_accounts/primary_mobile/"+contactNumber);
	xhr.send();  // request is actually sent with this statement
}

function addFriend(pin)
{
	var url =  'http://www.bofffme.com/api/index.php/home/';
	var xhr = Ti.Network.createHTTPClient(
	{
	    onload: function(e) 
	    {
	    	alert("friend added");
	    	var response = JSON.parse(this.responseText);
		},
	    onerror: function(e) 
	    {
	    	alert("didn't add friend");
	    	// Ti.UI.createAlertDialog(
			// {
				// title : 'Error',
			    // message : 'Check your internet connection.',
				// cancel : 0,
				// buttonNames : ['Ok']
	        // }).show();
	    },
	   // timeout:5000  /* in milliseconds */
	});
	
	xhr.open("POST", url+"insert/eslam/user_friends");
	var params =
		{
			friend_of_user_pin_code:	pin,
			pin_code			   :    'a8e7fec219c1b9e33ecb340c197ad15c'
    	};
	xhr.send(params);  // request is actually sent with this statement
}

//This is to check if an object is empty or not
function isEmpty(obj)
{
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
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


