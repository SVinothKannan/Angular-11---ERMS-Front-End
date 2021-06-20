import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { ERMSServices} from 'src/app/Services/ermsservices.service';
import {AddEmployeeModel} from '../../Models/EmployeeModel.Model'
import { ActivatedRoute, Params,Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ERMSServices } from '../../Services/ermsservices.service';
import { OrderModels } from '../../Models/CommonModels.Model';
@Component({
  selector: 'app-root',
  templateUrl: './CreateOrder.component.html',
  styles:[".is-invalid{border:1px solid red !important;"]
})

export class CreateOrderComponent implements OnInit {
    
    Skillset:any;
    OrderModel:OrderModels;
    constructor(private service:ERMSServices)
    {
        this.OrderModel=new OrderModels();
    }
    ngOnInit(): void {
       
    }

    OnSubmit():void{
        
    }
}