/*$('.menu-bar').on('click',function(){
  $('.contenido').toggleClass('abrir');
})*/


$(document).ready(function(){

  $("#menu-bar").click(function(){
    var isVisible = $("#sidebar").hasClass("hidden");
    if(isVisible){
      alert("Es visible");
      $("#sidebar").removeClass("hidden");
    }else{
      alert("No es visible");
      $("#sidebar").addClass("hidden");
    }
  });

});
