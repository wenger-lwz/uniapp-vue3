//全选操作
function fc_checkall(_this, inputname) {
	var checkname = $(_this).attr("name");
	if ($(_this).is(":checked")) {
		$("input[name='"+inputname+"[]']").add("input[name='"+checkname+"']").attr("checked","checked").change();
	}
	else {
		$("input[name='"+inputname+"[]']").add("input[name='"+checkname+"']").removeAttr("checked").change();
	}
} 
//带提醒批量操作
function fc_cfall(_this, inputname, formid, show) {
	if ($("input[name='"+inputname+"[]']").filter(":checked").length == 0) {
		alert('请先勾选需要'+show+'的信息!');
		return false;
	}
	else if (confirm('您确认'+show+'吗?')) {
		$("#"+formid).attr("action", $(_this).attr("href")).submit();
	}
	return false;
}
//带提醒单个操作(修正版)
function fc_cfone(_this, show) {
	var _text = arguments[2] ? show : '您确认'+show+'吗?';
	if (confirm(_text)) {
		if ($(_this).is("a")) {
			fc_loading(show+'中...');
			return true;
		}
		else {
			if ($(_this).attr("target") == "_blank") {
				window.open($(_this).attr("href"));
				return false;
			}
			if (document.all) {  
				var referer_url = document.createElement('a');  
				referer_url.href = $(_this).attr("href");  
				document.body.appendChild(referer_url);  
				referer_url.click();  
			}
			else {
				fc_loading(show+'中...');
				window.location.href = $(_this).attr("href");
			}
		}
	}
	return false;
};
//批量操作
function fc_doall(_this, formid) {
	$("#"+formid).attr("action", $(_this).attr("href")).submit();
}
//dialog函数
function fc_artdialog(_this, title, width, height, id, lock) {
	art.dialog.open($(_this).attr("href"), {title:title, width: width, height: height, id: id, lock: lock});
	return false;
}

//dialog函数 by layer
function fc_dialog(_this, _title, width, height, fn_end) {
	var url = (typeof(_this) == 'object') ? $(_this).attr("href") : _this;
	var layer_index = layer.open({
		type: 2,
		title: _title,
		area: [width+'px', height+'px'],
		fixed: false, //不固定
		shadeClose: true,
		shade: 0.5,
		content: url, //iframe的url
		end : function() {
			if(typeof fn_end == 'function'){
				fn_end();
			}
		}
	});
	if (width == 'max' && height == 'max') layer.full(layer_index);
	return false;
}

//dialog函数 by layer
function fc_open_div(_this, _title, width, height,fn_end) {
	layer.open({
		type: 1,
		title: _title,
		area: [width+'px', height+'px'],
		fixed: false, //不固定
		shadeClose: true,
		shade: 0.5,
		content: $('#'+_this), //iframe的url
		end : function() {
			if(typeof fn_end == 'function'){
				fn_end();
			}
		}
	});
}

//验证码函数
function fc_yzm(_this) {
	var yzm_url = $(_this).attr("data-src");
	var yzm_time = new Date().getTime();
	if (yzm_url.indexOf("time") >= 0) {
		yzm_url = yzm_url.replace(/time=\d+/, 'time=' + yzm_time);
	}
	else {
		yzm_url += (yzm_url.indexOf("?") >= 0 ? '&' : '?') + 'time=' + yzm_time;
	}
	$(_this).attr("src", yzm_url);
}

//数字处理
function fc_num(num, type, len, fix) {
	if (typeof(len) == 'undefined') len = 0;
	if (typeof(fix) == 'undefined') fix = false;
	var pow = Math.pow(10, len);	
	var num = parseFloat(num);
	if (isNaN(num)) num = 0;
	if (type == 'round') {
		num = Math.round(num * pow) / pow;
	}
	else if (type == 'ceil') {
		num = Math.ceil(num * pow) / pow;
	}
	else if (type == 'floor') {
		num = Math.floor(num * pow) / pow;
	}
	if (fix == true) {
		num = num.toFixed(len);
	}
	return num;
}

//打开新页面
function fc_open(url, time) {
	if (typeof(time) == 'undefined') time = 1;
	setTimeout(function(){
		if (url == 'back') {
			window.history.go(-1);
		}
		else if (url == 'reload') {
			window.location.reload();
		}
		else if (url == 'dialog') {
			top.location.reload();
		}
		else {
			window.location.href = url;		
		}
	}, time);
}

//ajax获取信息
function fc_getinfo(url, func,data) {
	$.getJSON(url, data, function(json){
		if (typeof(json.show) != 'undefined' && json.show != '') {
			if (json.result == true) {
				fc_tip(json.show, 'success');
			}
			else if (json.result == false) {
				fc_tip(json.show, 'error');		
			}
			else {
				fc_tip(json.show);
			}
		} 
    	if (func && typeof(func) == "function") {
    		func(json);
    	}
	    else {
			$("#json_html").html(template('json_tpl', json));		    
	    }
	});
}

//弹出提醒框
function fc_alert(show, func) {
	layer.open({
	    content: show,
	    btn: ['确认'],
	    yes: function(){
	    	layer.closeAll();
	    	if (func && typeof(func) == "function") {
				func();
			}
	    }
	});
};

//tip提示信息
function fc_tip(text, type) {
	if (typeof(type) != 'undefined') {
		switch (type) {
			case 'success':
				layer.msg(text, {icon: 1});
			break;
			case 'error':
			layer.msg(text, {icon: 2});
			break;			
		}
	}
	else {
		layer.msg(text);
	}
};
//tips解释信息
function fc_tips(_this, text) {
	layer.tips(text, _this, {
		tips : [2, '#3595CC'],
		time : 0
	});
	$(_this).mouseout(function(){
		layer.closeAll('tips');	
	})
}

//loading加载层
function fc_loading(text) {
	if (typeof(text) == 'undefined' || text == '') {
		text = '数据请求中';	
	}
	return layer.msg(text, {icon: 16, time:60000});
}

//确认提醒
function fc_confirm(show, func_url) {
	layer.open({
	    content: '您确认'+show+'吗?',
	    btn: ['确认', '取消'],
	    shadeClose: false,
	    yes: function(){
	    	if (func_url && typeof(func_url) == "function") {
				func_url();
			}
			else if (func_url) {
				fc_getinfo(func_url, function(json){
					if (json.result) {
						fc_open('reload', 1000);
					}
				})
			}
	    }, no: function(index){
	    	layer.closeAll();
	    }
	});
	//return false;
}

//ajax表单post提交
function fc_submit(url, func, id) {
	var form_id = typeof(id) == 'undefined' ? 'form' : id;
	$.post(url, $("#"+form_id).serialize(), function(json){
    	//if (json.show != '') fc_tip(json.show);
		if (typeof(json.show) != 'undefined' && json.show != '') {
			if (json.result == true) {
				fc_tip(json.show, 'success');
			}else if (json.result == false) {
				fc_tip(json.show, 'error');		
			}else {
				fc_tip(json.show);
			}
		}
    	if (func && typeof(func) == "function") {
    		func(json);
    	}
	}, "json");
}
