$(function(){

    var clientNewMaterialFormTemplate = Handlebars.compile($('#clientNewMaterialFormTemplate').html());
    var mediaTilesTemplate = Handlebars.compile($('#mediaTilesTemplate').html());
    var clientPersonalInfoTemplate = Handlebars.compile($('#clientPersonalInfoTemplate').html());
    var clientDonationTemplate = Handlebars.compile($('#clientDonationTemplate').html());

    function renderInfo (client) {
        return clientPersonalInfoTemplate ({
            clientName: client.clientName,
            address: client.clientAddress,
            pickupDay: client.pickupDay
        })
    };

    function renderMediaObject (client) {
        return mediaTilesTemplate ({
            clientPersonalInformation: renderInfo(client),
            clientId: client.clientId
        })
    }; 

    function loadClients() {
        $('.hidden_container').html('');
        $.get('http://0.0.0.0:3000/api/client').then(function (clients) {
            
            clients.forEach(function (client) {
               var mediaArea = renderMediaObject(client);
                $('.hidden_container').append(mediaArea);
            })
        });
    };
    loadClients()

    function loadPickupLog(materials) {
        $.get('http://0.0.0.0:3000/api/pickup_log').then(function (materials) {
            
            var donationAggregate = {

            }
            materials.forEach(function (material) {
                if (material.clientId in donationAggregate) {
                    donationAggregate[material.clientId]['aluminumPickupKg'] += material.aluminumPickupKg; 
                    donationAggregate[material.clientId]['plasticPickupKg'] += material.plasticPickupKg; 
                    donationAggregate[material.clientId]['creditsAwarded'] += material.creditsAwarded; 
                } else {
                    donationAggregate[material.clientId] = {}
                    donationAggregate[material.clientId]['aluminumPickupKg'] = (material.aluminumPickupKg);   
                    donationAggregate[material.clientId]['plasticPickupKg'] = (material.plasticPickupKg);   
                    donationAggregate[material.clientId]['creditsAwarded'] = (material.creditsAwarded);   
                }
                
            })
           for (var key in donationAggregate ){

               var materialInfo = clientDonationTemplate(donationAggregate[key]); 
               $('[data-client-id=' + key + ']').html(materialInfo);
           }
        });
    };
    loadPickupLog()

    var formSelect = function (){
        $.get('http://0.0.0.0:3000/api/client').then(function (clients) {
        var context = {clientName: clients.client};
        $('.clentSelectContainer').html('');
        $('.clentSelectContainer').append(clientNewMaterialFormTemplate(clients));

        }); 
    };
    
    formSelect();


   $('form.client-information').on('submit', function() {

	var client = {
    		clientName: $('.dash-clientname').val(), 
    		clientAddress: $('.dash-address').val(),
    		pickupDay: $('.dash-day').val()
    	} 

    	$.post('http://0.0.0.0:3000/api/client', client).then(function (clients) {
            $('.landing-sign-in').html('');
            formSelect();
            loadClients();
            loadPickupLog()
            }).fail(function() {
                console.log('There was a client info error!')
            }) 

            
            $('form.client-information').val('');



        return false
	});

	$('form.client-donations').on('submit', function(e) {
        e.preventDefault();
	    var selectId = $( ".clientSelect" ).val();

        var pickup = {
            clientId: selectId, 
            aluminumPickupKg: $('.dash-aluminum').val(),
            plasticPickupKg: $('.dash-plastic').val(),
            creditsAwarded: 1
        }

        $.post('http://0.0.0.0:3000/api/pickup_log', pickup).done(function () {               
            $('[data-client-id=' + selectId + ']').html(clientDonationTemplate(pickup));            
        }).fail(function() {
            console.log('Theres a problem');

        })  
        
        loadPickupLog()

        return false
    });
}); 
