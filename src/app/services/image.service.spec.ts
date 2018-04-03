import { ImageService } from './image.service';
import { async, TestBed } from '@angular/core/testing';


describe('Image Service', () => {
  let service: ImageService;
    let imagesMock = [
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
        }
    ]
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        providers: [ImageService],
      });
      service = TestBed.get(ImageService);
    })
  );

  it('should have a service', () => {
    expect(service).toBeDefined();
  });