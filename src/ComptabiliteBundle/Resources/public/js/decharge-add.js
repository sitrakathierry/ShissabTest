
$(document).ready(function() {

	$.MonthPicker = {
        VERSION: '3.0.4', // Added in version 2.4;
        i18n: {
            year: 'Année',
            prevYear: '<<',
            nextYear: '>>',
            next12Years: 'Jump Forward 12 Years',
            prev12Years: 'Jump Back 12 Years',
            nextLabel: 'Suiv.',
            prevLabel: 'Prec.',
            buttonText: 'Open Month Chooser',
            jumpYears: '>',
            backTo: '<',
            months: ['Jan.', 'Fev.', 'Mar.', 'Avr.', 'Mai', 'Juin', 'Juil', 'Aoû.', 'Sep.', 'Oct.', 'Nov.', 'Dec.']
        }
    };


	$('#mois_facture').MonthPicker({ Button: false });

	$(document).on('change','#mode-paiement',function(event) {
		event.preventDefault();
		var mode = $(this).children("option:selected").val();

		if (mode == 1) {
			$('#div-num-cheque').removeClass('hidden'); // Afficher
			$('#div-date-cheque').removeClass('hidden'); // Afficher
			$('#div-num-virement').addClass('hidden');
			$('#div-date-virement').addClass('hidden');
			$('#div-num-carte').addClass('hidden');
			$('#div-num-facture').addClass('hidden');
		}

		if (mode == 2) {
			$('#div-num-cheque').addClass('hidden');
			$('#div-date-cheque').addClass('hidden');
			$('#div-num-virement').addClass('hidden');
			$('#div-date-virement').addClass('hidden'); 
			$('#div-num-carte').addClass('hidden');
			$('#div-num-facture').removeClass('hidden'); // Afficher
		}

		if (mode == 3) {
			$('#div-num-cheque').addClass('hidden');
			$('#div-date-cheque').addClass('hidden');
			$('#div-num-virement').removeClass('hidden'); // Afficher
			$('#div-date-virement').removeClass('hidden'); // Afficher
			$('#div-num-carte').addClass('hidden');
			$('#div-num-facture').addClass('hidden');
		}

		if (mode == 4) { 
			$('#div-num-cheque').addClass('hidden');
			$('#div-date-cheque').addClass('hidden');
			$('#div-num-virement').addClass('hidden');
			$('#div-date-virement').addClass('hidden');
			$('#div-num-carte').removeClass('hidden'); // Afficher
			$('#div-num-facture').removeClass('hidden'); // Afficher
		}

	})

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

	$('.summernote').summernote();

	$(document).on('click','#btn-save',function(event) {
		event.preventDefault();

		var mode_payement = $('#mode-paiement').val()

		if(mode_payement == 1)
		{
			var val_str = [
				$('#service').val(),
				$('#motif').val(),
				$('#cheque').val(),
				$('#date_cheque').val(),
				$('#montant').val()
			]

			var descri_str = [
				"Service",
				"Motif",
				"Num Chèque",
				"Date Chèque",
				"Montant"
			]
		}	
		else if(mode_payement == 2)
		{
			var val_str = [
				$('#service').val(),
				$('#motif').val(),
				$('#num_facture'),
				$('#montant').val()
			]

			var descri_str = [
				"Service",
				"Motif",
				"Num Facture",
				"Montant"
			]
		}
		else if(mode_payement == 3)
		{
			var val_str = [
				$('#service').val(),
				$('#motif').val(),
				$('#virement').val(),
				$('#date_virement').val(),
				$('#montant').val()
			]

			var descri_str = [
				"Service",
				"Motif",
				"Num Virement",
				"Date Virement",
				"Montant"
			]
		}
		else 
		{
			var val_str = [
				$('#service').val(),
				$('#motif').val(),
				$('#carte_bancaire').val(),
				$('#num_facture'),
				$('#montant').val()
			]

			var descri_str = [
				"Service",
				"Motif",
				"Ref CB",
				"Num Facture",
				"Montant"
			]
		}
		var enregistre = true
		var elem_str = ""
		for (let i = 0; i < val_str.length; i++) {
			const element = val_str[i];
			if(element == "")
			{
				enregistre = false
				elem_str = descri_str[i]
				var vide = true
				break
			}
		}

		if($('#montant').val() < 0)
		{
			var vide = false
			elem_str = "Montant"
			enregistre = false
		}

		if(enregistre)
		{
			var beneficiaire = $('#beneficiaire').val();
			var cheque = $('#cheque').val();
			var montant = $('#montant').val();
			var raison = $('#raison').code();
			var date = $('#date').val();
			var lettre = $('#lettre').val();
			var mode_paiement = $('#mode-paiement').val();
			var devise = $('#devise').val();
			var service = $('#service').val();
			var motif = $('#motif').val();
			var date_cheque = $('#date_cheque').val();
			var mois_facture = $('#mois_facture').val();
			var virement = $('#virement').val();
			var date_virement = $('#date_virement').val(); 
			var carte_bancaire = $('#carte_bancaire').val();
			var num_facture = $('#num_facture').val();

			if (beneficiaire == '' || montant == '') {
				show_info('Erreur','Champs obligatoire','error');
			} else {

				disabled_confirm(false); 

				swal({
					title: "Enregistrer ?",
					text: "Voulez-vous vraiment enregistrer ? ",
					type: "info",
					showCancelButton: true,
					confirmButtonText: "Oui",
					cancelButtonText: "Non",
				},
				function () {
 
					disabled_confirm(true);

					var url = Routing.generate('comptabilite_decharge_save');
 
					var data = {
						beneficiaire: beneficiaire,
						cheque: cheque,
						montant: montant,
						raison: raison,
						date: date, 
						lettre: lettre,
						mode_paiement: mode_paiement,
						devise: devise,
						service:service,
						motif: motif,
						date_cheque: date_cheque,
						mois_facture: mois_facture,
						virement: virement,
						date_virement: date_virement,
						carte_bancaire: carte_bancaire,
						num_facture:num_facture,
					}

					$.ajax({
						url: url,
						type: 'POST',
						data: data,
						success: function(res) {
							show_success('Succès','Déclaration enregistré');
						},
						error: function() {
							show_info('Erreur',"Erreur d'enregistrement",'error');
						}
					})
					
				});

			}
	
		}
		else
		{
			if(vide)
			{
				swal({
					type: 'warning',
					title: elem_str+" Vide",
					text: "Remplissez le champ "+elem_str+" !",
					})
			}
			else
			{
				swal({
					type: 'error',
					title: elem_str+" Négatif",
					text: "Vérifier et corriger "+elem_str,
					})
			}  
		}
	})
})