import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteDTO } from './models/cliente.dto';
import { RegistroDTO } from './models/registro.dto';
import { AuthService } from './services/auth.service';
import { ClienteService } from './services/cliente.service';
import { RegistroService } from './services/registro.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {

  constructor() { }

}
