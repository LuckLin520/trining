function http(this_1, type, url, data, re) {
	this_1.$http({
		method: type,
		url: '//114.55.173.248:2000/v1' + url,
		data: data,
		headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
	}).then(function(res) {
		re(res.data);
	}).catch(function(err) {
		//如果没有就直接打印吧
		console.log('错误信息', err);
	})
}

function ajax(type, url, data, re, async=true) {
	$.ajax({
		type: type,
		url: '//114.55.173.248:2000/v1' + url,
		data: data,
		async: async,
		success(x){
			re(x)
		}
	});
}

//分页 参数x=最大页数 y=当前页数
function paging(x, y) {
	var obj = new Object();
	obj.list = [];
	obj.shang = y-1>0 ? y-1 : '';
	obj.xia = y+1<=x ? y+1 : '';
	for(var i = 1; i <= x; i++) {
		if(i <= y && i > y-5) {
			obj.list.push(i)
		} else if(i > y && i < y+5) {
			obj.list.push(i)
		}
	}
	return obj;
}

//时间格式化	date=yyyy.MM.dd hh:mm
function dateFtt(date,fmt) { //author: meizz   
	var date=new Date(date);
	var o = {   
	    "M+" : date.getMonth()+1,                 //月份   
	    "d+" : date.getDate(),                    //日   
	    "h+" : date.getHours(),                   //小时   
	    "m+" : date.getMinutes(),                 //分   
	    "s+" : date.getSeconds(),                 //秒   
	    "q+" : Math.floor((date.getMonth()+3)/3), //季度   
	    "S"  : date.getMilliseconds()             //毫秒   
	  };   
	  if(/(y+)/.test(fmt))   
	    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
	  for(var k in o)   
	    if(new RegExp("("+ k +")").test(fmt))   
	  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
	  return fmt;   
}

//递归
function treeType(data,val){
	var tree=[];
	for(var i=0;i<data.length;i++){
		if (data[i].ParentId == val) {
			var a=treeType(data,data[i].Id);
			if(a.length>0){
				data[i].children=treeType(data,data[i].Id);
			}
			tree.push(data[i])
		}
	}
	return tree;
}

//阿拉伯数字转中文大写 
function DX(n) {
	// if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
		// return "数据非法";
	if (n == '0')
		return "零元"
	var unit = "仟佰拾亿仟佰拾万仟佰拾元角分", str = "";
		n += "00";
	var p = n.indexOf('.');
	if (p >= 0)
		n = n.substring(0, p) + n.substr(p+1, 2);
		unit = unit.substr(unit.length - n.length);
	for (var i=0; i < n.length; i++)
		str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
	return str.replace(/零(仟|佰|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
}
//localStorage.user0609=JSON.stringify(x.Memory.user);
//localStorage.permission0609=JSON.stringify(x.Memory.permission);


function PreFixInterge(num,n){
	//num代表传入的数字，n代表要保留的字符的长度
	return (Array(n).join(0)+num).slice(-n);
}

export {
	http,
	ajax,
	paging,
	dateFtt,		//时间格式化
	treeType,
	DX,
	PreFixInterge
}