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
        if($scope.params.sortParam !== '') postData.sortParam = $scope.params.sortParam;
        postData.pages = $scope.current_page +':'+$scope.nums_per_page;

        if($scope.params.projectName !== '') postData.projectName = $scope.params.projectName;
        if($scope.params.repoName !== '') postData.repoName = $scope.params.repoName;
        if($scope.params.projectFolder !== '') postData.projectFolder = $scope.params.projectFolder;

        $http.post('/ProjectSupervisor/search', postData).
        then(function(data, status, headers, config) {
            $scope.loading = 'loaded';
            if(data.status === 200){
                console.log('           data.data  = ');  console.dir(data.data);
                if(data.data.result === 'false'){
                    toastr.error(data.data.msg);
                } else {
                    // 得到结果后的数据绑定
                    $scope.totalItems = data.data.count;
                    $scope.numPages = Math.ceil(data.data.count / $scope.nums_per_page);
                    $scope.projectSupervisorListItems = data.data.data;
                    // console.log('           $scope.projectSupervisorListItems  = ');  console.dir($scope.projectSupervisorListItems);
                }
                $scope.setScrollHeight('ProjectSupervisorList');
            } else {    toastr.error('ProjectSupervisorList: 出错了 ' + data.data.msg);  }
        }).catch(function(data, status, headers, config) {
            toastr.error('ProjectSupervisorList: 网络出错了 ' + data.data.msg);   console.log('           err data  = ');  console.dir(data);
        });
    };
    $scope.search(); //初始化查询


    $scope.updateProjectSupervisor = function(action, idToUpdate){
        console.log('           action  = ');  console.dir(action);
        console.log('           idToUpdate  = ');  console.dir(idToUpdate);
        var item = _.find($scope.projectSupervisorListItems, function(item){
            return item._id = idToUpdate;
        });
        console.log('           item  = ');  console.dir(item);
        $ocLazyLoad.load(['/webapp/ProjectSupervisor/ProjectSupervisorEditController.js']).then(function(){
            ngDialog.openConfirm({
                template: '/webapp/ProjectSupervisor/ProjectSupervisorEdit.html',
                className: 'ngdialog-theme-default dialog-width-xlg', //弹窗的类名
                controller : 'ProjectSupervisorEditController',
                preCloseCallback: function(){ //关闭前的触发事件
                    // return confirm('你确定要退出吗？');
                    return true;
                },
                closeByDocument: false, closeByEscape: false, showClose: true, //显示关闭按钮
                scope: $scope,  appendTo: '', //绑定到哪个元素节点
                resolve: { //将所需参数传递给弹窗的控制器
                    params : function(){
                        return {
                            dialog_title    : '新建项目监控',
                            action          : action,
                            itemToUpdate      : _.find($scope.projectSupervisorListItems, function(item){
                                return item._id = idToUpdate;
                            })
                        };
                    }
                }
            }).then(function (result){
                console.log('           result  = ');  console.dir(result);
                $scope.search();
            }).catch(function(error){
                // console.log('           error  = ');  console.dir(error);
                // toastr.error(error.msg);
            });
        }, function(e){
            console.log('ProjectSupervisorEditController.addSupervisor 接收到的弹窗异常信息是\n');console.dir(e);
        });
    };


    $scope.deleteProjectSupervisor = function(param){
        console.log('           deleteProjectSupervisor   param  = ');  console.dir(param);
        $http.post('/ProjectSupervisor/remove', {id: param}).
            then(function(data, status, headers, config) {
                console.log('           data  = ');  console.dir(data);
                console.log('           status  = ');  console.dir(status);
                toastr.info('   已成功删除');
                $scope.search();
            }).
            catch(function(data, status, headers, config) {
                toastr.error(data.msg);
            });
    };


    $scope.refreshProjectSupervisor = function(param){
        console.log('           refreshProjectSupervisor   param  = ');  console.dir(param);


    };



    //-------------------------UI 相关公用方法------------------------------
    $scope.setScrollHeight = function(domName){
        var newHeight = $(window).height()- 220 - $("." + domName + "-TopHeight").height();
        $("#"+ domName + "-table").find("tbody").css({"max-height":newHeight+"px"});
    };

    $scope.sortBy = function(sortField){
        var className = $("."+sortField).find("i").attr("class");
        if(className === 'glyphicon glyphicon-sort' || className === 'glyphicon glyphicon-circle-arrow-down'){
            $(".tableClass").find("i").attr("class",'glyphicon glyphicon-sort');
            $("."+sortField).find("i").attr("class","glyphicon glyphicon-circle-arrow-up");
            $scope.params.sortParam = sortField + ':1';
            console.log('执行升序');    console.log('           $scope.sortParam  = ');  console.dir($scope.sortParam);
        }else if(className === 'glyphicon glyphicon-circle-arrow-up'){
            $(".tableClass").find("i").attr("class",'glyphicon glyphicon-sort');
            $("."+sortField).find("i").attr("class","glyphicon glyphicon-circle-arrow-down");
            console.log('执行降序');    $scope.params.sortParam = sortField + ':-1';
        }
        $scope.search(); //执行查询操作
    };

    //------------------处理列表分页---------------------
    $scope.pageChanged = function() {
        console.log('ProjectSupervisorList:  Page changed to: ' + $scope.current_page);
        $scope.search(); //执行查询操作
    };
}]);