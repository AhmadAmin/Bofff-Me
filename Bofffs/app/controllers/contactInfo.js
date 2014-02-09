var args=arguments[0] || {};
//this is the clicked contact
var contact= args.contact;
//this is the back button on the title bar
var prevButton = Titanium.UI.createButton({
    title:'Back' 
});
//this is to navigate back 
prevButton.addEventListener('click',function(e)
{
    $.win_contactInfo.close();
});
//assigning the back button to the current window
$.win_contactInfo.leftNavButton= prevButton;
//assigning the contact name to the window title 
$.win_contactInfo.title=contact.getFullName();

//Here is to know whether to open invite or call dialog
var inviteOrCall;
//Here is to save the number that the user want to call
var numberToCall;
importImage();
importNumbers();
function importImage()
{
	$.img_contactImage.image= contact.getImage();
	//This is just for styling so if there is no image I make the imageview almost invisible, so the next label show in the
	//place
	if ($.img_contactImage.image==null)
	{
		$.img_contactImage.width=0;
		$.img_contactImage.height=0;
	}else
	{
		$.img_contactImage.width='80dp';
		$.img_contactImage.height='80dp';
	}
}

function importNumbers()
{
	//Here is to store all the numbers of the current contact
	var mobileNumbers= contact.getPhone();
	//Here is to remove all the labels that might have been there in the previous contact information profile
	$.view_dynamicLabels.removeAllChildren();
	//Here is to check if this contact has numbers or not
	//If the contact has at least one phone number then I will show the invite label, the call label and the user's numbers
	if (!isEmpty(mobileNumbers))
	{
		//Here is to make an invite label if clicked it invites this contact by sms
		var lbl_Invite= Alloy.createController("label").getView();
		lbl_Invite.text="Invite "+contact.getFullName()+" to Bofff Me";
		lbl_Invite.addEventListener("click", function(e)
			{	
				inviteOrCall="invite";
				openDialog();
			});
		//Here is to make a you can reach label and list all the numbers this contact has
		var lbl_Call= Alloy.createController("label").getView();
		lbl_Call.text = "You can reach "+ contact.getFullName()+" at:";
		//Here I add these labels to the view that dynamically contains children labels if needed
		$.view_dynamicLabels.add(lbl_Invite);
		$.view_dynamicLabels.add(lbl_Call);
	    
	    //Here is to add all the contact numbers in labels and then put these labels in the view_dynamicLabels
		//Here I am making two listed loops because the phone property is a dictionary so this is how to loop on all the data in it
		for (var i in mobileNumbers)
		{
			for (var x in mobileNumbers[i])
			{
				var lbl_Number= Alloy.createController("label").getView();
				//This is to listen for a click event on a label to call the contact on this number
				lbl_Number.addEventListener("click", function(e)
					{
						inviteOrCall="call";
						numberToCall=e.source.text;
						openDialog();
					});
				lbl_Number.text= mobileNumbers[i][x];
				//Here is to add the finished label to the view_dynamicLabels
				$.view_dynamicLabels.add(lbl_Number);
			}
		}
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

var imageEnlarged=false;
function enlargeImage(e)
{
	if (imageEnlarged)
	{
		e.source.width='80dp';
		e.source.height='80dp';
		imageEnlarged=false;
	}
	else
	{
		e.source.width='160dp';
		e.source.height='160dp';
		imageEnlarged=true;
	}
}


//Here is to open either an invite dialog or call dialog
function openDialog()
{
	if (inviteOrCall=="invite")
	{
		$.dialog.buttonNames= ['Invite', 'Cancel'],
		$.dialog.message="Do you want to invite "+ contact.getFullName();+" to become a bofff ?";
		$.dialog.show();
	}
	else
	if (inviteOrCall=="call")
	{
		$.dialog.buttonNames= ['Call', 'Cancel'],
		$.dialog.message="Are you sure want to call "+ contact.getFullName()+" on this number: "+numberToCall+" ?";
		$.dialog.show();
	}
		
};
//Here is to either call or send an invitation SMS
function dialog_Click(e)
{
	if (e.index==0)
    {
    	if(inviteOrCall== "invite")
    	{
    		alert ("inviting");
    		//TODO: add SMS sending here
    	}
    	else
    	if(inviteOrCall=="call")
    	{
    		alert("calling");
    		callContact(numberToCall);
    		
    	}
    }
}
//Calling method
function callContact(e)
{
	e=e.replace(/\s+/g,"");
	Ti.Platform.openURL('tel:'+e);
}