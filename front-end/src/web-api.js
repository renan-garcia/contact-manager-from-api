import {HttpClient} from 'aurelia-fetch-client';
let client = new HttpClient();
let latency = 200;
let id = 0;
let contacts = [];

function getId() {
  return ++id;
}

export class WebAPI {
  isRequesting = false;

  getContactList() {
    this.isRequesting = true;
    return new Promise((resolve, reject) => {
      client.fetch('http://localhost:3000/contacts')
        .then(response => response.json())
        .then(response => {
          let results = response.map(x => {
            return {
              id: x.id,
              firstName: x.firstName,
              lastName: x.lastName,
              email: x.email,
              phoneNumber: x.phoneNumber
            }
          });
          resolve(results);
          this.isRequesting = false;
        })
        .catch((ex) => {
          console.log('ERROR', ex);
          reject(response);
        });
    });
  }
  getContactForCreate() {
    this.isRequesting = true;
    return new Promise((resolve, reject) => {
          let result = {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: ""
          };
          resolve(result);
          this.isRequesting = false;
        })
        .catch((ex) => {
          console.log('ERROR', ex);
          reject(response);
        });
  }

  getContactDetails(id) {
    this.isRequesting = true;
    return new Promise((resolve, reject) => {
      client.fetch('http://localhost:3000/contacts/' + id)
        .then(response => response.json())
        .then(response => {
          let result = {
            id: response.id,
            firstName: response.firstName,
            lastName: response.lastName,
            email: response.email,
            phoneNumber: response.phoneNumber
          };
          resolve(result);
          this.isRequesting = false;
        })
        .catch((ex) => {
          console.log('ERROR', ex);
          reject(response);
        });
    });
  }
  createContact(contact) {
    this.isRequesting = true;
    return new Promise((resolve, reject) => {
      var data = new FormData();
      data.append(JSON.stringify(contact));
      client.fetch('http://localhost:3000/contacts/', {
          method: 'POST',
          mode: 'no-cors',
          body: JSON.stringify({
            contact
          }),
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        })
        .then(response => response.json())
        .then(response => {
          console.log(response);
          let result = {
            id: response.id,
            firstName: response.firstName,
            lastName: response.lastName,
            email: response.email,
            phoneNumber: response.phoneNumber
          };
          resolve(result);
          this.isRequesting = false;
        })
        .catch((ex) => {
          console.log('ERROR', ex);
          reject(response);
        });
    });
  }

  saveContact(contact) {
    this.isRequesting = true;
    return new Promise((resolve, reject) => {
      var data = new FormData();
      data.append(JSON.stringify(contact));
      client.fetch('http://localhost:3000/contacts/' + contact.id, {
          method: 'PUT',
          mode: 'cors',
          body: JSON.stringify({
            contact
          }),
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        })
        .then(response => response.json())
        .then(response => {
          console.log(response);
          let result = {
            id: response.id,
            firstName: response.firstName,
            lastName: response.lastName,
            email: response.email,
            phoneNumber: response.phoneNumber
          };
          resolve(result);
          this.isRequesting = false;
        })
        .catch((ex) => {
          console.log('ERROR', ex);
          reject(response);
        });
    });
  }
}
