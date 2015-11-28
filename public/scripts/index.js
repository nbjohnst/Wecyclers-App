$(function(){

	var clientNewMaterialFormTemplate = Handlebars.compile($('#clientNewMaterialFormTemplate').html());
    var mediaTilesTemplate = Handlebars.compile($('#mediaTilesTemplate').html());
    var clientPersonalInfoTemplate = Handlebars.compile($('#clientPersonalInfoTemplate').html());
    var clientDonationTemplate = Handlebars.compile($('#clientDonationTemplate').html());
    // var clientIdTemplate = Handlebars.compile($('#clientIdTemplate').html());

    // function renderId (id) {
    //     return clientIdTemplate ({
    //         clientIdReturn: 
    //     })
    // }

    function renderInfo (client) {
        return clientPersonalInfoTemplate ({
            clientName: client.clientName,
            address: client.clientAddress,
            pickupDay: client.pickupDay
        })
    };

    function renderDonation(material) {
      return clientDonationTemplate ({
            aluminum: material.aluminumPickupKg,
            plastic: material.plasticPickupKg,
            credits: material.creditsAwarded 
            // 
      })
    };

    function renderMediaObject (client) {
        return mediaTilesTemplate ({
            clientPersonalInformation: renderInfo(client),
            clientId: client.clientId

            // renderInfo(client)
            // renderDonation(pickup)
        })
    }; 


    function loadClients() {
        $('.hidden_container').html('');
        $.get('http://0.0.0.0:3000/api/client').then(function (clients) {
            
            clients.forEach(function (client) {
               // var clientInfo = renderInfo(client); 
               var mediaArea = renderMediaObject(client);
               
                
                $('.hidden_container').append(mediaArea);
                // $('.media_container').addClass(client.client_id);
            })
        });
    };
    loadClients()

    function loadPickupLog(materials) {
        $.get('http://0.0.0.0:3000/api/pickup_log').then(function (materials) {
            
            materials.forEach(function (material) {
                // console.log('fuck');
                // console.log(materials.clientId)
               var materialInfo = renderDonation(material); 
               console.log(materialInfo);
               // $('.personal_numbers').html(materialInfo);
            })
        });
    };
    // loadPickupLog()

// *** landing animation

	$(".media_nav").on('click', '.landing-sign-in', function(){
        console.log('google');
		// $(".agent-sign-in").removeClass("disappear");
	});


// *** form select clients

// $( 'body' ).on( 'click', 'select', function( event ) {
        
// });

    var formSelect = function (){
        $.get('http://0.0.0.0:3000/api/client').then(function(clients) {
        var context = {clientName: clients.client};
        $('.clentSelectContainer').html('');
        $('.clentSelectContainer').append(clientNewMaterialFormTemplate(clients));

        }); 
    };
    	formSelect();


// *** new client form submit event

   $('form.client-information').on('submit', function() {

	var client = {
    		clientName: $('.dash-clientname').val(), 
    		clientAddress: $('.dash-address').val(),
    		pickupDay: $('.dash-day').val()
    	} 

    	$.post('http://0.0.0.0:3000/api/client', client).then(function (clients) {
            $('.landing-sign-in').html('');
            formSelect()
            loadClients();
            console.log('Hewwo!');
            }).fail(function() {
                console.log('There was a client info error!')
            }) 

            
            $('form.client-information').val('');

        return false
	});

// *** new donation form submit event  
    var selectId = "";

	$('form.client-donations').on('submit', function() {
	    var selectId = $( ".clientSelect option:selected" ).val();
        // console.log("footoo")
        // loadPickupLog();

        var pickup = {
                clientId: selectId,
	    		aluminumPickupKg: $('.dash-aluminum').val(),
	    		plasticPickupKg: $('.dash-plastic').val(),
                creditsAwarded: 1
	    }
            
    	$.post('http://0.0.0.0:3000/api/pickup_log', pickup).then(function (materials) {
            console.log(materials);

            // console.log(materials.clientId)
         //    console.log(materials)
            // materials.forEach(function (material) {
         //        console.log("too");
            // });
            // loadPickupLog();   
            }).fail(function() {
                console.log('There was a material donation error!')
            })  

  
        return false
	

    });

 

}); 











        //  if ($('.dash-address').val() === '') {

        //     $.post('url', payload).then(function() {
        //         loadUsers();
        //     }).fail(function() {
        //         alert('There was a new user error!')
        //     })

        // }else {

        //     $.ajax({
        //         url: 'url' + $('.userId').val(),
        //         data: payload,
        //         type: 'PUT'
        //     }).then(function() {
        //         loadUsers();
        //     })

       

        // ****
        // if ($('.teamId').val() === '') {

        //     $.post('http://127.0.0.1:3000/teams', payload).then(function() {
        //         loadTeams();
        //     }).fail(function() {
        //         // handle things not going well
        //     })

        // } else {

        //     $.ajax({
        //         url: 'http://localhost:3000/teams/' + $('.teamId').val(),
        //         data: payload,
        //         type: 'PUT'
        //     }).then(function() {
        //         loadTeams();
        //     })

        // }

        // $('.name').val('');
        // $('.city').val('');
        // $('.teamId').val('');

        // return false;
//     });



	
// })

	
   // 		if ($('.dash-address').val() && $('.pickup-day').val() === '') {
            
   // 		 	console.log('hello');

   //      }else {
   //      	$.post('http://0.0.0.0:3000/api/clients', payload).then(function() {
   //              loadUsers();
   //          }).fail(function() {
   //              console.log('There was a new client error!')
   //          })

 		// };