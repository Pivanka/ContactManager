import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddContactsComponent } from './components/add-contacts/add-contacts.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { CommonModule } from '@angular/common';
import { EditContactComponent } from './components/edit-contact/edit-contact.component';
import { SortPipe } from './pipes/sort.pipe';

import {MatDialogModule} from '@angular/material/dialog';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AddContactsComponent,
    ContactListComponent,
    EditContactComponent,
    SortPipe,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    BrowserModule,
    MatDialogModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
