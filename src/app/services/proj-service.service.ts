import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjServiceService {

  constructor(private http: HttpClient) { }

  insert(params) {
    return this.http.post('http://127.0.0.1:8888/add/',{ params })
  }

  listAll() {
    return this.http.get('http://127.0.0.1:8888/listAll/')
  }

  listOne(params) {
    return this.http.get('http://127.0.0.1:8888/listOne/',{ params })
  }

  deleteAll() {
    return this.http.delete('http://127.0.0.1:8888/deleteAll/')
  }

  deleteOne(params) {
    return this.http.delete('http://127.0.0.1:8888/deleteOne/', { params })
  }

  Update(params){
    return this.http.put('http://127.0.0.1:8888/update/', { params })
  }
}
