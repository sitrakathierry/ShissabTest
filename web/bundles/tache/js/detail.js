$(document).ready(function(){

    function modifierUneTache()
       {
        $(".dt_modif_tache").click(function(){
        var self = $(this)
        var url = Routing.generate("tache_modifie") ;
        $(".dt_suppr_tache").css("display","none") ;
        $(".dt_termine_tache").css("display","none") ;
        $.ajax({
            url: url,
            type: 'post',
            data: {idTache:self.attr("value")},
            dataType:'json',
            success: function(res){
                // console.log(res) ;
                var uneTache = res[0] ;
                var allEmployeeByAgence = res[1] ;
                var employeeParTache = res[2] ;
                var allTypeTacheByAgence = res[3] ;
                var typeTacheParTache = res[4] ;
                var accessTache =  res[5] ;

                // console.log(employeeParTache[0].id) ;

                var optionsPers = '' ;
                var optionsOnePers = '' ;
                var passe ;
                
                for (let i = 0; i < allEmployeeByAgence.length; i++) {
                    var element = allEmployeeByAgence[i];
                    passe = false ;
                    for (let j = 0; j < employeeParTache.length; j++) {
                        if(element.id == employeeParTache[j].id)
                        {
                            optionsOnePers = `<option value="`+ element.id +`" selected class="capitalize"> `+ element.username +`</option>`
                            passe = true ;
                            break ;
                        }
                    }

                    if(!passe)
                    {
                        optionsOnePers = `<option value="`+ element.id +`" class="capitalize"> `+ element.username +`</option>`
                    }
                    optionsPers+= optionsOnePers ;
                }
                

                var optionsTypeTache = '' ;
                var optionsOneTypeTache = '' ;
                for (let i = 0; i < allTypeTacheByAgence.length; i++) {
                    const element = allTypeTacheByAgence[i];
                    passe = false ;
                    for (let j = 0; j < typeTacheParTache.length; j++) {
                        const tachetype = typeTacheParTache[j];
                        if(element.id == tachetype.idtypetache)
                        {
                            optionsOneTypeTache = `<option value="`+ element.id +`" selected class="capitalize"> `+ element.nom_type_tache +`</option>`
                            passe = true ;
                            break ;
                        }
                    }
                    
                    if(!passe)
                    {
                        optionsOneTypeTache = `<option value="`+ element.id +`" class="capitalize"> `+ element.nom_type_tache +`</option>`
                    }
                    optionsTypeTache+= optionsOneTypeTache ;
                }

                var selectedMn = "" ;
                var selectedH = "" ;
                var selectedJ = "" ;
                if(uneTache.type_duree == "mn")
                {
                    selectedMn = "selected" ;
                }
                else if(uneTache.type_duree == "h")
                {
                    selectedH = "selected" ;
                }
                else
                {
                    selectedJ = "selected" ;
                }

                var data = [
                    ".cal_date",
                    $(".dt_date_Deb_et_Fin"),
                    $(".dt_duree"),
                    $(".dt_personnes"),
                    $(".dt_types_tache"),
                    $(".dt_description")
                ] 
                var content = [
                    `
                    <tr>
                        <td class="text-center"><i class="fa fa-tasks" aria-hidden="true"></i></td>
                        <th>Tache</th>
                        <td>
                            <input type="text" name="mdf_tache" class="form-control mdf_tache" value="`+ uneTache.tache +`">
                        </td>
                    </tr>`,
                    `<span>Du</span>&emsp;<input type="date" value="`+ uneTache.date_debut +`" class="form-control mdf_date_debut" >
                    &emsp;<span>Au</span>&emsp;<input type="date" value="`+ uneTache.date_fin +`" class="form-control mdf_date_fin" >`
                    ,
                    `<input type="number" value="`+ uneTache.duree +`" class="form-control mdf_duree" style="width: 120px;" >
                    &emsp;
                    <select name="dt_type_duree" id="dt_type_duree" class="form-control mdf_type_duree" style="width: 220px;">
                        <option value="mn" `+ selectedMn +`>Minute</option>
                        <option value="h" `+ selectedH +`>Heure</option>
                        <option value="j" `+ selectedJ +`>Jour</option>
                    </select>`
                    ,
                    `<select name="dt_pers_assigne[]" class="dt_modif_select mdf_personne" id="dt_modif_select" multiple >
                        `+optionsPers+`
                    </select>`
                    ,
                    `<select name="dt_type_tache[]" class="dt_modif_select mdf_type_tache" id="dt_modif_select" multiple>
                        `+optionsTypeTache+`
                    </select>`
                    ,
                    ` <textarea name="dt_modif_description" class="form-control mdf_description" cols="2" rows="4">`+ uneTache.description +`</textarea>`
                    ,
                ]

                for (let i = 0; i < data.length; i++) {
                    const element = data[i];
                    if(i == 0)
                    {
                        $(content[i]).insertBefore(element) ;
                    }
                    else
                    {
                        element.empty().append(content[i]) ;
                    }
                    
                }

                new lc_select('.dt_modif_select', {
                    wrap_width : '100%',
                }); 
                var button = `
                    <button class="btn btn-success dt_annule_modif"><i class="fa fa-times"></i>&nbsp;Annuler</button>&emsp;
                    <button class="btn btn-primary dt_valid_modif" value="`+uneTache.id+`"><i class="fa fa-save"></i>&nbsp;Valider</button> 
                                ` ;
                $(button).insertAfter(".dt_modif_tache") ;
                $(".dt_ajout_comment").attr("disabled","true") ;
                self.remove() ;
                validerModification() ;
            }
        }) 
        })
    }

    function validerModification()
    {
        $(".dt_valid_modif").click(function(){
            var self = $(this)
            console.log(self.attr("value"))
            var data = [
                $('.mdf_tache'),
                $(".mdf_date_debut"),
                $(".mdf_date_fin"),
                $(".mdf_duree"),
                $(".mdf_type_duree"),
                $(".mdf_personne"),
                $(".mdf_type_tache"),
            ]

            var content = [
                "Tache",
                "Date debut",
                "Date Fin",
                "Duree",
                "Type Duree",
                "Personne assignée",
                "Type Tache",
            ]

            var enregistre = true ;
            var elem_vide = "" ;
            var negatif = false ;

            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                if(element.val() == "" || element.val() == null)
                {
                    enregistre = false ;
                    elem_vide = content[i]  ;
                    break;
                }
                if(i == 3)
                {
                    if(element.val()< 0)
                    {
                        enregistre = false ;
                        elem_vide = content[i]  ;
                        negatif = true ;
                        break;
                    }
                } 
            }

            if(enregistre)
            {
                var donnee = {
                    mdf_tache:$(".mdf_tache").val(),
                    mdf_date_debut:$(".mdf_date_debut").val(),
                    mdf_date_fin:$(".mdf_date_fin").val(),
                    mdf_duree:$(".mdf_duree").val(),
                    mdf_type_duree:$(".mdf_type_duree").val(),
                    mdf_personne:$(".mdf_personne").val(),
                    mdf_type_tache:$(".mdf_type_tache").val(),
                    mdf_description:$(".mdf_description").val(),
                    idTache:self.attr("value")
                }
                var url = Routing.generate("tache_valid_modif") ;
                swal({
                    title: "Modification de tâche",
                    text: "Etes-vous sure de vouloir modifier cette tâche?",
                    type:'info',
                    showCancelButton: true,
                    confirmButtonText: "Oui",
                    cancelButtonText: "Non",
                    // animation: "slide-from-top",
                    },
                    function (value) {
                        if(value)
                        {
                            $.ajax({
                                url: url,
                                type: 'post',
                                data: donnee,
                                success: function(res){
                                    if(res == "Succes")
                                    {
                                        show_success("Succès","La tache a été modifié") ;
                                    }
                                    else
                                    {
                                        show_info("Erreur",res,"error") ;
                                    }
                                    
                                    // setTimeout(rechargePage, 3000);
                                }
                            }) 
                        }
                    }) ;
                
            }
            else
            {
                if(negatif)
                {
                    swal({
                        type: 'error',
                        title: elem_vide+" négatif",
                        text: "Corriger "+elem_vide
                    })
                }
                else
                {
                    swal({
                        type: 'warning',
                        title: elem_vide+" vide",
                        text: "Vérifier le champ "+elem_vide
                    })
                }
            }
        })

        $(".dt_annule_modif").click(function(){
            location.reload();
        })
    }

    modifierUneTache() ;
    $(".dt_suppr_tache").click(function(e){
        e.preventDefault() ;
        var self = $(this) ;
            var url = Routing.generate("tache_supprime") ;
            swal({
                title: "Suppression de tâche",
                text: "Etes-vous sure de vouloir supprimer cette tâche?",
                type:'warning',
                showCancelButton: true,
                confirmButtonText: "Oui",
                cancelButtonText: "Non",
                // animation: "slide-from-top",
                },
                function (value) {
                    if(value)
                    {
                        $.ajax({
                            url: url,
                            type: 'post',
                            data: {idTache:self.attr("value")},
                            success: function(res){
                                show_info("Succès","La tache a été supprimé") ;
                                setTimeout(rechargePage, 3000);
                            }
                        }) 
                    }
                }) ;
    })

    function rechargePage()
    {
        var redirect = $(".redirect").val() ;
        location.href(redirect)
    }

    $(".dt_termine_tache").click(function(e)
    {
        e.preventDefault() ;
        var self = $(this) ;
        var url = Routing.generate("tache_termine") ;
        swal({
            title: "Fin de tâche",
            text: "Etes-vous sure que cette tâche est terminé ?",
            type:'info',
            showCancelButton: true,
            confirmButtonText: "Oui",
            cancelButtonText: "Non",
            // animation: "slide-from-top",
            },
            function (value) {
                if(value)
                {
                    $.ajax({
                        url: url,
                        type: 'post',
                        data: {idTache:self.attr("value")},
                        success: function(res){
                            show_info("Succès","La tache est terminé") ;
                            setTimeout(rechargePage, 3000);
                        }
                    }) 
                }
            }) ;

    }) 


})