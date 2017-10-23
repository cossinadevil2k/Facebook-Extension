"use strict";

! function(q){
// chrome.tabs.executeScript(null, {file:"/scripts/contentscript.js"});
// khởi tạo thông báo khi cài đặt và update
q.runtime.onInstalled.addListener(function (details) {
  var noti = {
	   type: "basic",
	   title: "Facebook Extension",
	   message: "Cài đặt thành công.",
	   iconUrl: q.extension.getURL("icon.png"),
	};
  if (details.reason == "install") {
    q.storage.local.set({"count":0});
    q.notifications.create("https://goo.gl/zSK2Zd", noti);
    q.tabs.create({url:"https://goo.gl/zSK2Zd?utm_source=install"});
  } 
  // else if (details.reason == "update") {
  //   var thisVersion = chrome.runtime.getManifest().version;
  //   chrome.tabs.create({url:"https://goo.gl/zSK2Zd?utm_source=update"});
  // }
});
// khởi tạo khi xóa extension
q.runtime.setUninstallURL("https://goo.gl/zSK2Zd?utm_source=uninstall");

// gửi thông tin block

function block(i,k){
  console.log(i);
  var domain = "https://*.facebook.com";
  var link = i.linkUrl;
  q.cookies.get({url: domain, name: "c_user"}, function(cookie) {
    var acc = cookie.value;
    q.tabs.query({active: true, currentWindow: true}, function(tabs) {
        q.tabs.sendMessage(k.id,{link_target:link,account:acc});
    });
  })
}

  q.storage.local.get(["count","check"],function(data){
    if (data.check) {
      q.browserAction.setBadgeText({
          text: data.count.toString(),
        })
    }else{
      q.contextMenus.update("count",{
          checked:false});
      }
  });


function counts(s,l){
  if (s.checked===true) {
    q.storage.local.set({"check":true});
    q.storage.local.get(["count"],function(data){
        q.browserAction.setBadgeText({
          text: data.count.toString(),
        })
    });
  }else{
    q.storage.local.set({"check":false});
    q.browserAction.setBadgeText({
      text: ''
    });
  }
}


//khởi tạo menu rigth mouse
 q.contextMenus.create({
  title: q.i18n.getMessage("appBlock"), 
  contexts:["link"], 
  onclick: block,
  id: "menu_block",
  targetUrlPatterns: ["https://*.facebook.com/*"]
}),
 q.contextMenus.create({
  title: q.i18n.getMessage("appMultiBlock"), 
  contexts:["browser_action"], 
  onclick: function(){window.open(q.extension.getURL('multi.html'), '_blank');},
  id: "multi",
  targetUrlPatterns: ["https://*.facebook.com/*"]
}),q.contextMenus.create({
  title: q.i18n.getMessage("countBlock"),
  contexts:["browser_action"], 
  type:"checkbox",
  onclick: counts,
  id: "count",
  checked:true,
  targetUrlPatterns: ["https://*.facebook.com/*"]
}),


// thông báo chặn thành công
q.runtime.onMessage.addListener(function(b, c, d) {
      if (b.cmd === "show_notification") {
            q.storage.local.get(["count"],function(data){
                q.browserAction.setBadgeText({
                  text:data.count.toString()
            });
            var s = q.extension.getURL("icon.png");
            q.notifications.create({
                type: "basic",
                iconUrl: s,
                appIconMaskUrl: s,
                title: q.i18n.getMessage("appName"),
                message: q.i18n.getMessage("appBlockUser") +  ": " + b.user_id 
            });   
        });
      }else{
         var s = q.extension.getURL("icon.png");
            q.notifications.create({
                type: "basic",
                iconUrl: s,
                appIconMaskUrl: s,
                title: q.i18n.getMessage("appName"),
                message: q.i18n.getMessage("error")
            }); 
      }
});





// thông bao khi có tin nhắn
q.storage.local.get(["checked","text"], function(data) {
   if (data['checked'] === 1) {
      if(!data['text']){
        var text = 'bạn có một tin nhắn mới';
      }else{
        var text = data['text'];
      }
      let message = new Audio('https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q='+ text +'&tl=vi&total=1&idx=0&textlen=7');
      q.webRequest.onBeforeRequest.addListener(
        function(details) {
          if(details.url.includes('delivery_receipts.php')){
  console.log(data);

        message.play();
      }
        },
        {urls: ["<all_urls>"]});
  }
});


}(chrome)

