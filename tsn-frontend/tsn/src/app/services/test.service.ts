import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


export interface Test {
  testval: string;
}

@Injectable({
  providedIn: "root"
})
export class TestService {

  private apiURL = "http://localhost:3000/api/tests";

  constructor(private http : HttpClient) {}

  getTest(): Observable<Test[]> {
    return this.http.get<Test[]>(this.apiURL); // test
  }
}
