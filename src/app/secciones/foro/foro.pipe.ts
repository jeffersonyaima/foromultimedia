import { Pipe, PipeTransform } from "@angular/core";
import { Observable } from "rxjs";
import { Lista_Preguntas } from "src/app/services/firestore/firestore.service";

@Pipe({
    name: 'filtro1'
})

export class ForoPipe implements PipeTransform{
    transform(objects:Observable<Lista_Preguntas[]>) {

        objects.forEach((dato)=>{
            return dato.filter(object=>{
                object.seccion==="guiones";
            });
        }); 
    } 
}