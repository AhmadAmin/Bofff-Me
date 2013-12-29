// function inviteToBofffMe(contactNumber)
// {
	// var textToSend='Start bofffing up your contacts using this cool free app\nhere is the download link: www.bofffme.com';
	// if(OS_IOS)
    	// {	
			// var smsModule = require('com.midhun.sms');
			// var smsDialog = smsModule.createMessage({
			   // receivers: [contactNumber],
			   // messageBody: textToSend,
			   // barColor: 'black'
			// });
// 			
			// if(smsDialog.isSupported())
			// {
			    // smsDialog.open({animated: true});
			    // smsDialog.addEventListener('complete',function(e){
			        // if(e.result == smsDialog.SENT)
			        // {
			            // var successAlert = Ti.UI.createAlertDialog({
			                // title : 'Message Sent',
			                // message : 'Hurray',
			                // buttonNames : ['OK']
			            // });
			            // successAlert.show();
			        // }
			   // });
			// }
    	// }
	    // else if(OS_ANDROID)
	    // {
	    	// smsMod.sendSMS(contactNumber, textToSend);
	    // }
// }
// 
// function getDataOfUser(userPinCode, privacy)
// {
	// userPinCode= Titanium.Utils.md5HexDigest( userPinCode ) ;
    // var url =  'http://bofffme.com/api/index.php/home/search_user_by/eslam/user_accounts/pin/'+userPinCode;
	// var xhr = Ti.Network.createHTTPClient(
	// {
	    // onload: function(e) 
	    // {
			// alert(this.responseText);
	        // var response = JSON.parse(this.responseText);
	    // },
	    // onerror: function(e) 
	    // {
			// Ti.UI.createAlertDialog(
			// {
				// title : 'Error',
			    // message : 'Check your internet connection.',
				// cancel : 0,
				// buttonNames : ['Ok']
	        // }).show();
	    // },
	    // timeout:5000  /* in milliseconds */
	// });
	// xhr.open("POST", url);
	// xhr.send();  // request is actually sent with this statement
// 	
// 	
// }
// 
// function fillUserData(responseData,privacy)
// {
	// var userData=
	// {
		// fname:null,
		// lname:null,
		// primary_email:null,
		// primary_mobile:null,
		// phone_number:null,
		// primary_email:null,
		// mails:null,
		// social_links:null,
		// profile_picture:null,
		// residence:null,
		// job_title:null,
		// education:null,
		// interests:null,
		// company:null,
		// club:null,
		// favorite_places:null,
	// };
// 	
	// if (responseData[0].)
// }
