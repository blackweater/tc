$(function(){	
	//轮播图
// 	 功能 显示 激活 按钮
//   (1) 清空所有按钮
//   (2) 当前要激活的按钮，设置成 红色

// showBtn
// 参数：
//          allBtn 所有的按钮
//          index  激活按钮的下标
function showBtn(allBtn, index) {
	// 清空所有按钮
	for (var j = 0; j < allBtn.length;j++) {
		allBtn[j].style.background = "grey";
	}
	allBtn[index].style.background = "red";		
}
	var oList = document.getElementById("focus");
	
	oList.innerHTML += oList.innerHTML;
	
	var allLi = oList.getElementsByTagName("li");
	
	// 存放切换按钮的ul
	var oList2 = document.getElementById("list2"); 
	//  所有按钮
	var allLi2 = oList2.getElementsByTagName("li");
	// 图片的宽度
	var width = allLi[0].offsetWidth;
	var height = allLi[0].offsetHeight;
	
	// 改变list的宽度，使得li可以水平浮动
	oList.style.width = (allLi.length * width) + "px";


	// 思路：
	//   (1) 定时更新
	//   (2) 点击按钮更新图片
	//   (3) 上一页、下一页需要考虑当前是否在滚动
	
	var t = 3000;
	var timer = setTimeout(move, t);//延时器
	
	// 滚动图片的下标
	var i = 0;
	//定义标记纪录页面是否在滚动
	var isMoving = false;
	function move() {		
		// 标志移动开始 
		isMoving = true;		
		// 滚动到下一张图片
		i++;		
		var iLeft = -1 * i * width;		
		// console.log("当前图片的下标：" + i);
		
		// 动画显示下标为i的图片
		startMove(oList, "left", iLeft, next);
		
		// 当前要显示按钮的下标
		var index = i;
		if (i >= allLi.length/2) {
			index = 0;
		}		
		// 自定义函数，显示下标为 index 的图片
		showBtn(allLi2, index);
	}
	
	function next() {
		if (i >= allLi.length / 2) {
			i = 0;
			// 瞬间回到第0张
			oList.style.left = "0px";
		}		
		timer = setTimeout(move, t);		
		// 标志移动结束
		isMoving = false;
	}
	
	// 遍历所有按钮，给每个按钮添加点击事件处理函数，实现点击切换效果
	for (var j = 0; j < allLi2.length; j++) {
		// 保存下标
		allLi2[j].xxx = j;		
		allLi2[j].onclick = function() {			
			// 清除延时器
			clearTimeout(timer);			
			// 取出点击按钮的下标赋值给 i， 
			/// 因为 move函数存在中 i++ 的操作
			// 所以需要减1，确保下次滚动 this.xxx 这张图片上
			i = this.xxx - 1;			
			// 切换到i的【下一张】图片
			move();
		}
	}
	 
//	 
//	 menu #faq dd, #faq dd 
//  display: none;
//

//2级菜单
var $faq=$("#faq");
//var nub=0;
$faq.on("click","li",function(){
	$faq.children("li").find("dd").hide();
	var index=$(this).index();
	console.log(index);
	$faq.children("li").eq(index).find("dd").show();
	//nub=index;
});
//.allsort .item span h3 a show()   .allsort .item mosuenter
var $item=$(".allsort .item");
$item.on("mouseenter",function(){
	var index=$(this).index();
	$(this).closest("li").find(".i-mc").eq(index).show();
	$item.on("mouseleave",function(){
	$(this).closest("li").find(".i-mc").eq(index).hide();	
	});
});
})

