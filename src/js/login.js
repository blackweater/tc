$(function(){
	function  triger(name,reg,text){
	var $name=$("input[name="+name+"]");
	console.log($name);	
	var str=$name.val();//console.log(str)
		//console.log($user.parent().next().text());		
//		var reg=/^[\w]{6,20}$/gi;
		if(!reg.test(str))
	{$name.parent().next().text(text).addClass("red");}		
	}
	
	$('input[name="user"]').on("onmouseleave",function(){
		triger('user',/^[\w]{6,20}$/gi,'用户名长度要在6-20之间');
	});
	function getNum(){
	var num=parseInt(Math.random()*10000);
		if (num<1000)
		{
			num=parseInt(Math.random()*10000);
		};return num;
	}
		
		$(".addnumber").html(getNum());
$(".addnumber").on("click",function(){$(".addnumber").html(getNum());
} );
$(".addnumber").next().on("click",function(){$(".addnumber").html(getNum());
} );
	var $btn1=$(".log-bt .btn");
	
	$btn1.on("click",function(){		
		triger('user',/^[\w]{6,20}$/gi,'用户名长度要在6-20之间');
		triger('password',/^[\w]{6,20}$/gi,'密码长度要在6-20之间');
		triger('number',/^[0-9]{4}$/gi,'验证码错误');
	});
	var $btn2=$(".logreg_btn .btn");
	
	$btn2.on("click",function(){	
		triger('username',/^[0-9]{8,14}$/gi,'手机号码应为纯数字');
		triger('Password2',/^[\w]{6,20}$/gi,'长度要在6-20之间');
		triger('num',/^[\w]{6,20}[@]{1}[\.comn]*$/gi,'一般形式为www.xxx@foxmail.com');
		triger('PasswordRe2',/^[0-9]{8,20}$/gi,'长度要在6-20之间');
	});
});
 