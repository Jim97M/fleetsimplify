import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from 'src/auth/services/auth.services';
import { UserService } from 'src/auth/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { Observable, of } from 'rxjs';
import { HttpException, HttpStatus } from '@nestjs/common';

const mockUserService = {
  doesUserExist: jest.fn(),
};

const mockJwtService = {
  signAsync: jest.fn(),
  verifyAsync: jest.fn(),
};

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: mockUserService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);

    mockUserService.doesUserExist.mockReturnValueOnce(of(false)); // User doesn't exist before registration
    mockJwtService.signAsync.mockReturnValueOnce(of('mock-jwt-token'));
  });

  it('should login a user with valid credentials', (done) => {
    const user = { email: 'test@example.com', password: 'secret' };

    authService.login(user)
      .subscribe(
        (token) => {
          expect(token).toBe('mock-jwt-token');
          expect(authService.doesUserExist).toHaveBeenCalledWith(user.email);
          expect(mockJwtService.signAsync).toHaveBeenCalledWith({ user });
          done();
        },
        (err) => done.fail(err),
      );
  });

  it('should throw an error for login with invalid email', (done) => {
    const user = { email: 'invalid@email.com', password: 'secret' };
    mockUserService.doesUserExist.mockReturnValueOnce(of(true)); // User already exists
  
    authService.login(user)
      .subscribe(
        () => done.fail('Login should not be successful'),
        (err) => {
          expect(err).toBeInstanceOf(HttpException);
          expect(err.status).toBe(HttpStatus.BAD_REQUEST);
          expect(err.message).toBe(
            'A user has already been created with this email address'
          );
          done();
        },
      );
  });

  it('should throw an error for login with invalid password', (done) => {
    const user = { email: 'test@example.com', password: 'wrongpassword' };
    mockUserService.doesUserExist.mockReturnValueOnce(of(false)); // Simulate user existence
    mockJwtService.verifyAsync.mockReturnValueOnce(
      of({ user: null }) // Invalid password
  
    );
  
    authService.login(user)
      .subscribe(
        () => done.fail('Login should not be successful'),
        (err) => {
          expect(err).toBeInstanceOf(HttpException);
          expect(err.status).toBe(HttpStatus.FORBIDDEN);
          expect(err.message).toBe('Invalid Credentials');
          done();
        },
      );
  });
  
});


