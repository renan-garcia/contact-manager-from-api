import {EventAggregator} from 'aurelia-event-aggregator';
import {WebAPI} from './web-api';
import {ContactUpdated, ContactViewed, ContactCreated} from './messages';

export class ContactList {
  static inject = [WebAPI, EventAggregator];
  static inject() { return [Router]; }
  constructor(api, ea) {
    this.api = api;
    this.contacts = [];
    this.api.getContactList().then(contacts => this.contacts = contacts);
    ea.subscribe(ContactViewed, msg => this.select(msg.contact));
    ea.subscribe(ContactUpdated, msg => {
      let id = msg.contact.id;
      let found = this.contacts.find(x => x.id === id);
      Object.assign(found, msg.contact);
    });
    ea.subscribe(ContactCreated, msg => {
      let contact = jQuery.extend({}, msg.contact)
      this.contacts.push(contact);
    });
  }

  created() {
    this.api.getContactList().then(contacts => this.contacts = contacts);
  }

  select(contact) {
    this.selectedId = contact.id;
    return true;
  }
}
