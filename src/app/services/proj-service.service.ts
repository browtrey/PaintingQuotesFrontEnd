import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjServiceService {

  constructor(private http: HttpClient) { }

  insert(params) {
    return this.http.post('http://127.0.0.1:8887/add/',{ params })
  }

  listAll(params) {
    return this.http.get('http://127.0.0.1:8887/listAll/',{ params })
  }

  deleteAll() {
    return this.http.delete('http://127.0.0.1:8887/deleteAll/')
  }

  deleteOne(params) {
    return this.http.delete('http://127.0.0.1:8887/deleteAll/', { params })
  }

  Update(params){
    return this.http.put('http://127.0.0.1:8887//update/', { params })
  }
}
