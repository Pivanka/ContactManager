import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CONTACT } from 'src/app/models/contact.models';
import { ContactService } from 'src/app/services/contact.service';
import { EditContactComponent } from '../edit-contact/edit-contact.component';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts!: Array<CONTACT>;
  sortByParam = '';
  sortDirection = 'asc';
  filterByParam = '';
  filterString = '';
  searchField = '';

  constructor(private contactService: ContactService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getContacts();
  }

  getContacts(){
    this.contactService.getContacts().subscribe(
      res => this.contacts = res
    );
  }

  deleteContact(id: number)
  {
    this.contactService.deleteContact(id).subscribe(
      () => this.getContacts()
    );
  }

  edit(contactId: number){
    this.dialog.open(EditContactComponent, {
      data: contactId
    }).afterClosed().subscribe(
      () => {
        this.getContacts();
      }
    );
  }

  onSortDirection(){
    if(this.sortDirection === 'desc'){
      this.sortDirection = 'asc';
    } else {
      this.sortDirection = 'desc';
    }
  }

  onFieldFilter(filter: string){
    this.searchField = filter;
  }

  clear(){
    this.searchField = '';
    this.filterString = '';
  }

}
