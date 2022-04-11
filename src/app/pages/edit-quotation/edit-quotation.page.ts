import { Component, OnInit } from '@angular/core';
import { Quotation } from 'src/app/models/Quotation';
import { Room } from 'src/app/models/Room';
import { ActivatedRoute } from '@angular/router';
import { ProjServiceService } from 'src/app/services/proj-service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-quotation',
  templateUrl: './edit-quotation.page.html',
  styleUrls: ['./edit-quotation.page.scss'],
})
export class EditQuotationPage implements OnInit {

  getDate = new Date()
  d = String(this.getDate.getDate()).padStart(2, '0');
  m = String(this.getDate.getMonth() + 1).padStart(2, '0');
  y = this.getDate.getFullYear();
  today = this.y + "-" + this.m + "-" + this.d

  Room: Room [] = [{roomType: "", roomWidth: null, roomLength: null, roomColour: "", roomPaintType: ""}]
  Quote: Quotation = {Id: null, qDate: this.today, qName: "" ,qAddress: "", qEmail: "", qNumofRooms: null, qRoom: this.Room}
  qId: any;
  oldQuote:any = []

  constructor(private route: ActivatedRoute, private serv: ProjServiceService) { }

  ngOnInit() {
    this.qId = this.route.snapshot.params.parm
    console.log(this.qId)
    this.serv.listOne(this.qId).subscribe(data => {
      console.log(data)
      this.oldQuote = data
    },
    (err: HttpErrorResponse) => {
    console.log(err.message);
    })
  }


  update(){
    console.log("test")
  }

}
