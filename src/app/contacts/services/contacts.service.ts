import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  url = 'http://localhost:4004/'
  constructor(private http: HttpClient) { }

  getContacts() {
    const path = 'contacts'
    return this.http.get(this.url + path).toPromise();
  }

  getContact(id: string) {
    const path = 'contacts'
    return this.http.get(this.url + path + '/?id=' + id).toPromise();
  }

  getAddress(contactId: string) {
    const path = 'addresses'
    return this.http.get(this.url + path + '/?contactId=' + contactId).toPromise();
  }

  getAddressCount(contactId: string) {
    const path = 'addresses'
    return this.http.get(this.url + path).toPromise().then((res: any) => {
      return res?.length ? res?.length : 0;
    });
  }

  creatContacts(contacts: any) {
    const path = 'contacts'
    return this.http.post(this.url + path, contacts).toPromise();
  }

  getCountries() {
    const path = 'countries'
    return this.http.get(this.url + path).toPromise();
  }
}
