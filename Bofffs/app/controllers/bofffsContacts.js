var args = arguments[0] || {};
var mainView=args.mainView;
try
{
	var bofffs= args.bofffFriends;
	var  test =bofffs[0];
	getFriends();
}catch(error){}

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

var bofffsList=[];
function getFriends()
{
	var url =  'http://www.bofffme.com/api/index.php/home/';
	var xhr = Ti.Network.createHTTPClient(
	{
	    onload: function(e) 
	    {
	    	var response = JSON.parse(this.responseText);
	    	bofffsList=response.rows;
	    	if(bofffsList.length>0)
	    	{
		    	//This is to sort the bofffs alphabetically
		    	bofffsList.sort(sort);
		    	createBofffListView(bofffsList,"fullName");
	    	}
	    },
	    onerror: function(e) 
	    {
	    },
	});
		
	xhr.open("POST", url+"search_user_by/bofff/user_friends/user_pin_code/"+'fbea0803a7d79e402d0557dcb7063a03');
	xhr.send();  // request is actually sent with this statement
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
   		//add items to an array
   		if(_data[i].status=="favorite")
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
                image : _data[i].icon_image   // assign the values from the data
            },
            bofff_pic:{
            	image:imageFavorite,
            	},
            status:_data[i].status,
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

var privacyClicked=false;
// if a star is clicked by the user
function starClicked(e)
{
	privacyClicked=true;
}

function changeStar(listItem)
{
	privacyClicked=false;
	var item = listItem.section.getItemAt(listItem.itemIndex);
	// it means that the user clicked an empty star so we have to change it to a full star
	if (item.status=="not favorite")
	{
		item.status="favorite";
		item.bofff_pic.image = "/images/favoritecontact.png";
		listItem.section.updateItemAt(listItem.itemIndex, item);  
	}
	// it means that the user clicked a full star so we have to change it to an empty star
	else
	{
		item.status="not favorite";
		item.bofff_pic.image = "/images/notfavoritecontact.png";
		listItem.section.updateItemAt(listItem.itemIndex, item);
	}
}

function updatePrivacy(listItem)
{
	var item = listItem.section.getItemAt(listItem.itemIndex);
	var newStatus="not favorite";
	if(item.status=="not favorite")
	{
		newStatus="favorite";
	}
	var url =  'http://www.bofffme.com/api/index.php/home/';
	var xhr = Ti.Network.createHTTPClient(
	{
	    onload: function(e) 
	    {
	    	var response = JSON.parse(this.responseText);
	    	changeStar(listItem);
	    },
	    onerror: function(e) 
	    {
	    	alert("error");
	    },
	});
		
	xhr.open("POST", url+"update/bofff/user_friends/"+bofffsList[listItem.itemId].id);
	var params=
	{
		status: newStatus,
	};
	xhr.send(params);  // request is actually sent with this statement
}

// when any click is fired from the list or within the list
function showContact(e)
{
	// to check if the click is fired because of the list item or because of the star in the list item
	if(privacyClicked)
	{
		updatePrivacy(e);
	}
	else
	{
		$.search.blur();
		//Here is to know what contact the user want by searching for this contact with the itemId I saved in the listItem in which
		//is saved the actual contact id of this user
		var bofff;
		// for(var record in bofffs)
		// {
			// if (bofffs[record].pin==bofffsList[e.itemId].friend_pin_code)
			// {
				// bofff=bofffs[record];
				// break;
			// }
		// }
		bofff=bofffs[e.itemId]['bofff'];
	    var image = e.section.getItemAt(e.itemIndex).pic.image;
		//Here is to initialize a view that will contain the data of the user
		var params=
		{
			bofff: bofff,
			image: image,
		};
		Ti.App.bofffsListTab.open(Alloy.createController('bofffInfo', params).getView());
	}
}
