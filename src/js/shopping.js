$(function(){	
var oUl = $("#plist");

	// [TODO] 获取cookie，并转换会数组，并遍历创建 LI 显示

		//定义str和arr
	// var a = "[{}]"
	// string
	//alert(typeof str);
	
	var str=getCookie("arr");//你要查的是字符串
	var arr=JSON.parse(str);
	if(str=="")
	{return;}
console.log(arr);
if(!arr.length){return;}
	var count=arr.length;
	console.log(count);
	$("#headercartproductcount").html(count);
	for (var i = 0; i < arr.length; i++)
	{
		// 创建一个商品
		//console.log(i);
		var oLi = $("<li/>");

		// 取出数组中元素，arr[i] 是一个对象,
		//    再取出这个对象中的产品名 和 价格
		console.log(arr[i].src);
	oLi.html("<img src='"+arr[i].src+"'/><p>"+arr[i].product+"</p><p>"
		+arr[i].price +"</p><p>"+arr[i].num+"</p><button>删除</button>");

		oLi.appendTo(oUl);
	}		
	
	
	oUl.find("button:contains(删除)").on("click",function(){
		count--;
		$("#headercartproductcount").html(count);
		var index=$(this).parent().index();
		console.log(index);
		$(this).parents("li").remove();
//		//cookie无法移除?
		console.log(arr[index]);
//		var a = $.makeArray( arr );
//		var spr=JSON.stringify()
//		var a=JSON.parse(arr[index]);
		var sde=JSON.stringify(arr[index]);
		console.log(sde);//一个对象
			//addCookie("arr",1 , -1)//清空购物车
		
		for(var i=0;i<arr.length-1;i++){
			if(i>index)
			arr[i-1]=arr[i];
		}
		arr.length=arr.length-1;
		console.log(arr);
		addCookie("arr",JSON.stringify(arr) , 7)
	});
	
})