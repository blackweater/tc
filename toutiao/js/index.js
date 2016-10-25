
//页面所有函数的封装
var Page = {
	iscroll:null,
	pageIndex:1, //缓存页码变量值
	newsType:"guoneinews", //缓存国内新闻
	newsTypeList:{list:[{text:'国内',type:'guoneinews'},{text:'国际',type:'worldnews'}]},
	init:function(){
		this.newsTypeList = storage.get("newstypeConf");
		if(!this.newsTypeList){
			this.newsTypeList = allNewsType;
		}
		this.setNav();
		//默认加载国内新闻第一页
		this.loadNews();
		this.events();


		// $(".search").data("test","test aaaa");
		// this.initIscroll();
	},

	//从本地存储把用户选择的新闻分类取出来
	getUserNewstype:function(){

	},

	events:function(){
		var _this = this;
		$("nav.g-nav").on('click', 'a', function(event) {
			event.preventDefault();
			var $a = $(this);
			_this.newsType = $a.data("type");
			_this.pageIndex = 1;
			_this.loadNews();
		});
	},

	/**
	 * 初始化新闻列表的iscroll
	 * @return {[type]} [description]
	 */
	initIscroll:function(){
		var _this = this;

		//在实例化之前，先把之前实例化的对象销毁
		//解决下拉重复触发的bug
		if(_this.iscroll){
			this.iscroll.destroy();
			this.iscroll = null;
		}

		this.iscroll = new IScroll('#iscrollWrap', { bounceEasing: 'elastic', bounceTime: 800, click:true });
		// document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		// this.timer1 = null;
		this.iscroll.on('scrollEnd', function() {
			//判断页面y轴位置=0，滚动方向是向上。这种情况说明是滚动到了页面顶部
			if(this.y === 0 && this.directionY < 0){
				_this.pageIndex++; //加载时，先把当前页码加1
				if(_this.pageIndex > 3){
					alert("没有更新的新闻了");
					return;
				}
				// _this.pageIndex = _this.pageIndex > 3 ? 3 : _this.pageIndex; //如果页码超出时，停留在最后一页
				_this.loadNews(); //再加载新页数据
			}
		});
	},


	/**
	 * 设置新闻分类
	 */
	setNav:function(){
		var htmlStr = Mustache.render('{{#list}} <a href="#" data-type="{{type}}">{{text}}</a> {{/list}}', this.newsTypeList);
		$("nav.g-nav").html(htmlStr);
	},

	/**
	 * 加载新闻
	 * @param  {[type]} newsType [description]
	 * @return {[type]}          [description]
	 */
	loadNews:function(){
		var _this = this;
		$.ajax({
			url: 'json/'+_this.newsType+_this.pageIndex+'.json',
			type: 'GET',
			dataType: 'json'
		})
		.done(function(data) {
			_this.renderTemp(data);
			_this.initIscroll();
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		
	},

	/**
	 * 根据数据列表渲染模板
	 * @param  {[type]} data [description]
	 * @return {[type]}      [description]
	 */
	renderTemp:function(data){
		/*//循环输出html字符串
		$.each(,function(index, el) {
			$("ul.list1").html('<li><h2><a href="{{url}}">{{title}}</a></h2><p><span>来源</span> <time>{{ctime}}</time></p></li>')
		});*/
			
		if(!data || data.error_code !== 0){
			return;
		}
		//temp变量获取页面上的模板内容
		var temp = $("#tmpList1").html();
		var temp2 = $("#tmpList2").html();
		var temp3 = $("#tmpList3").html();
		var htmlStr = "";
		$.each(data.result,function(index, el) {
			//显示摘要的开关
			/*if(true){
				htmlStr += Mustache.render(temp3, this);
			}else */if(this.picUrl){
				htmlStr += Mustache.render(temp2, this);
			}else{
				htmlStr += Mustache.render(temp, this);
			}
		});
		
		$("ul.list1").html(htmlStr);
	}
}


$(document).ready(function($) {
	/*var dataList = {"list":[{text:"国内",url:"guonei.html"},{text:"国际",url:"guoji.html"}]};
	
	var obj = {text:"国际",url:"guoji.html"};
	var htmlstr = Mustache.render('{{#list}}<a href="{{url}}">{{text}}</a>{{/list}}', dataList);
	$("nav.g-nav").html(htmlstr);*/

	Page.init();
	
});