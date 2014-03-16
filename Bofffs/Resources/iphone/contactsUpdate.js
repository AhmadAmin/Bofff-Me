function saveUpdate(contact) {
    Titanium.Contacts.save();
    alert("contact updated");
}

function updateNumber(id, key, value) {
    var contact = Titanium.Contacts.getPersonByID(id);
    var phone = contact.phone;
    try {
        phone[key].push(value);
    } catch (error) {
        phone[key] = [ value ];
    }
    contact.phone = phone;
    saveUpdate(contact);
}

function updateNickname(id, bofffFullName) {
    var contact = Titanium.Contacts.getPersonByID(id);
    var nickname = contact.nickname;
    0 == nickname.length ? nickname = "Bofff Name: " + bofffFullName : nickname += "\nBofff Name: " + bofffFullName;
    contact.setNickname(nickname);
    saveUpdate(contact);
}

function updateEmail(id, key, value) {
    var contact = Titanium.Contacts.getPersonByID(id);
    var email = contact.email;
    try {
        email[key].push(value);
    } catch (error) {
        email[key] = [ value ];
    }
    contact.email = email;
    saveUpdate(contact);
}

function updateSocialLink(id, key, value) {
    var contact = Titanium.Contacts.getPersonByID(id);
    var url = contact.url;
    try {
        url[key].push(value);
    } catch (error) {
        url[key] = [ value ];
    }
    contact.url = url;
    saveUpdate(contact);
}

function updateJobTitle(id, jobTitle) {
    var contact = Titanium.Contacts.getPersonByID(id);
    contact.jobTitle = jobTitle;
    saveUpdate(contact);
}

function updateCompany(id, company) {
    var contact = Titanium.Contacts.getPersonByID(id);
    contact.organization = company;
    saveUpdate(contact);
}

function updateBirthday(id, birthday) {
    var contact = Titanium.Contacts.getPersonByID(id);
    contact.birthday = birthday;
    saveUpdate(contact);
}

function updateNote(id, note) {
    var contact = Titanium.Contacts.getPersonByID(id);
    contact.note = note;
    saveUpdate(contact);
}

function updateAddress(id, key, street, city, country) {
    var contact = Titanium.Contacts.getPersonByID(id);
    var address = contact.address;
    var value = new Array();
    value["street"] = street;
    value["city"] = city;
    value["country"] = country;
    try {
        address[key].push(value);
    } catch (error) {
        address[key] = [ value ];
    }
    contact.address = address;
    saveUpdate(contact);
}

function checkFullNameUpdate(userData, fullName, fullNameObject) {
    if (userData.fullName != fullName) {
        fullNameObject.name = fullName;
        return fullName;
    }
    return 0;
}

function checkGender(userData, gender, genderObject) {
    if (userData.gender != gender) {
        genderObject.gender = gender;
        return gender;
    }
    return 0;
}

function checkPhoneNumbersUpdate(userData, phoneNumbers, phoneNumbersObject) {
    if (userData.phone_numbers != phoneNumbers) {
        var currentNumbers = userData.phone_numbers.split(",");
        var updatedNumbers = phoneNumbers.split(",");
        var hashCurrentNumbers = [];
        var newNumbers = [];
        for (var number in currentNumbers) hashCurrentNumbers[currentNumbers[number]] = currentNumbers[number];
        for (var number in updatedNumbers) null == hashCurrentNumbers[updatedNumbers[number]] && newNumbers.push(updatedNumbers[number]);
        var deletedNumbers = [];
        for (var number in hashCurrentNumbers) {
            deletedNumbers.push(hashCurrentNumbers[number]);
            for (var counter in updatedNumbers) hashCurrentNumbers[number] == updatedNumbers[counter] && deletedNumbers.pop();
        }
        var numbers = {
            newNumbers: newNumbers.toString(),
            deletedNumbers: deletedNumbers.toString()
        };
        phoneNumbersObject.numbers = numbers;
        return phoneNumbersObject.numbers;
    }
    return 0;
}

function checkMailsUpdate(userData, mails, mailsObject) {
    if (userData.mails != mails) {
        var currentMails = userData.mails.split(",");
        var updatedMails = mails.split(",");
        var hashCurrentMails = [];
        var newMails = [];
        for (var mail in currentMails) hashCurrentMails[currentMails[mail]] = currentMails[mail];
        for (var mail in updatedMails) null == hashCurrentMails[updatedMails[mail]] && newMails.push(updatedMails[mail]);
        var deletedMails = [];
        for (var mail in hashCurrentMails) {
            deletedMails.push(hashCurrentMails[mail]);
            for (var counter in updatedMails) hashCurrentMails[mail] == updatedMails[counter] && deletedMails.pop();
        }
        var mails = {
            newMails: newMails.toString(),
            deletedMails: deletedMails.toString()
        };
        mailsObject.mails = mails;
        return mailsObject.mails;
    }
    return 0;
}

function checkSocialLinksUpdate(userData, socialLinks, socialLinksObject) {
    if (userData.social_links != socialLinks) {
        var currentSocialLinks = userData.social_links.split(",");
        var updatedSocialLinks = socialLinks.split(",");
        var hashCurrentSocialLinks = [];
        var newLinks = [];
        for (var socialLink in currentSocialLinks) hashCurrentSocialLinks[currentSocialLinks[socialLink]] = currentSocialLinks[socialLink];
        for (var socialLink in updatedSocialLinks) null == hashCurrentSocialLinks[updatedSocialLinks[socialLink]] && newLinks.push(updatedSocialLinks[socialLink]);
        var deletedLinks = [];
        for (var link in hashCurrentSocialLinks) {
            deletedLinks.push(hashCurrentSocialLinks[link]);
            for (var counter in updatedSocialLinks) hashCurrentSocialLinks[link] == updatedSocialLinks[counter] && deletedLinks.pop();
        }
        var links = {
            newLinks: newLinks.toString(),
            deletedLinks: deletedLinks.toString()
        };
        socialLinksObject.links = links;
        return socialLinksObject.links;
    }
    return 0;
}

function checkResidenceUpdate(userData, residence, residenceObject) {
    if (userData.residence != residence) {
        residenceObject.residence = residence;
        return residence;
    }
    return 0;
}

function checkJobTitleUpdate(userData, jobTitle, jobTitleObject) {
    if (userData.job_title != jobTitle) {
        jobTitleObject.title = jobTitle;
        return jobTitle;
    }
    return 0;
}

function checkBirthdayUpdate(userData, birthday, birthdayObject) {
    if (userData.birthday_date != birthday) {
        birthdayObject.date = birthday;
        return birthday;
    }
    return 0;
}

function checkCompanyUpdate(userData, company, companyObject) {
    if (userData.company != company) {
        companyObject.company = company;
        return company;
    }
    return 0;
}

function manageUserUpdates(oldUserData, pin) {
    var url = "http://www.bofffme.com/api/index.php/home/";
    var xhr = Ti.Network.createHTTPClient({
        onload: function() {
            var newData = JSON.parse(this.responseText).rows[0];
            createUpdateString(oldUserData, newData, pin);
        },
        onerror: function() {
            alert(this.responseText);
        }
    });
    xhr.open("POST", url + "search_user_by/bofff/user_accounts/pin/" + pin);
    xhr.send();
}

function createUpdateString(userData, newData, userPin) {
    var added = "";
    var deleted = "";
    var newFullName = {
        name: ""
    };
    0 != checkFullNameUpdate(userData, newData.fullName, newFullName) && (added += "fullName:" + newFullName.name + "\n");
    var newGender = {
        gender: ""
    };
    0 != checkGender(userData, newData.gender, newGender) && (added += "gender:" + newGender.gender + "\n");
    var newPhoneNumbers = {
        numbers: ""
    };
    if (0 != checkPhoneNumbersUpdate(userData, newData.phone_numbers, newPhoneNumbers)) {
        "" != newPhoneNumbers.numbers.newNumbers && (added += "phone_numbers:" + newPhoneNumbers.numbers.newNumbers + "\n");
        "" != newPhoneNumbers.numbers.deletedNumbers && (deleted += "phone_numbers:" + newPhoneNumbers.numbers.deletedNumbers + "\n");
    }
    var newMails = {
        mails: ""
    };
    if (0 != checkMailsUpdate(userData, newData.mails, newMails)) {
        "" != newMails.mails.newMails && (added += "mails:" + newMails.mails.newMails + "\n");
        "" != newMails.mails.deletedMails && (deleted += "mails:" + newMails.mails.deletedMails + "\n");
    }
    var newSocialLinks = {
        links: ""
    };
    if (0 != checkSocialLinksUpdate(userData, newData.social_links, newSocialLinks)) {
        "" != newSocialLinks.links.newLinks && (added += "social_links:" + newSocialLinks.links.newLinks + "\n");
        "" != newSocialLinks.links.deletedLinks && (deleted += "social_links:" + newSocialLinks.links.deletedLinks + "\n");
    }
    var newResidence = {
        residence: ""
    };
    0 != checkResidenceUpdate(userData, newData.residence, newResidence) && (added += "residence:" + newResidence.residence + "\n");
    var newJobTitle = {
        title: ""
    };
    0 != checkJobTitleUpdate(userData, newData.job_title, newJobTitle) && (added += "job_title:" + newJobTitle.title + "\n");
    var newBirthday = {
        date: ""
    };
    0 != checkBirthdayUpdate(userData, newData.birthday_date, newBirthday) && (added += "birthday_date:" + newBirthday.date + "\n");
    var newCompany = {
        company: ""
    };
    0 != checkCompanyUpdate(userData, newData.company, newCompany) && (added += "company:" + newCompany.company + "\n");
    if ("" != added || "" != deleted) {
        alert(added);
        addUpdatesToFriends(added, deleted, userPin);
    } else alert("no changes");
}

function applyUpdatesOfFriend(friend_pin, user_pin, bofffsList) {
    for (var record in bofffsList) if (bofffsList[record].friend_pin_code == friend_pin) {
        var stringToUpdate = bofffsList[record].friend_added_data;
        "" != stringToUpdate && parsingUpdateString(stringToUpdate);
        stringToUpdate = bofffsList[record].friend_deleted_data;
        "" != stringToUpdate && parsingUpdateString(stringToUpdate);
    }
}

function parsingUpdateString(updateString) {
    var stringLines = updateString.split("\n");
    var stringObjects = {};
    for (var line in stringLines) if ("" != stringLines[line]) {
        var stringColon = stringLines[line].split(":");
        stringObjects[stringColon[0]] = stringColon[1].split(",");
    }
    alert(stringObjects);
}

function addUpdatesToFriends(dataAdded, dataDeleted, userPin) {
    var url = "http://www.bofffme.com/api/index.php/home/";
    var xhr = Ti.Network.createHTTPClient({
        onload: function() {
            JSON.parse(this.responseText);
        },
        onerror: function() {
            alert(this.responseText);
        }
    });
    xhr.open("POST", url + "update_friend_updates/bofff/user_friends/" + userPin);
    var params = {
        friend_added_data: dataAdded,
        friend_deleted_data: dataDeleted
    };
    xhr.send(params);
}