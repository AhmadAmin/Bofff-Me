//Ti.include('/bofffNetwork.js');
//getDataOfUser('7mmGsMzy','test');

function sendData(e)
{
	var url =  'http://www.bofffme.com/api/index.php/home/';
	var xhr = Ti.Network.createHTTPClient(
	{
	    onload: function(e) 
	    {
	    	alert(this.responseText);
			var response = JSON.parse(this.responseText);
			//this returns the pin of the user you should convert it to md5
	        alert(response.rows);
	        //this is to convert the pin to md5 to be able to search with it in the DB you should save it alloy.globals
	        //var pinInMd5=Titanium.Utils.md5HexDigest(response.rows);
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
	   // timeout:5000  /* in milliseconds */
	});
	xhr.open("POST", url+"insert/bofff/user_accounts");
	var params ={
    	fullName:				$.txt_firstName.value+$.txt_lastName.value,
		gender:					"male",
		primary_mobile:			$.txt_phoneNumber.value,
		mails: 					$.txt_mails.value,
		icon_image:				iconImage,
		profile_picture: 		$.img_profilePicture.image,
		mails_privacy:			$.txt_mailsPrivacy.value,
		social_links:			$.txt_socialLinks.value,
		social_links_privacy:	$.txt_profilePicturePrivacy.value,
		profile_picture_privacy:$.txt_socialLinksPrivacy.value,
    };
    var msgParams=
    {
    	mobile: "201151162280",
    	message: $.txt_firstName.value+" "+$.txt_lastName.value+" has just joined bofff me and he can't wait untill you become a bofff too join him and download the app at: http://www.bofffme.com"
    };
    
    var friendParams=
    {
    	friend_of_user_pin_code: '0a763d978bb03f24ca28d320d16d8ce0',
    	pin_code:			'ed7a8b848fa792c21f51834800cd20a8',
    	
    };
    
    var locationParams=
    {
    	location: "Egypt",
    };
	xhr.send(params);  // request is actually sent with this statement
}



$.img_profilePicture.addEventListener('click', function() {
    photosOption.show();
});











var ImageFactory= require("ti.imagefactory");
var iconImage;


var photosOption = Ti.UI.createOptionDialog({
    title : 'Select ?',
    options : ['Take Photo', 'Choose from Library', 'Cancel'],
    cancel : 2
});

photosOption.addEventListener('click', function(e) {
    if (!e.hasOwnProperty('index')) {
        return;
    }
    if (e.index == 0) {

        Ti.Media.showCamera({

            success : function(event) {
                var cropRect = event.cropRect;
                var image = event.media;

                Ti.API.debug('Our type was: ' + event.mediaType);
                if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                	 var smallImage = ImageFactory.imageAsResized(event.media,
                	 	{
		            		width: 500,
		            		height: 500,
		            		quality: ImageFactory.QUALITY_MEDIUM
		    			});
		    			
		    		 var smallerImage= ImageFactory.imageAsResized(event.media,
                	 	{
		            		width: 50,
		            		height: 50,
		            		quality: ImageFactory.QUALITY_MEDIUM
		    			});
    				iconImage= 	smallerImage;
                    $.img_profilePicture.image = smallImage;
                } else {
                    alert("got the wrong type back =" + event.mediaType);
                }
            },
            cancel : function() {
            },
            error : function(error) {
                // create alert
                var a = Ti.UI.createAlertDialog({
                    title : 'Camera',
                    buttonNames : ['Ok']
                });

                // set message
                if (error.code == Ti.Media.NO_CAMERA) {
                    a.setMessage('Please run this test on device');
                } else {
                    a.setMessage('Unexpected error: ' + error.code);
                }

                a.show();
            },
            saveToPhotoGallery : true,
            allowEditing : true,
            mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
        });

    } else if (e.index == 1) {

        Ti.Media.openPhotoGallery({

            success : function(event) {
                var cropRect = event.cropRect;
                var image = event.media;
                 // set image view
                var smallImage = ImageFactory.imageAsResized(image, {
            		width: 500,
            		height: 500,
            		quality: ImageFactory.QUALITY_MEDIUM
    			});
    			var smallerImage= ImageFactory.imageAsResized(image,
                	 	{
		            		width: 50,
		            		height: 50,
		            		quality: ImageFactory.QUALITY_MEDIUM
		    			});
    			iconImage= 	smallerImage;
                $.img_profilePicture.image = smallImage;
               	
            },
            cancel : function() {

            },
            error : function(error) {
            },
            allowEditing : true,
            mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
        });
    }
});