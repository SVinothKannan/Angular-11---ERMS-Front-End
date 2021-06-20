import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './Print.component.html',
    styleUrls:['./Print.component.css']
  })

  export class Printcomponent implements OnInit
  {
    ngOnInit(): void {
        
    }   
    Print(){
         let printContents, popupWin;
         printContents = document.getElementById('receipt-conten').innerHTML;
         var w = 800;
         var h = 800;
         var left = Number((screen.width/2)-(w/2));
         var tops = Number((screen.height/2)-(h/2));
         var newWin = window.open('','','toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+tops+', left='+left);
         newWin.document.open();

        let css=`
        @media print {
            body, html, .receipt-content{
                margin: 0;
                box-shadow: 0;
              }
            .footer,.print{display:none !important;}
            .receipt-content{
            width: 21cm;
            height: 29.7cm; 
            }
      }
      .page {
        background: white;
        display: block;
        margin: 0 auto;
        margin-bottom: 0.5cm;
        box-shadow: 0 0 0.5cm rgba(0,0,0,0.5);
      }
      .page[size="A4"] {  
        width: 21cm;
        height: 29.7cm; 
      }
        .receipt-content .logo a:hover {
            text-decoration: none;
            color: #7793C4; 
          }
          
          .receipt-content .invoice-wrapper {
            background: #FFF;
            border: 1px solid #CDD3E2;
            box-shadow: 0px 0px 1px #CCC;
            padding: 40px 40px 60px;
            margin-top: 40px;
            border-radius: 4px; 
          }
          
          .receipt-content .invoice-wrapper .payment-details span {
            color: #A9B0BB;
            display: block; 
          }
          .receipt-content .invoice-wrapper .payment-details a {
            display: inline-block;
            margin-top: 5px; 
          }
          
          .receipt-content .invoice-wrapper .line-items .print a {
            display: inline-block;
            border: 1px solid #9CB5D6;
            padding: 13px 13px;
            border-radius: 5px;
            color: #708DC0;
            font-size: 13px;
            -webkit-transition: all 0.2s linear;
            -moz-transition: all 0.2s linear;
            -ms-transition: all 0.2s linear;
            -o-transition: all 0.2s linear;
            transition: all 0.2s linear; 
          }
          
          .receipt-content .invoice-wrapper .line-items .print a:hover {
            text-decoration: none;
            border-color: #333;
            color: #333; 
          }
          
          .receipt-content {
            background: #ECEEF4; 
          }
          @media (min-width: 1200px) {
            .receipt-content .container {width: 900px; } 
          }
          
          .receipt-content .logo {
            text-align: center;
            margin-top: 50px; 
          }
          
          .receipt-content .logo a {
            font-family: Myriad Pro, Lato, Helvetica Neue, Arial;
            font-size: 36px;
            letter-spacing: .1px;
            color: #555;
            font-weight: 300;
            -webkit-transition: all 0.2s linear;
            -moz-transition: all 0.2s linear;
            -ms-transition: all 0.2s linear;
            -o-transition: all 0.2s linear;
            transition: all 0.2s linear; 
          }
          
          .receipt-content .invoice-wrapper .intro {
            line-height: 25px;
            color: #444; 
          }
          
          .receipt-content .invoice-wrapper .payment-info {
            margin-top: 25px;
            padding-top: 15px; 
          }
          
          .receipt-content .invoice-wrapper .payment-info span {
            color: #A9B0BB; 
          }
          
          .receipt-content .invoice-wrapper .payment-info strong {
            display: block;
            color: #444;
            margin-top: 3px; 
          }
          
          @media (max-width: 767px) {
            .receipt-content .invoice-wrapper .payment-info .text-right {
            text-align: left;
            margin-top: 20px; } 
          }
          .receipt-content .invoice-wrapper .payment-details {
            border-top: 2px solid #EBECEE;
            margin-top: 30px;
            padding-top: 20px;
            line-height: 22px; 
          }
          
          
          @media (max-width: 767px) {
            .receipt-content .invoice-wrapper .payment-details .text-right {
            text-align: left;
            margin-top: 20px; } 
          }
          .receipt-content .invoice-wrapper .line-items {
            margin-top: 40px; 
          }
          .receipt-content .invoice-wrapper .line-items .headers {
            color: #A9B0BB;
            font-size: 13px;
            letter-spacing: .3px;
            border-bottom: 2px solid #EBECEE;
            padding-bottom: 4px; 
          }
          .receipt-content .invoice-wrapper .line-items .items {
            margin-top: 8px;
            border-bottom: 2px solid #EBECEE;
            padding-bottom: 8px; 
          }
          .receipt-content .invoice-wrapper .line-items .items .item {
            padding: 10px 0;
            color: #696969;
            font-size: 15px; 
          }
          @media (max-width: 767px) {
            .receipt-content .invoice-wrapper .line-items .items .item {
            font-size: 13px; } 
          }
          .receipt-content .invoice-wrapper .line-items .items .item .amount {
            letter-spacing: 0.1px;
            color: #84868A;
            font-size: 16px;
           }
          @media (max-width: 767px) {
            .receipt-content .invoice-wrapper .line-items .items .item .amount {
            font-size: 13px; } 
          }
          
          .receipt-content .invoice-wrapper .line-items .total {
            margin-top: 30px; 
          }
          
          .receipt-content .invoice-wrapper .line-items .total .extra-notes {
            float: left;
            width: 40%;
            text-align: left;
            font-size: 13px;
            color: #7A7A7A;
            line-height: 20px; 
          }
          
          @media (max-width: 767px) {
            .receipt-content .invoice-wrapper .line-items .total .extra-notes {
            width: 100%;
            margin-bottom: 30px;
            float: none; } 
          }
          
          .receipt-content .invoice-wrapper .line-items .total .extra-notes strong {
            display: block;
            margin-bottom: 5px;
            color: #454545; 
          }
          
          .receipt-content .invoice-wrapper .line-items .total .field {
            margin-bottom: 7px;
            font-size: 14px;
            color: #555; 
          }
          
          .receipt-content .invoice-wrapper .line-items .total .field.grand-total {
            margin-top: 10px;
            font-size: 16px;
            font-weight: 500; 
          }
          
          .receipt-content .invoice-wrapper .line-items .total .field.grand-total span {
            color: #20A720;
            font-size: 16px; 
          }
          
          .receipt-content .invoice-wrapper .line-items .total .field span {
            display: inline-block;
            margin-left: 20px;
            min-width: 85px;
            color: #84868A;
            font-size: 15px; 
          }
          
          .receipt-content .invoice-wrapper .line-items .print {
            margin-top: 50px;
            text-align: center; 
          }
          
          
          
          .receipt-content .invoice-wrapper .line-items .print a i {
            margin-right: 3px;
            font-size: 14px; 
          }
          
          .receipt-content .footer {
            margin-top: 40px;
            margin-bottom: 110px;
            text-align: center;
            font-size: 12px;
            color: #969CAD; 
          }                    `;
          newWin.document.write(`
        <html>
        <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet"  media="print"  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
         <style>${css}</style>
        </head>
        <body media="print" onload="window.print()">${printContents}</body>
      </html>`
        );
    newWin.document.close();
    setTimeout(function() {
      newWin.close();
    }, 1000);
    }  
  }