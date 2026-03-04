import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreditService {

  private api = 'http://localhost:3000/api/credits';

  constructor(private http: HttpClient) {}

  create(data: any) {
    return this.http.post(this.api, data);
  }

  get(params: any) {
    return this.http.get(this.api, { params });
  }
}
