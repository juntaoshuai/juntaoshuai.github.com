jQuery(document).ready(function(){
	getListData(1);
});
function  getListData(pageIndex){
	alert("dd");
	jQuery.ajax({
		type: "post",
		dataType:"json",
		data: "pageIndex="+pageIndex,
		url: "/onlivemeetingajax.do",
		success: function(data){
			console.log(data);		 
			//此处代码你发挥
		}
	});
	
}
 