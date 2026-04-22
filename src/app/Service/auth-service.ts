import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginRequestDto } from "../Dto/LoginRequestDto";
import { LoginResponseDto } from "../Dto/LoginResponseDto";
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private baseUrl = 'http://localhost:8080/auth';
    private currentUser: LoginResponseDto & { password?: string } | null = null;
    private pendingPassword: string | null = null;

    constructor(
        private http: HttpClient,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {}

    login(request: LoginRequestDto): Observable<LoginResponseDto> {
        this.pendingPassword = request.password;
        return this.http.post<LoginResponseDto>(`${this.baseUrl}/login`, request);
    }

    setToken(response: LoginResponseDto, password: string): void {
        if (response.success) {
            const userData = { ...response, password: password };
            this.currentUser = userData;
            if (isPlatformBrowser(this.platformId)) {
                sessionStorage.setItem('user', JSON.stringify(userData));
            }
        }
    }

    getUser(): (LoginResponseDto & { password?: string }) | null {
        if (this.currentUser) return this.currentUser;
        
        if (isPlatformBrowser(this.platformId)) {
            const user = sessionStorage.getItem('user');
            if (user) {
                this.currentUser = JSON.parse(user);
                return this.currentUser;
            }
        }
        return null;
    }

    logout(): void {
        this.currentUser = null;
        this.pendingPassword = null;
        if (isPlatformBrowser(this.platformId)) {
            sessionStorage.removeItem('user');
        }
    }

    isLoggedIn(): boolean {
        return this.getUser() !== null;
    }
}