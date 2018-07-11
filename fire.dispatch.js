var userAgent = window.navigator.userAgent.toLowerCase();
var isIe = userAgent.indexOf('msie') >= 0;
if (isIe) {
	//================IE==================
	//document上绑定自定义事件ondataavailable
	document.attachEvent('onIEdataavailable', function (event) {
		alert(event.eventType);
	});
	//调用document对象的createEventObject方法得到一个event的对象实例。
	var ieEvent = document.createEventObject();
	ieEvent.eventType = 'message';
} else {
	//================FireFox/Chrome==================
	//document上绑定自定义事件ondataavailable
	document.addEventListener('ondataavailable', function (event) {
		alert(event.eventType);
	}, false);

	//调用document对象的 createEvent 方法得到一个event的对象实例。
	var webkitEvent = document.createEvent('HTMLEvents');
	// initEvent接受3个参数：
	// 事件类型，是否冒泡，是否阻止浏览器的默认行为
	webkitEvent.initEvent("ondataavailable", true, true);
	webkitEvent.eventType = 'message';
}
window.onload = function(){
	if (isIe) {
		//IE================================
		var ieObj=document.getElementById("ieObj");
		//ieObj元素上绑定click事件
		ieObj.attachEvent('onclick', function (event) {
			alert(event.eventType);
		});
		//触发ieObj元素上绑定click事件
		document.getElementById("test").onclick = function () {
			ieObj.fireEvent('onclick', event);
			//触发document上绑定的自定义事件onIEdataavailable
			document.fireEvent('onIEdataavailable', ieEvent);
		};
	} else {
		// NOT IE===========================
		var obj = document.getElementById("webkitObj");
		//webkitObj元素上绑定click事件
		webkitObj.addEventListener('click', function (event) {
			alert(event.type);
			
			//触发document上绑定的自定义事件ondataavailable
			document.dispatchEvent(webkitEvent);
		}, false);
	}
};
