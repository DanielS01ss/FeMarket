import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import {FormBuilder, FormGroup, 
    Validators} from '@angular/forms'
import { Router } from '@angular/router';
@Component({
  selector: 'app-pw-changes',
  templateUrl: './pw-changes.component.html',
  styleUrls: ['./pw-changes.component.scss']
})
export class PwChangesComponent {
  passwordForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient) {
    this.passwordForm = this.formBuilder.group({
      old: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm: ['', Validators.required],
    });
  }

  onSubmit() {
    const form_data = this.passwordForm.getRawValue();
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      'Content-Type': 'application/json'
    });
    if (form_data.password !== form_data.confirm) {
      alert('Passwords do not match!')
    }
    else {
      const data = {
        "new_password": form_data.password,
        "current_password": form_data.old
      }
      this.http.put('http://185.146.86.118:5000/update_password', data, {headers: headers, observe: 'response'}).subscribe((response: any) => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('username');
        this.router.navigate(['/sign-in']);
    }, err => {
      alert('Password was not updated successfully!');
    });
    }
  }
}
