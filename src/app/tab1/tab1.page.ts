import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Quotation } from '../models/Quotation';
import { Room } from '../models/Room';
import { ProjServiceService } from '../services/proj-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { datab } from '../models/Database';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  getDate = new Date()
  d = String(this.getDate.getDate()).padStart(2, '0');
  m = String(this.getDate.getMonth() + 1).padStart(2, '0');
  y = this.getDate.getFullYear();
  today = this.y + "-" + this.m + "-" + this.d

  Room: Room[] = [{ roomType: "", roomWidth: null, roomLength: null, roomColour: "", roomPaintType: "" }]
  Rooms: FormGroup[] = new Array
  Quote: Quotation = { Id: null, qDate: this.today, qName: "", qAddress: "", qEmail: "", qNumofRooms: null, qRoom: this.Room }
  db: datab = {databaseName: "", collectionName: ""}
  idGen: number = 0

  constructor(private serv: ProjServiceService, public alert: AlertController) { }

  addRoom() {
    for (let i = 0; i < this.Quote.qNumofRooms; i++) {
      this.Rooms[i] = new FormGroup({
        roomType: new FormControl(),
        roomWidth: new FormControl(),
        roomLength: new FormControl(),
        roomColour: new FormControl(),
        roomPaintType: new FormControl()
      });
    }
  }

  async save() {
    if(this.Quote.qAddress == "" || this.Quote.qEmail == "" || this.Quote.qName == "" || this.Quote.qNumofRooms == null || this.Quote.qRoom  == null){
      const alert = await this.alert.create({
        header: 'Error',
        subHeader: '',
        message: 'Plese enter in all fields',
        buttons: [{
          text: 'OK', handler: () => {
            console.log('Confirmed')
          }
        }]
      })
      await alert.present()
    }
    else{
    const alert = await this.alert.create({
      header: 'Confirm',
      subHeader: '',
      message: 'Are you sure you want to save this quote',
      buttons: [
        {
          text: 'Cancel', handler: () => {
            console.log('Cancelled')
          }
        },
        {
          text: 'Yes', handler: () => {
            for (let i = 0; i < this.Quote.qNumofRooms; i++) {
              this.Quote.qRoom[i] = this.Rooms[i].value
            }

            this.Quote.Id = this.idGen

            console.log(this.Quote.Id, this.Quote.qAddress, this.Quote.qDate, this.Quote.qEmail, this.Quote.qName, this.Quote.qNumofRooms, this.Quote.qRoom)
            const params = { Id: this.Quote.Id, qDate: this.Quote.qDate, qName: this.Quote.qName, qAddress: this.Quote.qAddress, qEmail: this.Quote.qEmail, qNumofRooms: this.Quote.qNumofRooms, qRoom: this.Quote.qRoom }
            this.serv.insert(params).subscribe(data => {
              console.log(data)
            },
              (err: HttpErrorResponse) => {
                console.log(err.message);
              }
            )
            this.idGen++
          }
        }
      ]
    })
    await alert.present()
  }
  }




  async deleteAll() {
    const alert = await this.alert.create({
      header: 'Confirm',
      subHeader: '',
      message: 'Are you sure you want to delete this ALL the quotes',
      buttons: [
        {
          text: 'Cancel', handler: () => {
            console.log('Cancelled')
          }
        },
        {
          text: 'Yes', handler: () => {
            this.serv.deleteAll().subscribe(data => {
              console.log(data)
            },
              (err: HttpErrorResponse) => {
                console.log(err.message);
              }
            )
          }
        }
      ]
    })
    await alert.present()
  }

  //func to startup db
  /*createDb(){
    console.log(this.db.databaseName + " " + this.db.collectionName)
    const params = { db: this.db.databaseName, col: this.db.collectionName}
    this.serv.setupDb(params).subscribe(data =>{
      console.log(data)
    },
    (err: HttpErrorResponse) => {
      console.log(err.message);
    })
  }*/

}
