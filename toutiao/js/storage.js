var storage = {
	set:function (name,val) {

		localStorage.setItem(name,JSON.stringify(val));
	},
	get:function(name){

		return JSON.parse(localStorage.getItem(name));
	}
}