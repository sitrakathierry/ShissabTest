$(document).ready(function(){

	$(document).on('click', '#btn_search', function(event) {
		event.preventDefault()
		load_list();
		
	})
	load_list();

	$('#nom_client').select2()

	function load_list() {
		var data = {
			agence : $('#agence').val(),
			statut : ($('#status_credit').val()).split("|")[0],
			statut_paiement : ($('#status_credit').val()).split("|")[1],
			type_date : $('#type_date').val(),
			mois : $('#mois').val(),  
			annee : $('#annee').val(),
			date_specifique : $('#date_specifique').val(),
			debut_date : $('#debut_date').val(),
			fin_date : $('#fin_date').val(),
			recherche_par: $('#recherche_par').val(),
            a_rechercher: $('#a_rechercher').val() 
		};

		var url = Routing.generate('credit_list');

		$.ajax({
			url: url,
			type: 'POST',
			data: data,
			success: function(res) {
				$('#list_commande').html(res)
			}
		})
	}

	$(document).on('click','.btn-validation',function(event) {
		event.preventDefault();

		var id = $(this).data('id');

		var url = Routing.generate('credit_validation', { id : id });

		disabled_confirm(false); 

      	swal({
            title: "Valider",
            text: "Voulez-vous vraiment valider ? ",
            type: "info",
            showCancelButton: true,
            confirmButtonText: "Oui",
            cancelButtonText: "Non",
        },
        function () {
            disabled_confirm(true);
                
        	$.ajax({
        		url: url,
        		type: 'GET',
        		success: function(res) {
        			show_success('Succès', 'Validation éffectué');
        		}
        	});
      	});
	})



});