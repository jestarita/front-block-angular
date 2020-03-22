import {Component,OnInit} from '@angular/core';
import {User} from '../../models/users';
import {UserService} from '../../services/user.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {

  public page_title: string;
  public user: User;
  public identity;
  public token;
  public status: string; 
  public url: string;
  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png, .jpeg",
    maxSize: "50",
    uploadAPI:  {
      url:environment.url+'usuarios/upload',
      headers: {
     "Authorization" : this._userservicio.gettoken()
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText: 'Sube tu avatar de usuario'
    };
  constructor(
    private _userservicio: UserService
  ) {
    this.page_title = 'Ajustes De usuario';
    //this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
    this.identity = this._userservicio.getidentity();
    this.token = this._userservicio.gettoken();
    //rellenar usuario
    this.user = this.identity;
    this.user = new User(this.identity.sub,
      this.identity.name,
      this.identity.surname,
      this.identity.role,
      this.identity.email,
      '',
      this.identity.description,
      this.identity.image);
      this.url = environment.url
  }

  ngOnInit(): void {

  
  }

  onSubmit(form) {
    this._userservicio.update(this.token, this.user).subscribe(
      response => {
        if (response && response.status) {
          this.status = 'Success';
          //Actualizar usuario     
          if (response.changes.name) {
            this.user.name = response.changes.name
          }
          if (response.changes.surname) {
            this.user.surname = response.changes.surname
          }
          if (response.changes.email) {
            this.user.email = response.changes.email
          }
          if (response.changes.description) {
            this.user.description = response.changes.description
          }
          if (response.changes.image) {
            this.user.image = response.changes.image
          }
        
          this.identity = this.user;         
          localStorage.setItem('identity', JSON.stringify(this.identity));
        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      });
  }

  AvatarUpload(datos){

   let data= JSON.parse(datos.response);
   this.user.image = data.image;
  }

}
