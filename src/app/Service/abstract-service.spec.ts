import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AbstractService } from './abstract-service';
import { describe, it, expect, beforeEach } from 'vitest';

class MockService extends AbstractService<any> {
    override type = 'mock';
}

describe('AbstractService', () => {
    let service: MockService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [MockService]
        });

        service = TestBed.inject(MockService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});