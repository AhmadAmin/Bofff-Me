var args=arguments[0] || {};
var mainWindow= args.mainWindow;
var view_bofffContacts= args.view_bofffContacts;
// use this when viewing new views to view them with an animation like fadeIn, fadeOut, popIn
var animation = require('alloy/animation');

//This happens when the user click on the user clicks on all contact label to open bofff contacts and fadeout all contacts
function allContactsFadeOut(e)
{
	//Here is to check if a profile is open or not before I close thi view
	if (profileOpen)
	{
		animation.fadeOut(view_contactInfo,200);
		$.view_allContacts.opacity=1;
		profileOpen= false;
	}
	mainWindow.view_container.remove(view_bofffContacts);
	mainWindow.view_container.add(view_bofffContacts);
	animation.popIn(view_bofffContacts);
	pickerIsOpen=false;
	$.view_contactFieldsPicker.animate({left:-$.view_contactFieldsPicker.width, duration:500});
	$.view_allContacts.animate({left:'0', duration:500});
	$.search.blur();
	searchbarIsOnFocus=false;
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

//This is not used now it is an example on how to update a contact
function changeContacts(){
	var test= Ti.Contacts.getPeopleWithName( "Test" ) ;
	for (var i=0; i<test.length; i++) {
        test[i].setFirstName("Changed");
        Ti.Contacts.save(i);
    }
    
}

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

function pixelsToDPUnits (pixels) {
  return (pixels/(Ti.Platform.displayCaps.dpi/160));
}

var platformWidth=0;
if(OS_IOS)
	platformWidth=Ti.Platform.displayCaps.platformWidth;
else
	if(OS_ANDROID)
		platformWidth=pixelsToDPUnits(Ti.Platform.displayCaps.platformWidth);

function showPickerView()
{
	if (!pickerIsOpen)
	{
		$.table.width=platformWidth-100;
		$.search.width=platformWidth;
		$.list_allContacts.width= platformWidth;
		$.search.blur();
		$.img_pickerShow.image="/images/left arrow.png";
		pickerIsOpen= true;
		$.view_contactFieldsPicker.width=platformWidth-50;
	    $.view_contactFieldsPicker.animate({left:"0dp", duration:500});
		$.view_allContacts.animate({left:platformWidth-50, duration:500});
	}
}

function showPartOfPickerView()
{
	if (searchbarIsOnFocus)
	{
		$.search.focus();
	}
	$.txt_customField.blur();
	$.search.width=platformWidth-50;
	$.list_allContacts.width= platformWidth;
	$.img_pickerShow.image="/images/right arrow.png";
	pickerIsOpen=false;
	$.view_contactFieldsPicker.animate({left: -$.view_contactFieldsPicker.width+50, duration:500});
	$.view_allContacts.animate({left:"50dp", duration:500});
}

function hidePickerView()
{
	$.txt_customField.blur();
	$.search.width=Ti.UI.FILL;
	$.list_allContacts.width= platformWidth;
	pickerIsOpen= false;
	$.view_contactFieldsPicker.animate({left:-$.view_contactFieldsPicker.width, duration:500});
	$.view_allContacts.animate({left:'0', duration:500});
}

var pickerIsOpen= false;

function openPickerView(e)
{
	showPickerView();
}

function openPickerViewWithSwipe(e)
{
	if(e.direction=="right")
	{
		showPickerView();
	}
	else
	if (e.direction=="left")
	{
		hidePickerView();
	}
}

function manipulatePicerView(e)
{
	if(pickerIsOpen)
	{
		showPartOfPickerView();
	}
	else
	{
		showPickerView();
	}
}

function narrowPickerView(e)
{
	if(e.direction=="left")
	{
		showPartOfPickerView();
	}
}

function closePicker(e)
{
	hidePickerView();
}

function openFieldsPicker(e)
{
	//$.view_picker.animate({left:'0', duration:500});
	//$.view_picker.animate({left:0, duration:500});
	$.view_picker.left=0;
	$.view_picker.width=Ti.UI.SIZE;
	$.view_picker.height=Ti.UI.SIZE;
}

function updateFieldSearch(e)
{
	$.lbl_findBy.text="Find By\n"+e.selectedValue[0];
}

$.search.addEventListener('cancel', function(){
    $.search.blur();
    hidePickerView();
    searchbarIsOnFocus=false;
    $.search.showCancel="false";
 });
// for textSearch, use the change event to update the search value
$.search.addEventListener('change', function(e){
     $.list_allContacts.searchText = e.value;
 });

var searchbarIsOnFocus= false;
$.search.addEventListener('focus', function(e){
	//showPartOfPickerView();
	$.lbl_findBy.width=Ti.UI.SIZE;
	$.lbl_findBy.height=Ti.UI.SIZE;
	searchbarIsOnFocus=true;
	$.search.showCancel="true";
}); 

$.search.addEventListener('blur', function(e){
	$.lbl_findBy.width=0;
	$.lbl_findBy.height=0;
	$.view_picker.animate({left:'100%', duration:500}, function(){ $.view_picker.width=0;
	$.view_picker.height=0;});
	
});

$.list_allContacts.caseInsensitiveSearch=true;
$.list_allContacts.keepSectionsInSearch=true;
// for textSearch, add the search bar or text field as a header view
// var listView = Ti.UI.createListView({headerView: search, caseInsensitiveSearch: true});


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
	            backgroundColor:"#40bae9",
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

function updateSearchableText(e)
{
	createListView(sortedContacts , "fullName");
	var rowText=e.source.text;
	$.lbl_searchableField.text= rowText;
	if(rowText=="Custom")
	{
		$.txt_customField.visible=true;
		$.txt_customField.focus();
		$.txt_customField.focus();
		$.txt_customField.addEventListener("change", function(e){
			$.lbl_searchableField.text="Custom: "+$.txt_customField.value;
			if ($.txt_customField.value=="")
			{
				$.lbl_searchableField.text="Custom";
			}
		});
	}
	else
	{
		$.txt_customField.visible=false;
		$.txt_customField.blur();
		
	}
}


//Here is when the current contact is saved
var contact;
//This is to check if a profile is open or not
var profileOpen=false;
//This is the dynamic view for the contact that is going to be clicked on to show his data
var view_contactInfo;
function showContact(e)
{
	if (profileOpen)
	{
		closeProfile();
	}
	else
	{
		hidePickerView();
		$.search.blur();
		searchbarIsOnFocus=false;
		//Here is to know what contact the user want by searching for this contact with the itemId I saved in the listItem in which
		//is saved the actual contact id of this user
		contact =Ti.Contacts.getPersonByID(e.itemId);
		//Here is to initialize a view that will contain the data of the user
		//I had to initialize the controller by itself first to access the interface objects within this view
		var params=
		{
			contact: contact,
			close: 	 closeProfile,
		};
		view_contactInfo =  Alloy.createController("normalContactProfile",params).getView();
		//Here is to add the new view to the main view
		mainWindow.view_container.add(view_contactInfo);
		$.view_allContacts.opacity=0.3;
		animation.popIn(view_contactInfo);
		//Here it indicates that the contactInfo view is open
		profileOpen=true;
	}
}

function closeProfile()
{
	animation.fadeOut(view_contactInfo,200);
	mainWindow.view_container.remove(view_contactInfo);
	$.view_allContacts.opacity=1;
	profileOpen= false;
};

function closeOpenProfile(e)
{
	if (profileOpen)
	{
		closeProfile();
	}
}
