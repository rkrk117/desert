import { Component } from '@angular/core';
import { Communicator } from '../services/communicator.service';

@Component({
    selector: 'app-start-screen',
    templateUrl: './start_screen.component.html',
    styleUrls: ['./start_screen.component.css']
})
export class StartScreen {
    constructor(private communicator: Communicator) {

    }

    startNewGame() {
        this.communicator.startNewGame().subscribe(
            res => {
                console.log(res);
            }
        )
    }
}
