const limit = 25;
let page = 1;
let getContactsListQueryUrl = '/api/v4/contacts';
let conditionalTaskCreation = '/api/v4/tasks';
let text = "Контакт без сделок";
let complete_till = new Date(2021,9,10);

function getContacts() {
    $.ajax({
        url: getContactsListQueryUrl,
        method: 'GET',
        data: {
            limit: limit,
            with: 'leads',
            page: page
        }
    }).done(function(data) {
        for (let i = 0; data['contacts']['leads'] === ""; i++) {
            $.ajax({
                url: conditionalTaskCreation,
                method: 'POST',
                record: {
                    text: text,
                    complete_till: complete_till,
                    entity_id: data['contacts']['id']

                }
            })
        }

        if (!!data['concat']['leads']) {
            console.log(data)

        } else {
            console.log('Контактов нет');
            return false;
        }
    }).fail(function(data) {
        console.log('Что-то пошло не так c получением контактов');
        console.log(data);
        return false;
    })


    page++;
}

getContacts();
