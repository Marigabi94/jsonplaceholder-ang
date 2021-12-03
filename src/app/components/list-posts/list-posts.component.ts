import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AppService } from 'src/app/services/app.service';


@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss']
})
export class ListPostsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'titulo','comentarios'];
  data: any[] = [];
  dataSource = new MatTableDataSource<any>(this.data);
  posts = [];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(
    private service: AppService,
    private router: Router,
    private changeDetectorRefs: ChangeDetectorRef

  ) { }

  ngOnInit(): void {
    this.getPosts();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  getPosts() {
    let postsData;

      this.service.getPosts().subscribe(

        (posts:any) => {
          for(let post of posts){
          postsData = {
            id: post.id,
            titulo: post.title,
          };
          this.data.push(postsData);
        }
          this.dataSource = new MatTableDataSource<any>(this.data);
          this.dataSource.paginator = this.paginator;
          this.changeDetectorRefs.detectChanges();

        },
        (err:any) => {
          console.log(err);
        }
      );
    }

    reDirectComments(post: any) {
      this.router.navigateByUrl(`/posts/${post.id}/comments`);
    }
    newPost() {
      this.router.navigateByUrl(`/posts/new`);
    }

}
