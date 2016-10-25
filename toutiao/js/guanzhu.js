

var Guanzhu = {
	confArr:[],
	$list:null,
	init:function(){
		var tmp = $("#tmpList1").html();
		var htmlStr = Mustache.render(tmp,allNewsType);
		this.$list = $(".gz-list");
		this.$list.html(htmlStr);
		this.events();
	},
	events:function(){
		var _this = this;
		this.$list.on('click', 'input[type=button]', function(event) {
			event.preventDefault();
			var newstype = $(this).data("type"); //获取存在dom上的新闻分类
			$.each(allNewsType.list,function(index, el) {
				//查找到新闻分类对应的对象，然后把它保存到数组中
				if(this.type === newstype){
					_this.confArr.push(this);
					storage.set("newstypeConf",_this.confArr);
				}
			});
		});
	}
}

$(document).ready(function($) {

	Guanzhu.init();
	
});