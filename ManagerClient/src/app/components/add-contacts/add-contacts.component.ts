import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-contacts',
  templateUrl: './add-contacts.component.html',
  styleUrls: ['./add-contacts.component.css']
})
export class AddContactsComponent implements OnInit {

  uploadForm!: FormGroup;
  file!: FormControl;
  obj!: any;

  public progress!: number;

  constructor(private location: Location,
    private contactService: ContactService,
    private router: Router) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls(){
    this.file = new FormControl('', Validators.required);
  }

  createForm() {
    this.uploadForm = new FormGroup({
        file: this.file
    });
  }

  back(){
    this.location.back();
  }

  upload(){
    if(this.uploadForm.valid)
    {
      let formData = new FormData();
      formData.append("file", this.obj);

      this.contactService.uploadFile(formData).subscribe(
        event => {
          if(event.type === HttpEventType.UploadProgress)
          {
            this.progress = Math.round(100 * event.loaded / event.total);
          }
          else if(event.type === HttpEventType.Response)
          {
            this.router.navigate(['']);
          }
        }
      );
    }
  }

  onFileChange(event: any){
    this.obj = event.target.files[0];
  }
}
