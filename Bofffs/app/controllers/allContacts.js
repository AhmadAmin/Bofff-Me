var args = arguments[0] || {};
var mainView=args.mainView;
var sortedContacts= args.sortedContacts;

//This is to put the sorted contacts into a list
createListView(sortedContacts,"fullName");

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

//when search button is clicked
var searchButtonPressed=false;
function searchContact(e)
{
	$.list_allContacts.searchText = e.value;
	searchButtonPressed=true;
	$.search.blur();
	
}
//on searchbar blur
function stopSearch(e)
{
	if(searchButtonPressed)
	{
		searchButtonPressed=false;
	}
	else
	{
		$.search.showCancel="false";
		if (OS_ANDROID)
		{
			$.search.value="";
			$.search.hide();
			$.search.show();
		}
	}
}
$.list_allContacts.caseInsensitiveSearch=true;
$.list_allContacts.keepSectionsInSearch=true;

//Here is to put the contacts in a list
function createListView(_data, textToSearchFor)
{
	//TODO: distinguish between bofff contacts and normal contacts
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
        items.push({
            template : "template1",            // set the template
            textLabel : {
                text : _data[i].fullName           // assign the values from the data
            },
            pic : {
                image : _data[i].image   // assign the values from the data
            },
            bofff_pic:{
            	image:"/images/bofffcontact.png"
            },
            properties : {
            itemId:contactId ,			//assign the unique contact id to the listItem's itemId for retrieving
            searchableText: _data[i][textToSearchFor] ,
            backgroundColor:"transparent",
            }
            
        });  
     }
     section.setItems(items);
     listSections.push(section);
     $.list_allContacts.sections=listSections;
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
