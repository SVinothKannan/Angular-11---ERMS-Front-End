import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ViewProfilesModel } from '../../../Models/CommonModels.Model';
import { ERMSServices } from '../../../Services/ermsservices.service';


@Component({
    selector: 'app-root',
    templateUrl: './ViewProfile.component.html',
    styleUrls: ['./ViewProfile.component.css']
})



export class ViewProfileComponent implements OnInit {
    loading:boolean=false;
    private ViewProfilesModels: ViewProfilesModel;
    constructor(private ERMSService: ERMSServices, private SpinnerService: NgxSpinnerService, private route: ActivatedRoute, private router: Router) {
        this.loading = true;
        this.SpinnerService.show();
    }

    ngOnInit(): void {
  
        let Id = +this.route.snapshot.paramMap.get("empId");
        this.loading = false;
        this.SpinnerService.hide();
    }

    

}