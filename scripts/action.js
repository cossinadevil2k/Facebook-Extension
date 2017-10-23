// thưc hiện
//hàm thực hiện hành động
"use strict"
!function(n){
function saveStorage(value){
  if(value===1 || value ===0){
    n.storage.local.set({"checked":value});
    n.runtime.reload();
  }else{
    n.storage.local.set({"text":value});
    n.runtime.reload();
  }
}

function on(){
    // removeStorage();
    saveStorage(1);
}

function off(){
    // removeStorage();
    saveStorage(0);
}
	
function save(){
	var text = $('#thongbao').val();
  saveStorage(text);
}


function removeStorage() {
    n.storage.sync.remove(["checked"]);
}

 
 n.storage.local.get(["checked","text"], function(data) {
       if (data['checked'] === 1) {
       		$("#1").addClass("active");
		 }else{
       		$("#0").addClass("active");
		 }
		var thongbao = document.getElementById('thongbao');
		if(!data['text']){
			thongbao.innerHTML += 'Bạn có một tin nhắn mới';
		}else{
			thongbao.innerHTML += data['text'];
		}
  });

document.getElementById("1").addEventListener("click", on);
document.getElementById("0").addEventListener("click", off);	
document.getElementById("save").addEventListener("click", save);	

}(chrome)