import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TokensService } from 'src/app/services/tokens.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {


  form!:FormGroup;
  constructor(private router: Router,private formBuilder:FormBuilder, private http: HttpClient, private tokens: TokensService) {
    this.createForm();
  }


  private createForm():void{
    this.form = this.formBuilder.group({
      username:['',Validators.required],
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

  public signin(): void {
    const data = this.form.getRawValue();
    this.http.post('http://185.146.86.118:5000/signin', data).subscribe((response: any) => {
      this.tokens.storeTokens(response['user_data']['accessToken'], response['user_data']['refreshToken'])
      localStorage.setItem('username', response['user_data']['username'].toUpperCase());
      this.router.navigate(['view']);
    })
  }

}
