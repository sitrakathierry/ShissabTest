$(document).ready(function(){
    function changeProduitFactDef()
    {
        $(".f_input_produit").click(function(){
            var self = $(this) ; 
            var url = Routing.generate("variation_produit_affiche") ;
            $.ajax({
                type: 'POST',
                url: url,
                data: data,
                dataType: 'json',
                success: function(res) {
                    // console.log(res) ;
                    var options = ""
                    for (let i = 0; i < res.length; i++) {
                        const element = res[i];
                        if(self.attr("data-id") == element.id)
                        {
                            options += ` 
                                <option
                                        value="`+element.id+`"
                                        selected
                                        data-prixvente="`+element.prix_vente+`"
                                        data-stock="`+element.stock+`"
                                    >`+element.nom+" - "+element.prix_vente+` KMF</option>
                                `
                        }
                        else
                        {
                            options += ` 
                                <option
                                        value="`+element.id+`"
                                        data-prixvente="`+element.prix_vente+`"
                                        data-stock="`+element.stock+`"
                                    >`+element.nom+" - "+element.prix_vente+` KMF</option>
                                `
                        }
                        
                    }

                    var content = `
                    <select class="form-control select2 f_produit" name="f_produit[]" style="min-width: 250px ;">
                        `+options+`
                    </select>
                    `
                    $(content).insertBefore(self) ;
                    self.remove() ;
                }
            }) ;
            
            
        })    
    }

    $(document).on('change','.f_auto_devise',function(event) {
        event.preventDefault();

        var montantprincipal = $(this).children('option:selected').data('montantprincipal');
        var montantconversion = $(this).children('option:selected').data('montantconversion');
        var total = $('#total').val();

        var montant_converti = (Number( total ) * Number( montantconversion )) / Number( montantprincipal );

        $(this).closest('tr').find('.f_auto_montant_converti').val( montant_converti.toFixed(2) );
    })
    
    changeProduitFactDef()

    $(document).ready(function(){
        $('.f_designation').each(function(){
            $('.f_designation').Editor();
        })
    })

    $(document).on('change','.f_libre',function(event) {
        var libre = $(this).children("option:selected").val();

        if (libre == 1) {
            $(this).closest('tr').find('.f_produit').addClass('hidden');
            $(this).closest('tr').find('.f_designation_container').removeClass('hidden');
            // $(this).closest('tr').find('.f_prix').removeAttr("readonly")
            // $('.f_designation').Editor();
        } else {
            $(this).closest('tr').find('.f_produit').removeClass('hidden');
            $(this).closest('tr').find('.f_designation_container').addClass('hidden');
            // $(this).closest('tr').find('.f_prix').attr("readonly","true")
        }
    })


    // $('#descr').Editor();

    $('#f_client').select2();
        
    $('.select2').select2();

    $('#data_1 .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        format: 'dd/mm/yyyy',
        language: 'fr',

    });

    $("#data_1 .input-group.date").datepicker('setDate', $(".f_date").attr("value"));

    $(document).on('click', '.btn-add-row', function(event) {
        event.preventDefault();
        var id = $('#id-row').val();
        var new_id = parseInt(id) + 1;
        var produits = $('.f_produit').html();
        var type = $("#f_type").val();

        // console.log(produits)
        var a ='<td><div class="form-group"><div class="col-sm-12"><select class="form-control f_libre" name="f_libre[]"><option value="0">PRODUIT</option><option value="1">AUTRE</option></select></div></div></td>';
        var b = ''
        if(type == 1)
        {
             b = `<td>
                    <div class="form-group">
                        <div class="col-sm-12">
                            <select class="form-control select2 f_produit" name="f_produit[]">
                            `+ produits +`
                            </select>
                            <div class="f_designation_container hidden">
                                <textarea class="editor f_designation" name="f_designation[]">
                                </textarea>
                            </div>
                        </div>
                    </div>
                </td>`;
        } 
        else if(type == 2)
        { 
             b = `<td>
                    <div class="form-group">
                        <div class="col-sm-12">
                        <select class="form-control select2 f_produit" name="f_code_produit[]">
                            `+ produits +`
                        </select>
                        <div class="f_designation_container hidden">
                            <textarea class="editor f_designation" name="f_designation[]">
                            </textarea>
                        </div>
                        </div>
                    </div>
                </td>`;
        }
       
        var c = '<td><div class="form-group"><div class="col-sm-12"><input type="number" class="form-control f_qte" name="f_qte[]"></div></div></td>';
        if(type == 1)
        {
            var d = `<td><div class="form-group"><div class="col-sm-12">
                <input type="number" class="f_prix form-control" name="f_prix[]">
            </div></div></td>`;
        }
        else
        {
            var d = `<td><div class="form-group"><div class="col-sm-12">
            <input type="hidden" class="f_prod_variation" name="f_produit[]">
            <select name="f_prix[]" class="f_prix form-control">
              <option value=""></option>
            </select>
            </div></div></td>`;
        }
        
        var e = '<td><div class="form-group"><div class="col-sm-4"><select class="form-control f_remise_type_ligne" name="f_remise_type_ligne[]"><option value="0">%</option><option value="1">Montant</option></select></div><div class="col-sm-8"><input type="number" class="form-control f_remise_ligne" name="f_remise_ligne[]" ></div></div></td>';
        var f = '<td class="td-montant"><div class="form-group"><div class="col-sm-12"><input type="number" class="form-control f_montant" name="f_montant[]"></div></div></td>';
        var g = '<td></td>';
        var markup = '<tr class="fact-row row-'+ new_id +'">' + a + b + c + d + e + f + g + '</tr>';
        $("#table-fact-add tbody#principal").append(markup);
        $('#id-row').val(new_id);
        $('.f_designation').Editor();
        // $('.fact-row row-'+new_id).find(".select2").select2("destroy");
        $("select.select2").select2();
        chargeProduit()
        changePrix()
        $('#table-fact-add tbody tr:last').find('.f_prix').val()

    });

    $(document).on('click', '.btn-remove-row', function(event) {
        event.preventDefault();
        var id     = parseInt($('#id-row').val());


        var new_id = id - 1;
        if (new_id >= 0) {
            $('#id-row').val(new_id);

            $('#table-fact-add tbody tr:last').remove();
        } else {
            show_info("Attention", 'Le tableau devrait contenir au moins une ligne','error');
        }

        $('.f_designation').Editor();

        calculMontant();
    });

    $(document).on('input','.f_remise_ligne',function(event) {

        var prix = Number( $(this).closest('tr').find('.f_prix').val() );
        var qte = Number( $(this).closest('tr').find('.f_qte').val() );

        var f_remise_type_ligne = $(this).closest('tr').find('.f_remise_type_ligne').val();
        var f_remise_ligne = event.target.value;

        var total = prix;

        if (qte) {
            total = qte * prix
        }

        var remise_ligne_montant = 0;

        if (f_remise_type_ligne == '1') {
            remise_ligne_montant = Number( f_remise_ligne );
        } else {
            remise_ligne_montant = (total * Number( f_remise_ligne )) / 100;

            // console.log(remise_ligne_montant)
        }

        total = total - remise_ligne_montant;

        var montant_selector = $(this).closest('tr').find('.f_montant');

        montant_selector.val(total);

        calculMontant()

    
    })

    $(document).on('change','.f_remise_type_ligne',function(event) {
        event.preventDefault();

        var prix = Number( $(this).closest('tr').find('.f_prix').val() );
        var qte = Number( $(this).closest('tr').find('.f_qte').val() );

        var f_remise_type_ligne = $(this).children("option:selected").val();
        var f_remise_ligne = $(this).closest('tr').find('.f_remise_ligne').val();

        var total = prix;

        if (qte) {
            total = qte * prix
        }

        var remise_ligne_montant = 0;

        if (f_remise_type_ligne == '1') {
            remise_ligne_montant = Number( f_remise_ligne );
        } else {
            remise_ligne_montant = (total * Number( f_remise_ligne )) / 100;

            // console.log(remise_ligne_montant)
        }

        total = total - remise_ligne_montant;

        var montant_selector = $(this).closest('tr').find('.f_montant');

        montant_selector.val(total);

        calculMontant()

    })

    $(document).on('input','.f_prix',function (event) {

        var prix = Number( event.target.value );
        var qte = Number( $(this).closest('tr').find('.f_qte').val() );

        var f_remise_type_ligne = $(this).closest('tr').find('.f_remise_type_ligne').val();
        var f_remise_ligne = $(this).closest('tr').find('.f_remise_ligne').val();

        var total = prix;

        if (qte) {
            total = qte * prix
        }

        var remise_ligne_montant = 0;

        if (f_remise_type_ligne == '1') {
            remise_ligne_montant = Number( f_remise_ligne );
        } else {
            remise_ligne_montant = (total * Number( f_remise_ligne )) / 100;

            // console.log(remise_ligne_montant)
        }

        total = total - remise_ligne_montant;

        var montant_selector = $(this).closest('tr').find('.f_montant');

        montant_selector.val(total);

        calculMontant()


    })

    $(document).on('input','.f_qte',function (event) {

        var qte = Number( event.target.value );
        
        var prixTemp = $(this).closest('tr').find('.f_prix').val();

        if(prixTemp.split('|')[1] != undefined)
        {
            var prix = prixTemp.split('|')[0]
        }
        else
        {
            var prix = prixTemp
        }

        var f_remise_type_ligne = $(this).closest('tr').find('.f_remise_type_ligne').val();
        var f_remise_ligne = $(this).closest('tr').find('.f_remise_ligne').val();

        prix = prix ? prix : 0;

        var total = prix;


        if (qte) {
            total = qte * prix
        }
        
        var remise_ligne_montant = 0;

        if (f_remise_type_ligne == '1') {
            remise_ligne_montant = Number( f_remise_ligne );
        } else {
            remise_ligne_montant = (total * Number( f_remise_ligne )) / 100;
        }

        total = total - remise_ligne_montant;

        var montant_selector = $(this).closest('tr').find('.f_montant');

        montant_selector.val(total);

        calculMontant()

        var stockProduit = $(this).closest('tr').find('.f_produit').find('option:selected').data('stock')
        var codeProduit = $(this).closest('tr').find('.f_produit').find('option:selected').data('code')

        var type = $("#f_type").val();
        if(type == 1)
        {
            if(qte != '')
            {
                if(stockProduit == 0)
                {
                    swal({
                    type: "warning",
                    title: "Code Produit : "+codeProduit+" | Stock à 0",
                    text: "Le produit "+codeProduit+" est en rupture de stock. Veuiller faire approvisionnement",
                    });

                    $('#btn-save').attr('disabled','')
                }
                else if(qte > stockProduit)
                {
                    swal({
                    type: "warning",
                    title: "La quantité dépasse le Stock",
                    text: "La quantité du Produit "+codeProduit+" ne doit pas dépasser de "+stockProduit,
                    });

                    $('#btn-save').attr('disabled','')
                }
                else
                {
                    $('#btn-save').removeAttr('disabled')
                }
            }
            else
            {
                $('#btn-save').removeAttr('disabled')
            }
        }
        
    })

    var montant = 0;
    var remise = 0;
    var total = 0;

    $(document).on('input','#f_remise',function (event) {
        var value = event.target.value;
        calculRemise(value);
    });

    $(document).on('change','#f_remise_type',function(event) {
        event.preventDefault();

        calculRemise( Number( $('#f_remise').val() ) );

    })

    $(document).on('change', '#f_recu', function(event) {
        var recu = $(this).val();
        var url = Routing.generate('facture_produit_recu', { recu : recu });

        $.ajax({
            url : url,
            type : 'GET', 
            success : function(res) {
                if(res.tpl != "    ")
                {
                    $('#table-fact-add tbody').html(res.tpl);
                    changeProduitFactDef() ;
                    calculMontant();
                } 
            }
        })
    });



})
