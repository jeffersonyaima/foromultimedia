import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { GuionesRoutingModule } from './guiones-routing.module';
import { GuionesComponent } from './guiones.component';

import { ReactiveFormsModule, FormsModule} from '@angular/forms';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';


import { DropzoneDirective } from '../../dropzone.directive';
import { UploaderComponent } from '../../uploader/uploader.component'
import { UploadTaskComponent } from '../../upload-task/upload-task.component'


@NgModule({
  declarations: [GuionesComponent, DropzoneDirective, UploaderComponent, UploadTaskComponent],
  exports:[GuionesComponent],
  imports: [
    CommonModule,
    GuionesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]

})
export class GuionesModule { }





