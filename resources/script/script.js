$("body").delegate("a", "click", function() {
  $("html, body").animate({ scrollTop: 0 }, "slow");
});



jQuery( document ).ready(function() {
    jQuery('.navbar-collapse a').click(function(){ 
      jQuery('.navbar-collapse').collapse('toggle');
    });  
 });
$( document ).on( "mobileinit", function() {
	  $.mobile.loader.prototype.options.text = "Carregando Aguarde !";
	  $.mobile.loader.prototype.options.textVisible = false;
	  $.mobile.loader.prototype.options.theme = "a";
	  $.mobile.loader.prototype.options.html = "";
	});
$(document).bind("mobileinit", function() {
     $.support.touchOverflow = true;
     $.mobile.touchOverflowEnabled = true;
     $.mobile.fixedToolbars.setTouchToggleEnabled(false);

});

var ajaxUtils = (function(){
    
    function simulate(callbackFn) {
        $.mobile.loading( "show", {
            text: "Simulating an AJAX call",
            textVisible: true,
            textonly: false
        });
        setTimeout(function(){
            $.mobile.loading( "hide" );
            callbackFn();
        },1000);
    }
    
    return {
        simulate: simulate
    };
})();