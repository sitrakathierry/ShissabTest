$(document).ready(function(){
    	$(document).on('change','#type_date',function(event) {

		var val = $(this).val();

		switch (val){
			case "0":
				$('.selector_mois').addClass('hidden');
				$('.selector_annee').addClass('hidden');
				$('.selector_fourchette').addClass('hidden');
				$('.selector_specifique').addClass('hidden');
				break;
			case "1":
				$('.selector_mois').addClass('hidden');
				$('.selector_annee').addClass('hidden');
				$('.selector_fourchette').addClass('hidden');
				$('.selector_specifique').addClass('hidden');
				break;
			case "2":
				$('.selector_mois').removeClass('hidden');
				$('.selector_annee').removeClass('hidden');
				$('.selector_fourchette').addClass('hidden');
				$('.selector_specifique').addClass('hidden');

				break;
			case "3":
				$('.selector_mois').addClass('hidden');
				$('.selector_annee').removeClass('hidden');
				$('.selector_fourchette').addClass('hidden');
				$('.selector_specifique').addClass('hidden');
				break;
			case "4":
				$('.selector_mois').addClass('hidden');
				$('.selector_annee').addClass('hidden');
				$('.selector_fourchette').addClass('hidden');
				$('.selector_specifique').removeClass('hidden');

				$('.input-datepicker').datepicker({
				      todayBtn: "linked",
				      keyboardNavigation: false,
				      forceParse: false,
				      calendarWeeks: true,
				      autoclose: true,
				      format: 'dd/mm/yyyy',
				      language: 'fr',
				  });
				break;

			case "5":
				$('.selector_mois').addClass('hidden');
				$('.selector_annee').addClass('hidden');
				$('.selector_specifique').addClass('hidden');
				$('.selector_fourchette').removeClass('hidden');
				$('.input-datepicker').datepicker({
			      todayBtn: "linked",
			      keyboardNavigation: false,
			      forceParse: false,
			      calendarWeeks: true,
			      autoclose: true,
			      format: 'dd/mm/yyyy',
			      language: 'fr',
				});
				break;
		}	

	})


    


})