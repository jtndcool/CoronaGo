import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http:HttpClient) { }

  getDetails() {

    const promise = this.http.get('https://api.covid19india.org/data.json') .toPromise();
    promise.then((data)=>{
     return data;
    }).catch((error)=>{
      console.log("Promise rejected with " + JSON.stringify(error));
    });
   
     

  
  }

  
}
