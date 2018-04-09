//------------------------ By Hisheng  ----------------配送中心设置
angular.module('adminPanel',[]).controller('TeamPerformanceListController', [
        '$scope','$http', '_','$rootScope','ngDialog','$ocLazyLoad','toastr','Dialog','List',
function($scope,  $http,   _,  $rootScope,  ngDialog,  $ocLazyLoad,  toastr,  Dialog,  List){
    //--------------------初始化数据-----------------------
    //------------------列表分页初始化数据---------------------
        $scope.current_page = 1;
        $scope.totalItems = 0;
        $scope.numPages = 1;
        $scope.nums_per_page = 20;
        $scope.loading = 'load';
        $scope.params = [];
        $scope.params.sortParam = 'date:-1';       //  默认用来排序的字段和顺序逆序    -1为逆序
        $scope.params.date = '';
        $scope.params.author = '';
        $scope.params.msg = '';
        $scope.params.project = '';
        $scope.params.branch = '';
        $scope.params.hash = '';

    //--------------------初始化操作----------------------
    //--------------------查询----------------------
    $scope.search = function(type){
        console.log('┏---- INFO: ----- start [$scope.params @ ] -----');console.dir($scope.params);console.log('┗---- INFO: -----  end  [$scope.params @ ] -----');
        $scope.loading = 'loading';
        var postData = {};          // 注意这里要用对象不能用数组 [];

        if($scope.params.start_date) postData.start_date = $scope.params.start_date;
        if($scope.params.end_date) postData.end_date = $scope.params.end_date;
        if($scope.params.author) postData.author = $scope.params.author;
        if($scope.params.msg) postData.msg = $scope.params.msg;
        if($scope.params.project) postData.project = $scope.params.project;
        if($scope.params.branch) postData.branch = $scope.params.branch;
        if($scope.params.hash) postData.hash = $scope.params.hash;
        if($scope.params.sortParam) postData.sortParam = $scope.params.sortParam;

        postData.pages = $scope.current_page +':'+$scope.nums_per_page;

        $http.post('/TeamPerformance/search', postData).
            then(function(data, status, headers, config) {
                if(data.status === 200){
                    $scope.loading = 'loaded';
                    $scope.totalItems = data.data.count;
                    $scope.numPages = Math.ceil(data.data.count / $scope.nums_per_page);
                    // console.log('           $scope.numPages       = ');  console.dir($scope.numPages);
                    $scope.gitPerfListItems = data.data.data;

                    var newHeight = $(window).height()- 220 - $(".TeamPerformanceList-TopHeight").height();
                    $("#TeamPerformanceList-table").find("tbody").css({"max-height":newHeight+"px"});
                } else {
                    $scope.loading = 'loaded';
                    toastr.error('出错了 ' + data.data.msg);
                }
            }).
            catch(function(data, status, headers, config) {
                console.log('           err data  = ');  console.dir(data);
                toastr.error('网络出错了 ' + data.data.msg);
            });
    };
    $scope.search(); //初始化查询



    $scope.sortBy = function(sortField){
        var className = $("."+sortField).find("i").attr("class");
        if(className === 'glyphicon glyphicon-sort' || className === 'glyphicon glyphicon-circle-arrow-down'){
            $(".tableClass").find("i").attr("class",'glyphicon glyphicon-sort');
            console.log('执行升序');
            $("."+sortField).find("i").attr("class","glyphicon glyphicon-circle-arrow-up");
            $scope.params.sortParam = sortField + ':1';
            console.log('           $scope.sortParam  = ');  console.dir($scope.sortParam);
        }else if(className === 'glyphicon glyphicon-circle-arrow-up'){
            $(".tableClass").find("i").attr("class",'glyphicon glyphicon-sort');
            console.log('执行降序');
            $("."+sortField).find("i").attr("class","glyphicon glyphicon-circle-arrow-down");
            $scope.params.sortParam = sortField + ':-1';
        }
        $scope.search(); //执行查询操作
    };


    //------------------处理列表分页---------------------
    $scope.pageChanged = function() {
        console.log('Page changed to: ' + $scope.current_page);
        $scope.search(); //执行查询操作
    };
}]);