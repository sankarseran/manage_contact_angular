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

  getAddressCount() {
    const path = 'addresses'
    return this.http.get(this.url + path).toPromise().then((res: any) => {
      return res?.length ? res?.length : 0;
    });
  }

  updateAddress(address: any) {
    const path = 'addresses/'
    return this.http.get(this.url + path).toPromise().then((res: any) => {
      // console.log('res', res);
      if (res?.length && res.find((val: any) => val.id == address.id)){
        return (this.http.put(this.url + path + address.id, address).toPromise());
      } else {
        return (this.http.post(this.url + path, address).toPromise());
      }
    }).catch((err) => {
      console.log(err);
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
