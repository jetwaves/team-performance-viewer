//保留浮点数的n位小数
angular.module('adminPanel').filter('subFloat', ['_',function (_) {
    return function (input,bit) {
        return Math.round(input*Math.pow(10,bit))/Math.pow(10,bit);
    }
}]);
//格式化日期
angular.module('adminPanel').filter('formatToDate', ['_',function (_) {
    return function (input,format) {
        if(input === "0000-00-00 00:00:00") return '--';
        return moment(input).format(format);
    }
}]);
//隐藏银行卡号，只显示前四位和后四位
angular.module('adminPanel').filter('maskAccountNumber', ['_',function (_) {
    return function (input) {
        return input.substr(0,4) + '****' + input.substr(-4,4);
    }
}]);
//将分转为元
angular.module('adminPanel').filter('fenToYuan', ['_',function (_) {
    return function (input,nums) {
        //input 数据本身也会自带小数点，条件判断不完全
    	/*if(input && Math.abs(input) >= 1)
    	{
    		input += '';//转为字符串处理
    		var is_negative = (input[0]=='-');
    		input = is_negative?input.substr(1,input.length):input;
	        switch(input.length){
	        	case 0:
	        		input = '0.00';
	        		break;
	        	case 1:
	        		input = '0.0' + input;
	        		break;
	        	case 2:
	        		input = '0.' + input;
	        		break;
	        	default:
	        		input = input.substr(0,input.length-2) + '.' + input.substr(-2,input.length);
	        		break;
	        }
	        return (is_negative?'-':'') + input;
    	}else return '0.00';*/
        nums = nums ? nums : 2;
        input = input?input:0;
        input = (Number(input)/100).toFixed(nums);
        return input;
    }
}]);
//将字符串转为数字
angular.module('adminPanel').filter('stringToNumber', ['_',function (_) {
    return function (input) {
        //判断是小数还是整数
        if(input.indexOf('.') >= 0)return parseFloat(input);
        else return parseInt(input);
    }
}]);
//转换单位为KG的数量
angular.module('adminPanel').filter('transferAmountOfKG', ['_',function (_) {
    return function (input,FK_uom_gid) {
        if(arguments[2] == '*')return FK_uom_gid=='100000000000001'?input*1000:input;
        else return FK_uom_gid=='100000000000001'?(input/1000):input;
    }
}]);
//调用JS内部函数
angular.module('adminPanel').filter('function', ['_',function (_) {
    return function (input,functionName) {
        switch(functionName){
            case 'parseInt':
                input = parseInt(input);
                break;
            case 'parseFloat':
                input = parseFloat(input);
                break;
            case 'Math.floor': 
                input = Math.floor(input);
                break;
            case 'Math.ceil': 
                input = Math.ceil(input);
                break;
            case 'Math.pow': 
                input = Math.pow(input,arguments[2]);
                break;
            case 'Math.sqrt': 
                input = Math.sqrt(input,arguments[2]);
                break;
            case 'Math.abs': 
                input = Math.abs(input);
                break;
            case 'substr': //继续添加其他内建函数
                input = input.substr(arguments[2],arguments[3]);
                break;
            default:
                ;
                break;
        }
        return input;
    }
}]);
