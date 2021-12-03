import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';


@Component({
  selector: 'app-crear-post',
  templateUrl: './crear-post.component.html',
  styleUrls: ['./crear-post.component.scss']
})
export class CrearPostComponent implements OnInit {
  options: FormGroup;
  tituloValidation = new FormControl();
  textoValidation = new FormControl();
  postData: any = [];


  constructor(fb: FormBuilder, private service: AppService,  private router: Router) {
    this.options = fb.group({
        tituloValidation: this.tituloValidation,
        textoValidation: this.textoValidation,
    });
  }

  ngOnInit(): void {

  }

  getPost(post: any){
    this.service.postPost(post).subscribe((data : {}) =>
      {
        this.postData = post;
        this.router.navigateByUrl(`/posts`);
      }
    )

  }

  guardarPost(titulo:any, texto: any ){
    var post = {userId: 1, title: titulo, body: texto};

    this.getPost(post);

  }

}
