/*This file contains functions to update the user friends' data in his contact list
 Functions include:
 - saveUpdate(contact)
 - updateNumber(id,key,value)
 - updateNickname(id,bofffFullName)
 - updateEmail(id,key,value)
 - updateSocialLink(id,key,value)
 - updateJobTitle(id,jobTitle)--> IOS_ONLY
 - updateCompany(id,company)
 - updateBirthday(id,birthday) Date format is "yyyy-MM-ddTHH:mm:ss.SSS+0000"
 - updateNote(id,note)
 - updateAddress(id,key,street,city,country)
 */
function saveUpdate(contact)
{
	if(OS_ANDROID)
	{
		Titanium.Contacts.save([contact]);
	}
	else
	if(OS_IOS)
	{
		Titanium.Contacts.save();
	}
	alert("contact updated");
}
function updateNumber(id,key,value)
{
	var contact=Titanium.Contacts.getPersonByID(id);
	var phone= contact.phone;
	try
	{
	    phone[key].push(value);
	}
	catch(error)
	{
		phone[key]=[value];
	}
	contact.phone=phone;
	saveUpdate(contact);
}

function updateNickname(id,bofffFullName)
{
	var contact=Titanium.Contacts.getPersonByID(id);
	var nickname= contact.nickname;
	if(nickname.length==0)
	{
		nickname="Bofff Name: "+bofffFullName;
	}
	else
	{
		nickname+="\n"+"Bofff Name: "+bofffFullName;
	}
	contact.setNickname(nickname);
	saveUpdate(contact);
}

function updateEmail(id,key,value)
{
	var contact=Titanium.Contacts.getPersonByID(id);
	var email= contact.email;
	try
	{
		email[key].push(value);
	}
	catch(error)
	{
		email[key]=[value];
	}
	 contact.email=email;
	 saveUpdate(contact);
}

function updateSocialLink(id,key,value)
{
	var contact=Titanium.Contacts.getPersonByID(id);
	var url= contact.url;
	try
	{
		url[key].push(value);
	}
	catch(error)
	{
		url[key]=[value];
	}
	contact.url=url;
	saveUpdate(contact);
}
//IOS_ONLY
function updateJobTitle(id,jobTitle)
{
	var contact=Titanium.Contacts.getPersonByID(id);
	contact.jobTitle=jobTitle;
	saveUpdate(contact);
}

function updateCompany(id,company)
{
	var contact=Titanium.Contacts.getPersonByID(id);
	contact.organization=company;
	saveUpdate(contact);
}
//Date format is "yyyy-MM-ddTHH:mm:ss.SSS+0000"
function updateBirthday(id,birthday)
{
	var contact=Titanium.Contacts.getPersonByID(id);
	contact.birthday=birthday;
	saveUpdate(contact);
}

function updateNote(id,note)
{
	var contact=Titanium.Contacts.getPersonByID(id);
	contact.note=note;
	saveUpdate(contact);
}

function updateAddress(id,key,street,city,country)
{
	var contact=Titanium.Contacts.getPersonByID(id);
	var address= contact.address;
	var value=new Array();
		value['street']=street;
		value['city']=city;
		value['country']=country;
	try
	{
		address[key].push(value);
	}
	catch(error)
	{
		address[key]=[value];
	}
	contact.address=address;
	saveUpdate(contact);
}

function checkFullNameUpdate(userData,fullName, fullNameObject)
{
	if(userData.fullName!=fullName)
	{
		fullNameObject.name=fullName;
		return fullName;
	}else return 0;
}

function checkGender(userData,gender,genderObject)
{
	if(userData.gender!=gender)
	{
		genderObject.gender=gender;
		return gender;
	}else return 0;
}

function checkPhoneNumbersUpdate(userData,phoneNumbers, phoneNumbersObject)
{
	if(userData.phone_numbers!=phoneNumbers)
	{
		var currentNumbers=userData.phone_numbers.split(",");
		var updatedNumbers=phoneNumbers.split(",");
		var hashCurrentNumbers=[];
		var newNumbers=[];
		for(var number in currentNumbers)
		{
			hashCurrentNumbers[currentNumbers[number]]=currentNumbers[number];
		}
		for(var number in updatedNumbers)
		{
			if(hashCurrentNumbers[updatedNumbers[number]]==null)
			{
				newNumbers.push(updatedNumbers[number]);
			}
		}
		var deletedNumbers=[];
		for(var number in hashCurrentNumbers)
		{
			deletedNumbers.push(hashCurrentNumbers[number]);
			for(var counter in updatedNumbers)
			{
				if(hashCurrentNumbers[number]==updatedNumbers[counter])
				{
					deletedNumbers.pop();
				}
			}
		}
		var numbers={newNumbers:newNumbers.toString(),deletedNumbers:deletedNumbers.toString()};
		phoneNumbersObject.numbers= numbers;
		return phoneNumbersObject.numbers;
	}else return 0;
}
function checkMailsUpdate(userData,mails, mailsObject)
{
	if(userData.mails!=mails)
	{
		var currentMails=userData.mails.split(",");
		var updatedMails=mails.split(",");
		var hashCurrentMails=[];
		var newMails=[];
		for(var mail in currentMails)
		{
			hashCurrentMails[currentMails[mail]]=currentMails[mail];
		}
		for(var mail in updatedMails)
		{
			if(hashCurrentMails[updatedMails[mail]]==null)
			{
				newMails.push(updatedMails[mail]);
			}
		}
		var deletedMails=[];
		for(var mail in hashCurrentMails)
		{
			deletedMails.push(hashCurrentMails[mail]);
			for(var counter in updatedMails)
			{
				if(hashCurrentMails[mail]==updatedMails[counter])
				{
					deletedMails.pop();
				}
			}
		}
		var mails={newMails:newMails.toString(),deletedMails:deletedMails.toString()};
		mailsObject.mails=mails;
		return mailsObject.mails;
	}else return 0;
}

function checkSocialLinksUpdate(userData,socialLinks, socialLinksObject)
{
	if (userData.social_links!=socialLinks)
	{
		var currentSocialLinks=userData.social_links.split(",");
		var updatedSocialLinks=socialLinks.split(",");
		var hashCurrentSocialLinks=[];
		var newLinks=[];
		for(var socialLink in currentSocialLinks)
		{
			hashCurrentSocialLinks[currentSocialLinks[socialLink]]=currentSocialLinks[socialLink];
		}
		for(var socialLink in updatedSocialLinks)
		{
			if(hashCurrentSocialLinks[updatedSocialLinks[socialLink]]==null)
			{
				newLinks.push(updatedSocialLinks[socialLink]);
			}
		}
		var deletedLinks=[];
		for(var link in hashCurrentSocialLinks)
		{
			deletedLinks.push(hashCurrentSocialLinks[link]);
			for(var counter in updatedSocialLinks)
			{
				if(hashCurrentSocialLinks[link]==updatedSocialLinks[counter])
				{
					deletedLinks.pop();
				}
			}
		}
		var links={newLinks:newLinks.toString(),deletedLinks:deletedLinks.toString()};
		socialLinksObject.links=links;
		return socialLinksObject.links;
	}else return 0;
}

function checkResidenceUpdate(userData,residence, residenceObject)
{
	if(userData.residence!=residence)
	{
		residenceObject.residence=residence;
		return residence;
	}else return 0;
}

function checkJobTitleUpdate(userData, jobTitle, jobTitleObject)
{
	if(userData.job_title!=jobTitle)
	{
		jobTitleObject.title=jobTitle;
		return jobTitle;
	}else return 0;
}

function checkBirthdayUpdate(userData, birthday, birthdayObject)
{
	if(userData.birthday_date!=birthday)
	{
		birthdayObject.date=birthday;
		return birthday;
	}else return 0;
}

function checkCompanyUpdate(userData, company, companyObject)
{
	if(userData.company!=company)
	{
		companyObject.company=company;
		return company;
	}else return 0;
}

function manageUserUpdates(oldUserData,pin)
{
	var url =  'http://www.bofffme.com/api/index.php/home/';
	var xhr = Ti.Network.createHTTPClient(
	{
	    onload: function(e) 
	    {
	    	var newData = JSON.parse(this.responseText).rows[0];
	    	createUpdateString(oldUserData,newData,pin);
	    },
	    onerror: function(e) 
	    {
	    	alert(this.responseText);
	    },
	});
	
	xhr.open("POST", url+"search_user_by/bofff/user_accounts/pin/"+pin);
	xhr.send();  
}

function createUpdateString(userData,newData,userPin)
{
	var added="";
	var deleted="";
	var newFullName= {name:""};
	if(checkFullNameUpdate(userData,newData.fullName,newFullName)!=0)
	{
		added+="fullName:"+newFullName.name+"\n";
	}
	var newGender={gender:""};
	if(checkGender(userData,newData.gender,newGender)!=0)
	{
		added+="gender:"+newGender.gender+"\n";
	}
	var newPhoneNumbers={numbers:""};
	if(checkPhoneNumbersUpdate(userData,newData.phone_numbers,newPhoneNumbers)!=0)
	{
		if(newPhoneNumbers.numbers.newNumbers!="")
			added+="phone_numbers:"+newPhoneNumbers.numbers.newNumbers+"\n";
		if(newPhoneNumbers.numbers.deletedNumbers!="")
			deleted+="phone_numbers:"+newPhoneNumbers.numbers.deletedNumbers+"\n";
	}
	var newMails={mails:""};
	if(checkMailsUpdate(userData,newData.mails,newMails)!=0)
	{
		if(newMails.mails.newMails!="")
			added+="mails:"+newMails.mails.newMails+"\n";
		if(newMails.mails.deletedMails!="")
			deleted+="mails:"+newMails.mails.deletedMails+"\n";
	}
	var newSocialLinks={links:""};
	if(checkSocialLinksUpdate(userData,newData.social_links,newSocialLinks)!=0)
	{
		if(newSocialLinks.links.newLinks!="")
			added+="social_links:"+newSocialLinks.links.newLinks+"\n";
		if(newSocialLinks.links.deletedLinks!="")
			deleted+="social_links:"+newSocialLinks.links.deletedLinks+"\n";
	}
	var newResidence={residence:""};
	if(checkResidenceUpdate(userData,newData.residence,newResidence)!=0)
	{
		added+="residence:"+newResidence.residence+"\n";
	}
	var newJobTitle={title:""};
	if(checkJobTitleUpdate(userData,newData.job_title,newJobTitle)!=0)
	{
		added+="job_title:"+newJobTitle.title+"\n";
	}
	var newBirthday={date:""};
	if(checkBirthdayUpdate(userData,newData.birthday_date,newBirthday)!=0)
	{
		added+="birthday_date:"+newBirthday.date+"\n";
	}
	var newCompany={company:""};
	if(checkCompanyUpdate(userData,newData.company,newCompany)!=0)
	{
		added+="company:"+newCompany.company+"\n";
	}
	
	if(added!=""||deleted!="")
	{
		alert(added);
		addUpdatesToFriends(added,deleted, userPin);
	}
	else
		alert("no changes");

}
function applyUpdatesOfFriend(friend_pin,user_pin,bofffsList)
{
	for(var record in bofffsList)
	{
		if(bofffsList[record].friend_pin_code==friend_pin)
		{
			var stringToUpdate=bofffsList[record].friend_added_data;
			if(stringToUpdate!="")
			{
				parsingUpdateString(stringToUpdate);
			}
			stringToUpdate=bofffsList[record].friend_deleted_data;
			if(stringToUpdate!="")
			{
				parsingUpdateString(stringToUpdate);
			}
		}
	}
}
function parsingUpdateString(updateString)
{
	var stringLines=updateString.split("\n");
	var stringObjects= {};
	for(var line in stringLines)
	{
		if(stringLines[line]!="")
		{
			var stringColon=stringLines[line].split(":");
			stringObjects[stringColon[0]]=stringColon[1].split(",");
		}
	}
	alert(stringObjects);
	
}
function addUpdatesToFriends(dataAdded,dataDeleted, userPin)
{
	var url =  'http://www.bofffme.com/api/index.php/home/';
	var xhr = Ti.Network.createHTTPClient(
	{
	    onload: function(e) 
	    {
	    	var response = JSON.parse(this.responseText);
	    },
	    onerror: function(e) 
	    {
	    	alert(this.responseText);
	    },
	});
	
	xhr.open("POST", url+"update_friend_updates/bofff/user_friends/"+userPin);
	var params=
	{
		friend_added_data: dataAdded,
		friend_deleted_data	: dataDeleted,
	};
	xhr.send(params);  
}
