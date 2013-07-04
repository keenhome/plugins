/**
*	常用方法整理收集
*	@author		keenhome<keenhome@126.com>
*	@created	2013-07-04
*	@updated	2013-07-04
*/




/**
*	倒计时
*	调用方法 var a=new countDown(1111,22222,2,funcName1,funcName2);
*	@param int startTime	倒计时开始的时间戳（单位是秒）
*	@param int endTime		倒计时结束的时间戳（单位是秒）
*	@param int step		倒计时间隔,默认是1（单位秒）
*	@param function processingCallback		倒计时进行中回调方法，传参数： 天、时、分、秒
*	@param endCallback endCallback		倒计时结束回调方法，无参数
*/
function countDown(startTime,endTime,step,processingCallback,endCallback) {
	var step = step ? step : 1 ;
	var leftTime = parseInt(endTime-startTime);
	var processingCallback = processingCallback ;
	var endCallback = endCallback;
	var timer = null;
	var timeValues = [];

	var run = function(){
		if(isNaN(leftTime) || Math.floor(leftTime)<=0){
			clearTimeout(timer);
			if(typeof(endCallback)=='function'){
				endCallback();
			}
			return false;
		}else{
			timeValues[0] = Math.floor(leftTime/(60*60*24));
			timeValues[1] = Math.floor(leftTime/(60*60))%24;
			timeValues[2] = Math.floor(leftTime/60)%60;
			timeValues[3] = Math.floor(leftTime%60);
			if(typeof(processingCallback)=='function'){
				processingCallback(timeValues);
			}
			leftTime -=step;
			timer = setTimeout(function(){
				run();				
			},step*1000);
		}
	};
	run();
}


/**
*	获取url里面的参数
*	@param string paramter	url参数字段名
*	@param string url		需要截取参数的url，默认为当前页面的url
*	@return string 			返回url中paramter对应的值
*/
function getUrlParam(parameter, url) {
	url = (url=='' ||typeof(url)=='undefined') ? location.href : url;
	var result = url.match(new RegExp("[\#|\?]([^#]*)[\#|\?]?"));
	url = "&" + ((result==null) ? "" : result[1]);
	result = url.match(new RegExp("&" + parameter + "=", "i"));
	return (result==null) ? '' : url.substr(result.index+1).split("&")[0].split("=")[1];
}

