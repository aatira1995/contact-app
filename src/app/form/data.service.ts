import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private formDataSubject = new BehaviorSubject({
    name: null,
    email: null,
    phone: null
  })

  formData = this.formDataSubject.asObservable();

  constructor() { }

  changeFormData(data){
    this.formDataSubject.next(data);
  }
}
