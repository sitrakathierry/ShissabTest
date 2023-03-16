$(document).ready(function(){
	$(document).on('click','#btn-valider',function(event) {
		event.preventDefault();

		var data = {
			date_paiement : $('#date_paiement').val(),
			montant : $('#montant').val(),
			id : $('#id').val(),
		};

		var url = Routing.generate('credit_payer');

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
	        		type: 'POST',
	        		data: data,
	        		success: function(res) {
	        			show_success('Succès', 'Paiement effectué');
	        		}
	        	});
	          
      	});
	});

	$('.print_credit').click(function(event){
		event.preventDefault();
		
		var data = {
			id : $(this).attr('value'),
			objet : 5,
		};

		var url = Routing.generate('credit_pdf_editor');

		$.ajax({
			data: data,
			type: 'POST',
			url: url,
			dataType: 'html',
			success: function(data) {
				show_modal(data,'Modèle Impression');
				saveModelPdf()
			}
		});
	})
saveModelPdf()
function saveModelPdf()
{
	$('#id_save_modele_pdf').click(function(event){
			event.preventDefault();
			var data = {
				id : $('.print_credit').attr('value'),
				f_modele_pdf : $('#f_modele_pdf').val(),
			};

			var url = Routing.generate('credit_pdf_save');

			$.ajax({
				data: data,
				type: 'POST',
				url: url,
				success: function(data) {
					var route = Routing.generate('credit_pdf_paiement', { id : data.id });
					window.open(route, '_blank');
				}
			});
		})

}
	
 

});
