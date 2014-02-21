var args = arguments[0] || {};
var image= args.image;
var bofffName= args.bofffName;

//this is the back button on the title bar
var prevButton = Titanium.UI.createButton({
    title:'Back' 
});
//this is to navigate back 
prevButton.addEventListener('click',function(e)
{
    $.win_bofffImage.close();
});
//assigning the back button to the current window
$.win_bofffImage.leftNavButton= prevButton;
//assigning the contact name to the window title 
$.win_bofffImage.title=bofffName;
$.img_bofffImage.image=image;