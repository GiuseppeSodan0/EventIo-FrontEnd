import { Observable } from 'rxjs';
export interface Service<DTO> {

    read(id: number): Observable<DTO> ;

    delete(id: number): Observable<any>;

    update(dto: DTO): Observable<any> ;

    insert(dto: DTO): Observable<any>;

    getAll(): Observable<DTO[]>;

}
