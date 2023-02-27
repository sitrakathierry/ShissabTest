function selToArray(selector, type = "default") {
  var taskArray = new Array();
  $(selector).each(function () {
    if (type == "summernote") { 
      taskArray.push($(this).code());
    } else {
      taskArray.push($(this).val());
    }
  });
  return taskArray;
}

function accompagnements() { 
  var data = [];

  $("table#table-emporter-add > tbody  > tr").each(function (index, tr) {
    var table = $(this).find("table.table-accompagnement  > tbody");
    var accompagnement = selToArray(table.find(".accompagnement"));
    var qte_accompagnement = selToArray(table.find(".qte_accompagnement"));
    var prix_accompagnement = selToArray(table.find(".prix_accompagnement"));
    var total_accompagnement = $(this).find(".total_accompagnement").val();

    var item = {
      accompagnement: accompagnement,
      qte_accompagnement: qte_accompagnement,
      prix_accompagnement: prix_accompagnement,
      total_accompagnement: total_accompagnement,
    };

    data.push(item);
  });

  return data;
}

$(document).on("click", "#btn-save", function (event) {
  event.preventDefault();
  // toastr.options = {
  //   "closeButton": false,
  //   "debug": false,
  //   "newestOnTop": false,
  //   "progressBar": true,
  //   "positionClass": "toast-top-right",
  //   "preventDuplicates": false,
  //   "onclick": null,
  //   "showDuration": "300",
  //   "hideDuration": "1000",
  //   "timeOut": "5000",
  //   "extendedTimeOut": "1000",
  //   "showEasing": "swing",
  //   "hideEasing": "linear",
  //   "showMethod": "fadeIn",
  //   "hideMethod": "fadeOut"
  // }
  // toastr["error"]("Have fun storming the castle!") ;

  

  var enregistre = true;

  var f_model = $("#f_model").val();
  if (f_model == "") {
    enregistre = false;
    swal({
      type: "warning",
      title: "Aucune modèle selectionnée",
      text: "Sélectionnez un modèle !",
    });
  } else {
    var f_type = $("#f_type").val();
    var f_client = $("#f_client").val();

    if (f_model == 1) {
      var recu = true;

      var f_recu = $("#f_recu").val();
      if (f_type == 2) {
        if (f_recu == "") {
          recu = true;
        }
      }

      if (recu == true) {
        if (f_client == "") {
          enregistre = false;
          swal({
            type: "warning",
            title: "Aucun Client selectionnée",
            text: "Sélectionnez un Client !",
          });
        }
      } else {
        enregistre = false;
        swal({
          type: "warning",
          title: "Aucune Reçu selectionnée",
          text: "Sélectionnez une Reçu !",
        });
      }
    } else {
      if (f_client == "") {
        enregistre = false;
        swal({
          type: "warning",
          title: "Aucun Client selectionnée",
          text: "Sélectionnez un Client !",
        });
      }
    }
  }

  // GESTION D'ERREUR PAR RAPPORT AU MODELE

  var vide = false;
  if (enregistre) {
    if (f_model == 1) {
      // var passe = false;
      // // MISE A JOUR DE CHAQUE LIGNE

      // $(".f_libre").each(function () {
      //   // MISE A JOUR DE LA DESINGATION

      //   if ($(this).val() == 0) {
      //     $(".f_produit ").each(function () {
      //         if ($(this).val() == "") {
      //           enregistre = false;
      //           vide = true;
      //           return;
      //        }
      //     });

      //     if (vide) {
      //       passe = true;
      //     }
      //   }

      //   if (!passe) {
      //     // alert("PAssage ")
      //     var val_num = [".f_qte", ".f_prix", ".f_remise_ligne"];

      //     var val_descri = ["Quantité", "Prix", "Remise"];

      //     var negatif = false;
      //     for (let i = 0; i < val_num.length; i++) {
      //       const element = val_num[i];
      //       $(element).each(function () {
      //         if (i != 2) {
      //           if ($(this).val() == "") {
      //             val_elem = val_descri[i];
      //             vide = true;
      //             return;
      //           } else if ($(this).val() < 0) {
      //             val_elem = val_descri[i];
      //             vide = false;
      //             negatif = true;
      //             return;
      //           }
      //         } else {
      //           if ($(this).val() < 0) {
      //             val_elem = val_descri[i];
      //             vide = false;
      //             negatif = true;
      //             return;
      //           }
      //         }
      //       });

      //       if (negatif || vide) {
      //         break;
      //       }
      //     }
      //     if (vide) {
      //       enregistre = false;
      //       swal({
      //         type: "warning",
      //         title: val_elem + " vide",
      //         text: "Sélectionnez un " + val_elem + " !",
      //       });
      //       return;
      //     } else if (negatif) {
      //       enregistre = false;
      //       swal({
      //         type: "error",
      //         title: val_elem + " Négatif",
      //         text: "Corriger le champ " + val_elem + " !",
      //       });
      //       return;
      //     }
      //   } else {
      //     enregistre = false;
      //     swal({
      //       type: "warning",
      //       title: "Désignation vide",
      //       text: "Sélectionnez un Désignation !",
      //     });
      //     return;
      //   }

      //   if (!enregistre) {
      //     return;
      //   }
      // });
      enregistre = true ;
    } else if (f_model == 2) {
      $(".f_service_libre").each(function () {
        if ($(this).val() == 0) {
          $(".f_service ").each(function () {
            if ($(this).val() == "") {
              vide = true;
              enregistre = false;
              return;
            }
          });
        }

        if (vide) {
          swal({
            type: "warning",
            title: "Désignation vide",
            text: "Sélectionnez un Désignation !",
          });
        } else {
          var val_num = [
            ".f_service_periode",
            ".f_service_prix",
            ".f_service_remise_ligne",
          ];

          var val_descri = ["Quantité", "Prix", "Remise"];
          var negatif = false;
          for (let i = 0; i < val_num.length; i++) {
            const element = val_num[i];
            $(element).each(function () {
              if (i != 2) {
                if ($(this).val() == "") {
                  val_elem = val_descri[i];
                  vide = true;
                  return;
                } else if ($(this).val() < 0) {
                  val_elem = val_descri[i];
                  vide = false;
                  negatif = true;
                  return;
                }
              } else {
                if ($(this).val() < 0) {
                  val_elem = val_descri[i];
                  vide = false;
                  negatif = true;
                  return;
                }
              }
            });

            if (negatif || vide) {
              break;
            }
          }

          if (vide) {
            enregistre = false;
            swal({
              type: "warning",
              title: val_elem + " vide",
              text: "Sélectionnez un " + val_elem + " !",
            });
          } else if (negatif) {
            enregistre = false;
            swal({
              type: "error",
              title: val_elem + " Négatif",
              text: "Corriger le champ " + val_elem + " !",
            });
          }
        }

        if (!enregistre) {
          return;
        }
      });
    } else if (f_model == 3) {
      $(".f_ps_type_designation").each(function () {
        if ($(this).val() == "") {
          enregistre = false;
          swal({
            type: "warning",
            title: "Type désignation vide",
            text: "Sélectionnez un Type désignation !",
          });
        } else {
          $(".f_ps_designation ").each(function () {
            if ($(this).val() == "") {
              vide = true;
              enregistre = false;
              return;
            }
          });

          if (vide) {
            swal({
              type: "warning",
              title: "Désignation vide",
              text: "Sélectionnez un Désignation !",
            });
          } else {
            if ($(this).val() == 1) {
              var val_num = [".f_ps_qte", ".f_ps_prix", ".f_ps_remise_ligne"];

              var val_descri = ["Quantité", "Prix", "Remise"];
            } else {
              var val_num = [
                ".f_ps_periode",
                ".f_ps_prix",
                ".f_ps_remise_ligne",
              ];

              var val_descri = ["Période", "Prix", "Remise"];
            }

            var negatif = false;
            for (let i = 0; i < val_num.length; i++) {
              const element = val_num[i];
              $(element).each(function () {
                if (i != 2) {
                  if ($(this).val() == "") {
                    val_elem = val_descri[i];
                    vide = true;
                    return;
                  } else if ($(this).val() < 0) {
                    val_elem = val_descri[i];
                    vide = false;
                    negatif = true;
                    return;
                  }
                } else {
                  if ($(this).val() < 0) {
                    val_elem = val_descri[i];
                    vide = false;
                    negatif = true;
                    return;
                  }
                }
              });

              if (negatif || vide) {
                break;
              }
            }

            if (vide) {
              enregistre = false;
              swal({
                type: "warning",
                title: val_elem + " vide",
                text: "Sélectionnez un " + val_elem + " !",
              });
            } else if (negatif) {
              enregistre = false;
              swal({
                type: "error",
                title: val_elem + " Négatif",
                text: "Corriger le champ " + val_elem + " !",
              });
            }
          }
        }
        if (!enregistre) {
          return;
        }
      });
    } else {
      var val_num = [
        ".f_hebergement_nb_pers",
        ".f_hebergement_date_entree",
        ".f_hebergement_chambre",
        ".f_hebergement_nb_nuit",
        ".f_hebergement_montant",
      ];

      var val_descri = [
        "Nombre de Personne",
        "Date Entrée",
        "Chambre",
        "Nombre nuit",
        "Montant",
      ];

      for (let i = 0; i < val_num.length; i++) {
        const element = val_num[i];
        $(element).each(function () {
          if ($(this).val() == "") {
            enregistre = false;
            swal({
              type: "warning",
              title: val_descri[i] + " vide",
              text: "Sélectionnez un " + val_descri[i] + " !",
            });
            return;
          }

          if (i == 0 || i == 3) {
            if ($(this).val() < 0) {
              negatif = true;
              enregistre = false;
              swal({
                type: "error",
                title: val_descri[i] + " Négatif",
                text: "Corriger le " + val_descri[i] + " !",
              });
              return;
            }
          }
        });

        if (!enregistre) {
          break;
        }
      }

      $(".plat").each(function () {
        if ($(this).val() != "") {
          var qte = $(this).parent().parent().parent().parent().find(".qte");
          var accompagnement = $(this)
            .parent()
            .parent()
            .parent()
            .parent()
            .find(".accompagnement");

          if (qte.val() == "") {
            enregistre = false;
            swal({
              type: "warning",
              title: "Quantité vide",
              text: "Sélectionnez un Quantité !",
            });
            return;
          } else if (qte.val() < 0) {
            negatif = true;
            enregistre = false;
            swal({
              type: "error",
              title: "Quantité négatif",
              text: "Corriger la Quantité !",
            });
            return;
          }

          if (enregitre) {
            accompagnement.each(function () {
              if ($(this).val() != "") {
                var portion_accompagnement = $(this)
                  .parent()
                  .parent()
                  .parent()
                  .parent()
                  .find(".portion_accompagnement");
                enregistre = false;
                if (portion_accompagnement.val() == "") {
                  enregistre = false;
                  swal({
                    type: "warning",
                    title: "Portion accompagnement vide",
                    text: "Sélectionnez un portion accompagnement !",
                  });
                  return;
                }
              }

              if (!enregistre) {
                return;
              }
            });
          }
        }
      });
    }
  }

  if (enregistre) {
    var accompagnement_details = accompagnements();
    $("#accompagnement_details").val(JSON.stringify(accompagnement_details));

    disabled_confirm(false);
    swal(
      {
        title: "Enregistrer",
        text: "Voulez-vous vraiment enregistrer ? ",
        type: "info",
        showCancelButton: true,
        confirmButtonText: "Oui",
        cancelButtonText: "Non",
      },
      function (res) {
        if (res) {
          show_info("Succès", "Facture enregistré avec succès", "success");
          disabled_confirm(res);
          $("#form-facture").submit();
        }
      }
    );
  }
});

$("#descr").Editor();

$(document).on("change", "#f_model", function (event) {
  event.preventDefault();
  var model = $(this).val();
  var type = $("#f_type").val();

  var form_produit = $("#form-produit");
  var form_service = $("#form-service");
  var form_produitservice = $("#form-produitservice");
  var form_hebergement = $("#form-hebergement");

  var form_facture = $("#form-facture"); 

  form_produit.addClass("hidden");
  form_service.addClass("hidden");

  $(".recu").addClass("hidden");
  $(".heb").addClass("hidden");

  if (model != "") {

    if (model == 1) {
      form_produit.removeClass("hidden");
      form_service.addClass("hidden");
      form_produitservice.addClass("hidden");
      var url = Routing.generate("facture_produit_save");

      if (type == 2) {
        $(".recu").removeClass("hidden");
      }
    }

    if (model == 2) {
      form_service.removeClass("hidden");
      form_produit.addClass("hidden");
      form_produitservice.addClass("hidden");
      form_hebergement.addClass("hidden");
      var url = Routing.generate("facture_service_save");
    }

    if (model == 3) {
      form_produitservice.removeClass("hidden");
      form_produit.addClass("hidden");
      form_service.addClass("hidden");
      form_hebergement.addClass("hidden");
      var url = Routing.generate("facture_produitservice_save");
    }

    if (model == 4) {
      form_hebergement.removeClass("hidden");
      form_produitservice.addClass("hidden");
      form_produit.addClass("hidden");
      form_service.addClass("hidden");
      var url = Routing.generate("facture_hebergement_save");

      if (type == 2) {
        $(".heb").removeClass("hidden");
      }
    }

    form_facture.attr("action", url);
  }
});

$(document).on("change", "#f_type", function (event) {
  event.preventDefault();

  var model = $("#f_model").val();
  var type = $(this).val();

  $(".recu").addClass("hidden");
  $(".heb").addClass("hidden");

  if (type == 2 && model == 1) {
    $(".recu").removeClass("hidden");
  }

  if (type == 2 && model == 4) {
    $(".heb").removeClass("hidden");
  }
});
