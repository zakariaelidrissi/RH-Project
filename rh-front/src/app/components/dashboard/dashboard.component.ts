import { Component, OnInit, AfterContentChecked } from '@angular/core';
declare const $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterContentChecked {

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      $('#example').DataTable( {
        pagingType : 'simple_numbers',
        pageLength : 5,
        processing : true,
        lengthMenu : [5, 10, 25],
        order : [[1, 'desc']]
      });
    }, 1);
  }

  ngAfterContentChecked(){
    // setTimeout(() => {
      // $('#example').DataTable( {
      //   pagingType : 'simple_numbers',
      //   pageLength : 5,
      //   processing : true,
      //   lengthMenu : [5, 10, 25],
      //   order : [[1, 'desc']]
      // });
    // }, 1);
  }

}
