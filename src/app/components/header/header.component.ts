import { NavigationEnd, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  titulo = ""
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {

        if (event.url == '/posts'){
          this.titulo = "Lista de Posts"
        } else if (event.url == '/posts/new'){
          this.titulo = "Nuevo Post"
        } else {
          this.titulo = "Lista de Comentarios"
        }
      }

    });
  }

  ngOnInit(): void {


  }



}
