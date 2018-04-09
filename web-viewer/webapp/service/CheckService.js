//-------------- 列表服务 -------------------
//msg:用于列表的选择事件，双击编辑事件等等
angular.module('adminPanel').service('Check',['toastr','_',
function(toastr,_){

    //---------------- 验证商品明细是否完整 ---------------
    this.checkProductLinesIsComplete = function(params,tips,productNameStr){
        //筛掉空单
        params = _.reject(params, function (item) {
            return item.FK_product_gid == '' && item[productNameStr] == '--';
        });
        if (!params.length) {
            toastr.error('不允许添加空单！', {timeOut: 2000});
            return false;
        }

        var res = true;
        var checkValue;
        for(var key in tips){
            checkValue =  key == 'box_spec' ? 1 : 0;
            var is_complete = _.every(params, function (item) {
                if (item.third_party_id && item[productNameStr] !== '--' && item[key] >= checkValue)return true;
                else return false;
            });

            if (!is_complete){
                toastr.warning('明细有误,'+tips[key]+'不能小于'+checkValue+'!', {timeOut: 2000});
                res = false;
                break;
            }
        }
        return res;
    }

}]);