$(function(){
	// 实现放大镜效果
	$('.lxzoom').lxzoom({
		width:250,
		height:250
	});
	var $ulpic=$("#ulSmallPic");
	var $oa=$("<a href='#' />");
	var $oa1=$("<a href='#' />");
	var $img=$("<img/>").attr("src","css/img/small.jpg").appendTo($oa);
	var $img1=$("<img/>").attr("src","css/img/small1.jpg").appendTo($oa1);
	var $li=$("<li />").append($oa);
	var $li1=$("<li />").append($oa1);
	$ulpic.append($li);$ulpic.append($li1);
	
	var $li=$("#ulSmallPic li");
	$ulpic.on("click","li",function()
	{var index=$(this).index();
		console.log(index);
		if(index==0){
			$("#box>img").attr("src","css/img/bigpic.jpg");
		}else $("#box>img").attr("src","css/img/big2.jpg");
	});


// 当点击“添加到购物车”，就添加 cookie 



	var str = getCookie("arr");
	var arr = [];
	// 用于存储所有的商品
	
	if (str != "")
	{
		// 说明之前 cookie 中有商品的内容
		// 取出来转换成数组
		arr= JSON.parse(str);
	}
	//var arr = [];

	// 商品由 名称 和 价格组成
	// 例如：
	// {product: XXX, price: 180}

	var count=0;

		$(".buy02").on('click','a',function() {
			// 这个是价格
			
			var oPrice = $("#p_WebPrice");
//<span id="p_WebPrice">¥358</span>
// 这个商品的信息<div class="pname" style="padding:8px 0 0 0"><h1>
         
			var oProduct = $(".pname h1");
			//console.log(oProduct);
			var oSrc=$("#box").find("img").attr("src");
			
			//console.log(oSrc);
			// 取出商品名字的标签对象
			//火狐支持contains var oSpan = $("span:contains('品号')");
			var oSpan = $(".pname span").eq(0);
		//console.log(oSpan);
			// 取出标签对象中的名字，也就是商品的名称

			// 函数库中自定义的函数
			// 添加了一个 cookie,名字是 product, 内容是 商品的信息, 过期时间是 7天后
			//alert(oSpan.innerHTML);
			
			// 转换成一个
			// var str = encodeURI(oSpan.innerHTML);

			var obj={} ;
			count++;
			$("#headercartproductcount").html(count);
			
			obj.product = oProduct.html();
			obj.price = oPrice.html();
			obj.num=oSpan.html();
			obj.src=oSrc;
			// 将创建好的商品添加到数组中
			
			arr.push(obj);

			// 将数组的内容设置到 cookie 中呢？
			// cookie 的名字是 arr, 内容是数组中的商品，过期时间是7天以后
			

			addCookie("arr", JSON.stringify(arr), 7);
			
			//加入cookie
			//console.log("加入cookie");

			/*		//addCookie("product", oSpan.innerHTML, 7);
			
			// 函数库中自定义的函数
			// 添加了一个 cookie,名字是 price, 内容是 商品的价格, 过期时间是 7天后 
			//addCookie("price", oPrice.innerHTML, 7);
			*/
			

			alert("添加成功");
		});
});
