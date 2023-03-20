$(document).ready(function(){
    $('.mise_a_jour_acompte').click(function(){
        swal({
            title: "Mise à jour",
            text: "Voulez-vous vraiment mettre à jour ? ",
            type: "info",
            showCancelButton: true,
            confirmButtonText: "Oui",
            cancelButtonText: "Non",
        },
        function () {
            var factures = [] ;
            var date_livraisons = []
            $('.date_livre_acompte').each(function(){
                factures.push($(this).attr('idFacture'))
                date_livraisons.push($(this).val())
            })
            
            var url = Routing.generate('update_livraison_acompte')
            $.ajax({
                url:url ,
                type:'post',
                data:{factures:factures,date_livraisons:date_livraisons},
                dataType:'json',
                success:function(res){
                    show_success('Succès','Date modifié avec succès') ;
                }
            })
      });

    })
})