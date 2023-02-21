import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TareaService } from '../tarea.service';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css'],
})
export class TareasComponent implements OnInit {
  tareas: any[] = [];
  formulario: FormGroup = this.fb.group({
    nombre: [],
    completado: [false],
  });

  tareaEnEdicion: any;

  constructor(private tareaService: TareaService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.tareaService.getAll().subscribe((tareas: any) => {
      console.log('tareas', tareas);
      this.tareas = tareas._embedded.tareas;
    });
  }

  save() {
    const values = this.formulario.value;
    console.log('values', values);

    let request;

    if (this.tareaEnEdicion) {
      request = this.tareaService.update(this.tareaEnEdicion._links.self.href, values)
    } else {
      request = this.tareaService.create(values)
    }

    request
      .subscribe({
        next: () => {
          this.getAll();
          this.tareaEnEdicion=null
          this.formulario.setValue({
            nombre: '',
            completado: true,
          });
        },
        error: () => {},
      });

  }

  edit(tarea: any) {
    this.tareaEnEdicion = tarea;

    this.formulario.setValue({
      nombre: tarea.nombre,
      completado: tarea.completado,
    });
  }

  delete(tarea: any) {
    const ok = confirm('Estas seguro?');
    if (ok) {
      this.tareaService.delete(tarea._links.self.href).subscribe(() => {
        this.getAll();
      });
    }
  }
}
