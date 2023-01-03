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
        $(".ref_produit").change(function(){
        var selfParent = $(this).parent().parent().parent().parent() ;
        var self = $(this)
        var url = Routing.generate("variation_prix_affiche") ;
        var data = {
            idProduitEntrepot:$(this).val()
            }
            if(selfParent.find('.produit').val() != "")
            {
                $.ajax({
                url: url,
                type: 'POST',
                data: data,
                success: function(res) {

                    $('tbody tr').each(function(){
                        if($(this).find('.type_appro').val() != 2)
                        {
                            $(this).find('.fournisseur').parent().parent().parent().attr("colspan","2") ;
                        }
                    })

                    $(".elem_title_varp").remove()
                    selfParent.find(".elem_content_varp").remove()

                    var element = '<th class="elem_title_varp" scope="col">VARIATION PRIX</th>' ;
                    $(element).insertBefore(".ajt_var_prix") ;
                    options = '' ;

                    for (let i = 0; i < res.length; i++) {
                        const element = res[i];
                        options += '<option value="'+element.id+'">'+ (Math.round(element.prix_vente*100) / 100) +'</option>' ;
                    }
                    element = `
                    <td class="elem_content_varp">
                        <div class="form-group">
                            <div class="col-sm-12">
                                <select name="var_prix_produit" class="var_prix_produit form-control" id="var_prix_produit" required>
                                    <option value=""></option>
                                    `+options+`
                                </select>
                            </div>
                        </div>
                    </td>
                    ` ;
                    $(element).insertAfter(selfParent.find(".ch_ref"))

                    }
                }) ;
            }
            else
            {
                $(this).val("")
                swal({
                    type: 'warning',
                    title: "Produit vide",
                    text: "Veullez sélectionner un Produit"
                })
            }
        })
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
                    $(".elem_title_varp").remove()
                    selfParent.find(".elem_content_varp").remove()
                    var options = '<option value=""></option>' ;
                    for (let i = 0; i < res.length; i++) {
                        const element = res[i];
                        options += '<option value="'+element.id+'" >'+element.code_produit+' | '+element.nom+'</option>' ;
                        // console.log(options)
                    }
                    selfParent.find(".produit").empty().append(options) ;
                    if(self.val() == 1)
                    {
                        selfParent.find(".ch_ref").empty().append(`
                        <div class="form-group">
                            <div class="col-sm-12">
                            <input  type="text" 
                                    class="form-control ref_produit_new" 
                                    value="" 
                                    placeholder="Ajoutez REF">
                            </div>
                        </div>
                        `) ;
                    }
                    else
                    {
                        selfParent.find('.fournisseur').parent().parent().parent().attr("colspan","0") ;
                        selfParent.find(".ch_ref").empty().append(`
                            <div class="form-group">
                                <div class="col-sm-12">
                                    <select name="ref_produit" class="ref_produit form-control" id="ref_produit" required>
                                        <option value=""></option>
                                    </select>
                                </div>
                            </div>
                        `) ;
                        clickReference() ;
                    }
                    // console.log(options)
                }
            })

            // alert("Bonjour SItraka") ;
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

    $(".produit").change(function()
    {
        var selfParent = $(this).parent().parent().parent().parent() ;
        var type_appro = selfParent.find("#type_appro").val() ;

        if(type_appro == 2)
        {
            if(type_appro != "")
            {
                var entrepot = selfParent.find(".entrepot").val() ;
                var url = Routing.generate('reference_produit_affiche')
                var data = {
                    entrepot:entrepot,
                    idProduit:$(this).val() 
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
                            options += '<option value="'+element.id+'" >'+element.indice+'</option>' ;
                        }
                        selfParent.find(".ref_produit").empty().append(options) ;
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
                <select name="type_appro" class="type_appro form-control" id="type_appro" required>
                <option value="" ></option>
                <option value="1" >Nouveau</option>
                <option value="2" >Existant</option>
                </select>
            </div>
            </div>
            </td>
        `
        var b = '<td><div class="form-group"><div class="col-sm-12"><select class="form-control select2 produit" name="produit[]">'+ produit_options +'</select></div></div></td>';
        var b1 = `
        <td class="ch_ref">
        <div class="form-group">
          <div class="col-sm-12">
            <select name="ref_produit" class="ref_produit form-control" id="ref_produit" required>
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
        var i = '<td class="td-montant"><div class="form-group"><div class="col-sm-6"><select class="form-control marge_type" name="marge_type[]"><option value="0">Montant</option><option value="1">%</option></select></div><div class="col-sm-6"><input type="number" class="form-control marge_valeur" name="marge_valeur[]" required=""></div></div></td>';
        var j = '<td class="td-montant"><div class="form-group"><div class="col-sm-12"><input type="number" class="form-control prix_vente" name="prix_vente[]" required=""></div></div></td>';
        var k = '<td class="td-montant"><div class="form-group"><div class="col-sm-12"><input type="number" class="form-control total" name="total[]" readonly=""></div></div></td><td></td>';

        var markup = '<tr data-id="'+ new_id +'">' + a + a1 + b + b1 + c + d + e + f + g + h + i + j + k + '</tr>';
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

        var qte = event.target.value;
        var prix_selector = $(this).closest('tr').find('.prix');
        var total_selector = $(this).closest('tr').find('.total');

        if (qte) {
        	var total = Number( prix_selector.val() ) * Number( qte );
        } else {
        	var total = prix_selector.val();
        }

        total_selector.val( total );
        calculTotal()
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

        var val_qte = ""
        var elem_descri = ""
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
            $(element).each(function(){
                elem_descri = tab_descri_appro[i]
                var qte = parseInt($(this).val())
                if(qte < 0)
                {
                    val_qte = "Negatif" ;
                    return false
                }
                else if(!Number.isInteger(qte))
                {
                    val_qte = "Vide" ;
                    return false
                }
            })
            if(val_qte != "")
            {
                break
            }
        }
            
        if(val_qte == "")
        {
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
                function () {
                    disabled_confirm(true);
                        
                    $.ajax({
                        url: url,
                        type: 'POST',
                        data: data,
                        success: function(res) {
                            show_success('Succès', 'Approvisionnement éffectué');
                        }
                    })
                
            });
        }
        else
        {
            if(val_qte == "Negatif")
            {
                swal({
                    type: 'warning',
                    title: elem_descri+" Negatif",
                    text: "Vérifier tous les "+elem_descri,
                    // footer: '<a href="">Misy olana be</a>'
                }) 
            }
            else
            {
                swal({
                    type: 'warning',
                    title: elem_descri+" vide ou invalide",
                    text: "Remplissez ou corriger les "+elem_descri,
                    // footer: '<a href="">Misy olana be</a>'
                }) 
            }
            
        }

    })

toutSurAppro() ;
 
})