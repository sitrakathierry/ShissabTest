$(document).on('change','#banque',function(event) {
	event.preventDefault();

	var id =  $(this).children("option:selected").attr('value');

	var url = Routing.generate('comptabilite_comptebancaire_list_by_banque',{
	    id_banque : id
	});

	var compte_selector = $('#compte_bancaire');
	compte_selector.html('');

	$.ajax({
        url: url,
        type: 'GET',
        success : function(data) {
          var options = "<option value=''></option>";

          if (data instanceof Array) {
              $.each(data, function (index, item) {
                  options += '<option data-id="'+ item.id +'" value="' + item.id + '">' + item.num_compte + '</option>';
              });
              compte_selector.append(options);
              compte_selector.select2();
          } else {
              return 0;
          }
        }
    })

})

$('#date').datepicker({
      todayBtn: "linked",
      keyboardNavigation: false,
      forceParse: false,
      calendarWeeks: true,
      autoclose: true,
      format: 'dd/mm/yyyy',
      language: 'fr',
});
$("#date").datepicker('setDate', new Date());

$(document).on('click','#btn-save',function(event) {
	event.preventDefault();
	var val_form = [
		$('#operation').val(),
		$('#num_operation').val(),
		$('#type_operation').val(),
		$('#id_banque').val(),
		$('#compte_bancaire').val(),
		$('#montant').val(),
		$('#op_nom').val()
	]

	var descri_form = [
		"Opération",
		"Num Opération",
		"Type Opération",
		"Banque",
		"Compte bancaire",
		"Montant",
		"Nom et Prénom"
	]

	var val_elem = "" ;
	var enregistre = true
	for (let i = 0; i < val_form.length; i++) {
		const element = val_form[i];
		if(element == "")
		{
			enregistre = false
			val_elem = descri_form[i]
			var vide = true
			break
		}

		if(i == 5)
		{
			if(element < 0)
			{
				enregistre = false
				val_elem = descri_form[i]
				var vide = false
				break
			}
		}
	}

	if(enregistre)
	{
		var data = {
			date : $('#date').val(),
			operation : $('#operation').val(),
			num_operation : $('#num_operation').val(),
			type_operation : $('#type_operation').val(),
			compte_bancaire : $('#compte_bancaire').val(),
			montant : $('#montant').val(),
			op_nom : $('#op_nom').val(),
		};

		if (data.type_operation == '' || data.montant == '' || data.operation == '' || data.operation == '' || data.compte_bancaire == '') {
			show_info('Attention','Champs obligatoire','warning');
			return;
		}

		var url = Routing.generate('comptabilite_mouvement_save');

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
					data: data,
					type: 'POST',
					success: function(res) {
						show_success('Succès','Opération enregistré!')
					}
				})
		
	});

	}
	else
	{
		if(vide)
		{
			swal({
				type: 'warning',
				title: val_elem+" Vide",
				text: "Remplissez le champ "+val_elem,
				// footer: '<a href="">Misy olana be</a>'
				})
		}
		else
		{
			swal({
				type: 'error',
				title: val_elem+"Négatif",
				text: "Vérifier et corriger le champ"+val_elem+" !",
				// footer: '<a href="">Misy olana be</a>'
				})
		}
		
	}

})

$('#banque').select2();