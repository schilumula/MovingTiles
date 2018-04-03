import { ImageService } from './services/image.service';
import { Component, ViewEncapsulation, HostListener, OnInit, AfterViewInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { transition, query, style, trigger, animate, keyframes, stagger } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('animateTile', [
      transition('* => clickedRight', [
        query('mat-grid-tile', [
          style({ zIndex: 2 }),
          animate(
            '0.5s ease-in-out',
            keyframes([
              style({
                transform: 'scale(0.5) translate(50%, -50%)',
                offset: 0
              }),
              style({
                transform: 'scale(0.75) translate(50%, -30%)',
                offset: 0.25
              }),
              style({
                transform: 'scale(1) translate(50%, -10%)',
                offset: 0.75
              }),
              style({ transform: 'scale(1) translate(0, 0)', offset: 1 })
            ])
          )
        ])
      ]),
      transition('* => clickedLeft', [
        query('mat-grid-tile', [
          style({ zIndex: 2 }),
          animate(
            '0.5s ease-in-out',
            keyframes([
              style({
                transform: 'scale(0.5) translate(-50%, 0)',
                offset: 0
              }),
              style({
                transform: 'scale(0.75) translate(-30%, 0)',
                offset: 0.25
              }),
              style({
                transform: 'scale(1) translate(-10%, 0)',
                offset: 0.75
              }),
              style({ transform: 'scale(1) translate(0, 0)', offset: 1 })
            ])
          )
        ])
      ]),
      transition('clickedRight => moveRight', [
        query('mat-grid-tile', [
          style({ zIndex: 2 }),
          animate(
            '0.5s linear',
            keyframes([
              style({ transform: 'scale(2) translate(25%, 0px)', offset: 0 }),
              style({
                transform: 'scale(1.75) translate(20%, 0px)',
                offset: 0.25
              }),
              style({
                transform: 'scale(1.25) translate(16%, 0px)',
                offset: 0.75
              }),
              style({ transform: 'scale(1) translate(0, 0)', offset: 1 })
            ])
          )
        ])
      ]),
      transition('clickedRight => moveLeft', [
        query('mat-grid-tile', [
          style({ zIndex: -1 }),
          animate(
            '0.5s linear',
            keyframes([
              style({
                transform: 'scale(2) translate(-112px, 0px)',
                offset: 0
              }),
              style({
                transform: 'scale(1.5) translate(-30px, 0px)',
                offset: 0.25
              }),
              style({ transform: 'scale(1) translate(0, 0)', offset: 1 })
            ])
          )
        ])
      ]),
      transition('clickedLeft => moveRight', [
        query('mat-grid-tile', [
          style({ zIndex: 2 }),
          animate(
            '0.5s linear',
            keyframes([
              style({ transform: 'scale(2) translate(25%, 0px)', offset: 0 }),
              style({
                transform: 'scale(1.75) translate(20%, 0px)',
                offset: 0.25
              }),
              style({
                transform: 'scale(1.25) translate(16%, 0px)',
                offset: 0.75
              }),
              style({ transform: 'scale(1) translate(0, 0)', offset: 1 })
            ])
          )
        ])
      ]),
      transition('clickedLeft => moveLeft', [
        query('mat-grid-tile', [
          style({ zIndex: -1 }),
          animate(
            '0.5s linear',
            keyframes([
              style({
                transform: 'scale(2) translate(-112px, 0px)',
                offset: 0
              }),
              style({
                transform: 'scale(1.5) translate(-30px, 0px)',
                offset: 0.25
              }),
              style({ transform: 'scale(1) translate(0, 0)', offset: 1 })
            ])
          )
        ])
      ]),
      transition('default => moveLeft', [
        query('mat-grid-tile', [
          style({ zIndex: 0 }),
          animate(
            '0.5s linear',
            keyframes([
              style({ transform: 'translate(-70px, 0px)', offset: 0 }),
              style({ transform: 'translate(-30px, 0px)', offset: 0.25 }),
              style({ transform: 'translate(0, 0)', offset: 1 })
            ])
          )
        ])
      ]),
      transition('default => moveRight', [
        query('mat-grid-tile', [
          style({ zIndex: 0 }),
          animate(
            '0.5s linear',
            keyframes([
              style({ transform: 'translate(70px, 0px)', offset: 0 }),
              style({ transform: 'translate(30px, 0px)', offset: 0.25 }),
              style({ transform: 'translate(0, 0)', offset: 1 })
            ])
          )
        ])
      ])
    ])
  ]
})
export class AppComponent {
  title = 'Capco Moving Tiles';
  images: any[];
  noOfCols = 6;
  private noOfRows: number;
  private prevSelectedIndex1: number;
  private prevSelectedIndex2: number;

  constructor(private imgService: ImageService) {
    this.images = this.imgService.getInitialImages();
    this.noOfRows = (this.images.length + 6) / this.noOfCols;
  }

  public getBgColor(index: number) {
    return this.imgService.generateColorForTile(this.images[index].src);
  }


  // THis logic no way works accurately. Will need to refine this 
  public onTileClick(index: number) {
    this.resetState();
    this.images[index].rows = 2;
    this.images[index].cols = 2;
    this.images[index].background = this.imgService.generateRandomColor();
    if ((index >= 0 && index <= 4) || (index >= 9 && index <= 13)) {
      let maxIndex = index <= 4 ? 8 : 17;
      let minIndex = index <= 4 ? 0 : 9;
      for (let i = minIndex; i <= maxIndex; i++) {
        if (i !== index && this.images[i].rows === 2) {
          this.images[i].rows = 1;
          this.images[i].cols = 1;
          if (i < index) {
            this.images[i].state = 'moveRight';
          } else {
            this.images[i].state = 'moveLeft';
          }
        }
      }
      if (
        (index <= 4 && index < this.prevSelectedIndex1) ||
        (index >= 9 && index <= 13 && index < this.prevSelectedIndex2)
      ) {
        this.images[index].state = 'clickedLeft';
        this.images[index + 5].state = 'moveLeft';
        this.images[index + 1].state = 'moveLeft';
        
      } else {
        this.images[index].state = 'clickedRight';
        this.images[index + 4].state = 'moveRight';
        this.images[index - 1].state = 'moveRight';
      }
    } else if ((index >= 5 && index <= 8) || (index >= 14 && index <= 17)) {
      let maxIndex = index <= 8 ? 8 : 17;
      let minIndex = index <= 8 ? 0 : 9;
      for (let i = minIndex; i <= maxIndex; i++) {
        if (i !== index && this.images[i].rows === 2) {
          this.images[i].rows = 1;
          this.images[i].cols = 1;
          if (i < index) {
            this.images[i].state = 'moveRight';
          } else {
            this.images[i].state = 'moveLeft';
          }
        }
      }
      if ((index >= 5 && index <= 8 && index < this.prevSelectedIndex1 + 4) || (index >= 14 && index <= 17 && index < this.prevSelectedIndex2 + 4)) {
        this.images[index].state = 'clickedLeft';
        this.images[index - 5].state = 'moveLeft';
        this.images[index - 1].state = 'moveLeft';
      } else {
        this.images[index].state = 'clickedRight';
        this.images[index - 4].state = 'moveRight';
        this.images[index + 1].state = 'moveRight';
      }
       let temp = this.images[index - 4];
       let temp2 = this.images[index - 5];
       this.images[index - 4] = this.images[index];
       this.images[index - 5] = temp;
       this.images[index] = temp2;
    }
  }

  private resetState() {
    this.images.forEach((element, index) => {
      if (element.rows === 1) {
        element.state = 'default';
      } else {
        if (index <= 9) {
          this.prevSelectedIndex1 = index;
        } else {
          this.prevSelectedIndex2 = index;
        }
      }
    });
  }
}
