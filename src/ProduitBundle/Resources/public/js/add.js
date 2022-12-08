$('.select2').select2();

$(document).on('change','#code',function(event) {

    var code = $(this).val().trim();

    var data = {
        code : code
    };

    var url = Routing.generate('produit_verify');

    var self = this;

    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        success: function(res) {
        	if (res.exist == true) {
        		$(self).val('');
        		show_info('Erreur','le code est déjà utilisé','error');
        	}
        }
    })
})

$(document).on('click','#add-produit-entrepot',function(event) {
	event.preventDefault();

	var url = Routing.generate('produit_entrepot_tpl');
	console.log(url) ;
	$.ajax({
		url : url,
		type: 'GET',
		success: function(res) {
			$('.lis-produit-entrepot').append(res);
			
			$('.code').each(function() {
				$(this).val( $('#code').val() );
			});
			
			$('.select2').select2();
			
			$('.expirer').datepicker({
			    todayBtn: "linked",
			    keyboardNavigation: false,
			    forceParse: false,
			    calendarWeeks: true,
			    autoclose: true,
			    format: 'dd/mm/yyyy',
			    language: 'fr'
			});
		}
	})

	// var tpl = $('.produit-entrepot').clone();
});

$(document).on('click','#remove-produit-entrepot',function(event) {
	event.preventDefault();
	$('div.lis-produit-entrepot div.produit-entrepot:last').remove();
})

$('#produit_image').attr('src',get_picture_b64());

$(document).on('change','#image',function(event) {
  var file = document.querySelector('#image').files[0];
  getBase64(file).then((src)=>{
      $('#produit_image').attr('src',src);
  });
});

$('.expirer').datepicker({
    todayBtn: "linked",
    keyboardNavigation: false,
    forceParse: false,
    calendarWeeks: true,
    autoclose: true,
    format: 'dd/mm/yyyy',
    language: 'fr'
});

$('.summernote').summernote()

var qrcode = new QRCode(document.getElementById("qrcode"), {
	width : 100,
	height : 100
});

$(document).on('input', '#code', function(event) {
	var data = event.target.value;

	$('.code').each(function() {
		$(this).val(data);
	})

	makeCode(data)
})

function makeCode (data) {		
	qrcode.makeCode(data);
}

$(document).on('click', '#btn-save', function(event) {
	event.preventDefault();
	var indice = "Non" ;

	var val_num = [
		parseInt($('.prix_achat').val()),
		parseInt($('.charge').val()),
		parseInt($('.prix_revient').val()),
		parseInt($('.marge_valeur').val()),
		parseInt($('.prix_vente').val()),
		parseInt($('.stock').val()),
		parseInt($('.stock_alerte').val()),
		]
	
	var val_descri = [
		"Prix d'achat",
		"Charge",
		"Prix de revient",
		"Marge",
		"Prix de vente",
		"Stock",
		"Stock Alerte"
	] ;

	
	positif = true
		for(var i = 0; i < val_num.length ; i++)
		{
			if (val_num[i] < 0)
			{
				positif = false
				val_vide = false
				valeur_negatif = val_descri[i]
				break ;
			}
			else if(!(Number.isInteger(val_num[i])))
			{
				positif = false
				val_vide = true
				valeur_negatif = val_descri[i]
				break ;
			}
		}
	if (positif)
	{

		var val_str = [
			$('#code').val(),
			$('#qrcode img').attr('src'),
			$('#nom').val(),
			$('#unite').val(),
			$('#categorie').val(),
			$('#produit_image').attr('src'),
			$('.indice').val(),
			$('.entrepot').val(),
			$('.fournisseur').val(),
			$('.expirer').val()
		] ;

		var descri_str = [
			"Code",
			"Qr Code Image",
			"Nom",
			"Unité",
			"Categorie",
			"Produit Image",
			"Indice",
			"Entrepot",
			"Fournisseur",
			"Expirer le"
		] ;

		enregistre = true
		for (var i = 0; i < val_str.length ; i++) 
		{
			if(val_str[i] === '')
			{
				enregistre = false
				var val_descri_str = descri_str[i]
				break ;
			}
		}

		if (enregistre)
		{
			var data = {
			code : $('#code').val(),
			qrcode : $('#qrcode img').attr('src'),
			nom : $('#nom').val(),
			description : $('#description').code(),
			unite : $('#unite').val(),
			categorie: $('#categorie').val(),
			produit_image : $('#produit_image').attr('src'),
			indice : toArray('.indice'),
			entrepot : toArray('.entrepot'),
			fournisseur : toArray('.fournisseur'),
			prix_achat : toArray('.prix_achat'),
			charge : toArray('.charge'),
			prix_revient : toArray('.prix_revient'),
			marge_type : toArray('.marge_type'),
			marge_valeur : toArray('.marge_valeur'),
			prix_vente : toArray('.prix_vente'),
			stock : toArray('.stock'),
			stock_alerte : toArray('.stock_alerte'),
			expirer : toArray('.expirer'),	
			};
			var url = Routing.generate('produit_save');
			disabled_confirm(false); 

			swal({
				title: "Enregistrer",
				text: "Voulez-vous vraiment enregistrer ? ",
				type: "info",
				showCancelButton: true,
				confirmButtonText: "Oui",
				cancelButtonText: "Non",
				},
				function () {
				disabled_confirm(true);
					$.ajax({
						url: url,
						type: 'POST',
						data: data,
						success: function(res) {
							show_success('Succès', 'Produit enregistré');
						}
					})
			
			});
		}	
		else
		{
			swal({
				type: 'warning',
				title: val_descri_str+' vide',
				text: 'Remplissez '+val_descri_str+' !'
				// footer: '<a href="">Misy olana be</a>'
			  })
		}
	}
	else
	{
		if(val_vide)
		{
			swal({
				type: 'warning',
				title: valeur_negatif+' vide ou invalide',
				text: 'Remplissez ou corriger '+valeur_negatif+' !'
				// footer: '<a href="">Misy olana be</a>'
			  })
		}
		else
		{
			swal({
				type: 'error',
				title: valeur_negatif+' négative',
				text: 'Verifier le '+valeur_negatif+' !'
				// footer: '<a href="">Misy olana be</a>'
			  })
		}
	}


});

function getBase64(file) {
  return new Promise((resolve)=>{
     var reader = new FileReader();
     reader.readAsDataURL(file);
     reader.onload = function () {
       resolve(reader.result);
     };
     reader.onerror = function (error) {
       resolve(false)
     };
  })
}

$(document).on('input', '.marge_valeur', function(event) {
	event.preventDefault();

	var item = $(this).closest('div.produit-entrepot');
	var prix_achat = item.find('.prix_achat').val();
	var charge = item.find('.charge').val();
	var prix_revient = Number(prix_achat) + Number(charge);
	var calcul = Number( item.find('.marge_type').val() );
	var valeur = Number( event.target.value );
	var marge = calcul_marge(prix_revient,calcul,valeur);
	var prix_vente = prix_revient + marge;

	item.find('.prix_revient').val(prix_revient);
	item.find('.prix_vente').val(prix_vente);

});

$(document).on('change', '.marge_type', function(event) {
	event.preventDefault();

	var item = $(this).closest('div.produit-entrepot');
	var prix_achat = item.find('.prix_achat')
	var charge = item.find('.charge').val();
	var prix_revient = Number(prix_achat) + Number(charge);
	var calcul = Number( $(this).children("option:selected").val() );
	var valeur = Number( item.find('.marge_valeur').val() );
	var marge = calcul_marge(prix_revient,calcul,valeur);
	var prix_vente = prix_revient + marge;
	
	item.find('.prix_revient').val(prix_revient);
	item.find('.prix_vente').val(prix_vente);

});

$(document).on('input', '.prix_achat', function(event) {
	event.preventDefault();

	var item = $(this).closest('div.produit-entrepot');
	var prix_achat = event.target.value;
	var charge = item.find('.charge').val();
	var prix_revient = Number(prix_achat) + Number(charge);
	var calcul = Number( item.find('.marge_type').val() );
	var valeur = Number( item.find('.marge_valeur').val() );
	var marge = calcul_marge(prix_revient,calcul,valeur);
	var prix_vente = prix_revient + marge;

	item.find('.prix_revient').val(prix_revient);
	item.find('.prix_vente').val(prix_vente);

});

$(document).on('input', '.charge', function(event) {
	event.preventDefault();

	var item = $(this).closest('div.produit-entrepot');
	var prix_achat = item.find('.prix_achat').val();
	var charge = event.target.value;
	var prix_revient = Number(prix_achat) + Number(charge);
	var calcul = Number( item.find('.marge_type').val() );
	var valeur = Number( item.find('.marge_valeur').val() );
	var marge = calcul_marge(prix_revient,calcul,valeur);
	var prix_vente = prix_revient + marge;

	item.find('.prix_revient').val(prix_revient);
	item.find('.prix_vente').val(prix_vente);

});

function calcul_marge(prix_revient, calcul, valeur) {
	var marge = 0;
	if (calcul == 0) {
		marge = valeur;
	} else {
		marge = (prix_revient * valeur) / 100;
	}

	return marge;
}

function toArray(selector, type = 'default') {
    var taskArray = new Array();
    $(selector).each(function() {

        if (type == 'summernote') {
            taskArray.push($(this).code());
        } else {
            taskArray.push($(this).val());
        }

    });
    return taskArray;
}