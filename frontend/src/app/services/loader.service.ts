import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class Loader {
    constructor(private httpClient: HttpClient) {}

    loadDesk(n: number): Observable<any> {
        return this.httpClient.get(`localhost:3001/room/${n}/getStatus`);
    }
}