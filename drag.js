
//拖拽的实现
var startDrag = function(bar, target, callback){
//	if (Object.prototype.toString.call(bar) != '[object HTMLDivElement]') return;
//	if (Object.prototype.toString.call(target) != '[object HTMLDivElement]') return;
	if (!bar.nodeName && isNaN(bar.nodeValue)) return false;
	if (!target.nodeName && isNaN(target.nodeValue)) return false;
	// 元素的拖拽实现
	var params = {
		left: getCss(target, 'left'),
		top: getCss(target, 'top'),
		currentX: 0,
		currentY: 0,
		flag: false
	};
	var barDragEnd = function(event){
		params.flag = false;	
		if(getCss(target, 'left') !== 'auto'){
			params.left = getCss(target, 'left');
		}
		if(getCss(target, 'top') !== 'auto'){
			params.top = getCss(target, 'top');
		}
		removeEvent('mousemove', barDrag);
	},
	barDrag = function(event){
		var e = event ? event: window.event;
		if(params.flag){
			var nowX = e.clientX, nowY = e.clientY;
			var disX = nowX - params.currentX, disY = nowY - params.currentY;
			target.style.left = number(params.left) + disX + 'px';
			target.style.top = number(params.top) + disY + 'px';
		}
		
		if (typeof callback == 'function') {
			callback.on(event, number(params.left) + disX, number(params.top) + disY);
		}
	};
	
	if(!isNaN(params.left) && getCss(target, 'left') !== 'auto'){
		params.left = getCss(target, 'left');
	}
	if(!isNaN(params.top) && getCss(target, 'top') !== 'auto'){
		params.top = getCss(target, 'top');
	}
	//移动过程中的监听事件
	addEvent(bar, 'mousedown',mouseDown);
	addEvent(document, 'mousemove',barDrag);
	addEvent(document, 'mouseup',barDragEnd);
	addEvent(bar, 'destroy',function(){
		removeEvent('mousedown', mouseDown);
	});
	
	function mouseDown(event){
		params.flag = true;
		if(!event){
			event = window.event;
			//防止IE文字选中
			bar.onselectstart = function(){
				return false;
			}  
		}
		params.currentX = event.clientX;
		params.currentY = event.clientY;
	}
};
//获取相关CSS属性
function getCss(o,key){
	if (o.currentStyle) {
		return o.currentStyle[key];
	}
	return document.defaultView.getComputedStyle(o,false)[key];	
};
function number(value){
	var rtnValue = parseInt(value, 10);
	if (isNaN(rtnValue)) return 0;
	return rtnValue;
}
function addEvent(eDom, event_non_on, handler){
	if (eDom.addEventListener) {
		eDom.addEventListener(event_non_on, handler, false);
	} else if(eDom.attachEvent){
		eDom.attachEvent('on' + event_non_on, handler);
	}
}
function removeEvent(eDom, event_non_on, handler){
	if (eDom.removeEventListener) {
		eDom.removeEventListener(event_non_on, handler, false);
	}
	if(eDom.detachEvent){
		eDom.detachEvent('on' + event_non_on, handler);
	}
}
//================================
addEvent(document, 'keyup', function(event){
	var eWhich = event.which || event.keyCode;
	var uniCode = String.fromCharCode(eWhich);
});