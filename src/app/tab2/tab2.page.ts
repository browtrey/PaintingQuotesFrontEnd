import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AlertController, IonRefresher } from '@ionic/angular';
import { ProjServiceService } from '../services/proj-service.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  quote: any = []

  constructor(private serv: ProjServiceService, public alert: AlertController) { }

  ngOnInit() {
    this.serv.listAll().subscribe(data => {
      this.quote = data
      console.log(this.quote)
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      })
  }

  refreshList() {
    this.serv.listAll().subscribe(data => {
      this.quote = data
      console.log(this.quote)
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      })
  }

  async deleteOne(x) {
    console.log(x)
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
            const params = { Id: x }
            this.serv.deleteOne(params).subscribe(data => {
              console.log("record deleted")
            },
              (err: HttpErrorResponse) => {
                console.log(err.message);
              })
              location.reload()
          }
        }
      ]
    })
    await alert.present()
  }

}
