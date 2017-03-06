import {EventAggregator} from 'aurelia-event-aggregator';
import {WebAPI} from './web-api';
import {Router} from 'aurelia-router';
import {ContactUpdated,ContactViewed,ContactCreated} from './messages';
import {areEqual} from './utility';

export class ContactCreate {
  static inject = [WebAPI, EventAggregator];
  static inject() { return [Router]; }

  constructor(api, ea, router) {
    this.theRouter = router;
    this.api = api;
    this.ea = ea;
  }

  activate(params, routeConfig) {
    this.routeConfig = routeConfig;
    this.routeConfig = routeConfig;

    return this.api.getContactForCreate().then(contact => {
      this.contact = contact;
      this.routeConfig.navModel.setTitle("Create contact");
      this.originalContact = JSON.parse(JSON.stringify(contact));
      this.ea.publish(new ContactViewed(this.contact));
    });
  }

  get canSave() {
    return this.contact.firstName && this.contact.lastName && !this.api.isRequesting;
  }

  create() {
    this.api.createContact(this.contact).then(contact => {
      this.contact = contact;
      this.ea.publish(new ContactCreated(this.contact));
    });
  }

  canDeactivate() {
    if (!areEqual(this.originalContact, this.contact)) {
      let result = confirm('You have unsaved changes. Are you sure you wish to leave?');

      if (!result) {
        this.ea.publish(new ContactViewed(this.contact));
      }

      return result;
    }

    return true;
  }
}
