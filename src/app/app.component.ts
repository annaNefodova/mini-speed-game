import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Cell } from './cell.model';

const COLUMNS: number = 10;
const ROWS: number = 10;
const MAX_SCRORE: number = 10;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	timeForm!: FormGroup;

	cells: Cell[] = Array.from(Array(COLUMNS * ROWS), () => ({ status: 'pending', played: false }));
	gameInProgress: boolean = false;
	gameOver: boolean = false;
	playerScore: number = 0;
	computerScore: number = 0;
	gameTimeout: any;

	message: string = '';

	constructor(private formBuilder: FormBuilder) { }

	ngOnInit(): void {
		this.timeForm = this.formBuilder.group({
			timeLimit: [15000, [Validators.required, Validators.min(1), Validators.max(60000)]]
		});
	}

	startGame(): void {
		if (!this.timeForm.valid) {
			return;
		}

		this.gameInProgress = true;

		this.choosetRandomCell();
		this.timeForm.disable();
	}

	resetGame(): void {
		this.gameOver = false;
		this.gameInProgress = false;
		this.playerScore = 0;
		this.computerScore = 0;
		this.message = '';
		this.cells = this.cells.map(cell => {cell.status = 'pending'; cell.played = false; return cell;});
		this.timeForm.enable();
	}

	choosetRandomCell(): void {
		if (this.gameOver) {
			return;
		}

		clearTimeout(this.gameTimeout);

		let activeCell: Cell = this.findCell();

		activeCell.status = 'active';
		activeCell.played = true;

		this.gameTimeout = setTimeout(() => {
			activeCell.status = 'failed';
			this.computerScore++;
			this.checkGameOver();
			this.choosetRandomCell();
		}, this.timeForm.controls['timeLimit'].value);
	}

	findCell(): Cell {
		const randomIndex = Math.floor(Math.random() * this.cells.length);
		if (this.cells[randomIndex].played) {
			return this.findCell();
		} 
		return this.cells[randomIndex]
	}

	checkGameOver(): void {
		if (this.playerScore === MAX_SCRORE || this.computerScore === MAX_SCRORE) {
			clearTimeout(this.gameTimeout);
			this.gameOver = true;
			this.gameInProgress = false;
			
			this.message = this.playerScore === 10 ? 'You win!' : 'Computer wins!';
		}
	}

	cellClicked(cell: Cell): void {
		if(cell.status !== 'active') {
			return;
		}
		cell.status = 'success';
		this.playerScore++;
		this.checkGameOver();
		this.choosetRandomCell();
	}

	closeModal() {
		this.message = '';
	}
}
