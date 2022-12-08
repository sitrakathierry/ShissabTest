$('.summernote').summernote()

$(document).on('click', '#btn-save', function(event) {
	event.preventDefault();

	var val_str = [
		$('#nom').val(),
		$('#unite').val(),
		$('#fournisseur').val(),
		$('#libelle').val()
	]
	var val_desri = [
		"Nom",
		"Unité",
		"Fournisseur",
		"Libellé"
	]
	var champ_vide = false ;
	var descri_str = ""
	for (let i = 0; i < val_str.length; i++) {
		const element = val_str[i];
		if(element == "")
		{
			champ_vide = true
			descri_str = val_desri[i]
			break ;
		}
	}

	var val_num = [
		$('#prix').val(),
		$('#qte').val(),
		$('#portion').val()
	] ;
	var val_d_num = [
		"Prix d'achat",
		"Quantité",
		"Produit en stock"
	] ;
	var val_elem = ""
	var elem_num = ""
	for (let j = 0; j < val_num.length; j++) {
		const element = parseInt(val_num[j]);
		if(element < 0)
		{
			val_elem = "Negatif"
			elem_num = val_d_num[j]
			break ;
		}
		else if(!Number.isInteger(element))
		{
			val_elem = "Vide"
			elem_num = val_d_num[j]
			break ;
		}
	}

	if(!champ_vide && val_elem == "")
	{
		var data = {
			id : $('#id').val(),
			nom : $('#nom').val(),
			prix : $('#prix').val(),
			qte : $('#qte').val(),
			unite : $('#unite').val(),
			portion : $('#portion').val(),
			libelle : $('#libelle').val(),
			description : $('#description').code(),
		};

		var url = Routing.generate('stock_interne_save');

		$.ajax({
			url: url,
			type: 'POST',
			data: data,
			success: function(res) {
				show_info('Succès', 'Enregistrement éffectué');
				location.reload();
			}
		})
	}
	else
	{
		if(champ_vide)
		{
			swal({
				type: 'warning',
				title: descri_str+" Vide",
				text: "Remplissez le "+descri_str,
				// footer: '<a href="">Misy olana be</a>'
			})
		}
		else
		{
			if(val_elem == "Negatif")
			{
				swal({
					type: 'error',
					title: elem_num+" Négatif",
					text: "Vérifier le "+elem_num,
					// footer: '<a href="">Misy olana be</a>'
				})
			}
			else
			{
				swal({
					type: 'warning',
					title: elem_num+" Vide ou Invalide",
					text: "Remplissez ou corriger le "+elem_num,
					// footer: '<a href="">Misy olana be</a>'
				})
			}
		}
	}
});

$(document).on('input','#prix', function(event) {
	event.preventDefault();

	var prix = event.target.value;

	var qte = $('#qte').val();

	var total = Number(prix) * Number(qte);

	$('#total').val(total);
});

$(document).on('input','#qte', function(event) {
	event.preventDefault();

	var qte = event.target.value;

	var prix = $('#prix').val();

	var total = Number(prix) * Number(qte);

	$('#total').val(total);
})

