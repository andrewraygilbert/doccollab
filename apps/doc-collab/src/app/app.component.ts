import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@doccollab/api-interfaces';

@Component({
  selector: 'doccollab-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/hello');
  constructor(private http: HttpClient) {}
}
