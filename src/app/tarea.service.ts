import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  constructor(
    private http: HttpClient
  ) { }

  get(){

  }

  create(tarea : any){
    
  }

  update(id:number, tarea : any){

  }
}
