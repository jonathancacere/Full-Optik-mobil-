import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';

// Mocks
const navControllerMock = {
  navigateForward: jasmine.createSpy()
};

const alertControllerMock = {
  create: jasmine.createSpy().and.returnValue({
    present: jasmine.createSpy()
  })
};

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let navController: NavController;
  let alertController: AlertController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [LoginPage],
      providers: [
        { provide: NavController, useValue: navControllerMock },
        { provide: AlertController, useValue: alertControllerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    navController = TestBed.inject(NavController);
    alertController = TestBed.inject(AlertController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Email Validation', () => {
    it('should validate valid email formats', () => {
      // Test various valid email formats
      expect(component.validarEmail('test@example.com')).toBeTrue();
      expect(component.validarEmail('user@domain.com')).toBeTrue();
      expect(component.validarEmail('name.lastname@company.org')).toBeTrue();
      expect(component.validarEmail('first.last@subdomain.company.com')).toBeTrue();
    });

    it('should invalidate invalid email formats', () => {
      // Test various invalid email formats
      expect(component.validarEmail('invalid-email')).toBeFalse();
      expect(component.validarEmail('test@')).toBeFalse();
      expect(component.validarEmail('@example.com')).toBeFalse();
      expect(component.validarEmail('test@example')).toBeFalse();
      expect(component.validarEmail('test@.com')).toBeFalse();
      expect(component.validarEmail('test@example.com.' + 'com')).toBeFalse();
    });
  });

  describe('Login Functionality', () => {
    beforeEach(() => {
      // Reset mocks before each test
      alertControllerMock.create.calls.reset();
      navControllerMock.navigateForward.calls.reset();
    });

    it('should show error when email is empty', () => {
      component.email = '';
      component.password = 'password';
      component.login();
      
      const alert = alertControllerMock.create.calls.mostRecent().args[0];
      expect(alert.header).toBe('Error');
      expect(alert.message).toBe('El campo de correo no puede estar vacío.');
      expect(alert.buttons).toEqual(['OK']);
    });

    it('should show error when email is invalid', () => {
      component.email = 'invalid-email';
      component.password = 'password';
      component.login();
      
      const alert = alertControllerMock.create.calls.mostRecent().args[0];
      expect(alert.header).toBe('Error');
      expect(alert.message).toBe('El formato del correo es inválido.');
      expect(alert.buttons).toEqual(['OK']);
    });

    it('should show error when password is empty', () => {
      component.email = 'test@example.com';
      component.password = '';
      component.login();
      
      const alert = alertControllerMock.create.calls.mostRecent().args[0];
      expect(alert.header).toBe('Error');
      expect(alert.message).toBe('El campo de contraseña no puede estar vacío.');
      expect(alert.buttons).toEqual(['OK']);
    });

    it('should show error when password length is invalid', () => {
      // Test password too short
      component.email = 'test@example.com';
      component.password = '1'; // Less than 3 characters
      component.login();
      
      const alert = alertControllerMock.create.calls.mostRecent().args[0];
      expect(alert.header).toBe('Error');
      expect(alert.message).toBe('La contraseña debe tener 3 y 8 caracteres.');
      expect(alert.buttons).toEqual(['OK']);

      // Reset mocks
      alertControllerMock.create.calls.reset();

      // Test password too long
      component.email = 'test@example.com';
      component.password = '123456789'; // More than 8 characters
      component.login();
      
      const alert2 = alertControllerMock.create.calls.mostRecent().args[0];
      expect(alert2.header).toBe('Error');
      expect(alert2.message).toBe('La contraseña debe tener 3 y 8 caracteres.');
      expect(alert2.buttons).toEqual(['OK']);
    });

    it('should navigate to home with valid credentials', () => {
      component.email = 'test@example.com';
      component.password = '123';
      component.login();
      
      expect(navControllerMock.navigateForward).toHaveBeenCalledWith(
        ['/home'],
        {
          queryParams: {
            email: 'test@example.com',
            password: '123'
          }
        }
      );
    });
  });

  describe('Registration Navigation', () => {
    it('should navigate to registration page', () => {
      component.registro();
      expect(navControllerMock.navigateForward).toHaveBeenCalledWith(['/registro']);
    });
  });
});
