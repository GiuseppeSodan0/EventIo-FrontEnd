import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ImageService } from './image-service';

describe('ImageService', () => {
  let service: ImageService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ImageService]
    });

    service = TestBed.inject(ImageService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should return normalized image url', () => {
    service.getImageUrlByEventId(1).subscribe(url => {
      expect(url).toBe('http://img.com/test.jpg');
    });

    const req = httpMock.expectOne(req =>
      req.url.includes('/Event/read')
    );

    req.flush({
      imagePath: ' http://img.com/test.jpg '
    });
  });

  it('should return null if image is empty', () => {
    service.getImageUrlByEventId(1).subscribe(url => {
      expect(url).toBeNull();
    });

    const req = httpMock.expectOne(req =>
      req.url.includes('/Event/read')
    );

    req.flush({
      imagePath: null
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
