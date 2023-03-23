$(document).ready(function(){


function addElement(data)
{
    $("."+data.selector).click(function(e){
        e.preventDefault() ;
        var url = Routing.generate(data.url);
        swal({
            title: data.title,
            type: "input",
            showCancelButton: true,
            confirmButtonText: "Enregistrer",
            cancelButtonText: "Annuler",
            // animation: "slide-from-top",
            inputPlaceholder: "Tapez ici . . ."
            },
            function (value) {
                if(value)
                {
                    if(value != '')
                    {
                        options = '' ;
                        disabled_confirm(true);
                        $.ajax({
                            url: url, 
                            type: 'POST',
                            data: {element:value},
                            dataType :'json',
                            async: true,
                            success: function(res) {
                                for (let i = 0; i < res.length; i++) {
                                    const elem = res[i];
                                    options += `
                                    <option value="`+elem.id+`">`+elem[data.caption]+`</option>
                                    ` 
                                }
                                $("."+data.element).empty().append(options) ;
                                $('.confirm').prop('disabled', false);
                                // alert(data.result+' enregistré') ;
                            }
                        })
                        // alert('Bravo '+value ) ;
                    }
                    else 
                    {
                        show_success('Attention', 'Nom Personne vide','error');
                    }
                } 
            });
    })
    
}

data1 = {
    selector:"pers_add",
    url:"personne_add", 
    title:"Nouveau Personne" ,
    caption : 'nom_personne' ,
    element : "pers-ass-form",
    result : 'Personne'
}
addElement(data1) ;

data2 = {
    selector:"type_tache_add",
    url:"type_tache_add", 
    title:"Nouveau Type de Tâche" ,
    caption : 'nom_type_tache' ,
    element : "t-type-tache",
    result : 'Type de tâche'
}
addElement(data2) ;

function submitFormulaire(data)
{
    $(data.selector).submit(function(){
        var myData = new FormData(this) ;
        var url = Routing.generate(data.url) ;
        swal({
            title: data.title,
            text: "Etes-vous sure de vouloir "+data.confirm+" ?",
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
                        data: myData,
                        processData: false,
                        contentType: false,
                        dataType: 'text',
                        success: function(res){
                            if(res == "Succes")
                            {
                                show_success("Succès",data.message) ;
                                console.log(res) ;
                            }
                            else
                            {
                                swal({
                                    type: data.type,
                                    title: "Erreur !",
                                    text: res
                                })

                            }
                            
                        }
                    }) 
                }
            }) ;
        return false;
    })
}

form1 = {
    selector:'#tache-form', 
    url: 'tache_save',
    message: "Tâche enregistré",
    confirm : 'Enregistrer',
    title : "Enregistrement",
    type : 'error'
}
submitFormulaire(form1) ;
form2 = {
    selector: '#form_comment_add',
    url: 'tache_comment_add',
    message: "Commentaire envoyé",
    confirm : 'Envoyer',
    title: "Ajout commentaire",
    type : 'warning'
}
submitFormulaire(form2) ;

$(".bouton_afficher").click(function(){

})


}) ;