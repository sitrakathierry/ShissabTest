
$(document).ready(function() {

	$(document).on('change','#devise',function(event) {
	  	var montant = Number($('#montant').val());
		var lettre = number_to_letter(montant);
		var devise = $(this).children("option:selected").val();
		$('#lettre').val(lettre + ' ' + devise);
	})

	$(document).on('input','#montant',function(event) {
		var montant = Number(event.target.value);
		var lettre = number_to_letter(montant);
		var devise = $('#devise').val();
		$('#lettre').val(lettre + ' ' + devise);
	})

	$('.summernote').Editor();

	$(document).on('click','#btn-save',function(event) {
		event.preventDefault();

		var val_str = [
			$('#cheque').val(),
			$('#montant').val(),
			$('#date_cheque').val(),
			$('#banque').val()
		]

		var descri_str = [
			"Num chèque",
			"Montant",
			"Date Chèque",
			"Banque"
		]

		var val_elem = ""
		var enregistre = true
		for (let i = 0; i < val_str.length; i++) {
			const element = val_str[i];
			if(element == "")
			{
				enregistre = false
				val_elem = descri_str[i]
				var vide = true
				break
			}
		}

		if($('#montant').val() < 0)
		{
			enregistre = false
			val_elem = "Montant"
			var vide = false
		}

		if(enregistre)
		{
			var cheque = $('#cheque').val();
			var montant = $('#montant').val();
			var raison = $('#raison').parent().find('.Editor-editor').html();
			var date = $('#date').val();
			var lettre = $('#lettre').val();
			var devise = $('#devise').val();
			var date_cheque = $('#date_cheque').val();
			var banque = $('#banque').val();
			var type = $('#type').val();
			var statut = $('#statut').val();
			var id = $('#id').val();

			if (cheque == '' || montant == '') {
				show_info('Attention','Champs obligatoire');
				return;
			}
			
			var url = Routing.generate('comptabilite_cheque_entree_save');

			var data = {
				cheque: cheque,
				montant: montant,
				raison: raison,
				date: date,
				lettre: lettre,
				devise: devise,
				date_cheque: date_cheque,
				banque: banque,
				type: type,
				statut: statut,
				id: id,
			}

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
							show_success('Succès','Chèque enregistré');
						},
						error: function() {
							show_info('Erreur',"Erreur d'enregistrement",'error');
						}
					});
				
			});
		}
		else
		{
			if(vide)
			{
				swal({
					type: 'warning',
					title: val_elem+" Vide",
					text: "Remplissez le champ "+val_elem+" !",
					// footer: '<a href="">Misy olana be</a>'
					})
			}
			else
			{
				swal({
					type: 'error',
					title: val_elem+" Négatif",
					text: "Vérifier et corriger le "+val_elem+" !",
					// footer: '<a href="">Misy olana be</a>'
					})
			}
		}
		
	})

	$('#raison').parent().find('.Editor-editor').html($('#raison').val())
	
})