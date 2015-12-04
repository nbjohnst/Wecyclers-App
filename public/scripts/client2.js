        
$(function(){

    
    
    var clientInformationTemplate = Handlebars.compile($('#clientInformationTemplate').html());

    function renderInfo (client) {
        return clientInformationTemplate ({
        })
    };

    $('form.client-Information-Form').on('submit', function(e) {
        e.preventDefault();

        var selectId = $(".clientIdInput").val();

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

                
                $('.hidden-container-top').html(clientInformationTemplate(donationAggregate[selectId]));
            })

        });
  
     
        return false
    });
});