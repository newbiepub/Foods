import { Mongo } from 'meteor/mongo'

AdminConfig = {
    name: 'Foods',
    collections: {
         Page: {
            icon: 'pencil',
            tableColumns: [
                { label: 'Title', name: 'title' },
                { label: 'Published', name: 'published' },
                { label: 'User', name: 'owner', template: 'userEmail' }
            ]
        }
    }
}