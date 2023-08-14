import { Gif, SearchResponse } from './../interfaces/gifs.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagsHistory: string[] = []
  private apiKey: string = 'Uuyg3QcvLRUaG1x9l1uMk4HvK44mmWft'
  private url:string = 'https://api.giphy.com/v1/gifs/search'
  public gifsList : Gif[] = []
  constructor(private http : HttpClient) { this.getLocalStorage()}
  
  get tagsHistory():string[]{
    return [...this._tagsHistory]
  }
  
  private organizeHistory(tag:string){
    tag = tag.toLocaleLowerCase();
    if(this._tagsHistory.includes(tag))
      this._tagsHistory = this._tagsHistory.filter(t => t != tag)
    this._tagsHistory.unshift(tag)
    this._tagsHistory = this._tagsHistory.splice(0,10)
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history',JSON.stringify(this._tagsHistory))
  }

  private getLocalStorage():void{
    if(!localStorage.getItem('history'))
      return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!)
    this.searchTag(this._tagsHistory[0])
  }

  searchTag(tag:string):void{
    if(tag.length === 0) 
      return;
    this.organizeHistory(tag)

    const params = new HttpParams()
      .set('api_key',this.apiKey)
      .set('q',tag)
      .set('limit',10)

    this.http.get<SearchResponse>(this.url,{params})
    .subscribe(response =>{
      this.gifsList = response.data;
    }) ;
    
  }
}
