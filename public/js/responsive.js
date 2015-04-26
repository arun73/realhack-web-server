var winht;

$(window).load(function(){
	winht = $(window).height();
	initiailize();
});

function initiailize() {
	$(".topbar").height(winht/12);
	$(".sidebar").height(winht*0.8);
	$(".videoplayer").height(winht*0.8);
	$(".map").height(winht*0.53);
	$(".modaltop").height(winht*0.05);
	
};