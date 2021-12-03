import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComentariosListaComponent } from './components/comentarios-lista/comentarios-lista.component';
import { CrearPostComponent } from './components/crear-post/crear-post.component';
import { ListPostsComponent } from './components/list-posts/list-posts.component';

const routes: Routes = [
  { path: 'posts', component: ListPostsComponent },
  { path: 'posts/:id/comments', component: ComentariosListaComponent },
  { path: 'posts/new', component: CrearPostComponent },
  { path: '', pathMatch: 'full', redirectTo: 'posts' },
  { path: '**', pathMatch: 'full', redirectTo: 'posts' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
