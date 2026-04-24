import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginRequestDto } from "../Dto/LoginRequestDto";
import { LoginResponseDto } from "../Dto/LoginResponseDto";
import { Role } from "../Dto/enums/user-type";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private baseUrl = 'http://localhost:8080/auth';
    private currentUserKey = 'eventio_user';

    constructor(private http: HttpClient) {}

    login(request: LoginRequestDto): Observable<LoginResponseDto> {
        return this.http.post<LoginResponseDto>(`${this.baseUrl}/login`, request);
    }

    setToken(response: LoginResponseDto, password: string): void {
        console.log('setToken called, response:', response);
        if (response.   status && typeof localStorage !== 'undefined') {
            const userData = { ...response, password };
            console.log('userData to save:', userData);
            localStorage.setItem(this.currentUserKey, JSON.stringify(userData));
            console.log('Saved to localStorage');
        }
    }

    setCurrentUser(response: LoginResponseDto): void {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(this.currentUserKey, JSON.stringify(response));
        }
    }

    getUser(): (LoginResponseDto & { password?: string }) | null {
        if (typeof localStorage === 'undefined') return null;
        
        const userStr = localStorage.getItem(this.currentUserKey);
        if (userStr) {
            return JSON.parse(userStr);
        }
        return null;
    }

    logout(): void {
        if (typeof localStorage !== 'undefined') {
            localStorage.removeItem(this.currentUserKey);
        }
    }

    isLoggedIn(): boolean {
        return this.getUser() !== null;
    }

    isAdmin(): boolean {
        return this.getUser()?.role === Role.ADMIN;
    }

    isUser(): boolean {
        return this.getUser()?.role === Role.USER;
    }
}