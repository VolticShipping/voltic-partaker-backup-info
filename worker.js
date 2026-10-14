self.addEventListener("push",event=>{
  const message=event.data.json();
  event.waitUntil((async()=>{
    await self.registration.showNotification(message.title,{
      body:message.body,tag:"voltic-native-backup",data:{url:message.url}
    });
    const clients=await self.clients.matchAll({type:"window",includeUncontrolled:true});
    for(const client of clients){
      if(client.url.startsWith("https://volticshipping.github.io/voltic-partaker-backup-info/")){
        client.postMessage({type:"voltic-push-receipt",title:message.title,body:message.body,time:Date.now()});
      }
    }
  })());
});
self.addEventListener("notificationclick",event=>{
  event.notification.close();
  event.waitUntil(self.clients.openWindow("https://volticshipping.github.io/voltic-partaker-backup-info/"));
});
