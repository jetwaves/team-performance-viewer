//------------------------ By Hisheng  ----------------配送中心设置
angular.module('adminPanel',[]).controller('ProjectSupervisorListController', [
        '$scope','$http', '_','$rootScope','ngDialog','$ocLazyLoad','toastr','Dialog','List',
function($scope,  $http,   _,  $rootScope,  ngDialog,  $ocLazyLoad,  toastr,  Dialog,  List){
    //--------------------初始化数据-----------------------
    //------------------列表分页初始化数据---------------------
        $scope.current_page = 1;
        $scope.totalItems = 0;
        $scope.numPages = 1;
        $scope.nums_per_page = 50;
        $scope.loading = 'load';
        $scope.params = [];
        $scope.params.sortParam = 'projectName:1';       //  默认用来排序的字段和顺序逆序    -1为逆序
        $scope.params.projectName = '';
        $scope.params.repoName = '';
        $scope.params.projectFolder = '';


    $scope.resetParams = function(){
        $scope.params.sortParam = 'projectName:1';       //  默认用来排序的字段和顺序逆序    -1为逆序
        $scope.params.projectName = '';
        $scope.params.repoName = '';
        $scope.params.projectFolder = '';

    };
    $scope.resetParams();

    //--------------------初始化操作----------------------
    //--------------------查询----------------------
    $scope.search = function(type){
        $scope.loading = 'loading';
        var postData = {};          // 注意这里要用对象不能用数组 [];
        if(moment($scope.params.start_time).isValid()) postData.start_time = moment($scope.params.start_time).format('X');
        if(moment($scope.params.end_time).isValid()) postData.end_time = moment($scope.params.end_time).format('X');


        if($scope.params.projectName !== '') postData.projectName = $scope.params.projectName;
        if($scope.params.repoName !== '') postData.repoName = $scope.params.repoName;
        if($scope.params.projectFolder !== '') postData.projectFolder = $scope.params.projectFolder;

        postData.pages = $scope.current_page +':'+$scope.nums_per_page;

        $http.post('/ProjectSupervisor/search', postData).
            then(function(data, status, headers, config) {
                if(data.status === 200){
                    $scope.loading = 'loaded';
                    $scope.totalItems = data.data.count;
                    $scope.numPages = Math.ceil(data.data.count / $scope.nums_per_page);
                    $scope.ProjectSupervisor = data.data.data;
                    console.log('           $scope.ProjectSupervisor  = ');  console.dir($scope.ProjectSupervisor);

                    $scope.setScrollHeight('ProjectSupervisorList');
                } else {
                    $scope.loading = 'loaded';
                    toastr.error('ProjectSupervisorList: 出错了 ' + data.data.msg);
                }
            }).
            catch(function(data, status, headers, config) {
                console.log('           err data  = ');  console.dir(data);
                toastr.error('ProjectSupervisorList: 网络出错了 ' + data.data.msg);
            });
    };
    $scope.search(); //初始化查询

    $scope.setScrollHeight = function(domName){
        var newHeight = $(window).height()- 220 - $("." + domName + "-TopHeight").height();
        $("#"+ domName + "-table").find("tbody").css({"max-height":newHeight+"px"});
    };


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
        console.log('ProjectSupervisorList:  Page changed to: ' + $scope.current_page);
        $scope.search(); //执行查询操作
    };
}]);