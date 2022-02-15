import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {AppService} from './app-service.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'generator-front';
    editForm = this.formBuilder.group({
      resources: ["posts", []],
      action: ["get", []],
      fileFormat: ["json", []],
      requestModelPost: this.createPostModel(),
      requestCommentModel: this.createCommentModel()

    })

  data: any;

  constructor(private formBuilder: FormBuilder, private appService: AppService){

  }
  ngOnInit(): void {
    this.editForm.get("action")?.valueChanges.subscribe(() => {
      this.clear();
    })
  }

  save(): void{
    const extension = this.editForm.get("fileFormat")?.value;
    const path = "/".concat(this.editForm.get("resources")?.value);
    const action = this.editForm.get("action")?.value;

    console.log(this.editForm.value)

    switch(action) {
      case "get":
        this.handleGet(extension, path.concat("/"+this.getResourceId()));
        break;
      case "create":
        this.handlePost(extension, path, this.getBody())
        break;
      case "update":
        this.handleUpdate(extension, path.concat("/"+this.getResourceId()), this.getBody())
        break;
      case "patch":
        this.handlePatch(extension, path.concat("/"+this.getResourceId()), this.getBody())
        break;
      case "delete":
        this.handleDelete(extension, path.concat("/"+this.getResourceId()));
        break;
    
    }
  }

  getResourceId(){
    if(this.resource === "posts"){
      return this.requesPostModelId;
    } 
    return this.requesCommentModelId;
  }

  getBody(){
    if(this.resource === "posts"){
      return this.requestPostModel;
    } 
    return this.requestCommentModel;
  }

  handleGet(extension: string, path: string){
    this.getMethod(path, extension).subscribe((data: any) => {

      let blob: Blob;

      if(extension === "json"){
        blob = new Blob([JSON.stringify(data)], {'type':'application/octec-stream'});
        this.data = data;
      } else {
        blob = data;
        blob.text().then(text => this.data = text)
      }

      var a = document.createElement('a');
      if(blob instanceof Blob){
        a.href = window.URL.createObjectURL(blob);
      }
      a.download = "output.".concat(extension);
      a.click();
    });
  }

  getMethod(path: string, extension: string){
    if(extension === "json"){
      return this.appService.getJson(path, extension);
    } else {
      return this.appService.getXml(path, extension);
    }
  }

  handlePost(extension: string, path: string, body: any){
    this.postMethod(path, extension, body).subscribe((data: any) => {

      let blob: Blob;

      if(extension === "json"){
        blob = new Blob([JSON.stringify(data)], {'type':'application/octec-stream'});
        this.data = data;
      } else {
        blob = data;
        blob.text().then(text => this.data = text)
      }

      var a = document.createElement('a');
      if(blob instanceof Blob){
        a.href = window.URL.createObjectURL(blob);
      }
      a.download = "output.".concat(extension);
      a.click();
    });
  }

  postMethod(path: string, extension: string, body: any){
    if(extension === "json"){
      return this.appService.postJson(path, extension, body);
    } else {
      return this.appService.postXml(path, extension, body);
    }
  }

  handleUpdate(extension: string, path: string, body: any){
    this.updateMethod(path, extension, body).subscribe((data: any) => {

      let blob: Blob;

      if(extension === "json"){
        blob = new Blob([JSON.stringify(data)], {'type':'application/octec-stream'});
        this.data = data;
      } else {
        blob = data;
        blob.text().then(text => this.data = text)
      }

      var a = document.createElement('a');
      if(blob instanceof Blob){
        a.href = window.URL.createObjectURL(blob);
      }
      a.download = "output.".concat(extension);
      a.click();
    });
  }

  updateMethod(path: string, extension: string, body: any){
    if(extension === "json"){
      return this.appService.putJson(path, extension, body);
    } else {
      return this.appService.putXml(path, extension, body);
    }
  }

  handlePatch(extension: string, path: string, body: any){
    this.patchMethod(path, extension, body).subscribe((data: any) => {

      let blob: Blob;

      if(extension === "json"){
        blob = new Blob([JSON.stringify(data)], {'type':'application/octec-stream'});
        this.data = data;
      } else {
        blob = data;
        blob.text().then(text => this.data = text)
      }

      var a = document.createElement('a');
      if(blob instanceof Blob){
        a.href = window.URL.createObjectURL(blob);
      }
      a.download = "output.".concat(extension);
      a.click();
    });
  }

  patchMethod(path: string, extension: string, body: any){
    if(extension === "json"){
      return this.appService.patchJson(path, extension, body);
    } else {
      return this.appService.patchXml(path, extension, body);
    }
  }

  handleDelete(extension: string, path: string){
    this.appService.delete(path).subscribe((data) => {

      var a = document.createElement('a');
      var blob = new Blob([JSON.stringify(data)], {'type':'application/octec-stream'});
      a.href = window.URL.createObjectURL(blob);
      a.download = "output.".concat(extension);
      a.click();

      this.data = data;
    });
  }

  createPostModel(){
    return this.formBuilder.group({id: [null], title: [null], body: [null], userId: [null]})
  }

  createCommentModel(){
    return this.formBuilder.group({id: [null], name: [null], email: [null], body: [null]})
  }

  clear(){
    this.editForm.get("requestModelPost")?.reset();
    this.editForm.get("requestCommentModel")?.reset();
  }

  get extension(){
    return this.editForm.get("fileFormat")?.value;
  }

  get resource(){
    return this.editForm.get("resources")?.value;
  }

  get action(){
    return this.editForm.get("action")?.value;
  }

  get requestPostModel(){
    return this.editForm.get("requestModelPost")?.value;
  }

  get requesPostModelId(){
    return this.editForm.get("requestModelPost")?.get("id")?.value
  }

  get requesCommentModelId(){
    return this.editForm.get("requestCommentModel")?.get("id")?.value
  }

  get requestCommentModel(){
    return this.editForm.get("requestCommentModel")?.value;
  }

}
