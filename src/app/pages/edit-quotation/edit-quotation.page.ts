import { Component, OnInit } from '@angular/core';
import { Quotation } from 'src/app/models/Quotation';
import { Room } from 'src/app/models/Room';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private serv: ProjServiceService, public alert: AlertController, private router: Router) { }

  //loads in the selected data
  ngOnInit() {
    this.qId = this.route.snapshot.params.parm
    console.log(this.qId)
    const params = { _id: this.qId }
    this.serv.listOne(params).subscribe(data => {
      console.log(data)
      this.oldQuote = data

      this.Quote.Id = this.oldQuote[0]._id
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


  //sends the updated data to the database
  async update() {
    const alert = await this.alert.create({
      header: 'Confirm',
      subHeader: '',
      message: 'Are you sure you want to update this quote',
      buttons: [
        {
          text: 'Cancel', handler: () => {
            console.log('Cancelled')
          }
        },
        {
          text: 'Yes', handler: () => {
            console.log(this.Quote.qAddress, this.Quote.qDate, this.Quote.qEmail, this.Quote.qName, this.Quote.qNumofRooms, this.Quote.qRoom)
            const params = [{ id: this.oldQuote[0]._id }, { qDate: this.Quote.qDate, qName: this.Quote.qName, qAddress: this.Quote.qAddress, qEmail: this.Quote.qEmail, qNumofRooms: this.Quote.qNumofRooms, qRoom: this.Quote.qRoom }]
            this.serv.Update(params).subscribe(data => {
              console.log(data)
              this.router.navigate(['/tabs/tab2'])
            },
              (err: HttpErrorResponse) => {
                console.log(err.message)
              }
            )
          }
        }
      ]
    })
    await alert.present()

  }

}
