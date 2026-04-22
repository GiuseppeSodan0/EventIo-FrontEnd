import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { LoginRequestDto } from "../Dto/LoginRequestDto";
import { LoginResponseDto } from "../Dto/LoginResponseDto";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private baseUrl = 'http://localhost:8080/auth';
    private password: string | null = null;

    constructor(private http: HttpClient) {}

    login(request: LoginRequestDto): Observable<LoginResponseDto> {
        this.password = request.password;
        return this.http.post<LoginResponseDto>(`${this.baseUrl}/login`, request);
    }

    setToken(response: LoginResponseDto): void {
        if (response.success && typeof localStorage !== 'undefined') {
            const data = { ...response, password: this.password };
            localStorage.setItem('user', JSON.stringify(data));
        }
    }

    getUser(): (LoginResponseDto & { password?: string }) | null {
        if (typeof localStorage === 'undefined') return null;
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    logout(): void {
        this.password = null;
        if (typeof localStorage !== 'undefined') {
            localStorage.removeItem('user');
        }
    }

    isLoggedIn(): boolean {
        return this.getUser() !== null;
    }
}