var url= window.location.href;
var pos = url.search('using_pwa');

if (pos+1 && url[pos+8] && 'serviceWorker' in navigator) {
	navigator.serviceWorker
	.register('service-worker.js')
	.then(function(registration) {
		if (!navigator.serviceWorker.controller){
			location.reload();
		}
	})
	.catch(function(err) {
		console.log("Service Worker Failed to Register", err);
	});
}

if ('serviceWorker' in navigator){
	navigator.serviceWorker.addEventListener('message', function(e) {
		console.log("Client 1 Recieved Message: " + e.data);
		location.replace(e.data);
	});
}

function helpNotification() {
	getCurrentGeolocation().then( function(latlng){
		lng=latlng.lng();
		lat=latlng.lat();
		var urlGet = '/api/location/nearby/'+lng+'/'+lat;
		var ajaxReq = $.ajax({
			type: 'get',
			url: urlGet,
			dataType: 'json',
			success: function(data, status, xhr){
				navigator.serviceWorker.controller.postMessage(data);
			},
			error: function(xhr, reason, ex){
				console.log("No nearby locations found at "+urlGet);
			}
		});
	});
    
};
setTimeout(helpNotification,10000);