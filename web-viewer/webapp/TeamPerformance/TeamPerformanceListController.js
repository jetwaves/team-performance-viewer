//------------------------ By Hisheng  ----------------配送中心设置
angular.module('adminPanel',[]).controller('TeamPerformanceListController', [
        '$scope','$http', '_','$rootScope','ngDialog','$ocLazyLoad','toastr','Dialog','List',
function($scope,  $http,   _,  $rootScope,  ngDialog,  $ocLazyLoad,  toastr,  Dialog,  List){
    //--------------------初始化数据-----------------------
    //------------------列表分页初始化数据---------------------
        $scope.current_page = 1;
        $scope.totalItems = 30;
        $scope.nums_per_page = '20';
        $scope.loading = 'load';
        $scope.warehouseListItems = [];
        $scope.selectItem = '';
        $scope.warehouse = {name:'',city_name:'',responsible_person:'',in_service:'',pages:$scope.current_page+':'+$scope.nums_per_page};
        $scope.checked_warehouses = [];//选中的配送中心

    //--------------------初始化操作----------------------
    //--------------------查询----------------------
    $scope.search = function(type){
        $scope.loading = 'loading';
    	type = type?type:null;
        if(type !== 'pagination'){$scope.current_page = 1;$scope.warehouse.pages = $scope.current_page+':'+$scope.nums_per_page;}
    	$http({
	    	method:'POST',
	    	url:'/Warehouse/list',
	    	data:$scope.warehouse
	    }).success(function(res){
            $scope.loading = 'load';
	    	console.log(res);
	    	if(res.result && res.result.toLowerCase() == 'true'){
	    		$scope.warehouseListItems = res.data;
	    		$scope.totalItems = res.count*10/$scope.nums_per_page;
                $scope.dataCount = res.count;
	    	}else{
                $scope.warehouseListItems = [];
	    		//toastr.error(res.msg,{timeOut:3000});
	    	}
            var newHeight = $(window).height()-290 - $(".WarehouseTopHeight").height();
            $("#warehouse-list").find("tbody").css({"max-height":newHeight+"px"});
	    });
    };
    // $scope.search(); //初始化查询

    $scope.sortBy = function(sortField){
        var className = $("."+sortField).find("i").attr("class");
        console.log(className);
        if(className == 'glyphicon glyphicon-sort' || className == 'glyphicon glyphicon-circle-arrow-down'){
            $(".tableClass").find("i").attr("class",'glyphicon glyphicon-sort');
            console.log('执行升序');
            $("."+sortField).find("i").attr("class","glyphicon glyphicon-circle-arrow-up");
        }else if(className == 'glyphicon glyphicon-circle-arrow-up'){
            $(".tableClass").find("i").attr("class",'glyphicon glyphicon-sort');
            console.log('执行降序');
            $("."+sortField).find("i").attr("class","glyphicon glyphicon-circle-arrow-down");
        }
    };
    $scope.activeClass = function(index){
        $("#warehouse-list").find('tr').removeClass('success');
        $("#warehouse-list #tr"+index).addClass('success');
        $scope.selectItem = $scope.warehouseListItems[index];
        console.log();
    };

    //------------------处理列表分页---------------------
    $scope.pageChanged = function(num) {
        if(num==1){
            $scope.current_page = 1;
        }
        $scope.unsetCheckedListItems('sys');//修复列表跨页时无法选中的问题
        console.log('Page changed to: ' + $scope.current_page);
        //执行查询操作
        $scope.warehouse.pages = $scope.current_page+':'+$scope.nums_per_page;
        $scope.search('pagination');
    };
}]);