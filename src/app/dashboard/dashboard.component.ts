import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';
import * as c3 from 'c3';




interface country{
  Country: string,
  CountryCode: string,
  Slug: string,
  NewConfirmed: number,
  TotalConfirmed: number,
  NewDeaths: number,
  TotalDeaths: number,
  NewRecovered: number,
  TotalRecovered: number,
  Date: string
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
private http:HttpClient;
constructor( private httpClient:HttpClient){
    
}
public users:any;
public world:any;
public stateData:any;
public countries:any;
public typeCount:any;
public date = new Date();
public stats:any;
public data1:any;

ngOnInit(){

 
  var chart = c3.generate({
    data: {
        // iris data from R
        columns: [
            ['Recovered', 74.6],
            ['Deaths', 25.4],
        ],
        type : 'pie',
        onclick: function (d, i) { console.log("onclick", d, i); },
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
    }
});


 

    this.httpClient.get('https://api.covid19india.org/data.json')
  .subscribe(
    (data)=>{

    this.users=data;
    }
  )
  
  this.httpClient.get('https://api.covid19api.com/summary')
  .subscribe(
    (data)=>{
    this.world=data;
    console.log(data);
    }
  )

  this.httpClient.get('https://corona-virus-stats.herokuapp.com/api/v1/cases/general-stats')
  .subscribe(
    (data)=>{
    this.stats=data['data'];
  
    }
  )

  setTimeout(function(){ $('#showData').click(); }, 1500);
}

sortMe(x:any){
  console.log("fgrt",x);
if(this.typeCount==x)
 this.countries.sort((a:country, b:country) => a[x] > b[x] ? -1 : a[x] < b[x] ? 1 : 0);
 else
 this.countries.sort((a:country, b:country) => a[x] < b[x] ? -1 : a[x] > b[x] ? 1 : 0);
 this.typeCount=x;
}
funcHelp(){
  this.date = new Date();
  this.world="";
  this.httpClient.get('https://api.covid19api.com/summary')
  .subscribe(
    (data)=>{
    this.world=data;
    console.log(data);
    }
  )
}

fetchData(){ 
console.log("yes c");
 this.stateData=(this.users["statewise"]);
 this.countries=(this.world['Countries']);
 console.log(this.stateData);
 console.log("defwrr", this.countries);
}

generateChart(){
  console.log("lumdi", this.stats)
  console.log('total', this.stats.total_cases);
  var y:number = +this.stats.total_cases;
  
  var temp= Number(this.stats.total_cases);



  


this.data1 = {
  labels: ['A','B','C'],
  datasets: [
      {
          data: [300, 50, 100],
          backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56"
          ],
          hoverBackgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56"
          ]
      }]    
  };
}



}
 

