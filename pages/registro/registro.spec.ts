import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroPage } from './registro.page';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { FormtearFechaPipe } from '../../pipes/formtear-fecha.pipe';
import { RouterTestingModule } from '@angular/router/testing';

// Mock del pipe FormtearFechaPipe
const formtearFechaPipeMock = {
  transform: jasmine.createSpy('transform').and.returnValue('2025-07-13')
};

// Mocks
const alertControllerMock = {
  create: jasmine.createSpy().and.returnValue({
    present: jasmine.createSpy()
  })
};

const menuControllerMock = {
  close: jasmine.createSpy()
};

describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;
  let alertController: AlertController;
  let menuController: MenuController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [RegistroPage, FormtearFechaPipe],
      providers: [
        { provide: AlertController, useValue: alertControllerMock },
        { provide: MenuController, useValue: menuControllerMock },
        { provide: FormtearFechaPipe, useValue: formtearFechaPipeMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    alertController = TestBed.inject(AlertController);
    menuController = TestBed.inject(MenuController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization', () => {
    it('should close menu on initialization', () => {
      component.ngOnInit();
      expect(menuController.close).toHaveBeenCalledWith('mainMenu');
    });
  });

  describe('Alert Presentation', () => {
    it('should present alert with correct message', async () => {
      await component.presentAlert('Test message');
      
      const alert = alertControllerMock.create.calls.mostRecent().args[0];
      expect(alert.header).toBe('Mensaje');
      expect(alert.message).toBe('Test message');
      expect(alert.buttons).toEqual(['OK']);
    });
  });

  describe('Guardar Function', () => {
    beforeEach(() => {
      // Reset mocks before each test
      alertControllerMock.create.calls.reset();
      formtearFechaPipeMock.transform.calls.reset();
    });

    it('should show error when name or surname is empty', () => {
      component.nombre = ' ';
      component.apellido = 'John';
      component.selectedDate = '2025-07-13';
      
      component.guardar();
      
      const alert = alertControllerMock.create.calls.mostRecent().args[0];
      expect(alert.header).toBe('Mensaje');
      expect(alert.message).toBe('Error: nombre y apellido vacios');
      expect(alert.buttons).toEqual(['OK']);
    });

    it('should show success message with formatted date when all fields are valid', () => {
      component.nombre = 'John';
      component.apellido = 'Doe';
      component.selectedDate = '2025-07-13';
      
      component.guardar();
      
      const alert = alertControllerMock.create.calls.mostRecent().args[0];
      expect(alert.header).toBe('Mensaje');
      expect(alert.message).toBe('Datos Correctos  usuario:  John fecha nacimiento: 2025-07-13');
      expect(alert.buttons).toEqual(['OK']);
    });

    it('should use FormtearFechaPipe to format date', () => {
      component.nombre = 'John';
      component.apellido = 'Doe';
      component.selectedDate = '2025-07-13';
      
      component.guardar();
      
      expect(formtearFechaPipeMock.transform).toHaveBeenCalledWith('2025-07-13');
    });
  });
});
