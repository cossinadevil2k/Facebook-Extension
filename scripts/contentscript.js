"use strict";
! function(nq){
//nhận thông tin chặn và thông báo
nq.runtime.onMessage.addListener(function(d,e,f){
	var id_target = /id=([0-9]+)/.exec(document.querySelector('a[href="' + d.link_target +'"]').attributes["data-hovercard"].value)[1];
	// var name_target = document.querySelector('a[href="' + d.link_target +'"]').textContent;
		var k = document.querySelector('[name="fb_dtsg"]');
		if(!k){
			nq.runtime.sendMessage({
                cmd:"error"
            });
		}else{
			if(id_target !==null){
				fetch("https://www.facebook.com/ajax/privacy/block_user.php?dpr=1", {
		            method: "POST",
		            credentials: "include",
		            body: 'fb_dtsg=' + encodeURIComponent(k.value) + '&confirmed=!0&__user=' + d.account + '&__a=1&uid=' + id_target + '&is_nfx=1',
		            headers: {  
							"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
					}
		        }).then(function() {

		        	nq.storage.local.get(["count"],function(data){
			           	if(data.count===0){
			            	var count_m = 1;
			            	nq.storage.local.set({"count":count_m});
			            }else{
		            		var count_m = data["count"] + 1;
		            		nq.storage.local.set({"count":count_m});
			            }
		            });

		            nq.runtime.sendMessage({
		                cmd: "show_notification",
		                user_id: id_target
		                // name_tg: name_target
		            });
		            
		           	
		        });
			}else{
				nq.runtime.sendMessage({
                	cmd:"error"
            	});
			}
	}
});

}(chrome)