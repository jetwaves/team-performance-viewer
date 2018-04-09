//-------------- 列表服务 -------------------
//msg:用于列表的选择事件，双击编辑事件等等
angular.module('adminPanel').service('List',['ngDialog','$ocLazyLoad','toastr',
//adminPanelApp.service('List',['ngDialog','$ocLazyLoad','toastr',
function(ngDialog,$ocLazyLoad,toastr){
	//定义分页初始参数
	this.nums_per_page = 15;//每一页的展示数量
	//-------- 重置列表选项 ----------
	//scope:调用所在的作用于scope,type:'sys'表示controller内部方法调用,list:table的id,checked_list_items:选中对象数组,params:{}其他自定义项
    //{type,list,checked_list_items}
    //return :params
    this.unsetCheckedListItems = function(params){
        params.type = params.type?params.type:'sys';
        $('#'+params.list).find('tr').removeClass('success');//去除选中颜色状态
        $('#'+params.list).find('tr').each(function(index){//把所有的复选框设为未选中
            $(this).find('input[type="checkbox"]').prop('checked',false);
        });
        params.checked_list_items = [];//选中对象数组
        if(params.type !== 'sys')
            toastr.success('已重置当前选择！',{timeOut:2000});
        return params;
    }
    //--------------- 单选事件 ---------------
    /*params
    {
    	index, //循环的index
    	gid,
    	list,  //table的id
    	checked_list_items,  //已选对象数组
    	list_items,   //对象数组
    	current_edit_obj,  //当前编辑对象
    	current_page,
    	nums_per_page
    }
    return :params
    */
    this.checkListItemSelect = function(params){
        if(params.checked_list_items.indexOf(params.gid) >= 0){//如果已存在已选列表中
            params.checked_list_items.splice(params.checked_list_items.indexOf(params.gid),1);//从已选对象数组中删除
            $('#'+params.list).find('tr.'+params.gid).removeClass("success");//去掉选中状态
        }else{
            params.checked_list_items.push(params.gid);
            $('#'+params.list).find('tr.'+params.gid).addClass("success");
            //params.current_edit_obj = params.list_items[params.index+(params.current_page-1)*params.nums_per_page];//设为当前编辑的角色
            params.current_edit_obj = params.list_items[params.index];//设为当前编辑的角色
        }
        console.log('来自列表service的选择事件！');
        console.log(params.checked_list_items);
        return params;
    }
    //----------------- 全选事件 ----------------
    //params:{has_select_all,list,checked_list_items,list_items}
    //return:params
    this.selectAllListItems = function(params){
        if(params.has_select_all){
            $('#'+params.list).children('tbody').find('tr').addClass('success');//设置选中的状态颜色
            $('#'+params.list).find('tr').each(function(index){//把所有的复选框设为选中
                $(this).find('input[type="checkbox"]').prop("checked",true);//这里注意不要用attr，有bug
            });
            params.checked_list_items = [];
            for(index in params.list_items){
                params.checked_list_items.push(params.list_items[index].gid);
            }
        }else{
            $('#'+params.list).children('tbody').find('tr').removeClass('success');//设置选中的状态颜色
            $('#'+params.list).find('tr').each(function(index){//把所有的复选框设为选中
                $(this).find('input[type="checkbox"]').prop("checked",false);
            });
            params.checked_list_items = [];
        }
        console.log(params.checked_list_items);
        return params;
    }
    //---------------- 双击编辑选中项 ---------------
    //params:{index,current_edit_obj,list_items,current_page,nums_per_page}
    //return:params
    this.editListItem = function(params){
        //params.current_edit_obj = params.list_items[params.index+(params.current_page-1)*params.nums_per_page];//设为当前编辑的对象
        params.current_edit_obj = params.list_items[params.index];//设为当前编辑的对象
        console.log('来自列表service的双击选中编辑事件！');
        return params;
    }
}]);