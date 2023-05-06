import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {


  form!:FormGroup;
  constructor(private router: Router,private formBuilder:FormBuilder){
    this.createForm();
  }


  private createForm():void{
    this.form = this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }

  GoToDashboard() {
    this.router.navigate(['view']);
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
