
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
		}

		if (mode == 2) {
			$('#div-num-cheque').addClass('hidden');
			$('#div-date-cheque').addClass('hidden');
			$('#div-num-virement').addClass('hidden');
			$('#div-date-virement').addClass('hidden'); 
			$('#div-num-carte').addClass('hidden');
		}

		if (mode == 3) {
			$('#div-num-cheque').addClass('hidden');
			$('#div-date-cheque').addClass('hidden');
			$('#div-num-virement').removeClass('hidden'); // Afficher
			$('#div-date-virement').removeClass('hidden'); // Afficher
			$('#div-num-carte').addClass('hidden');
		}

		if (mode == 4) { 
			$('#div-num-cheque').addClass('hidden');
			$('#div-date-cheque').addClass('hidden');
			$('#div-num-virement').addClass('hidden');
			$('#div-date-virement').addClass('hidden');
			$('#div-num-carte').removeClass('hidden'); // Afficher
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

	$('.summernote').Editor() ;

	$(document).on('click','#btn-save',function(event) {
		event.preventDefault();

		var mode_payement = $('#mode-paiement').val()

		if(mode_payement == 1)
		{
			var val_str = [
				$('#service').val(),
				$('#motif').val(),
				$('#num_facture'),
				$('#cheque').val(),
				$('#date_cheque').val(),
				$('#montant').val()
			]

			var descri_str = [
				"Service",
				"Motif",
				"Num Facture",
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
				$('#num_facture'),
				$('#virement').val(),
				$('#date_virement').val(),
				$('#montant').val()
			]

			var descri_str = [
				"Service",
				"Motif",
				"Num Facture",
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
			var raison = $('#raison').val();
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
			var fournisseur = $('#fournisseur').val()
			var datadetails = []

			$('.mytbody').find('tr').each(function(){
				var detls_designation = $(this).find('.detls_designation').val()
				var detls_quantite = $(this).find('.detls_quantite').val()
				var detls_prix_unitaire = $(this).find('.detls_prix_unitaire').val()

				datadetails.push([
						0,
						detls_designation, 
						detls_quantite, 
						detls_prix_unitaire
				])
			})
			
			var type_payment = ''

			$(".type_achat").each(function(){
				if($(this).is(':checked'))
				{
					type_payment = $(this).val()
				}
			})
			var montant_echeance_paye = ''
			if(type_payment == 2)
			{
				montant_echeance_paye = $('#montant_echeance_paye').val()

				if(montant_echeance_paye == '' || montant_echeance_paye < 0) 
					beneficiaire = ''
			}

			if (beneficiaire == '' || montant == '') {
				show_info('Erreur','Champs obligatoire ou invalide','error');
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
						datadetails:datadetails,
						montant_echeance_paye:montant_echeance_paye,
						type_payment:type_payment,
						fournisseur:fournisseur

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

	$('.btn_plus_details').click(function(){
		var trElems = `
			<tr>
				<td>
					<input type="hidden" value="0" class="id_dtls_dep">
					<input type="text" class="form-control detls_designation" placeholder="Désignation" required>
				</td>
				<td>
					<input type="number" class="form-control detls_quantite" placeholder="Quantité" required>
				</td>
				<td>
					<input type="numbers" class="form-control detls_prix_unitaire" placeholder="Prix unitaire" required>
				</td>
			</tr>
		`
		$('.mytbody').append(trElems)
	})
	$('.btn_trash_details').click(function(){
		var trElems = $('.mytbody').find('tr')
		if(trElems.length > 1)
			$('.mytbody').find('tr:last-child').remove()
	})


	function typePayementAchat()
	{
		$('.type_achat').click(function(){
			if($(this).val() == 2)
			{
				$('.montant_echance').remove()

				var montantEcheance = `
					<div class="col-lg-6 montant_echance">
						<div class="form-group">
							<label class="col-sm-2 control-label">Montant payé</label>
							<div class="col-sm-10">
								<input type="number" class="form-control" id="montant_echeance_paye">
							</div>
						</div>
					</div>
					` ; 
				var elemParent = $(this).closest('.parent_achat')
				$(montantEcheance).insertAfter(elemParent) ;
			}
			else
			{
				$('.montant_echance').remove()
			}
		})		
	}

	$('#motif').change(function(){
		
		if($(this).val() == 'Achat')
		{
			var url = Routing.generate('comptabilite_charger_fournisseur');
			var data = {id:1}
			var self = $(this)
			$.ajax({
					url: url,
					type: 'POST',
					data: data,
					dateType: 'json',
					success: function(res) {
						var allFournisseur = ''
						allFournisseur = res ;
						var options = ''
						for (let i = 0; i < allFournisseur.length; i++) {
							const element = allFournisseur[i];
							options += `
								<option value="`+element.id+`">`+element.nom+`</option>
							`
						}
						var fournisseur = `
							<div class="col-lg-6" id="div-fournisseur">
								<div class="form-group">
									<label class="col-sm-2 control-label">Fournisseurs</label>
									<div class="col-sm-10">
										<select class="form-control" id="fournisseur"> 
										<option value="" selected></option>
										`+options+`
										</select>
									</div>
								</div>
							</div>
						` ;
						var elemPayement = fournisseur + ` <div class="col-lg-6 parent_achat" >
								<div class="form-group">
									<label class="col-sm-2 control-label"></label>
									<div class="col-sm-10">
										<div class="row">
											<div class="col-md-6 content_achat" >
												<input type="radio" class="type_achat" name="type_achat" value="1" ><h4 for="html" class="ident_achat">Payer en totalité</h4>
											</div>
											<div class="col-md-6 content_achat" >
												<input type="radio" class="type_achat" name="type_achat" value="2"><h4 for="html" class="ident_achat">Payer par échéance</h4>
											</div>
										</div>
									</div>
								</div>
							</div> `;
						var elemParent = self.closest('#div-motif')
						$(elemPayement).insertAfter(elemParent) ;	
						typePayementAchat()	
					},
					error: function() {
						show_info('Erreur',"Erreur de chargement",'error');
					}
				}) 
				
		}
		else
		{
			$('#div-fournisseur').remove()
			$('.parent_achat').remove()
			$('.montant_echance').remove()
		}
	})

	
})