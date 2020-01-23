import { List } from './../../shared/list';
import { ApiService } from './../../shared/api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListEntryComponent implements OnInit {
  EntryData: any = [];
  dataSource: MatTableDataSource<List>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = [ '_id','first_name', 'last_name', 'phone', 'dob','email','action'];

  constructor(private entryApi: ApiService) {
    this.entryApi.GetEntries().subscribe(data => {
      this.EntryData = data;
      this.dataSource = new MatTableDataSource<List>(this.EntryData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })
  }

  ngOnInit() { }

  deleteEntry(index: number, e) {
    if (window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.entryApi.DeleteEntry(e._id).subscribe()
    }
  }

}
