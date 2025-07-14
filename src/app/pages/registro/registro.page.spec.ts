import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RegistroPage } from './registro.page';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { FormtearFechaPipe } from '../../pipes/formtear-fecha.pipe';
import { RouterTestingModule } from '@angular/router/testing';

// Mocks
const menuControllerMock = {
  close: jasmine.createSpy()
};

const alertControllerMock = {
  create: jasmine.createSpy().and.returnValue({
    present: jasmine.createSpy()
  })
};

const formtearFechaPipeMock = {
  transform: jasmine.createSpy('transform').and.callFake((value: string) => {
    const fecha = new Date(value);
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const año = fecha.getFullYear();
    return `${dia}/${mes}/${año}`;
  })
};

describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroPage],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule
      ],
      providers: [
        { provide: MenuController, useValue: menuControllerMock },
        { provide: AlertController, useValue: alertControllerMock },
        { provide: FormtearFechaPipe, useValue: formtearFechaPipeMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
