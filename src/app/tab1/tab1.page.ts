import { Component } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { Quotation } from '../models/Quotation';
import { Room } from '../models/Room';
import { ProjServiceService } from '../services/proj-service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


  Room: Room [] = [{roomType: "", roomWidth: null, roomLength: null, roomColour: "", roomPaintType: ""}]
  Rooms: FormGroup[] = new Array
  Quote: Quotation = {Id: null, qDate: null, qName: "" ,qAddress: "", qEmail: "", qNumofRooms: null, qRoom: this.Room}

  constructor() { }

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
    for (let i = 0; i < this.Quote.qNumofRooms; i++){
      this.Quote.qRoom[i] = this.Rooms[i].value
    }
    console.log(this.Quote.Id, this.Quote.qAddress, this.Quote.qDate, this.Quote.qEmail, this.Quote.qName, this.Quote.qNumofRooms, this.Quote.qRoom)
  }

  //func to startup db

}
