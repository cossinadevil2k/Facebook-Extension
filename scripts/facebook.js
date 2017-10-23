var embed1 = 
'<div class="pagelet-group pagelet youtube">' +
	'<iframe width="500" height="270" src="https://www.youtube.com/embed/Xw0URnMrFV8" frameborder="0" allowfullscreen></iframe>'+ 
'</div>'; 
var embed2 = 
'<div class="pagelet-group pagelet youtube">' +
	'<iframe width="308"  src="https://www.youtube.com/embed/Tolcbm1L4eU" frameborder="0" allowfullscreen></iframe>'+ 
'</div>'; 


if (document.querySelector('div[class="home_right_column"]')) {
	$('#pagelet_composer').append(embed1);
	// $('.home_right_column').append(embed2);
}else if(document.querySelector('div[class="groupSkyAux pagelet groups_rhc"]')){
	$('#pagelet_group_rhc').append(embed2);
}	