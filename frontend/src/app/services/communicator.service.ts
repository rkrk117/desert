import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class Communicator {
    private readonly host = 'localhost:3001';

    constructor(private httpClient: HttpClient) {}

    loadDesk(n: number): Observable<any> {
        return this.httpClient.get(this.host + `/room/${n}/getStatus`);
    }

    startNewGame() {
        return this.httpClient.get(this.host + `/newGame`)
    }
}