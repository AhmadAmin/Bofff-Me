function saveUpdate(contact) {
    Titanium.Contacts.save([ contact ]);
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
        alert("ana da5alt fel try");
    } catch (error) {
        address[key] = [ value ];
        alert("ana da5alt fel catch");
    }
    contact.address = address;
    saveUpdate(contact);
}