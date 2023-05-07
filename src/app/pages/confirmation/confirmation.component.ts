import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {

  constructor(private route:ActivatedRoute, private router:Router, private http:HttpClient){

  }
  ngOnInit(){
    const param = this.route.snapshot.queryParamMap.get('code');
    const email = this.route.snapshot.queryParamMap.get('email');
    if(!param || !email){
      this.router.navigate(['not-found']);
    }
    
    const data = {'code':param,email:email};
    this.http.post('http://185.146.86.118:5000/validate_email',data).subscribe((data)=>{
        console.log(data);
    },(err)=>{
      console.log(err);
    });
    console.log(param);
  }
}
