import { Component, OnInit, AfterContentChecked, Input, Output, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { KeycloakService } from 'keycloak-angular';
import { isCurrentUserAnAdmin, isCurrentUserAnEmplyee as isCurrentUserAnEmployee, isCurrentUserAStagiaire } from 'src/app/utils';
declare const $: any;
const dataLength = 5;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isLoggedIn?: boolean;
  profile?: Keycloak.KeycloakProfile;
  isAdmin?: boolean;
  isEmployee?: boolean;
  isStagiaire?: boolean;

  @Input()
  dashboardTableOptions: Object = {};
  @Input() dataLength!: number;

  obj: any;
  constructor(@Inject(DOCUMENT) private document: Document,
    public kcService: KeycloakService, private router: Router) {
    kcService.loadUserProfile().then(pr => {
      this.profile = pr;
      kcService.isLoggedIn().then(async (l) => {
        this.isLoggedIn = l;
        this.isAdmin = await isCurrentUserAnAdmin(kcService);
        this.isEmployee = await isCurrentUserAnEmployee(kcService);
        this.isStagiaire = await isCurrentUserAStagiaire(kcService);
      })
    })
  }

  load() {
    const last = localStorage.getItem("lastDataLength");
    let dl = parseInt(last ? last : "NaN");
    if (!isFinite(dl)) {
      dl = dataLength;
    }
    return dl;
  }

  ngOnInit(): void {

    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })

    const dataLength = this.load();
    console.log({ dataLength });
    console.log("parent options", this.dashboardTableOptions)
    const obj = $('#example').DataTable({
      // "createdRow": this.createdRow,
      ...this.dashboardTableOptions,
      pagingType: 'simple_numbers',
      pageLength: dataLength,
      processing: true,
      lengthMenu: [5, 10, 30,],
      order: [[1, 'desc']]
    });
    this.obj = obj;
    obj.on('length.dt', function (e: any, settings: any, len: any) {
      localStorage.setItem("lastDataLength", "" + len);
    });
  }
  Settings() {
    // this.kcService.accountManagement();
  }

  setItems = (arr: String[]) => {
    console
    this.obj.row.add(arr).draw(false);
  }

  updateItems = (arr: String[], index: number) => {
    this.obj.row(index).update(arr).draw(false);
  }

  logOut() {
    this.kcService.logout();
    console.log('logOut...');
    this.router.navigate(['/home']);
  }

  sidebarToggle() {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }

  active(id: string) {
    // document.querySelector("#sidebar a.nav-link:not(.collapsed)")?.classList.add('collapsed');
    // document.querySelector(id)?.classList.remove('collapsed');
  }

  clear() {
    this.obj.clear().draw();
  }

}
