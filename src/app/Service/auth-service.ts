import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginRequestDto } from "../Dto/LoginRequestDto";
import { LoginResponseDto } from "../Dto/LoginResponseDto";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private baseUrl = 'http://localhost:8080/auth';
    private static currentUser: LoginResponseDto & { password?: string } | null = null;

    constructor(private http: HttpClient) {}

    login(request: LoginRequestDto): Observable<LoginResponseDto> {
        return this.http.post<LoginResponseDto>(`${this.baseUrl}/login`, request);
    }

    setToken(response: LoginResponseDto, password: string): void {
        if (response.success) {
            AuthService.currentUser = { ...response, password };
        }
    }

    setCurrentUser(response: LoginResponseDto): void {
        AuthService.currentUser = response;
    }

    getUser(): (LoginResponseDto & { password?: string }) | null {
        return AuthService.currentUser;
    }

    logout(): void {
        AuthService.currentUser = null;
    }

    isLoggedIn(): boolean {
        return this.getUser() !== null;
    }
}