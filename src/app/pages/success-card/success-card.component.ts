import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-card',
  templateUrl: './success-card.component.html',
  styleUrls: ['./success-card.component.scss']
})
export class SuccessCardComponent {

  form!:FormGroup;
  constructor(private formBuilder:FormBuilder, private http:HttpClient, private router: Router){
    this.form = this.formBuilder.group({
      code:['',Validators.compose([Validators.required,Validators.max(7)])]
    })
  }

  postCode(){
    const storedEmail = localStorage.getItem('email');
    const code = this.form.get('code')?.value;
    const data = {'code':code,email:storedEmail};
    this.http.post('http://185.146.86.118:5000/validate_email',data).subscribe((data:any)=>{
      alert("Your account was confirmed succesfully!");
      this.router.navigate(['sign-in']);
    },(err)=>{
      console.log(err);
    });
  }
}
 