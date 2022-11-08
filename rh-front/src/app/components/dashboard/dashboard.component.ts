import { Component, OnInit, AfterContentChecked,Input,Output ,EventEmitter} from '@angular/core';
declare const $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterContentChecked {

  constructor() { }

  @Input()
  dataLength! : number;
  obj :any;

  ngOnInit(): void {
    const obj = $('#example').DataTable({
      pagingType : 'simple_numbers',
      pageLength : this.dataLength,
      processing : true,
      lengthMenu : [5, 10, 25],
      order : [[1, 'desc']]
    });
    this.obj = obj;
    obj.on( 'length.dt', function (e:any,settings:any,len:any ) {
      localStorage.setItem("lastDataLength","" + len);
    });
    // setTimeout(() => {
    //   const obj = $('#example').DataTable({
    //     pagingType : 'simple_numbers',
    //     pageLength : this.dataLength,
    //     processing : true,
    //     lengthMenu : [5, 10, 25],
    //     order : [[1, 'desc']]
    //   });
    //   this.obj = obj;
    // }, 1);
  }
  
  setItems=(arr:String[])=>{
    console
    this.obj.row.add(arr).draw(false);
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
