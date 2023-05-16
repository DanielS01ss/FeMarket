import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  form!:FormGroup;
  constructor(private router: Router,private formBuilder:FormBuilder,private http:HttpClient){
    this.form = this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      username:['',[Validators.required,Validators.minLength(3)]],
      password:['',[Validators.required,Validators.minLength(6)]]
    }) 
  }

  signUp(){
    const newUser = {
      username:this.form.get('username')?.value,
      email:this.form.get('email')?.value,
      password:this.form.get('password')?.value
    }
  localStorage.setItem('email',newUser.email);
    this.http.post('http://185.146.86.118:5000/signup',newUser).subscribe((data)=>{this.router.navigate(['success'])},(err)=>{
      console.log(err);
      alert('A fost o eroare la conectarea la server');
    });
  }
  
  toggleVisibilityOn() {
    const el = document.getElementById('password');
    const von = document.getElementById('visibility_on');
    const voff = document.getElementById('visibility_off');
    el?.setAttribute('type','text');
    von!.style.display = 'block';
    voff!.style.display = 'none';
  }

  toggleVisibilityOff() {
    const el = document.getElementById('password');
    const von = document.getElementById('visibility_on');
    const voff = document.getElementById('visibility_off');
    el?.setAttribute('type','password');
    von!.style.display = 'none';
    voff!.style.display = 'block';
  }
}

// /signup
// username
// email
// password


/// /validate_email/@email - POST
/// body { "code" : codul generat}