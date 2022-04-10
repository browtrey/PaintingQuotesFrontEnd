import { Component } from '@angular/core';
import { Quotation } from '../models/Quotation';
import { Room } from '../models/Room';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  quote: Quotation[] = []

  constructor() {}

}
