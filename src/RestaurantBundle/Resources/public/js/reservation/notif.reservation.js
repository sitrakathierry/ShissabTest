$(document).ready(function(){

	var pageRefresh = 30000;
    setInterval(function() {
		console.log('refresh')
    	// load_list();
    }, pageRefresh);

    load_list();

	function load_list() {
		var url = Routing.generate('notification_reservation');
		var data = {
			type_reponse : 'html'
		};

		$.ajax({
			url: url,
			type: 'POST',
			data: data,
			success: function(res) {
				$('#notif-commande').html(res)
			}
		})
	}

})