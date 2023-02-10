$(document).ready(function(){

	$('.input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        format: 'dd/mm/yyyy',
        language: 'fr'
    });

    $('.expirer').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        format: 'dd/mm/yyyy',
        language: 'fr'
    });

	$('.select2').select2();

        
    // FORMULAIRE D'APPROVISIONNEMENT
function toutSurAppro()
{
    function clickReference()
    {
        // $(".ref_produit").change(function(){
        // var selfParent = $(this).parent().parent().parent().parent() ;
        // var self = $(this)
        // var url = Routing.generate("variation_prix_affiche") ;
        // var data = {
        //     idProduitEntrepot:$(this).val()
        //     }
        //     if(selfParent.find('.produit').val() != "")
        //     {
        //         $.ajax({
        //         url: url,
        //         type: 'POST',
        //         data: data,
        //         success: function(res) {
        //             }
        //         }) ;
        //     }
        //     else
        //     {
        //         $(this).val("")
        //         swal({
        //             type: 'warning',
        //             title: "Produit vide",
        //             text: "Veullez sélectionner un Produit"
        //         })
        //     }
        // })
    }

    

    $(".type_appro").change(function(){
        var selfParent = $(this).parent().parent().parent().parent() ;
        var entrepot = selfParent.find(".entrepot").val() ;
        var self = $(this)
        if(entrepot != "")
        {
            var url = Routing.generate("produit_entrepot_affiche") ;
            var data = {
                entrepot:entrepot,
                typeid:$(this).val()
            }
            $.ajax({
                url: url,
                type: 'POST',
                data: data,
                success: function(res) {
                    var options = '<option value=""></option>' ;
                    for (let i = 0; i < res.length; i++) {
                        const element = res[i];
                        options += '<option value="'+element.id+'" >'+element.code_produit+' | '+element.nom+'</option>' ;
                    }
                    selfParent.find(".produit").empty().append(options) ;
                    if(self.val() == 1)
                    {
                        selfParent.find('.prix').removeAttr('disabled')
                        selfParent.find('.charge').removeAttr('disabled')
                        selfParent.find('.prix_revient').removeAttr('disabled')
                        selfParent.find('.marge_valeur').removeAttr('disabled')
                        selfParent.find('.marge_type').removeAttr('disabled')
                        selfParent.find('.prix_vente').removeAttr('disabled')
                        // console.log("bla bla be") ;
                        swal({
                            title: "Indice",
                            text: "Voulez-vous créer une nouvelle indice ? ",
                            type:'info',
                            showCancelButton: true,
                            confirmButtonText: "Oui",
                            cancelButtonText: "Non",
                            },
                            function (value) {
                                if(value)
                                {
                                    selfParent.find('.choix_nouveau').val(1)
                                    selfParent.find(".ch_ref").empty().append(`
                                    <div class="form-group">
                                        <div class="col-sm-12">
                                        <input  type="text" 
                                                name="ref_produit[]"
                                                class="form-control ref_produit" 
                                                value="" 
                                                placeholder="Indice ...">
                                        </div>
                                    </div>
                                    `) ;
                                }
                                else
                                {
                                    selfParent.find('.choix_nouveau').val(0)
                                }
                        }) ;
                    } 
                    else
                    {
                        selfParent.find('.prix').attr('disabled','true')
                        selfParent.find('.charge').attr('disabled','true')
                        selfParent.find('.prix_revient').attr('disabled','true')
                        selfParent.find('.marge_valeur').attr('disabled','true')
                        selfParent.find('.marge_type').attr('disabled','true')
                        selfParent.find('.prix_vente').attr('disabled','true')

                        selfParent.find(".ch_ref").empty().append(`
                            <div class="form-group">
                                <div class="col-sm-12">
                                    <select type="select" name="ref_produit[]" class="ref_produit form-control" id="ref_produit" required>
                                        <option value=""></option>
                                    </select>
                                </div>
                            </div>
                        `) ;
                        clickReference() ;
                    }
                }
            })

        }
        else
        {
            $(this).val("")
            swal({
                type: 'warning',
                title: "Entrepot vide",
                text: "Veullez sélectionner un entrepot"
            })
        }
    })

    clickReference() ;

    $(".prix_produit").change(function(){
        var self = $(this) ;
        var url = Routing.generate("produit_affiche_info_supp")
        $.ajax({
            url: url,
            type: 'POST',
            data: {idVariation:self.val()},
            success: function(res) { 
                var type_appro = self.closest('tr').find("#type_appro").val() ;

                if(type_appro == 1)
                {
                    if(self.val() != "")
                    {
                        self.closest('tr').find('.prix').attr('disabled','true')
                        self.closest('tr').find('.charge').attr('disabled','true')
                        self.closest('tr').find('.prix_revient').attr('disabled','true')
                        self.closest('tr').find('.marge_valeur').attr('disabled','true')
                        self.closest('tr').find('.marge_type').attr('disabled','true')
                        self.closest('tr').find('.prix_vente').attr('disabled','true')
                    }
                    else
                    {
                        self.closest('tr').find('.prix').removeAttr('disabled')
                        self.closest('tr').find('.charge').removeAttr('disabled')
                        self.closest('tr').find('.prix_revient').removeAttr('disabled')
                        self.closest('tr').find('.marge_valeur').removeAttr('disabled')
                        self.closest('tr').find('.marge_type').removeAttr('disabled')
                        self.closest('tr').find('.prix_vente').removeAttr('disabled')
                    }
                }
                
                var marge_type = self.closest('tr').find(".marge_type")
                var marge_valeur = self.closest('tr').find(".marge_valeur")
                var prix_vente = self.closest('tr').find(".prix_vente")
                var ref_produit = self.closest('tr').find(".ref_produit")

                if(ref_produit.attr("type") == "select")
                    ref_produit.val(res.indice)

                marge_type.val(res.marge_type)
                marge_valeur.val(res.marge_valeur)
                prix_vente.val(res.prix_vente)
            }
        })
    })

    $(".produit").change(function()
    {
        var selfParent = $(this).parent().parent().parent().parent() ;
        var type_appro = selfParent.find("#type_appro").val() ;
        // var entrepot = selfParent.find(".entrepot_produit ").val() ;
        var self = $(this) ;
        if(type_appro != "")
        {
                var url = Routing.generate("prix_produit_affiche")
                $.ajax({
                    url: url, 
                    type: 'POST',
                    data: {idProduit:self.val()},
                    success: function(res) {
                        if((res.length > 0 && type_appro == 2)  || (type_appro == 1))
                        {
                            if((res.length > 1 && type_appro == 2) || (type_appro == 1))
                            {
                                var options = '<option value=""></option>' ;
                                for (let i = 0; i < res.length; i++) 
                                {
                                    const element = res[i];
                                    options += '<option value="'+element.id+'" >'+element.prix_vente+'</option>' ;
                                }
                            }
                            else
                            {
                                    options += '<option value="'+res[0].id+'" >'+res[0].prix_vente+'</option>' ;
                            }
                            
                            selfParent.find(".prix_produit").empty().append(options) ;
                            selfParent.find(".prix_produit").change()
                        }
                        else
                        {
                            swal({
                                type: 'info',
                                title: "Prix Produit vide",
                                text: "Veullez ajouter une variation de prix pour ce produit"
                            })
                        }
                    }
                })
        }
        else
        {
            $(this).val("")
            swal({
                type: 'warning',
                title: "Type vide",
                text: "Veullez sélectionner un Type"
            })
        }

        
        
    })

    $(".entrepot").change(function(){
        var selfParent = $(this).parent().parent().parent().parent() ;
        var type_appro = selfParent.find("#type_appro").val() ;
        if(type_appro != '')
        {
            var url = Routing.generate("produit_entrepot_affiche") ;
            var data = {
                entrepot:$(this).val(),
                typeid:type_appro
            }
            $.ajax({
                url: url,
                type: 'POST',
                data: data,
                success: function(res) {
                    $(".elem_title_varp").remove()
                    selfParent.find(".elem_content_varp").remove()
                    
                    var options = '<option value=""></option>' ;
                    for (let i = 0; i < res.length; i++) {
                        const element = res[i];
                        options += '<option value="'+element.id+'" >'+element.code_produit+' | '+element.nom+'</option>' ;
                        // console.log(options)
                    }
                    selfParent.find(".produit").empty().append(options) ;
                    // console.log(options)
                }
            })
        }
    })
}

	$(document).on('click', '.btn-add-row', function(event) {
        event.preventDefault();
        var id = $('#id-row').val();
        var new_id = parseInt(id) + 1;
        var produit_options = $('.produit').html();
        var entrepot_options = $('.entrepot').html();
        var fournisseur_options = $('.fournisseur').html();

        var a = '<td><div class="form-group"><div class="col-sm-12"><select class="form-control select2 entrepot entrepot_produit" name="entrepot[]">'+ entrepot_options +'</select></div></div></td>';
        var a1 = `
            <td>
            <div class="form-group">
            <div class="col-sm-12">
            <input type="hidden" name="choix_nouveau[]" class="choix_nouveau" value="0" >
                <select name="type_appro[]" class="type_appro form-control" id="type_appro" required>
                <option value="" ></option>
                <option value="1" >Nouveau</option>
                <option value="2" >Existant</option>
                </select>
            </div>
            </div>
            </td>
        `
        var b = '<td><div class="form-group"><div class="col-sm-12"><select class="form-control select2 produit" name="produit[]">'+ produit_options +'</select></div></div></td>';
        var b0 = `
            <td>
                <div class="form-group">
                <div class="col-sm-12">
                    <select name="prix_produit[]" class="prix_produit form-control" id="prix_produit" style="min-width: 100px;" required>
                    <option value="" ></option>
                    </select>
                </div>
                </div>
            </td>
        `
        var b1 = ` 
        <td class="ch_ref">
        <div class="form-group">
          <div class="col-sm-12">
            <select name="ref_produit[]" class="ref_produit form-control" id="ref_produit" required>
              <option value=""></option>
            </select>
          </div>
        </div>
      </td>
        `
        var c = '<td><div class="form-group"><div class="col-sm-12"><select class="form-control select2 fournisseur" name="fournisseur[]" multiple="">'+ fournisseur_options +'</select></div></div></td>';
        var d = '<td><div class="form-group"><div class="col-sm-12"><input type="number" class="form-control qte" name="qte[]" required=""></div></div></td>';
        var e = '<td><div class="form-group"><div class="col-sm-12"><input type="text" class="form-control expirer" name="expirer[]" required=""></div></div></td>';
        var f = '<td class="td-montant"><div class="form-group"><div class="col-sm-12"><input type="number" class="form-control prix" name="prix[]" required=""></div></div></td>';
        var g = '<td class="td-montant"><div class="form-group"><div class="col-sm-12"><input type="number" class="form-control charge" name="charge[]" required=""></div></div></td>';
        var h = '<td class="td-montant"><div class="form-group"><div class="col-sm-12"><input type="number" class="form-control prix_revient" name="prix_revient[]" required=""></div></div></td>';
        var i = '<td class="td-montant"><div class="form-group"><div class="col-sm-12" style="margin-bottom: 10px;"><select class="form-control marge_type" name="marge_type[]"><option value="0">Montant</option><option value="1">%</option></select></div><div class="col-sm-12"><input type="number" class="form-control marge_valeur" name="marge_valeur[]" required=""></div></div></td>';
        var j = '<td class="td-montant"><div class="form-group"><div class="col-sm-12"><input type="number" class="form-control prix_vente" name="prix_vente[]" required=""></div></div></td>';
        var k = '<td class="td-montant"><div class="form-group"><div class="col-sm-12"><input type="number" class="form-control total" name="total[]" readonly=""></div></div></td><td></td>';

        var markup = '<tr data-id="'+ new_id +'">' + a + a1 + b + b0 + b1 + c + d + e + f + g + h + i + j + k + '</tr>';
        $("#table-appro-add tbody").append(markup);
        toutSurAppro() ;
        $('#id-row').val(new_id);

        $('.select2').select2();

        $('.expirer').datepicker({
            todayBtn: "linked",
            keyboardNavigation: false,
            forceParse: false,
            calendarWeeks: true,
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'fr'
        });
        calculTotal();
        // afficheProduitParEntrepot() ;

    });


    // var afficheProduitParEntrepot = function()
    // {
    //     $('.entrepot_produit').change(function(){
            
    //         swal({
	// 			type: 'info',
	// 			title: 'Test',
	// 			text: 'Hello Sitraka !'
	// 			// footer: '<a href="">Misy olana be</a>'
	// 		  })


    //         return false
    //     })
    // }
    // afficheProduitParEntrepot() ;

    $(document).on('click', '.btn-remove-row', function(event) {
        event.preventDefault();
        var id     = parseInt($('#id-row').val());
        var new_id = id - 1;
        if (new_id >= 0) {
            $('#id-row').val(new_id);
            $('#table-appro-add tbody tr:last').remove();
        } else {
            show_info("Attention", 'Le tableau devrait contenir au moins une ligne','error');
        }
        calculTotal();
    });

    $(document).on('input','.qte',function (event) {
        var self = $(this)
        var total_selector = $(this).closest('tr').find('.total');

        if(self.closest('tr').find(".type_appro").val() == 1)
        {
            if(self.closest('tr').find(".prix_produit").val() != "")
            {
                var prix_vente = self.closest('tr').find('.prix_vente').val()
                total_selector.val(prix_vente * self.val()) ;
                calculTotal()
            }
            else
            {
                var qte = event.target.value;
                var prix_selector = $(this).closest('tr').find('.prix');

                if (qte) {
                    var total = Number( prix_selector.val() ) * Number( qte );
                } else {
                    var total = prix_selector.val();
                }
                total_selector.val( total );
                calculTotal()
            }


        }
        else
        {
            var prix_vente = self.closest('tr').find('.prix_vente').val()
            total_selector.val(prix_vente * self.val()) ;
            calculTotal()
        }
        
    });

    function calcul_marge(prix_revient, calcul, valeur) {
        var marge = 0;
        if (calcul == 0) {
            marge = valeur;
        } else {
            marge = (prix_revient * valeur) / 100;
        }

        return marge;
    }

    var tab_input = [
        ".qte",
        ".prix",
        ".charge",
        ".marge_type",
        ".marge_valeur"
    ]
    
for (let i = 0; i < tab_input.length; i++) {
    const element = tab_input[i];
    $(document).on('input',element,function (event) {
        if((element != ".qte") || (element == ".qte" && $(this).closest('tr').find(".type_appro").val() == 1 && $(this).closest('tr').find(".prix_produit").val() == ""))
        {
            var tr = $(this).closest('tr');
            var prix_achat = tr.find('.prix').val();
            var charge = tr.find('.charge').val();
            var prix_revient = Number(prix_achat) + Number(charge);
            var calcul = Number( tr.find('.marge_type').val() );
            var valeur = Number( tr.find('.marge_valeur').val() );
            var qte = Number( tr.find('.qte').val() );
            var marge = calcul_marge(prix_revient,calcul,valeur);
            var prix_vente = prix_revient + marge;
            var total = qte * Number( prix_vente );
            tr.find('.prix_revient').val(prix_revient);
            tr.find('.prix_vente').val(prix_vente);
            tr.find('.total').val(total);
            calculTotal()
        }
    });
}


    var montant_total = 0;


    function calculTotal() {

        montant_total = 0;

        $('table#table-appro-add > tbody  > tr').each(function(index, tr) { 
           var montant_selector = $(this).find(".total");

           var montant = montant_selector.val();

           montant_total += Number(montant);

           $('#montant_total').val(montant_total);
          
        });
    }

    $(document).on('click', '#btn-save', function(event) {
    	event.preventDefault();
        var self = $(this)
        var enregistre = true ;

        var existant = false ;
        var nouveau = false ;
        var vide = false ;
        var e_vide = false ;
        var e_negatif = false ;
        var n_vide = false ;
        var n_negatif = false ;
        var label_msg = "" ;
        var v = 0 ;

        $(".type_appro").each(function(){
            var self = $(this)
            if(self.val() == 1)
            {
                nouveau = true ;
                n_vide = false ;
                n_negatif = false ;
                
                if(self.closest('tr').find('.choix_nouveau').val() == 1)
                {
                    if(self.closest('tr').find('.ref_produit').val() =="")
                    {
                        n_vide = true ;
                        label_msg = "Indice" ;
                        return ;
                    }
                }
                
                if(self.closest('tr').find('.prix_produit').val() == "")
                {
                    var tab_elem_appro = [
                        ".qte",
                        ".prix",
                        ".charge",
                        ".prix_revient",
                        ".marge_valeur",
                        ".prix_vente"
                    ]

                    var tab_descri_appro = [
                        "Quantité",
                        "Prix d'achat",
                        "Charge",
                        "Prix de revient",
                        "Marge",
                        "Prix de vente"
                    ]

                    for (let i = 0; i < tab_elem_appro.length; i++) {
                        const element = tab_elem_appro[i];
                        if(self.closest('tr').find(element).val() == "")
                        {
                            n_vide = true ;
                            label_msg = tab_descri_appro[i] ;
                            break;
                        }
                        else if(self.closest('tr').find(element).val() < 0)
                        {
                            n_negatif = true ;
                            label_msg = tab_descri_appro[i] ;
                            break;
                        }
                    }

                    if(n_negatif || n_vide)
                    {
                        return ;
                    }

                }
                else if(self.closest('tr').find('.prix_produit').val() != "")
                {
                    if(self.closest('tr').find(".qte").val() == "")
                    {
                        label_msg = "Quantité"
                        n_vide = true ;
                        return ;
                    }
                    else if(self.closest('tr').find(".qte").val() < 0 )
                    {
                        label_msg = "Quantité"
                        n_negatif = true ;
                        return ;
                    }
                }

            }
            else if(self.val() == 2)
            {
                existant = true ;
                e_vide = false ;
                e_negatif = false ;
                if(self.closest('tr').find(".prix_produit") == "")
                {
                    label_msg = "Prix Produit"
                    e_vide = true ;
                    return ;
                }
                else if(self.closest('tr').find(".qte").val() == "")
                {
                    label_msg = "Quantité"
                    e_vide = true ;
                    return ;
                }
                else if(self.closest('tr').find(".qte").val() < 0 )
                {
                    label_msg = "Quantité"
                    e_negatif = true ;
                    return ;
                }
            }
            else
            {
                vide = true ;
                return ;
            }
            console.log(v) ;
            v++ ;
        })

        if(vide)
        {
            show_info('Erreur', "Type d\'approvisionnement vide",'error');
        }
        else if(nouveau)
        {
            if(n_vide)
            {
                show_info('Erreur', label_msg+" vide",'error');
                enregistre = false ;
            }
            else if(n_negatif)
            {
                show_info('Erreur', label_msg+" négatif",'error');
                enregistre = false ;
            }
        }
        else if(existant)
        {
            if(e_vide)
            {
                show_info('Erreur', label_msg+" vide",'error');
                enregistre = false ;
            }
            else if(e_negatif)
            {
                show_info('Erreur', label_msg+" négatif",'error');
                enregistre = false ;
            }
        }
        
        if(enregistre)
        {
            // console.log("Entrer") ;
            self.attr("disabled","true")
            var data = $('#form-appro').serializeArray();
            var id = $('#id-appro').val();
            if(id)
                data.push({name: "appro_id", value: id});

            
            var url = Routing.generate('produit_approvisionnement_save');

            disabled_confirm(false); 

            swal({
                    title: "Enregistrer",
                    text: "Voulez-vous vraiment enregistrer ? ",
                    type: "info",
                    showCancelButton: true,
                    confirmButtonText: "Oui",
                    cancelButtonText: "Non",
                },
                function (value) {
                    // disabled_confirm(true);
                    if(value)
                    {
                        $.ajax({
                        url: url,
                        type: 'POST',
                        data: data,
                        success: function(res) {
                            show_success('Succès', 'Approvisionnement éffectué');
                            }
                        })
                    }
                    else
                    {
                        self.removeAttr("disabled")
                    }

            });
            
        }

    })

toutSurAppro() ;
 
})