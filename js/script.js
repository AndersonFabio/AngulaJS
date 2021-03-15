$("body").delegate("a", "click", function() {
	$("html, body").animate({
		scrollTop : 0
	}, "slow");
});

/*$(document).ready(function() {
    var contentPlacement = $('#navbar').position().top + $('#navbar').height();
    $('#content-top').css('padding-top',contentPlacement+13+'px');
   
});*/

function getEndereco() {
    // Se o campo CEP não estiver vazio
	alert("CEP");
	var cep = $("#Cep").val();
	if ($.trim(cep) == "") {
		cep = $.trim($(".Cep").val());
	}
	
    if ($.trim($(cep)) != "") {
    	
    	$.getJSON("https://www.capiteweb.com.br/CapiteWeb/rest/cep?cep="+cep, function(data) {
    			$("#Endereco").val(unescape(data.endereco));
            	//$("#Endereco").change();
                $("#Bairro").val(unescape(data.bairro));
                //$("#Bairro").change();
                $("#Cidade").val(unescape(data.cidade));
                $("#Estado").val(unescape(data.uf));
                $("#Numero").focus();
    		});
        
        
    }
    else {
        alert("Antes, preencha o campo CEP!");
        //document.getElementById("load”).style.display = ‘none';
    }
    return false;

};

jQuery(document).ready(function() {
	jQuery('.navbar-collapse a').click(function() {
		jQuery('.navbar-collapse').collapse('toggle');
	});
});

$(document).bind("mobileinit", function() {
	$.support.touchOverflow = true;
	$.mobile.touchOverflowEnabled = true;
	$.mobile.fixedToolbars.setTouchToggleEnabled(false);

});

var ajaxUtils = (function() {

	function simulate(callbackFn) {
		$.mobile.loading("show", {
			text : "Simulating an AJAX call",
			textVisible : true,
			textonly : false
		});
		setTimeout(function() {
			$.mobile.loading("hide");
			callbackFn();
		}, 1000);
	}

	return {
		simulate : simulate
	};
})();