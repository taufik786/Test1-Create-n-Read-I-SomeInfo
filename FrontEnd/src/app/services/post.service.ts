import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  BASEURL = 'http://localhost:5000/post';

  constructor(private http: HttpClient) {}

  State(body): Observable<any>{
    return this.http.post(`${this.BASEURL}/state`, body)
  }
  District(body): Observable<any>{
    return this.http.post(`${this.BASEURL}/district`, body)
  }
  Child(body): Observable<any>{
    return this.http.post(`${this.BASEURL}/child`, body)
  }
  GetAllState(): Observable<any>{
    return this.http.get(`${this.BASEURL}/state`)
  }
  GetAllDistrict(): Observable<any>{
    return this.http.get(`${this.BASEURL}/district`)
  }
  GetAllChild(): Observable<any>{
    return this.http.get(`${this.BASEURL}/child`)
  }
  DeleteChild(postId: string): Observable<any>{
    return this.http.delete(`${this.BASEURL}/child/` + postId)
  }
}
