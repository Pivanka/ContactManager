import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CONTACT } from '../models/contact.models';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  baseUrl: string = "https://localhost:7145/";

  constructor(private http: HttpClient) { }

  uploadFile(file: FormData): Observable<any>
  {
    return this.http.post<FormData>(this.baseUrl + 'api/contacts', file, { reportProgress: true, observe: 'events'});
  }

  getContacts(): Observable<Array<CONTACT>>
  {
    return this.http.get<Array<CONTACT>>(this.baseUrl + 'api/contacts');
  }

  getContactById(id: number): Observable<CONTACT>
  {
    return this.http.get<CONTACT>(this.baseUrl + 'api/contacts/'+id);
  }

  deleteContact(id: number): Observable<number>
  {
    return this.http.delete<number>(this.baseUrl + 'api/contacts/delete/' + id);
  }

  updateContact(contact: CONTACT): Observable<any>
  {
    return this.http.put<any>(this.baseUrl + 'api/contacts', contact);
  }

}
