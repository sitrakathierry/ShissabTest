$(document).ready(function(){

    function rechercherTache()
    {

        console.log($('.type_duree').val()) ;

          var data = {
            pers_assigne:$('.pers_assigne').val() ,
            type_tache:$('.type_tache').val() ,
            date_debut:$('.date_debut').val() ,
            date_fin:$('.date_fin').val() ,
            duree:$('.duree').val() ,
            type_duree:$('.type_duree').val() ,
            statutTache:$('.statutTache').val()
        }
        var url = Routing.generate("tache_afficher_recherche") ;
        $.ajax({
            url: url,
            type: 'post',
            data: data,
            dataType:'html',
            success : function(res)
            {
                $(".t_consult_tache").html(res) ;
            }
        }) 
    }

    $(".recherche_tache").click(function(){
        rechercherTache() ;
    })

    $('.btn_statut').click(function(){
        if($(this).attr("statut") == 3)
        {
            $('.pers_assigne').val("")
            $('.type_tache').val("")
            $('.date_debut').val("")
            $('.date_fin').val("")
            $('.duree').val("")
            $('.type_duree').val("")
            $('.statutTache').val("")
        }
        $('.statutTache').val($(this).attr("statut")) ;
        rechercherTache() ;
    })
}) 