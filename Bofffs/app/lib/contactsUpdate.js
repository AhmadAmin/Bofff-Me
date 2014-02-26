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
//TODO: will not work on a key that doesn't already exist
function updateNumber(id,key,value)
{
	var contact=Titanium.Contacts.getPersonByID(id);
	var phone= contact.phone;
	try
	{
	    phone[key].push(value);
		contact.phone=phone;
		saveUpdate(contact);
	}
	catch(error)
	{
		for(var record in phone)
		{
			phone[record].push(value);
			break;
		}
		contact.phone=phone;
	    saveUpdate(contact);
	}
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

//TODO: if user has no mails it will not work,  will not work on a key that doesn't already exist
function updateEmail(id,key,value)
{
	var contact=Titanium.Contacts.getPersonByID(id);
	var email= contact.email;
	try
	{
		email[key].push(value);
		contact.email=email;
	    saveUpdate(contact);
	}
	catch(error)
	{
		for(var record in email)
		{
			email[record].push(value);
			break;
		}
		contact.email=email;
	    saveUpdate(contact);
	}
	
}
//TODO: if user has no urls it will not work,  will not work on a key that doesn't already exist
function updateSocialLink(id,key,value)
{
	var contact=Titanium.Contacts.getPersonByID(id);
	var url= contact.url;
	try
	{
		url[key].push(value);
		contact.url=url;
	    saveUpdate(contact);
	}
	catch(error)
	{
		for(var record in url)
		{
			url[record].push(value);
			break;
		}
		contact.url=url;
	    saveUpdate(contact);
	}
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
