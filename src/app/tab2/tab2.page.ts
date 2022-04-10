import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Quotation } from '../models/Quotation';
import { Room } from '../models/Room';
import { ProjServiceService } from '../services/proj-service.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  quote: any = []

  constructor(private serv: ProjServiceService) {}

  ngOnInit(){
    this.serv.listAll().subscribe(data =>{
      this.quote = data
    },
    (err: HttpErrorResponse) => {
    console.log(err.message);
    })
  }

  loadQ(){
    
  }

  deleteOne(x){
    console.log(x)
    const params = {Id: x}
    this.serv.deleteOne(params).subscribe(data => {
      console.log("record deleted")
    },
    (err: HttpErrorResponse) => {
    console.log(err.message);
    })

  }

}
