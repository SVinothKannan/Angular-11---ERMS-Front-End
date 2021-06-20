import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ERMSServices } from 'src/app/Services/ermsservices.service';
import { EmpProfileSearch } from '../../Models/CommonModels.Model';

@Component({
  selector: 'app-root',
  templateUrl: './Profiles.component.html',
  styleUrls: ['./Profiles.component.css']
})

export class ProfilesComponent implements OnInit, OnDestroy, AfterViewInit {
  loading: boolean = false;
  EmployeesList: any;
  Locationlist: any;
  SkillSetList: any;
  activePage: number = 0;
  totalrecords: number;
  recordsPerPage: number;
  first: number; last: number;
  IntialValue: number;
  @ViewChild('Emptypevalues', { static: true }) EmpType: ElementRef;
  @ViewChild('Locvalues', { static: true }) Locvalues: ElementRef;
  @ViewChild('SkillValues', { static: true }) SkillValues: ElementRef;
  @ViewChild('BenchValue', { static: true }) BenchValue: ElementRef;
  @ViewChild('WFHValue', { static: true }) WFHValue: ElementRef;

  private EmpProfileSearchobject: EmpProfileSearch;
  constructor(private ERMSService: ERMSServices, private SpinnerService: NgxSpinnerService) {
    this.EmpProfileSearchobject = new EmpProfileSearch();
    this.loading = false;
    this.recordsPerPage = 5;
    this.IntialValue = 5;
  }

  ngAfterViewInit(): void {
    let top = document.getElementById('top');
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
  }


  gotoTop() {
    var parentElement = document.querySelector('#uio');
    parentElement.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
  }


  ngOnDestroy(): void {
    clearTimeout();
  }

  ngOnInit(): void {
    this.loading = true;
    this.SpinnerService.show();
    this.GetLocations();
    this.GetSkillSets();
  }


  GetLocations() {
    this.ERMSService.getlocations().subscribe((data) => {
      if (data != null && data != undefined) {
        this.Locationlist = data.filter(i => i.location != '');
      }
    });
  }

  GetSkillSets() {
    this.ERMSService.getSkillSets().subscribe((data) => {
      if (data != null && data != undefined) {
        this.SkillSetList = data.filter(i => i.skillName != '');
      }
    });
  }


  Locfilter(val = '') {
    debugger
    this.loading = true;
    this.SpinnerService.show();
    this.EmpProfileSearchobject.IsLineManager = this.EmpType.nativeElement.value == "0" ? false : (this.EmpType.nativeElement.value == "false" ? false : true);
    this.EmpProfileSearchobject.Location = this.Locvalues.nativeElement.value;
    this.EmpProfileSearchobject.MstSkill_Id = +this.SkillValues.nativeElement.value;
    this.EmpProfileSearchobject.InBench = this.BenchValue.nativeElement.checked;
    this.EmpProfileSearchobject.IsWFH = this.WFHValue.nativeElement.checked;
    this.EmpProfileSearchobject.MinPage = this.first;
    this.EmpProfileSearchobject.MaxPage = this.last;
    setTimeout(() => {
      debugger
      this.ERMSService.GetEmployeeProfiles(this.EmpProfileSearchobject).subscribe((data) => {
        if (data != null && data != undefined && data.length > 0) {
          this.EmployeesList = data;
          this.totalrecords = data[0]["counts"];
          $.getScript('../../../assets/js/Fotorama.js');
        }
        else { this.EmployeesList = data; this.totalrecords = 0; }
      })
    }, 1000);
    setTimeout(() => { this.loading = false; this.SpinnerService.hide(); }, 2100);
  }
  print() {
    var divToPrint = document.getElementById('tops');
    var newWin = window.open('', '_blank');
    newWin.document.open();
    newWin.document.write('<html><link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css" media="print"/><body onload="window.print()">' + divToPrint.innerHTML + '</body></html>');
    newWin.document.close();
    setTimeout(function () {
      newWin.close();
    }, 10);
  }
  displayActivePage(event) {
    debugger
    this.activePage = event;
    if (this.activePage == 1) {
      this.first = 1;
      this.last = this.first + this.IntialValue - 1;
    }
    else {
      this.first = (this.activePage * this.IntialValue) - this.IntialValue + 1;
      this.last = (this.first + this.IntialValue) - 1;
    }
    this.Locfilter();

    this.gotoTop();
  }



}