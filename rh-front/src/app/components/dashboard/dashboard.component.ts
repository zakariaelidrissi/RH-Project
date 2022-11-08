import { Component, OnInit, AfterContentChecked,Input,Output ,EventEmitter,Inject} from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common'
import { KeycloakSecurityService } from 'src/app/services/keycloak-security/keycloak-security.service';
declare const $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  @Input()
  dataLength! : number;
  obj :any;
  constructor(@Inject(DOCUMENT) private document: Document, 
              public kcService: KeycloakSecurityService, private router: Router) { }


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

  logOut() {
    this.kcService.kc.logout();
    console.log('logOut...');
    this.router.navigate(['/home']);
  }

  sidebarToggle()
  {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }

  active(id:string){
    // document.querySelector("#sidebar a.nav-link:not(.collapsed)")?.classList.add('collapsed');
    // document.querySelector(id)?.classList.remove('collapsed');
  }

}
