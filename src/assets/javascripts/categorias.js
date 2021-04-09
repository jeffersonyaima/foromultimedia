const categorias=document.querySelectorAll('#categorias.categoria');
const contenedorPreguntas=document.querySelectorAll('.contenedor-preguntas');
let categoriaActiva = null;

categorias.forEach((categoria)=>{
  categoria.addEventListener('click',(e)=>{
    categoria.forEach((elemento)=>{
      elemento.classList.remove('activa');
    })
   e.currentTarget.classList.toggle('activa');
   categoriaActiva=categoria.dataset.categoria;

   //activamos el contenedor de preguntas que preguntas
   contenedorPreguntas.forEach((contenedor)=>{
     if (contenedor.dataset==categoriaActiva){
       contenedor.classList.add('activo');
     }
     else{
       contenedor.classList.remove('activo');
     }
   });
  });

});
