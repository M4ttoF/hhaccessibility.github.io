var reviewRedirect, title, options;
title = 'We Need Your Help!';
options = {
	body: '',
	icon: '/images/logo-192x192.png',
	actions: [
			{
			action: 'review',
			title: 'Yes!'
			}
		],
	vibrate: [500,110,500,110,450]
	};
function helpNotification(name,id) {
		options.body='Would you like to add a review to '+name+'?';
		//self.registration.showNotification(title, options);
		reviewRedirect='location/rating/'+id+'/5';
};

function sendNotification() {
	//check to send here
	if(options.body!=='')
		self.registration.showNotification(title,options);
}

function send_message_to_client(client, msg){
    return new Promise(function(resolve, reject){
        var msg_chan = new MessageChannel();

        msg_chan.port1.onmessage = function(event){
            if(event.data.error){
                reject(event.data.error);
            }else{
                resolve(event.data);
            }
        };

        client.postMessage(msg, [msg_chan.port2]);
    });
}

setTimeout(setInterval(sendNotification,10000),15000)

self.addEventListener('install', function(e) {   
	e.waitUntil(self.skipWaiting());
    console.log('Service Worker Installed')
})  

self.addEventListener('activate', function(e) {
	e.waitUntil(self.clients.claim())
    console.log('Service Worker Activated');
})

self.addEventListener('fetch',function(e) {
    //console.log('fetching '+e);
})

self.addEventListener('notificationclick', function(e) {
    switch(e.action) {
    	case 'review':
    		console.log(Response.redirect(reviewRedirect));
    		clients.matchAll().then(clients => {
		        clients.forEach(client => {
		            send_message_to_client(client, reviewRedirect);
		        })
		    })
    		break;
    }
    e.notification.close();
})

self.addEventListener('message', function(e) {
	console.log(e.data);
	helpNotification(e.data.name,e.data.id);
})	