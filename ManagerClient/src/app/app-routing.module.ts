import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddContactsComponent } from './components/add-contacts/add-contacts.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';

const routes: Routes = [
  {path: '', component: ContactListComponent},
  {path: 'upload', component: AddContactsComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
