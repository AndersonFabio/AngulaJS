
app.service('usuarioServiceApp',['$http', function ($http) {
	this.login = {};
	this.parametro = {};
	this.parametro.login = {};

	
  this.salvarLogin = function (login) {
	  	if(login.idCorretor == undefined) {
	  		login.idCorretor = "";
	  	}
		setCookie("CapiteWebEmail", login.email,30);
		setCookie("CapiteWebSenha", login.senha,30);
		setCookie("CapiteWebCargo", login.cargo,30);
		setCookie("CapiteWebNome", retira_acentos(login.nome),30);
		setCookie("CapiteWebIdEmpresa", login.idEmpresa,30);
		setCookie("CapiteWebIdCorretor", login.idCorretor,30);
		setCookie("CapiteWebIdAgenda", login.idAgenda,30);
  }                             
  
  this.popularLogin = function () {
		this.login.email = getCookie("CapiteWebEmail");
		this.login.senha = getCookie("CapiteWebSenha");
		this.login.cargo = getCookie("CapiteWebCargo");
		this.login.nome = getCookie("CapiteWebNome");
		this.login.idEmpresa = getCookie("CapiteWebIdEmpresa");
		this.login.idCorretor = getCookie("CapiteWebIdCorretor");
		this.login.idAgenda = getCookie("CapiteWebIdAgenda");
		return this.login;
  }
  
  this.popularParametro = function() {
	  this.parametro.login.email = getCookie("CapiteWebEmail");
	  this.parametro.login.senha = getCookie("CapiteWebSenha");
	  this.parametro.login.cargo = getCookie("CapiteWebCargo");
	  this.parametro.login.nome = getCookie("CapiteWebNome");
	  this.parametro.login.idEmpresa = getCookie("CapiteWebIdEmpresa");
	  this.parametro.login.idCorretor = getCookie("CapiteWebIdCorretor");
	  this.parametro.login.idAgenda = getCookie("CapiteWebIdAgenda");
	  return this.parametro;
  }
  
  this.limparSessao = function() {
		setCookie("CapiteWebEmail","");
		setCookie("CapiteWebSenha","");
		setCookie("CapiteWebCargo","");
		setCookie("CapiteWebIdEmpresa","");
		setCookie("CapiteWebNome","");
		setCookie("CapiteWebIdCorretor","");
		setCookie("CapiteWebIdAgenda","");
		
  }
  
  function setCookie(cname,cvalue,exdays) {
	    var d = new Date();
	    d.setTime(d.getTime() + (exdays*24*60*60*1000));
	    var expires = "expires=" + d.toGMTString();
	    document.cookie = cname+"="+cvalue+"; "+expires;
	}

	function getCookie(cname) {
	    var name = cname + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0; i<ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1);
	        if (c.indexOf(name) == 0) {
	            return c.substring(name.length, c.length);
	        }
	    }
	    return "";
	}

	function checkCookie() {
	    var user=getCookie("username");
	    if (user != "") {
	        alert("Welcome again " + user);
	    } else {
	       user = prompt("Please enter your name:","");
	       if (user != "" && user != null) {
	           setCookie("username", user, 30);
	       }
	    }
	}
	
	function retira_acentos(str) 
	{

	    com_acento = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";

	sem_acento = "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr";
	    novastr="";
	    for(i=0; i<str.length; i++) {
	        troca=false;
	        for (a=0; a<com_acento.length; a++) {
	            if (str.substr(i,1)==com_acento.substr(a,1)) {
	                novastr+=sem_acento.substr(a,1);
	                troca=true;
	                break;
	            }
	        }
	        if (troca==false) {
	            novastr+=str.substr(i,1);
	        }
	    }
	    return novastr;
	}  

	this.uploadFileToUrl = function(file, username, password, dob, email, uploadUrl){
		var myFormData = new FormData();

		myFormData.append('file', file);
		myFormData.append('username', username);
		myFormData.append('password', password);
		myFormData.append('dob', dob);
		myFormData.append('email', email);


		$http.post(uploadUrl, myFormData, {
			transformRequest: angular.identity,
			headers: {'Content-Type': undefined}
		})
			.success(function(){

			})
			.error(function(){
			});
	}
}]);