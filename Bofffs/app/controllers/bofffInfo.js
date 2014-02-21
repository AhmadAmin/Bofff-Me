var args = arguments[0] || {};
var bofff=args.bofff;
var image= args.image;
//this is the back button on the title bar
var prevButton = Titanium.UI.createButton({
    title:'Back' 
});
//this is to navigate back 
prevButton.addEventListener('click',function(e)
{
    $.win_bofffInfo.close();
});
//assigning the back button to the current window
$.win_bofffInfo.leftNavButton= prevButton;
//assigning the contact name to the window title 
$.win_bofffInfo.title=bofff.fullName;

importImage();
function importImage()
{
	$.img_bofffImage.image= image;
	//This is just for styling so if there is no image I make the imageview almost invisible, so the next label show in the
	//place
	if ($.img_bofffImage.image==null)
	{
		$.img_bofffImage.width=0;
		$.img_bofffImage.height=0;
	}else
	{
		$.img_bofffImage.width='80dp';
		$.img_bofffImage.height='80dp';
	}
}

function enlargeImage(e)
{
	var params=
		{
			bofffName: bofff.fullName,
			image: image,
		};
		Ti.App.bofffsListTab.open(Alloy.createController('bofffImage', params).getView());
}