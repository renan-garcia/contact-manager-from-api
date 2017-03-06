import {WebAPI} from './web-api';

export class App {
  static inject() { return [WebAPI]; }

  constructor(api) {
    this.api = api;
  }

  configureRouter(config, router) {
    config.title = 'Contacts';
    config.map([
      { route: '',              moduleId: 'no-selection', name:'select', title: 'Select'},
      { route: 'contacts/:id',  moduleId: 'contact-detail', name:'contacts' },
      { route: '',  moduleId: 'contact-create', name:'create' }
    ]);

    this.router = router;
  }
}
