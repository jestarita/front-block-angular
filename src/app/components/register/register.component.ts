import { Component, OnInit } from '@angular/core';
import { User } from '../../models/users';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers : [UserService]
})
export class RegisterComponent implements OnInit {

  public page_title:string;
  public status:string;
  public user:User;
  constructor(
    private userservicio:UserService
  ) { 
    this.page_title = 'Registrarse';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
  }

  ngOnInit(): void {
   
  }

  onSubmit(form){
   
    this.userservicio.register(this.user).subscribe(
      response =>{
        if(response.status == "Success"){
          this.status = response.status;
          form.reset();
        }else{
          this.status = "error"
        }
        
      },
      error =>{

        console.log(<any>error);
        this.status = "error"
      }
    );
   
    
   
  }

}
