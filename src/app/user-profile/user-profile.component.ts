import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface state{
  active: number,
  confirmed: number,
  deaths: number
  deltaconfirmed: number,
  deltadeaths: number,
  deltarecovered: number,
  lastupdatedtime: string,
  migratedother: number,
  recovered: number,
  state: string
  statecode: string,
  statenotes: string


}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor( private httpClient:HttpClient){
      
  }
  public users:any;
  public world:any;
  public stateData:any;
  public countries:any;
  public typeCount:any;
  public districtData:any;
  public dist:any;
  public selectedState:any;
  public date = new Date();
  ngOnInit(){
    
  
      this.httpClient.get('https://api.covid19india.org/data.json')
    .subscribe(
      (data)=>{
  
      this.users=data;
      }
    )
    
    this.httpClient.get('https://api.covid19india.org/state_district_wise.json')
    .subscribe(
      (data)=>{
  
      this.districtData=data;
      }
    )
    
  
    setTimeout(function(){ $('#showData').click(); }, 1500);
  }
  
  sortMe(x:any){
    console.log("fgrt",x);
  if(this.typeCount==x)
   this.stateData.sort((a:state, b:state) => a[x] > b[x] ? -1 : a[x] < b[x] ? 1 : 0);
   else
   this.stateData.sort((a:state, b:state) => a[x] < b[x] ? -1 : a[x] > b[x] ? 1 : 0);
   this.typeCount=x;
  }
  changeView(x:any){
    if(x=='card'){
      $('#cards').show();
      $('#tables').hide();
    }
    else{
      $('#cards').hide();
      $('#tables').show();
    }
  }
  
  fetchData(){ 
  console.log("yes c");
   this.stateData=(this.users["statewise"]);
   this.countries=(this.world['Countries']);
   console.log(this.stateData);
   console.log("defwrr", this.countries);
  }
  
  viewDistricts(x:any){
    console.log("rec",x);
    this.selectedState=x;
    this.dist=this.districtData[x].districtData;
    console.log("state data", x,this.dist);
   document.getElementById('pressMe').click();
  }
  
}
