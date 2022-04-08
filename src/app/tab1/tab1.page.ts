import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Quotation } from '../models/Quotation';
import { Room } from '../models/Room';
import { ProjServiceService } from '../services/proj-service.service';
interface testRoom { desc: string; length: number; width: number; color: string; paint: string; }

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


  Room: Room [] = [{roomType: "", roomWidth: null, roomLength: null, roomColour: "", roomPaintType: ""}]
  Rooms: FormGroup[]
  Quote: Quotation = {Id: null, qDate: null, qName: "" ,qAddress: "", qEmail: "", qNumofRooms: null, qRoom: this.Room}

  constructor() { }

  

  chRoom() {
    console.log('chRoom')
    for (let i = 0; i < this.Quote.qNumofRooms; i++) {
      this.Rooms[i] = new FormGroup({
        roomType: new FormControl(''),
        roomWidth: new FormControl(0),
        roomLength: new FormControl(0),
        roomColour: new FormControl(''),
        roomPaintType: new FormControl('standard')
      });
      console.log(this.Rooms[i].value)
    }  
  }

  /*chRoomV2() {
    console.log('chRoomV2')
    for (let i = 0; i < this.Quote.qNumofRooms; i++) {
      this.Room[i] = new FormGroup({
        roomType: new FormControl(''),
        roomWidth: new FormControl(0),
        roomLength: new FormControl(0),
        roomColour: new FormControl(''),
        roomPaintType: new FormControl('standard')
      });
      console.log(this.Rooms[i].value)
    }  
  }*/

  //func to startup db

}
