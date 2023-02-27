var cl_row_edited = 'r-cl-edited';

var datas = [];
$(document).ready(function(){

    // load_list();

    function instance_list_grid() {
        var colNames = ['Bénéficiaire','Mode de paiement','N° / Ref','Montant','Num Fact.','Date déclaration','Mois','Service','Motif', ''];
        var colModel = [{
                name    : 'beneficiaire',
                index   : 'beneficiaire',
                align   : 'left',
                editable: false,
                sortable: false,
                classes : 'js-beneficiaire',
                formatter: function(v, i, r) {
                    if (r.depense_type == 2) {
                        return r.prestataire;
                    }

                    return v;
                }
            },{
                name    : 'mode_paiement',
                index   : 'mode_paiement',
                align   : 'left',
                editable: false,
                sortable: false,
                classes : 'js-mode_paiement',
                formatter: function(v) {
                    if (v == 1) {
                        return 'Chèque';
                    }else if (v == 2) {
                        return 'Espèce';
                    }else if (v == 3) {
                        return 'Virement';
                    }else if (v == 4) {
                        return 'Carte Bancaire';
                    }
                }
            },{
                name    : 'num',
                index   : 'num',
                align   : 'left',
                editable: false,
                sortable: false,
                classes : 'js-num',
                formatter: function(v,i,r) {
                    if (r.mode_paiement == 1) {
                        return r.cheque
                    }else if (r.mode_paiement == 3) {
                        return r.virement
                    }else if (r.mode_paiement == 4) {
                        return r.cheque
                    }

                    return '';
                }
            },{
                name    : 'montant',
                index   : 'montant',
                align   : 'left',
                editable: false,
                sortable: false,
                classes : 'js-montant',
                formatter: jq_number_format,
                unformat: jq_number_unformat
            },{
                name    : 'num_fact',
                index   : 'num_fact',
                align   : 'left',
                editable: false,
                sortable: false,
                classes : 'js-num_fact',
                formatter: function(v,i,r) {
                    if (r.mode_paiement == 2 || r.mode_paiement == 4) {
                        return r.virement
                    }else{ 
                        return ""
                    }
                }
            },{
                name    : 'date',
                index   : 'date',
                align   : 'left',
                editable: false,
                sortable: false,
                classes : 'js-date'
            },{
                name    : 'mois',
                index   : 'mois',
                align   : 'left',
                editable: false,
                sortable: false,
                classes : 'js-mois'
            },{
                name    : 'service',
                index   : 'service',
                align   : 'left',
                editable: false,
                sortable: false,
                classes : 'js-service',
                formatter: function(v, i, r) {
                    if (r.depense_type == 2) {
                        return 'SANTE';
                    }
                    return v;
                }
            },{
                name    : 'motif',
                index   : 'motif',
                align   : 'left',
                editable: false,
                sortable: false,
                classes : 'js-motif'

            },{
                name:'x',
                index:'x',
                align: 'center',
                formatter: function(v, i, r){

                    if (r.depense_type == 1) {
                        var btn = '<button class="btn btn-xs btn-outline btn-info consulter " data-type="0"><i class="fa fa-pencil-square-o "></i>&nbsp;Consulter</button> &nbsp;'; 
                        btn += '<button class="btn btn-xs btn-outline btn-primary valider " data-type="0"><i class="fa fa-pencil-square-o "></i>&nbsp;Valider</button> &nbsp;'; 
                        return btn;
                    }

                    if (r.depense_type == 2) {
                        var btn = '<button class="btn btn-xs btn-outline btn-info consulter_prestation " data-type="0"><i class="fa fa-pencil-square-o "></i>&nbsp;Consulter</button> &nbsp;'; 
                        btn += '<button class="btn btn-xs btn-outline btn-primary valider_prestation " data-type="0"><i class="fa fa-pencil-square-o "></i>&nbsp;Valider</button> &nbsp;'; 
                        return btn;
                    }

                }
            }
        ];

        var options = {
            datatype   : 'local',
            height     : 300,
            autowidth  : true,
            loadonce   : true,
            shrinkToFit: true,
            rownumbers : false,
            altRows    : false,
            colNames   : colNames,
            colModel   : colModel,
            viewrecords: true,
            hidegrid   : true,
            forceFit:true,
            footerrow : true,
            rowNum: 1000000000
        };

        var tableau_grid = $('#table_list');

        if (tableau_grid[0].grid == undefined) {
            tableau_grid.jqGrid(options);
        } else {
            delete tableau_grid;
            $('#table_list').GridUnload('#table_list');
            tableau_grid = $('#table_list');
            tableau_grid.jqGrid(options);
        }

        var window_height = window.innerHeight - 600;

        if (window_height < 300) {
            tableau_grid.jqGrid('setGridHeight', 300);
        } else {
            tableau_grid.jqGrid('setGridHeight', window_height);
        }

        return tableau_grid;
    }

    function load_list(){
        var url = Routing.generate('comptabilite_decharge_list')
        var data = {
            statut : 1,
            recherche_par : $('#recherche_par').val(),
            a_rechercher : $('#a_rechercher').val(),
            type_date : $('#type_date').val(),
            mois : $('#mois').val(),
            annee : $('#annee').val(),
            date_specifique : $('#date_specifique').val(),
            debut_date : $('#debut_date').val(),
            fin_date : $('#fin_date').val(),
            filtre_motif : $('#filtre_motif').val(),
        };

        $.ajax({
            type: 'POST',
            url: url,
            data: data,
            dataType: 'html',
            success: function(res) {
                datas = res;
                var grid = instance_list_grid();
                grid.jqGrid('setGridParam', {
                    data        : $.parseJSON(res),
                    loadComplete: function() {

                        $(this).jqGrid("footerData", "set", {
                            societe: "Total",
                            montant : $(this).jqGrid('getCol', 'montant', false, 'sum'),
                        });
                    
                        
                    }
                }).trigger('reloadGrid', [{
                    page: 1,
                    current: true
                }]);
            }

        })
    }

    $(document).on('click','#btn_search',function(event) {
        event.preventDefault();
        load_list();
    })

    $(document).on('click', '.valider', function(){
        var id = $(this).hasClass('cl_add') ? 0 : $(this).closest('tr').attr('id'),
            action = parseInt($(this).attr('data-type'));

        $('.'+cl_row_edited).removeClass(cl_row_edited);

        swal({
            title: "Valider",
            text: "Voulez-vous vraiment valider?",
            type: "info",
            showCancelButton: true,
            // confirmButtonColor: "#DD6B55",
            confirmButtonText: "OUI",
            closeOnConfirm: false
        }, function () {
            var url = Routing.generate('comptabilite_decharge_validation',{
                id : id
            });

            $.ajax({
                url: url,
                type: 'GET',
                datatype: 'json',
                success: function(res) {
                    swal("Validé", "Décharge validé", "success");
                    load_list();
                }
            })
        });
    });

    $(document).on('click', '.valider_prestation', function(){

        var id = $(this).hasClass('cl_add') ? 0 : $(this).closest('tr').attr('id'),
            action = parseInt($(this).attr('data-type'));

        $('.'+cl_row_edited).removeClass(cl_row_edited);

        if (id !== 0) $(this).closest('tr').addClass(cl_row_edited);


        swal({
            title: "Valider",
            text: "Voulez-vous vraiment valider ?",
            type: "info",
            showCancelButton: true,
            confirmButtonColor: "#0092df",
            confirmButtonText: "OUI",
            closeOnConfirm: false
        }, function () {

            var data = {
                id: id,
            }

            var url = Routing.generate('caisse_prestation_maladie_traiter');

            $.ajax({
                url: url,
                type: 'POST',
                data: data,
                datatype: 'json',
                success: function(res) {
                    swal.close()
                    show_info('Succés','Paiement effectué');
                    load_list();
                }
            })
        });

    
    });

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

            case "6":
                $('.selector_mois').removeClass('hidden');
                $('.selector_annee').removeClass('hidden');
                $('.selector_fourchette').addClass('hidden');
                $('.selector_specifique').addClass('hidden');

                break;
        }    

    })

    $(document).on('click','.cl_export',function() {
        // var extension = $(this).attr('data-format');

        var url = Routing.generate('comptabilite_decharge_declare_export');

        var params = ''
                + '<input type="hidden" name="datas" value="'+encodeURI(datas)+'">'

        $('#form_export').attr('action',url).html(params);
        $('#form_export')[0].submit();

    })

    $(document).on('click','.consulter',function() {
        var id = $(this).closest('tr').attr('id');
        var url = Routing.generate('comptabilite_decharge_show',{ id : id });
        window.location.href = url;

    })

    $(document).on('click','.consulter_prestation',function() {
        var id = $(this).closest('tr').attr('id');
        var url = Routing.generate('caisse_prestation_maladie_paiement',{ id : id });
        window.location.href = url;

    })


    $('.payement').click(function(){
        var id = $(this).closest('tr').attr('id');
        var url = Routing.generate('comptabilite_depense_achat_paiement');
        var data = {
            id:id
        }
        $.ajax({
            url: url,
            type: 'post',
            data: data,
            dataType: 'json',
            success: function(result) {
                // if(result.msg == "success")
                // {
                //     number_to_letter(450)
                // }
                var achat_nom = $('.achat_nom')
                var achat_mode_payement = $('.achat_mode_payement')
                var achat_type_payement = $('.achat_type_payement')
                var achat_service = $('.achat_service')
                var achat_motif = $('.achat_motif')
                var achat_num_facture = $('.achat_num_facture')
                var achat_date = $('.achat_date')
                var achat_mois = $('.achat_mois')
                var achat_montant = $('.achat_montant')

                var  depenses = result.decharges[0];
                 
                var val_type_payement = 'Aucun'
                if(depenses.type_payement == 1)
                    val_type_payement = 'Total'
                else if(depenses.type_payement == 1)
                    val_type_payement = 'Echeance'

                achat_nom.text(depenses.beneficiaire)
                achat_mode_payement.text(depenses.mode_paiement)
                achat_type_payement.text(val_type_payement)
                achat_service.text(depenses.service)
                achat_motif.text(depenses.motif)
                achat_num_facture.text(depenses.num_facture)
                achat_date.text(depenses.date)
                achat_mois.text(depenses.mois)
                achat_montant.text(Math.round(depenses.montant))
                
                $('#lettre').text(number_to_letter(Math.round(depenses.montant)))

                var echeances = result.echeances
                tableEcheance = ''
                var totalPayee = 0
                for (let i = 0; i < echeances[0].length; i++) {
                    const element = echeances[0][i];
                    
                    tableEcheance += `
                        <tr>
                  <td>
                    <div class="form-group">
                        <div class="col-sm-12">
                            <input type="text" class="form-control" value="`+element.dateEch+`" disabled="">
                        </div>
                    </div>
                  </td>
                  <td>
                    <div class="form-group">
                        <div class="col-sm-12">
                          <input type="number" class="form-control" value="`+element.montant+`" disabled="">
                        </div>
                    </div>
                  </td>
                  <td>
                  </td>
                </tr>
                    ` ;
                    totalPayee = totalPayee + parseInt(element.montant)
                }
                tableEcheance += `
                    <tr>
                        <td>
                            <div class="form-group">
                                <div class="col-sm-12">
                                    <input type="hidden" value="`+depenses.montant+`" id="montantTotalDep">
                                    <input type="hidden" value="`+depenses.id+`" id="idDepense">
                                    <input type="date" class="form-control" id="date_paiement" value="">
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="form-group">
                                <div class="col-sm-12">
                                    <input type="number" class="form-control" id="montant">
                                </div>
                            </div>
                        </td>
                        <td>
                            <button class="btn btn-primary btn-full-width" id="btn-valider">
                                <i class="fa fa-check"></i>
                                VALIDER
                            </button>
                        </td>
      					</tr>
                `

                $('.totalPayee').text(totalPayee+" KMF")
                $('.totalRestant').text((Math.round(depenses.montant) - totalPayee)+" KMF") ;

                $('.body_achat').empty().append(tableEcheance) ;

                validerPayement() ;

                $('#menu_achat').click()
            }
        });

        
    })

    function validerPayement()
    {
            $('#btn-valider').click(function(){
            var url = Routing.generate('comptabilite_depense_achat_valider');
            var data = {
                idDepense:$('#idDepense').val(),
                date_paiement:$('#date_paiement').val(),
                montant:$('#montant').val(),
                montantTotalDep:$('#montantTotalDep').val()
            }
            swal({
                    title: "Validation",
                    text: "Etes-vous sure de vouloir valider ? ",
                    type: "info",
                    showCancelButton: true,
                    confirmButtonText: "Oui",
                    cancelButtonText: "Non",
                },
                function () {
                    $.ajax({
                        url: url,
                        type: 'POST',
                        data: data,
                        success: function(res) {
                            var echeances = res.echeances
                            
                            tableEcheance = ''
                            var totalPayee = 0
                            var idDep = ''
                            
                            for (let i = 0; i < echeances.length; i++) {
                                const element = echeances[i];
                                idDep = element.idDepense
                                tableEcheance += `
                                    <tr>
                            <td>
                                <div class="form-group">
                                    <div class="col-sm-12">
                                        <input type="text" class="form-control" value="`+element.dateEch+`" disabled="">
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <div class="col-sm-12">
                                    <input type="number" class="form-control" value="`+element.montant+`" disabled="">
                                    </div>
                                </div>
                            </td>
                            <td>
                            </td>
                            </tr>
                                ` ;
                                totalPayee = totalPayee + parseInt(element.montant)
                            }
                            tableEcheance += `
                                <tr>
                                    <td>
                                        <div class="form-group">
                                            <div class="col-sm-12">
                                                <input type="hidden" value="`+res.totalDepense+`" id="montantTotalDep">
                                                <input type="hidden" value="`+idDep+`" id="idDepense">
                                                <input type="date" class="form-control" id="date_paiement" value="">
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="form-group">
                                            <div class="col-sm-12">
                                                <input type="number" class="form-control" id="montant">
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <button class="btn btn-primary btn-full-width" id="btn-valider">
                                            <i class="fa fa-check"></i>
                                            VALIDER
                                        </button>
                                    </td>
                                    </tr>
                            `
                            $('.body_achat').empty().append(tableEcheance) ;
                            
                            $('.totalPayee').text(totalPayee+" KMF")
                            $('.totalRestant').text((Math.round(res.totalDepense) - totalPayee)+" KMF") ;

                             validerPayement() ;
                        },
                        error: function() {
                            show_info('Erreur',"Erreur de validation",'error');
                        }
                })
                
            });
        })
    }
});