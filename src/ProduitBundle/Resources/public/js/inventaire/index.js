var cl_row_edited = 'r-cl-edited';

$(document).ready(function(){
    var datas = [] ;
	load_list();

	function instance_grid() {
        var colNames = ['Entrepot','Catégorie','Nom', 'Prix de vente', 'Stock','Total'];
        
        var colModel = [{ 
            name:'entrepot',
            index:'entrepot',
            align: 'center' 
        },{ 
            name:'categorie',
            index:'categorie',
            align: 'center' 
        },{ 
            name:'nom',
            index:'nom',
            align: 'center' 
        },{ 
            name:'prix_vente',
            index:'prix_vente',
            align: 'center',
            formatter: function(v,i,r) {
                if (r.modele == 4) {
                    return Math.round(r.prix_vente * 100) / 100;
                } else {
                    return (v) ? Math.round(v * 100) / 100: Math.round(r.prix_vente * 100) / 100;
                }
            }
        },{ 
            name:'stock',
            index:'stock',
            align: 'center',
            formatter: function(v,i,r) {
                if (r.modele == 4) {
                    return Math.round(r.stock * 100) / 100;
                } else {
                    return (v) ? Math.round(v * 100) / 100: Math.round(r.stock * 100) / 100;
                }
            }
        },{ 
            name:'total',
            index:'total',
            align: 'center',
            formatter: function(v,i,r) {
                if (r.modele == 4) {
                    return Math.round(r.total * 100) / 100;
                } else {
                    return (v) ? Math.round(v * 100) / 100: Math.round(r.total * 100) / 100;
                }
            }
        }];

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
            footerrow:true,
            rowNum: 1000000000
        };

        var tableau_grid = $('#liste_produit');

        if (tableau_grid[0].grid == undefined) {
            tableau_grid.jqGrid(options);
        } else {
            delete tableau_grid;
            $('#liste_produit').GridUnload('#liste_produit');
            tableau_grid = $('#liste_produit');
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

    function load_list() 
    {	
        var url = Routing.generate('produit_inventaire_list');
        var agence  =  $('#agence').val() ; 
        var entrepot  =  $('#entrepot').val() ;
        var recherche_par =  $('#recherche_par').val() ;
        var a_rechercher =  $('#a_rechercher').val() ;
        var categorie =  $('#categorie').val() ;

        var data = {
        	agence : agence,
        	entrepot : entrepot,
            recherche_par : recherche_par,
            a_rechercher: a_rechercher,
            categorie: categorie,
        };

        $.ajax({
            type: 'POST',
            url: url,
            data: data,
            dataType: 'html',
            success: function(res) {
                datas = res ;
                var grid = instance_grid();
                grid.jqGrid('setGridParam', {
                    data  : $.parseJSON(res),
                    loadComplete: function() {
                        $(this).jqGrid("footerData", "set", {
                            categorie: "Total",
                            stock : Math.round($(this).jqGrid('getCol', 'stock', false, 'sum') * 100) / 100,
                            total : Math.round($(this).jqGrid('getCol', 'total', false, 'sum') * 100) / 100,
                        });
                    }
                }).trigger('reloadGrid', [{
                    page: 1,
                    current: true
                }]);
            }

        })
    
    }

    $(document).on('click', '#btn_search', function(event) {
        event.preventDefault();

        load_list();
    });

    $('#a_rechercher').on( "keydown", function( event ) {
      if (event.which === 13) {
        $('#btn_search').trigger('click');
      }
    });

 
    $(".cl_export").click(function(){
        
        var url = Routing.generate('produit_inventaire_export');

        var params = ''
                + '<input type="hidden" name="datas" value="'+encodeURI(datas)+'">'

        $('#form_export').attr('action',url).html(params);
        $('#form_export')[0].submit();
    })

});

