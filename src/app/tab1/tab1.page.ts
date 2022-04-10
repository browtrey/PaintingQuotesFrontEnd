import { Component } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { Quotation } from '../models/Quotation';
import { Room } from '../models/Room';
import { ProjServiceService } from '../services/proj-service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


  Room: Room [] = [{roomType: "", roomWidth: null, roomLength: null, roomColour: "", roomPaintType: ""}]
  Rooms: FormGroup[] = new Array
  Quote: Quotation = {Id: null, qDate: null, qName: "" ,qAddress: "", qEmail: "", qNumofRooms: null, qRoom: this.Room}
  idGen: number = 0

  constructor(private serv: ProjServiceService) { }

  chRoom() {
    console.log('chRoom')
    for (let i = 0; i < this.Quote.qNumofRooms; i++) {
      this.Rooms[i] = new FormGroup({
        roomType: new FormControl(),
        roomWidth: new FormControl(),
        roomLength: new FormControl(),
        roomColour: new FormControl(),
        roomPaintType: new FormControl()
      });
      console.log(this.Rooms[i].value)
    }  
  }

  save(){
    this.idGen++

    for (let i = 0; i < this.Quote.qNumofRooms; i++){
      this.Quote.qRoom[i] = this.Rooms[i].value
    }
    
    this.Quote.Id = this.idGen

    console.log(this.Quote.Id, this.Quote.qAddress, this.Quote.qDate, this.Quote.qEmail, this.Quote.qName, this.Quote.qNumofRooms, this.Quote.qRoom)
    const params = {Id: this.Quote.Id, qDate: this.Quote.qDate, qName: this.Quote.qName, qAddress: this.Quote.qAddress, qEmail: this.Quote.qEmail, qNumofRooms: this.Quote.qNumofRooms, qRoom: this.Quote.qRoom}
    this.serv.insert(params).subscribe(data =>{
      console.log(data)
    },
    (err: HttpErrorResponse) => {
      console.log(err.message);
      }
    )
  }

  deleteAll(){
    this.serv.deleteAll().subscribe(data => {
      console.log(data)
    },
    (err: HttpErrorResponse) => {
      console.log(err.message);
      }
    )
  }

  //func to startup db

}
