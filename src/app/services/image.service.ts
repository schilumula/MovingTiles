import { Injectable } from '@angular/core';

@Injectable()
export class ImageService {
  private tileBgColor: object = {};
  private images: any[] = [
    {
      src: 'assets/img/caillou.png',
      rows: 1,
      cols: 1,
      state: 'default'
    },
    {
      src: 'assets/img/buzz_light_year.png',
      rows: 2,
      cols: 2,
      state: 'clicked'
    },
    {
      src: 'assets/img/daniel_tiger.png',
      rows: 1,
      cols: 1,
      state: 'default'
    },
    {
      src: 'assets/img/dora.png',
      rows: 1,
      cols: 1,
      state: 'default'
    },
    {
      src: 'assets/img/garfield.png',
      rows: 1,
      cols: 1,
      state: 'default'
    },

    {
      src: 'assets/img/george.png',
      rows: 1,
      cols: 1,
      state: 'default'
    },
    {
      src: 'assets/img/groot.png',
      rows: 1,
      cols: 1,
      state: 'default'
    },
    {
      src: '/assets/img/incredibles.png',
      rows: 1,
      cols: 1,
      state: 'default'
    },
    {
      src: 'assets/img/mario.png',
      rows: 1,
      cols: 1,
      state: 'default'
    },
    {
      src: 'assets/img/maui.png',
      rows: 1,
      cols: 1,
      state: 'default'
    },
    {
      src: 'assets/img/mickey.png',
      rows: 1,
      cols: 1,
      state: 'default'
    },
    {
      src: 'assets/img/nemo.png',
      rows: 1,
      cols: 1,
      state: 'default'
    },
    {
      src: 'assets/img/mcqueen.png',
      rows: 2,
      cols: 2,
      state: 'clicked'
    },
    {
      src: 'assets/img/olaf.png',
      rows: 1,
      cols: 1,
      state: 'default'
    },
    {
      src: 'assets/img/pooh.png',
      rows: 1,
      cols: 1,
      state: 'default'
    },
    {
      src: 'assets/img/simba.png',
      rows: 1,
      cols: 1,
      state: 'default'
    },
    {
      src: 'assets/img/spongebob.png',
      rows: 1,
      cols: 1,
      state: 'default'
    },
    {
      src: 'assets/img/super_why.png',
      rows: 1,
      cols: 1,
      state: 'default'
    }
  ];

  public getInitialImages() {
    return this.images;
  }

  public generateRandomColor() {
    let rannumber1 = Math.floor(Math.random() * 256);
    let rannumber2 = Math.floor(Math.random() * 256);
    let rannumber3 = Math.floor(Math.random() * 256);
    let ranrgb =
      'rgb(' + rannumber1 + ',' + rannumber2 + ',' + rannumber3 + ')';
    return ranrgb;
  }

  public generateColorForTile(tile: string) {
    if (this.tileBgColor[tile]) {
      return this.tileBgColor[tile];
    } else {
      this.tileBgColor[tile] = this.generateRandomColor();
      return this.tileBgColor[tile];
    }
  }
}