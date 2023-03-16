$(document).ready(function(){
    // $('.depot_print').click(function(){
    //     alert('Traitement en cours . . .') ;
    // })

    $('.depot_print').click(function(event){
        event.preventDefault();
        var data = {
            f_id : $(this).attr('value'),
            objet : 1,
        };

        var url = Routing.generate('facture_modele_pdf_editor');

        $.ajax({
            data: data,
            type: 'POST',
            url: url,
            dataType: 'html',
            success: function(data) {
                show_modal(data,'Modèle Impression');
            }
        });
    });

    $(document).on('click','#id_save_modele_pdf',function(event) {
        event.preventDefault();

        var data = {
            f_id : $('.depot_print').attr('value'),
            f_modele_pdf : $('#f_modele_pdf').val(),
        };

        var url = Routing.generate('facture_modele_pdf_save');

        $.ajax({
            data: data,
            type: 'POST',
            url: url,
            success: function(data) {

                var route = Routing.generate('acompte_depot_pdf', { id : data.id });

                window.open(route, '_blank');
            }
        });

        })

})