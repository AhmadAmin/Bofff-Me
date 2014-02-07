var section = Ti.UI.createListSection({
    // Or add a custom header or footer to the section
    headerTitle: 'Vegetables'
});
var sectionData = [{
     template : "template1",            // set the template
            textLabel : {
                text : "_data[i].fullName  "         // assign the values from the data
            },
           
            properties : {
            itemId:'contactId' ,			//assign the unique contact id to the listItem's itemId for retrieving
            }
}];
section.setItems(sectionData);
var sections =[];
sections.push(section);
$.list_bofffContacts.sections=sections;



var args=arguments[0] || {};


// use this when viewing new views to view them with an animation like fadeIn, fadeOut, popIn
var animation = require('alloy/animation');

//This happens when the user click on the user clicks on bofff contacts label to open all contacts and fadeout bofff contacts
function bofffContactsFadeOut(e)
{
	animation.fadeAndRemove($.view_bofffContacts, 200,$.view_bofffContacts);
}

function openProfile(e)
{
	//var contact =Ti.Contacts.getPeopleByID(e.itemId);
	
    var params ={
    	fname:"Ahmad",
    	lname:"Amin",
    	phone_number:"01151162280",
    	password: "test"
    };
     
    var url =  'http://bofffme.com/api/index.php/home/insert/eslam/user_accounts';
	var xhr = Ti.Network.createHTTPClient(
	{
	    onload: function(e) 
	    {
			alert(this.responseText);
	        var response = JSON.parse(this.responseText);
	        alert(response);
	    },
	    onerror: function(e) 
	    {
			Ti.UI.createAlertDialog(
			{
				title : 'Error',
			    message : 'Check your internet connection.',
				cancel : 0,
				buttonNames : ['Ok']
	        }).show();
	    },
	  //  timeout:5000  /* in milliseconds */
	});
	xhr.open("POST", url);
	xhr.send(params);  // request is actually sent with this statement
}