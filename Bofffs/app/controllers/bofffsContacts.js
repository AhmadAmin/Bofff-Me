var args = arguments[0] || {};
var mainView=args.mainView;
try
{
	var bofffFriends= args.bofffFriends;
	var  test =bofffFriends[0];
	getFriends(bofffFriends);
}catch(error){
	var sortedContacts=args.sortedContacts;
	createNormalListView(sortedContacts);
}

//This is to put the sorted contacts into a list


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
	$.list_bofffContacts.searchText="";
    searchbarIsOnFocus=false;
    $.search.showCancel="false";
}
//on searchbar change
function updateSearch(e)
{
	$.list_bofffContacts.searchText = e.value;
}


//when search button on keyboard is pressed
var searchButtonPressed=false;
function searchBofff(e)
{
	$.list_bofffContacts.searchText = e.value;
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
}
$.list_bofffContacts.caseInsensitiveSearch=true;
$.list_bofffContacts.keepSectionsInSearch=true;

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
	// if the user chooses custom, a view appears to type in the custom field he wants to search with
	if(e.selectedValue[0]=="Custom")
	{
		$.view_customField.view_customField.width='90%';
		$.view_customField.view_customField.height='40%';
		animation.popIn($.view_customField.view_customField);
		$.view_customField.txt_customField.focus();
	}
});

$.view_customField.img_closeCustomView.addEventListener("click", function(e)
{
	animation.fadeOut($.view_customField.view_customField,200, function(){
		$.view_customField.view_customField.width=0;
		$.view_customField.view_customField.height=0;
		$.lbl_searchField.text=$.view_customField.txt_customField.value;
		if($.lbl_searchField.text=="")
		{
			$.lbl_searchField.text="Custom";
		}
		$.view_customField.txt_customField.blur();
	});
});
var ifFavoriteBofff=[];
function getFriends(bofffFriends)
{
	for(var friend in bofffFriends)
	{
		var url =  'http://www.bofffme.com/api/index.php/home/';
		var xhr = Ti.Network.createHTTPClient(
		{
		    onload: function(e) 
		    {
		    	var response = JSON.parse(this.responseText);
		    	alert(response.rows[0].status);
		    	if(response.rows[0].status=="favorite")
		    	{
		    		ifFavoriteBofff.push("true");
		    	}
		    	else
		    	{
		    		ifFavoriteBofff.push("false");
		    	}
		    	// if(friend==(bofffFriends.length-1))
		    	// {
		    		// alert("bofff list");
		    		// createBofffListView(bofffFriends,"fullName");
		    	// }
			},
		    onerror: function(e) 
		    {
		    },
		});
		
		xhr.open("POST", url+"search_user_by/bofff/user_friends/pin_code/"+'fbea0803a7d79e402d0557dcb7063a03');
		xhr.send();  // request is actually sent with this statement
	}
}

var imageFavorite;
//Here is to put the contacts in a list
function createBofffListView(_data, textToSearchFor)
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
   		// add items to an array
   		if(ifFavoriteBofff[i])
   		{
   			imageFavorite="/images/favoritecontact.png";
   		}
   		else
   		{
   			imageFavorite="/images/notfavoritecontact.png";
   		}
        items.push({
            template : "template1",            // set the template
            textLabel : {
                text : _data[i].fullName           // assign the values from the data
            },
            pic : {
                image : _data[i].profile_picture   // assign the values from the data
            },
            bofff_pic:{
            	image:imageFavorite
            },
            favorite: ifFavorite,
            properties : {
            itemId:i ,			//assign the unique contact id to the listItem's itemId for retrieving
            searchableText: _data[i][textToSearchFor] ,
            backgroundColor:"transparent",
            }
	            
        });
     }
     section.setItems(items);
     listSections.push(section);
     $.list_bofffContacts.sections=listSections;

     
	//TODO: Save this list to open in offline mode
	// This is to save the list to be views offline when needed
	/*var json_text = JSON.stringify(items,null,2);
	Titanium.App.Properties.setString('propertyList', json_text);

	var test =Titanium.App.Properties.getString('propertyList');
	var your_object = JSON.parse(test);*/ 
}

//Here is to put the contacts in a list
function createNormalListView(_data)
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
            	image:"/images/bofffcontact.png"
            },
            properties : {
            itemId:i ,			//assign the unique contact id to the listItem's itemId for retrieving
            searchableText: _data[i].fullName,
            backgroundColor:"transparent",
            }
            
    	});
     }
     section.setItems(items);
     listSections.push(section);
     $.list_bofffContacts.sections=listSections;

     
	//TODO: Save this list to open in offline mode
	// This is to save the list to be views offline when needed
	/*var json_text = JSON.stringify(items,null,2);
	Titanium.App.Properties.setString('propertyList', json_text);

	var test =Titanium.App.Properties.getString('propertyList');
	var your_object = JSON.parse(test);*/ 
}

var privacyClicked=false;
var changeToFavorite=false;
// if a star is clicked by the user
function changePrivacy(e)
{
	privacyClicked=true;
	if(e.source.image=="/images/favoritecontact.png")
	{
		changeToFavorite=false;
	}
	else
	{
		changeToFavorite=true;
	}
}

// when any click is fired from the list or within the list
function showContact(e)
{
	// to check if the click is fired because of the list item or because of the star in the list item
	if(privacyClicked)
	{
		privacyClicked=false;
		// it means that the user clicked an empty star so we have to change it to a full star
		if (changeToFavorite)
		{
			var item = e.section.getItemAt(e.itemIndex);
			item.bofff_pic.image = "/images/favoritecontact.png";
			e.section.updateItemAt(e.itemIndex, item);  
		}
		// it means that the user clicked a full star so we have to change it to an empty star
		else
		{
			var item = e.section.getItemAt(e.itemIndex);
			item.bofff_pic.image = "/images/notfavoritecontact.png";
			e.section.updateItemAt(e.itemIndex, item);
		}
	}
	else
	{
		$.search.blur();
		//Here is to know what contact the user want by searching for this contact with the itemId I saved in the listItem in which
		//is saved the actual contact id of this user
		contact =sortedContacts[e.itemId];
		//Here is to initialize a view that will contain the data of the user
		//I had to initialize the controller by itself first to access the interface objects within this view
		var params=
		{
			contact: contact,
		};
		Ti.App.bofffsListTab.open(Alloy.createController('contactInfo', params).getView());
	}
}
