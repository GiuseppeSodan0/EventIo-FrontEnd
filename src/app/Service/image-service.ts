<<<<<<< HEAD
/*import { Injectable, inject } from '@angular/core';
=======
import { Injectable, inject } from '@angular/core';
>>>>>>> c0604bfcdfd6374b82a7bb3ba76a38c45973ff70
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, of } from 'rxjs';
import { EventDto } from '../Dto/EventDto';
import { ImageUploadResponseDto } from '../Dto/ImageUploadResponseDto';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private readonly http = inject(HttpClient);
  private readonly cloudinaryApiUrl = 'http://localhost:8080/api/cloudinary';
  private readonly eventApiUrl = 'http://localhost:8080/Event';

  uploadImage(file: File): Observable<ImageUploadResponseDto> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<ImageUploadResponseDto>(
      `${this.cloudinaryApiUrl}/upload`,
      formData
    );
  }

  getImageUrlByEventId(eventId: number): Observable<string | null> {
    return this.http
      .get<EventDto>(`${this.eventApiUrl}/read?id=${eventId}`)
      .pipe(map((event) => this.normalizeImageUrl(event?.imagePath)));
  }

  private normalizeImageUrl(imagePath: string | null | undefined): string | null {
    const normalized = imagePath?.trim();
    return normalized ? normalized : null;
  }
<<<<<<< HEAD
}*/
=======
}
>>>>>>> c0604bfcdfd6374b82a7bb3ba76a38c45973ff70
