import { AppService } from './../../services/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-comentarios-lista',
  templateUrl: './comentarios-lista.component.html',
  styleUrls: ['../list-posts/list-posts.component.scss']
})
export class ComentariosListaComponent implements OnInit {
  displayedColumns: string[] = ['id', 'comentario'];
  data: any[] = [];
  dataSource = new MatTableDataSource<any>(this.data);
  comments = [];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;


  constructor(
    private service: AppService,
    private router: Router,
    private changeDetectorRefs: ChangeDetectorRef,
    private _route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.getComments();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  getComments() {
    let commentData;
    var id = this._route.snapshot.paramMap.get('id');

      this.service.getComments(id).subscribe(

        (comments:any) => {
          for(let comment of comments){
            commentData = {
            id: comment.id,
            body: comment.body,
          };
          this.data.push(commentData);
        }
          this.dataSource = new MatTableDataSource<any>(this.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.changeDetectorRefs.detectChanges();

        },
        (err:any) => {
          console.log(err);
        }
      );
    }

}
