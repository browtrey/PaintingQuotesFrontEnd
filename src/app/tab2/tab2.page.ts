import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AlertController, IonRefresher } from '@ionic/angular';
import { ProjServiceService } from '../services/proj-service.service';
import { Subscription, interval } from 'rxjs';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  quote: any = []
  sub: Subscription
  numOfObj: number

  constructor(private serv: ProjServiceService, public alert: AlertController) { }

  ngOnInit() {
    this.refreshList()
    this.updateList()
  }

  //loads and display data from the database 
  refreshList() {
    this.serv.listAll().subscribe(data => {
      this.quote = data
      console.log(this.quote)
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      })
  }

  //automatically refresh the data every 30 seconds
  updateList() {
    this.sub = interval(30000).subscribe(
      (val) => { this.refreshList() }
    )
  }

  //deletes all data from the database
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
              })
            location.reload()
          }
        }
      ]
    })
    await alert.present()
  }

  //deletes a single object from the database(based on the selected object)
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
