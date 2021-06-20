import { Component, OnInit } from "@angular/core";

@Component({
    templateUrl: './Pnf.component.html',
    styles:[`.is-invalid{border:2px solid red !important;`]
  })
export class PageNotFoundComponent implements OnInit
{ constructor(){}
    ngOnInit(): void {
        
    }  
}