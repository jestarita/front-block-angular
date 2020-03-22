import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { User } from '../../models/users';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers : [UserService]
  
})
export class LoginComponent implements OnInit {

  public page_title:string;
  public user:User;
  public status:string;
  public token;
  public identity;
  constructor(
    private userservicio:UserService,
    private _router:Router,
    private _route:ActivatedRoute
  ) {
    this.page_title = 'Identificarse';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
   }

  ngOnInit(): void {
    this.logout();
  }

  onSubmit(form){
    this.userservicio.signup(this.user).subscribe(
      response =>{
        if(response.status != 'error'){
          this.status = "Success";
          this.token = response;
         
          //usuario logueado
          this.userservicio.signup(this.user, true).subscribe(
            response =>{
              this.identity = response;
              //persistir datos de usuario logueado
             localStorage.setItem('token', this.token);
             localStorage.setItem('identity', JSON.stringify(this.identity));

             this._router.navigate(['inicio']);
            },
            error =>{
              this.status = "error";
              console.log(<any>error);
            }
          );

        }else{
          this.status = "error";
        }
    
      },
      error =>{
        this.status = "error";
        console.log(<any>error);
      }
    );
  }

  logout(){
    this._route.params.subscribe(
      params=>{
        let logout = +params['sure']
        if(logout == 1){
          localStorage.removeItem('identity');
          localStorage.removeItem('token');
          this.identity = null;
          this.token = null;

          //redireccionar
          this._router.navigate(['login']);
        }
      });
  }



}
