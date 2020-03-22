import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params } from '@angular/router';
import {UserService} from '../../services/user.service';
import {CategoryService} from '../../services/category.service';
import { Category } from '../../models/categories';
@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css'],
  providers: [UserService, CategoryService]
})
export class CategoryNewComponent implements OnInit {

  public page_title:string;
  public identity;
  public token;
  public category:Category;
  public status:string;
  constructor(
    private _Route:ActivatedRoute,
    private _router:Router,
    private userservice:UserService,
    private categoryservice:CategoryService
  ) {
    this.page_title = 'Agregar nueva categoria';
    this.token = this.userservice.gettoken();
    this.identity = this.userservice.getidentity();
    this.category = new Category(1, '');
   }

  ngOnInit(): void {
  }

  onSubmit(form){
    this.categoryservice.create(this.token, this.category).subscribe(
      response =>{
        if(response.status == 'success'){
          this.category = response.category;
          this.status = 'success';
          this._router.navigate(['inicio']);
        }else{
          this.status = 'error';
        }
        
      }, error =>{
        this.status = 'error';
        console.log(<any>error)
      }
    );
  }

}
