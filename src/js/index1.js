$(function(){
	// 全局配置setup
$.ajax({
	url:'../data/data.json',
	dataType:'json',
	success:function(res){
		console.log(res);	
		var $ul = $('.productlist ul');
		console.log(res.data);//console.log($ul);
	$.each(res,function(idx,item){
$('<li/>').html('<a href="#"><img src="'+item.src+'"/>'+
'<p class="info_1"><span class="desc">'+item.name
+'</span><span class="price">'+item.price
+'</span><span class="point">'+item.point+'</span></p>' +'</a>').appendTo($ul);
		});		
	}
});

//// 页面一加载就请求服务器的数据
//$.ajax();

$(window).on('scroll',function(){
	var scrollTop = $(window).scrollTop();

	// 懒加载：滚动《快到底部》的时候再加载
	if(scrollTop >= $(document).height() - $(window).height() - 100){
		$.ajax();
	}
});

// 手动触发滚动事件
$(window).trigger('scroll');
});