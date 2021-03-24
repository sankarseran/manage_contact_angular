import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContactsComponent } from './contacts/contacts.component';
import { AddressesComponent } from './addresses/addresses.component';
import { ContactsService } from './services/contacts.service';
import { MaterialModule } from '../shared/material.module';

const routes: Routes = [
  {path: '', component: ContactsComponent},
  {path: 'addresses/:id', component: AddressesComponent}
];

@NgModule({
  declarations: [ContactsComponent, AddressesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [ContactsService]
})
export class ContactsModule { }
