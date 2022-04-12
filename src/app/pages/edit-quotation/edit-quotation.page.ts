import { Component, OnInit } from '@angular/core';
import { Quotation } from 'src/app/models/Quotation';
import { Room } from 'src/app/models/Room';
import { ActivatedRoute } from '@angular/router';
import { ProjServiceService } from 'src/app/services/proj-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit-quotation',
  templateUrl: './edit-quotation.page.html',
  styleUrls: ['./edit-quotation.page.scss'],
})
export class EditQuotationPage implements OnInit {

  oldQuote: any = []
  Room: Room[] = [{ roomType: "", roomWidth: null, roomLength: null, roomColour: "", roomPaintType: "" }]
  Quote: Quotation = { Id: null, qDate: null, qName: "", qAddress: "", qEmail: "", qNumofRooms: null, qRoom: this.Room }
  qId: any;

  constructor(private route: ActivatedRoute, private serv: ProjServiceService, public alert: AlertController) { }

  ngOnInit() {
    this.qId = this.route.snapshot.params.parm
    console.log(this.qId)
    this.serv.listOne(this.qId).subscribe(data => {
      console.log(data)
      this.oldQuote = data

      this.Quote.Id = this.oldQuote[0].Id
      this.Quote.qDate = this.oldQuote[0].qDate
      this.Quote.qName = this.oldQuote[0].qName
      this.Quote.qAddress = this.oldQuote[0].qAddress
      this.Quote.qEmail = this.oldQuote[0].qEmail
      this.Quote.qNumofRooms = this.oldQuote[0].qNumofRooms
      this.Quote.qRoom = this.oldQuote[0].qRoom
      console.log("testing..: " + this.Quote.Id)
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      })


  }



  async update() {
    const alert = await this.alert.create({
      header: 'Confirm',
      subHeader: '',
      message: 'Are you sure you want to delete this appointment',
      buttons: [
        {
          text: 'Cancel', handler: () => {
            console.log('Cancelled')
          }
        },
        {
          text: 'Yes', handler: () => {
            console.log(this.Quote.Id, this.Quote.qAddress, this.Quote.qDate, this.Quote.qEmail, this.Quote.qName, this.Quote.qNumofRooms, this.Quote.qRoom)
            const params = { Id: this.Quote.Id, qDate: this.Quote.qDate, qName: this.Quote.qName, qAddress: this.Quote.qAddress, qEmail: this.Quote.qEmail, qNumofRooms: this.Quote.qNumofRooms, qRoom: this.Quote.qRoom }
            this.serv.Update(params).subscribe(data => {
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

}
