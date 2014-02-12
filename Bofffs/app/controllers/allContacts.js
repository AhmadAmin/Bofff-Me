var args = arguments[0] || {};
var mainView=args.mainView;
function goToBoffsContacts(e)
{
	mainView.scrollToView(1);
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
 	//This is to put the sorted contacts into a list
	createListView(sortedContacts,"fullName");
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
	createListView(sortedContacts, "fullName");
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

var searchbarIsOnFocus= false;
var firstFocus=true;
//on searchbar focus
function initializeSearch(e)
{
	if(firstFocus && OS_ANDROID)
	{
		firstFocus=false;
		$.search.blur();
	}
	else
	{
		$.view_search.width=Ti.UI.SIZE;
		$.view_search.height=Ti.UI.SIZE;
		searchbarIsOnFocus=true;
		$.search.showCancel="true";
	}
}
//on searchbar cancel
function cancelSearch(e)
{
	$.search.blur();
	$.search.value="";
	$.list_allContacts.searchText="";
    searchbarIsOnFocus=false;
    $.search.showCancel="false";
}
//on searchbar change
function updateSearch(e)
{
	$.list_allContacts.searchText = e.value;
}
//on searchbar blur
function stopSearch(e)
{
	$.search.showCancel="false";
	if(!pickerVisible)
	{
		$.view_search.width=0;
		$.view_search.height=0;
	}
	if (OS_ANDROID)
	{
		$.search.value="";
		$.search.hide();
		$.search.show();
	}
}
$.list_allContacts.caseInsensitiveSearch=true;
$.list_allContacts.keepSectionsInSearch=true;

var pickerVisible=false;
var animation = require('alloy/animation');
//on click on the search field label to open picker or close picker
function openSearchPicker(e)
{
	if(pickerVisible)
	{
		animation.fadeOut($.picker_searchBy.view_picker, 500, function(){
			$.picker_searchBy.view_picker.width=0;
			$.picker_searchBy.view_picker.height=0;
			pickerVisible=false;
			$.search.focus();	
		});
	}
	else
	{
		$.picker_searchBy.view_picker.width=Ti.UI.SIZE;
		$.picker_searchBy.view_picker.height=Ti.UI.FILL;
		animation.popIn($.picker_searchBy.view_picker);
		pickerVisible=true;
		$.search.blur();
	}
}

//on selection of picker change update the search process
$.picker_searchBy.picker.addEventListener("change", function(e)
{
	if(OS_IOS)
	{
		$.lbl_searchField.text= e.selectedValue[0];
	}
});

//Here is to put the contacts in a list
function createListView(_data, textToSearchFor)
{
	var listSections=[];
	
	var lastCharacter=_data[0].fullName.substring(0,1).toUpperCase();
	var newCharacter;
	var section=Ti.UI.createListSection({ headerTitle: lastCharacter});
 	var items = [];
    for (var i in _data)
     {
   		nextCharacter= _data[i].fullName.substring(0,1).toUpperCase();
        if(lastCharacter != nextCharacter)
        {
        	section.setItems(items);
        	listSections.push(section);
        	lastCharacter= nextCharacter;
        	section = Ti.UI.createListSection({ headerTitle: lastCharacter});
        	items=[];
        	
        }
     	var number=null;
     	// try{number=_data[i].getPhone().mobile[0]; }
     	// catch(error){number='';}
     	//Here is the trick when the list is being created we have to make sure that there is a link from every listItem to the
     	//contact that is in that list item this is done by puting a property that is unique for every contact to search
     	//with this unique property the contact that the user clicks and then get that contact from the phonebook
     	//The unique property for the contact is its id in iOS it is called recordId and in ANDROID it is called id
     	var contactId;
     	if (OS_IOS)
     	{
     		contactId= _data[i].recordId;
     	}
     	else
     	if(OS_ANDROID)
     	{
     		contactId= _data[i].id;
      	}
      	// if (textToSearchFor==1)
      	// {
	    	// // add items to an array
	        // items.push({
	            // template : "template1",            // set the template
	            // textLabel : {
	                // text : _data[i].fullName           // assign the values from the data
	            // },
	            // pic : {
	                // image : _data[i].image   // assign the values from the data
	            // },
	            // properties : {
	            // itemId:contactId ,			//assign the unique contact id to the listItem's itemId for retrieving
	            // searchableText: number ,
	            // }
// 	            
	        // });
       // }
       // else
       // {
       		// add items to an array
	        items.push({
	            template : "template1",            // set the template
	            textLabel : {
	                text : _data[i].fullName           // assign the values from the data
	            },
	            pic : {
	                image : _data[i].image   // assign the values from the data
	            },
	            bofff_pic:{
	            	image:"/images/bofffios.png"
	            },
	            properties : {
	            itemId:contactId ,			//assign the unique contact id to the listItem's itemId for retrieving
	            searchableText: _data[i][textToSearchFor] ,
	            backgroundColor:"transparent",
	            }
	            
	        });
      // }
        
       
     }
     section.setItems(items);
     listSections.push(section);
     $.list_allContacts.sections=listSections;

     
	//TODO: Save this list to open in offline mode
	// This is to save the list to be views offline when needed
	/*var json_text = JSON.stringify(items,null,2);
	Titanium.App.Properties.setString('propertyList', json_text);

	var test =Titanium.App.Properties.getString('propertyList');
	var your_object = JSON.parse(test);*/ 
}

function showContact(e)
{
	$.search.blur();
	//Here is to know what contact the user want by searching for this contact with the itemId I saved in the listItem in which
	//is saved the actual contact id of this user
	contact =Ti.Contacts.getPersonByID(e.itemId);
	//Here is to initialize a view that will contain the data of the user
	//I had to initialize the controller by itself first to access the interface objects within this view
	var params=
	{
		contact: contact,
	};
	Ti.App.bofffsListTab.open(Alloy.createController('contactInfo', params).getView());
}
