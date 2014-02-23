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
 	sortedContacts.sort(sortContacts);
 	
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
 	sortedContacts.sort(sortContacts);
});

// This is to sort the contacts alphabetically
function sortContacts(a, b) {
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

// This is to sort the bofffs alphabetically
function sortBofffs(a, b) {
    if (a['bofff'].fullName.toUpperCase() > b['bofff'].fullName.toUpperCase())
    {
        return 1;
    } 
    else if (a['bofff'].fullName.toUpperCase() < b['bofff'].fullName.toUpperCase()) 
    {
        return -1;
    }
    return 0;
}

//gather contacts' numbers and change them to readable number string without special characters
var contactNumbersAndIds=[];
var contactNumbers=[];
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
				if(OS_IOS)
				{
					var numberAndId={number:trimmedNumber, id:sortedContacts[contact].recordId };
					contactNumbersAndIds.push(numberAndId);
				}
				else
				if(OS_ANDROID)
				{
					var numberAndId={number:trimmedNumber, id:sortedContacts[contact].id };
					contactNumbersAndIds.push(numberAndId);
				}
				var number = new Object();
			    number.number = trimmedNumber;
			    
				contactNumbers.push(number);
			}
		}
	}
}


//then send these numbers to the bofffme DB to check whether this user has bofffs in his contacts or not
findBofffsTwo(contactNumbersAndIds);

//This is to map the bofffs of the user to his contact list, by comparing their bofff primary numbers
//with the ones in the contact list and then get their id in the contact list
var bofffContactIds=[];
//this is to check whether or not these numbers are in our DB if yes
//then this user is added as a friend and mapped to the contacts of the user
//after all friends are found a list of friends are sent to initialize bofffs list to create the bofffs list
var bofffFriends=[];
function findBofffsTwo(contactNumbers)
{
	var url =  'http://www.bofffme.com/api/index.php/home/';
	var xhr = Ti.Network.createHTTPClient(
	{
	    onload: function(e) 
	    {
	    	bofffFriends = JSON.parse(this.responseText);
	    	bofffFriends.sort(sortBofffs);
	    	for(var record in bofffFriends )
	    	{
	    		var fullName=bofffFriends[record]['bofff'].fullName;
	    		var icon_image=bofffFriends[record]['bofff'].profile_picture;
	    		var pin=bofffFriends[record]['bofff'].pin;
	    		addFriend(fullName,icon_image,pin);
	    	}
	    	initializeBofffsList(bofffFriends);
	    		
	    },
	    onerror: function(e) 
	    {
	    	alert(this.responseText);
	    },
	});
	var params=
	{
		numbers:JSON.stringify(contactNumbers)
	};
	
	xhr.open("POST", url+"all_data_by_mobile/bofff");
	xhr.send(params);  // request is actually sent with this statement
}


function findBofffs(contactNumbersAndIds)
{
	var url =  'http://www.bofffme.com/api/index.php/home/';
	var xhr = Ti.Network.createHTTPClient(
	{
	    onload: function(e) 
	    {
	    	var response = JSON.parse(this.responseText);
	    	for(var contact in contactNumbersAndIds)
	    	{
	    		for( var record in response.rows)
	    		{
	    			if(contactNumbersAndIds[contact].number==response.rows[record].primary_mobile)
	    			{
	    				bofffFriends.push(response.rows[record]);
	    				addFriend(response.rows[record].fullName,response.rows[record].profile_picture,response.rows[record].pin);
	    				bofffContactIds.push(contactNumbersAndIds[contact].id);
	    			}
	    		}
	    	}
			bofffFriends.sort(sort);
	    	initializeBofffsList(bofffFriends);
	    },
	    onerror: function(e) 
	    {
	    },
	});
	
	xhr.open("POST", url+"get_all/bofff/user_accounts");
	xhr.send();  // request is actually sent with this statement
}
//when the pin is sent back it saves it as a friend to this user
function addFriend(fullName,iconImage,pin)
{
	if(pin!='fbea0803a7d79e402d0557dcb7063a03')
	{
		var url =  'http://www.bofffme.com/api/index.php/home/';
		var xhr = Ti.Network.createHTTPClient(
		{
		    onload: function(e) 
		    {
		    	var response = JSON.parse(this.responseText);
			},
		    onerror: function(e) 
		    {
		    	alert(this.responseText);
		    },
		});
		
		xhr.open("POST", url+"insert_friend/bofff/user_friends");
		var params =
			{
				fullName		 : fullName,
				icon_image		 : iconImage,
				friend_pin_code	 : pin,
				user_pin_code	 : 'fbea0803a7d79e402d0557dcb7063a03',
	    	};
		xhr.send(params);  // request is actually sent with this statement
	}
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

//Send the pins of the bofffs friend to create a list with it
function initializeBofffsList(bofffFriends)
{
	
	var bofffContactsPayload=
		{
			mainView:$.scrollableview_mainContactsView,
			bofffFriends:bofffFriends,
		};
	bofffsContacts=Alloy.createController("bofffsContacts",bofffContactsPayload);
	var views=[bofffsContacts.getView(),allContacts.getView()];
	$.scrollableview_mainContactsView.setViews(views);
}

var allContactsPayload=
{
	mainView:$.scrollableview_mainContactsView,
	sortedContacts:sortedContacts,
};
var bofffContactsPayload=
{
	mainView:$.scrollableview_mainContactsView,
	sortedContacts:sortedContacts,
};
var bofffsContacts=Alloy.createController("bofffsContacts",bofffContactsPayload);
$.scrollableview_mainContactsView.addView(bofffsContacts.getView());

var allContacts=Alloy.createController("allContacts",allContactsPayload);
$.scrollableview_mainContactsView.addView(allContacts.getView());


