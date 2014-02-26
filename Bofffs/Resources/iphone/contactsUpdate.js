function saveUpdate(contact) {
    Titanium.Contacts.save();
    alert("contact updated");
}

function updateNumber(id, key, value) {
    var contact = Titanium.Contacts.getPersonByID(id);
    var phone = contact.phone;
    try {
        phone[key].push(value);
        contact.phone = phone;
        saveUpdate(contact);
    } catch (error) {
        for (var record in phone) {
            phone[record].push(value);
            break;
        }
        contact.phone = phone;
        saveUpdate(contact);
    }
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
        contact.email = email;
        saveUpdate(contact);
    } catch (error) {
        for (var record in email) {
            email[record].push(value);
            break;
        }
        contact.email = email;
        saveUpdate(contact);
    }
}

function updateSocialLink(id, key, value) {
    var contact = Titanium.Contacts.getPersonByID(id);
    var url = contact.url;
    try {
        url[key].push(value);
        contact.url = url;
        saveUpdate(contact);
    } catch (error) {
        for (var record in url) {
            url[record].push(value);
            break;
        }
        contact.url = url;
        saveUpdate(contact);
    }
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