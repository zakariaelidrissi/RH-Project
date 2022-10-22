import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stages',
  templateUrl: './stages.component.html',
  styleUrls: ['./stages.component.css']
})
export class StagesComponent implements OnInit {

  page: number = 1;
  count: number = 0;
  pageSize : number = 8;
  pageSizes : any = [5, 10, 15, 20, 30]

  stages : any = [
    {image : "https://mdbootstrap.com/img/Photos/Others/images/43.webp", title : "Card title", body : "Some quick example text to build on the card title and make up the bulk of the card scontent."},
    {image : "https://mdbootstrap.com/img/Photos/Others/images/43.webp", title : "Card title", body : "Some quick example text to build on the card title and make up the bulk of the card scontent."},
    {image : "https://mdbootstrap.com/img/Photos/Others/images/43.webp", title : "Card title", body : "Some quick example text to build on the card title and make up the bulk of the card scontent."},
    {image : "https://mdbootstrap.com/img/Photos/Others/images/43.webp", title : "Card title", body : "Some quick example text to build on the card title and make up the bulk of the card scontent."},
    {image : "https://mdbootstrap.com/img/Photos/Others/images/43.webp", title : "Card title", body : "Some quick example text to build on the card title and make up the bulk of the card scontent."},
    {image : "https://mdbootstrap.com/img/Photos/Others/images/43.webp", title : "Card title", body : "Some quick example text to build on the card title and make up the bulk of the card scontent."},
    {image : "https://mdbootstrap.com/img/Photos/Others/images/43.webp", title : "Card title", body : "Some quick example text to build on the card title and make up the bulk of the card scontent."},
    {image : "https://mdbootstrap.com/img/Photos/Others/images/43.webp", title : "Card title", body : "Some quick example text to build on the card title and make up the bulk of the card scontent."},
    {image : "https://mdbootstrap.com/img/Photos/Others/images/43.webp", title : "Card title", body : "Some quick example text to build on the card title and make up the bulk of the card scontent."},
    {image : "https://mdbootstrap.com/img/Photos/Others/images/43.webp", title : "Card title", body : "Some quick example text to build on the card title and make up the bulk of the card scontent."},
    {image : "https://mdbootstrap.com/img/Photos/Others/images/43.webp", title : "Card title", body : "Some quick example text to build on the card title and make up the bulk of the card scontent."},
    {image : "https://mdbootstrap.com/img/Photos/Others/images/43.webp", title : "Card title", body : "Some quick example text to build on the card title and make up the bulk of the card scontent."},
    {image : "https://mdbootstrap.com/img/Photos/Others/images/43.webp", title : "Card title", body : "Some quick example text to build on the card title and make up the bulk of the card scontent."}
  ]

  constructor() { }

  ngOnInit(): void {
    this.stages;
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.stages;
  }

}
