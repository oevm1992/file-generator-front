import { Injectable } from '@angular/core';
import {HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) {

  }

  private getEndpoint(suffix?: string){
    const url = "http://localhost:8080";
    if(!suffix){
      return url.concat("/");
    }
    return url.concat(suffix);
  }

  getXml(path: string, extension: string) : Observable<Blob> {
    let options: HttpParams = new HttpParams();
    options = options.set("extension", extension);
    return this.http.get(this.getEndpoint(path), {params: options, responseType: "blob"});
  }

  getJson(path: string, extension: string){
    let options: HttpParams = new HttpParams();
    options = options.set("extension", extension);
    return this.http.get(this.getEndpoint(path), {params: options});
  }

  postXml(path: string, extension: string, body: any){
    let options: HttpParams = new HttpParams();
    options = options.set("extension", extension);
    return this.http.post(this.getEndpoint(path), body, {params: options, responseType: "blob"});
  }

  postJson(path: string, extension: string, body: any){
    let options: HttpParams = new HttpParams();
    options = options.set("extension", extension);
    return this.http.post(this.getEndpoint(path), body, {params: options});
  }

  putJson(path: string, extension: string, body: any){
    let options: HttpParams = new HttpParams();
    options = options.set("extension", extension);
    return this.http.put(this.getEndpoint(path), body, {params: options});
  }

  putXml(path: string, extension: string, body: any){
    let options: HttpParams = new HttpParams();
    options = options.set("extension", extension);
    return this.http.put(this.getEndpoint(path), body, {params: options, responseType: "blob"});
  }

  delete(path: string){
    return this.http.delete(this.getEndpoint(path), {responseType: "text"});
  }

  patchJson(path: string, extension: string, body: any){
    let options: HttpParams = new HttpParams();
    options = options.set("extension", extension);
    return this.http.patch(this.getEndpoint(path), body, {params: options});
  }

  patchXml(path: string, extension: string, body: any){
    let options: HttpParams = new HttpParams();
    options = options.set("extension", extension);
    return this.http.patch(this.getEndpoint(path), body, {params: options, responseType: "blob"});
  }

}
