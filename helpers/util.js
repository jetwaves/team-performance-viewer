var _ = require('underscore');

var tool = {
    pickFields			: pickFields,
    pickFiledsInData 	: pickFiledsInData,
    subFloat            : subFloat,
    getNowYmdHis        : getNowYmdHis,
    setAssignDate       : setAssignDate,
    parsePaginateRule   : parsePaginateRule,
    parseStartEndTime   : parseStartEndTime,
    parseSortParam      : parseSortParam,
    makeCacheKey        : makeCacheKey,
    formatToDate        : formatToDate
};



/**
 * @param  {[array]} arr    [要处理的数组]
 * @param  {[array]} fields [要拣选出来的字段列表：可以是一个字符串，也可以是一个数组，用方括号括起来的那种 ]
 * @return {[array]}        [只包含选定字段的结果数组]
 */
function pickFields(arr,fields){
    var finalData = [];
    for( idx in arr){
    	//console.dir(idx);
        var item = arr[idx];
        //console.log('   item = '); console.dir(item);
        item = _.pick(item, fields);
        finalData.push(item);
    }
    return finalData;
}

function pickFiledsInData(arrs,fields){
	result = JSON.parse(arrs);
	arr = result.data;
    var finalData = [];
    for( idx in arr){
    	//console.dir(idx);
        var item = arr[idx];
        //console.log('   item = '); console.dir(item);
        item = _.pick(item, fields);
        finalData.push(item);
    }
    result = {data: finalData, count: result.count}
    // res.send();
    return result;
}

function subFloat(input,bit){
    return Math.round(input*Math.pow(10,bit))/Math.pow(10,bit);
}

function getNowYmdHis(type){
    var moment = require('moment');
    switch (type){
        case 1:
            return moment().format('YYYY-MM-DD_HH-mm-ss_x');
        case 2:
            return moment().format('YYYY-MM-DD HH:mm:ss');
        case 3:
            return moment().format('YYYYMMDD_HHmmss');
        case 4:
            return moment().format('YYYYMMDD_HHmmss_SSS');
        default:
            return moment().format('YYYYMMDDHHmmss_x');
    }
}

function setAssignDate(nums){
    return new Date(new Date()+nums*86400000-(new Date().getHours()*60*60+new Date().getMinutes()*60+new Date().getSeconds())*1000);
}


// pages                : 分页   X:Y   第X页，每页Y条记录
// defaultItemPerPage   : 默认的每页记录数量
//
//      return :  skip, take        跳过的元素数量，要取得的元素数量
function parsePaginateRule(pages, defaultItemPerPage){
    if(!defaultItemPerPage) defaultItemPerPage = 20;
    var pageNum = 1;
    var pageSize = defaultItemPerPage;
    if(pages && pages.indexOf(':') > 0 ){
        var arr = pages.split(':');
        pageNum = arr[0];
        pageSize = arr[1];
    } else {
        if(pages){
            pageNum = pages;
        }
    }
    var skipNum = (pageNum - 1)* pageSize;
    //console.log('           typeof(skipNum)  = ');  console.dir(typeof(skipNum));
    //console.log('           typeof(pageSize)  = ');  console.dir(typeof(pageSize));
    if(typeof(skipNum) == 'string') skipNum = parseInt(skipNum);
    if(typeof(pageSize) == 'string') pageSize = parseInt(pageSize);
    return {skip: skipNum, limit : pageSize};
}

function parseSortParam(sortParam){
    let arr = sortParam.split(':');
    let res = {};
    res.arr[0] = arr[1];
    return res;
}

function parseStartEndTime(reqBody){
    let ret = undefined;
    let start_ts = reqBody.start_time;         // 查询起始时间
    let end_ts   = reqBody.end_time;         // 查询结束时间
    if(start_ts && !end_ts) ret = { $gte: start_ts };
    if(!start_ts && end_ts) ret = { $lte: end_ts };
    if(start_ts && end_ts)  ret = { $gte: start_ts, $lte: end_ts };
    return ret;
}


function makeCacheKey(prefix, paramsArr){
    //console.log('   ---- LOG: ' + __filename + os.EOL + '        prefix  = ');  console.dir(prefix);
    //console.log('   ---- LOG: ' + __filename + os.EOL + '        paramsArr  = ');  console.dir(paramsArr);
    var prefix = prefix.replace(/\//g,'');
    //console.log('   ---- LOG: ' + __filename + os.EOL + '        prefix 2 = ');  console.dir(prefix);
    var key = prefix + "_" + JSON.stringify(paramsArr);
    //console.log('   ---- LOG: ' + __filename + os.EOL + '        key  = ');  console.dir(key);
}

function formatToDate(input, format){
    if(input === "0000-00-00 00:00:00") return '--';
    return moment(input).format(format);
}

module.exports = tool;