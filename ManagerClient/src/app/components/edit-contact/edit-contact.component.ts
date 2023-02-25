import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CONTACT } from 'src/app/models/contact.models';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  contact!: CONTACT;

  editForm!: FormGroup;
  name!: FormControl;
  dateOfBirth!: FormControl;
  married!: FormControl;
  phone!: FormControl;
  salary!: FormControl;

  constructor(@Inject(MAT_DIALOG_DATA) public data: number,
  private contactService: ContactService,
  private dialogRef: MatDialogRef<EditContactComponent>) { }

  ngOnInit() {
    this.contactService.getContactById(this.data).subscribe(
      res => {
        this.contact = res;
        this.createFormControls();
        this.createForm();
      }
    );
  }

  createFormControls(){
    this.name = new FormControl(this.contact.name, Validators.required);
    this.dateOfBirth = new FormControl(this.contact.dateOfBirth, Validators.required);
    this.married = new FormControl(this.contact.married, Validators.required);
    this.phone = new FormControl(this.contact.phone, Validators.required);
    this.salary = new FormControl(this.contact.salary, Validators.required);
  }

  createForm() {
    this.editForm = new FormGroup({
        name: this.name,
        dateOfBirth: this.dateOfBirth,
        married: this.married,
        phone: this.phone,
        salary: this.salary
    });
  }

  getClass(control: FormControl)
  {
    if(control.invalid && (control.dirty || control.touched))
    {
      return 'form-control error';
    }
    else{
      return 'form-control';
    }
  }

  edit(){
    if(this.editForm.valid)
    {
      const contact: CONTACT = {
        id: this.contact.id,
        name: this.name.value,
        dateOfBirth: this.dateOfBirth.value,
        married: this.married.value,
        phone: this.phone.value,
        salary: this.salary.value
      }
      this.contactService.updateContact(contact).subscribe(
        () => this.dialogRef.close()
      );
    }
  }

}
