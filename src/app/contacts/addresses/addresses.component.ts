import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { ContactsService } from '../services/contacts.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss'],
})
export class AddressesComponent implements OnInit {
  contactId!: string;
  countries: any;
  selectedContact: any;
  addressForm: FormGroup;
  contactAddresses: any;

  get addresses(): FormArray {
    return this.addressForm.get('addresses') as FormArray;
  }
  constructor(
    private route: ActivatedRoute,
    private contactsService: ContactsService,
    private fb: FormBuilder
  ) {
    this.addressForm = this.fb.group({
      addresses: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.contactId = params['id'];
      this.getContact(params['id']);
      this.getAddresses();
    });

    const countries = localStorage.getItem('countries');
    if (countries) {
      this.countries = JSON.parse(countries);
    } else {
      this.getCountries();
    }
  }

  getAddresses() {
    this.contactsService.getAddress(this.contactId).then((res: any) => {
      this.contactAddresses = res;
      if (this.contactAddresses && this.contactAddresses?.length) {
        this.contactAddresses.forEach((address: any, idx: any) => {
          // console.log(address);
          this.addAddress(address);
          if (this.contactAddresses.length - 1 == idx) {
            this.addAddress(null);
          }
        });
      } else {
        this.addAddress(null);
      }
    });
  }

  getContact(id: string) {
    this.contactsService.getContact(id).then((res: any) => {
      this.selectedContact = res[0];
    });
  }

  getCountries() {
    this.contactsService.getCountries().then((res) => {
      this.countries = res;
      localStorage.setItem('countries', JSON.stringify(this.countries));
    });
  }

  newAddress(value: any): FormGroup {
    if (value) {
      return this.fb.group({
        street1: value.street1,
        street2: value.street2,
        town: value.town,
        country: value.country,
        id: value.id,
        contactId: value.contactId,
      });
    } else {
      return this.fb.group({
        street1: '',
        street2: '',
        town: '',
        country: '',
        id: '',
        contactId: this.contactId,
      });
    }
  }

  addAddress(value: any) {
    this.addresses.push(this.newAddress(value));
  }

  removeSkill(i:number) {
    this.addresses.removeAt(i);
  }

  saveAddress() {
    if (this.addressForm.valid) {
      this.contactsService.getAddressCount().then((res) => {
        let currentCount = res;
        // console.log(this.addressForm.value.addresses);
        const request: any[] = [];
        this.addressForm.value.addresses.forEach((address: any, idx: any) => {
          if (!address?.id) {
            address.id = currentCount + 1; 
            currentCount += 1
          }
          request.push(address);
          this.updateAddress(address);
        });
      });
    }
  }

  updateAddress(address: any) {
    this.contactsService.updateAddress(address).then((res) => {
      console.log('success fully added or updated', res);
    });
  }
}
