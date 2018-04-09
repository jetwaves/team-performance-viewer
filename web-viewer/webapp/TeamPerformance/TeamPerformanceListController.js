//------------------------ By Hisheng  ----------------配送中心设置
angular.module('adminPanel',[]).controller('TeamPerformanceListController', [
        '$scope','$http', '_','$rootScope','ngDialog','$ocLazyLoad','toastr','Dialog','List',
function($scope,  $http,   _,  $rootScope,  ngDialog,  $ocLazyLoad,  toastr,  Dialog,  List){
    //--------------------初始化数据-----------------------
    //------------------列表分页初始化数据---------------------
        $scope.current_page = 1;
        $scope.totalItems = 0;
        $scope.nums_per_page = '20';
        $scope.loading = 'load';
        $scope.params = [];
        $scope.params.date = '';
        $scope.params.author = '';
        $scope.params.msg = '';
        $scope.params.project = '';
        $scope.params.branch = '';
        $scope.params.hash = '';


        $scope.warehouseListItems = [];
        $scope.selectItem = '';
        $scope.warehouse = {name:'',city_name:'',responsible_person:'',in_service:'',pages:$scope.current_page+':'+$scope.nums_per_page};
        $scope.checked_warehouses = [];//选中的配送中心

    //--------------------初始化操作----------------------
    //--------------------查询----------------------
    $scope.search = function(type){
        console.log('┏---- INFO: ----- start [$scope.params @ ] -----');console.dir($scope.params);console.log('┗---- INFO: -----  end  [$scope.params @ ] -----');
        $scope.loading = 'loading';
        var postData = {};  // 注意这里要用对象不能用数组 [];

        if($scope.params.start_date) postData.start_date = $scope.params.start_date;
        if($scope.params.end_date) postData.end_date = $scope.params.end_date;
        if($scope.params.author) postData.author = $scope.params.author;
        if($scope.params.msg) postData.msg = $scope.params.msg;
        if($scope.params.project) postData.project = $scope.params.project;
        if($scope.params.branch) postData.branch = $scope.params.branch;
        if($scope.params.hash) postData.hash = $scope.params.hash;
        console.log('           postData.pages  = ');  console.dir(postData.pages);
        postData.pages = $scope.current_page +':'+$scope.nums_per_page;
        console.log('           postData  = ');  console.dir(postData);

        $http.post('/TeamPerformance/search', postData).
            then(function(data, status, headers, config) {
                // result: 'true', msg: '查询成功', count : cntRes, data : docs
                if(data.status === 200){
                    $scope.loading = 'loaded';
                    $scope.totalItems = data.data.count;
                    $scope.numPages = Math.ceil($scope.totalItems / $scope.nums_per_page);
                    $scope.gitPerfListItems = data.data.data;

                    var newHeight = $(window).height()-290 - $(".TeamPerformanceList-TopHeight").height();
                    $("#TeamPeformanceList-list").find("tbody").css({"max-height":newHeight+"px"});
                } else {

                }
            }).
            catch(function(data, status, headers, config) {
                console.log('           err data  = ');  console.dir(data);
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
        console.log('Page changed to: ' + $scope.current_page);
        //执行查询操作
        $scope.search($scope.current_page);
    };
}]);