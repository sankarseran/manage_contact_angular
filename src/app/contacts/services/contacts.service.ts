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

  creatContacts(contacts: any) {
    const path = 'contacts'
    return this.http.post(this.url + path, contacts).toPromise();
  }
}
