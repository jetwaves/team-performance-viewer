angular.module('adminPanel')
    .controller('ProjectSupervisorEditController',
        ['$scope', '$filter','instance','_','$http', '$rootScope','params','ngDialog','toastr','$ocLazyLoad', /* 注意！！ 不要忘了这里的逗号 , */
            /*  注意 ！！， 前面字符串注入顺序必须和function里面的注入顺序一致         */
    function($scope,$filter, instance, _, $http,  $rootScope,  params,  ngDialog , toastr,  $ocLazyLoad){

    $scope.dialogParams = {};
    $scope.resetDialogParams = function(){
        $scope.dialogParams.projectName = '';
        $scope.dialogParams.repoName = '';
        $scope.dialogParams.projectFolder = '';
        $scope.dialogParams.branches = '';
    };

    if(params.action == 'update' || params.action == 1){
        $scope.itemToEdit = {};         // 注意这里一定要重新赋值，否则双向绑定会在弹窗内修改数据时造成外层数据显示错误
        console.log('           params  = ');  console.dir(params);
        $scope.editMode = true;
        $scope.dialogParams.projectName = params.itemToUpdate.projectName;
        $scope.dialogParams.repoName = params.itemToUpdate.repoName;
        $scope.dialogParams.projectFolder = params.itemToUpdate.projectFolder;
        $scope.dialogParams.branches = params.itemToUpdate.branches;
        // console.log('           params.itemToUpdate  = ');  console.dir(params.itemToUpdate);
        // console.log('           params.itemToUpdate._id  = ');  console.dir(params.itemToUpdate._id);
        $scope.dialogParams._id = params.itemToUpdate._id;

    }else{
        // 注意这里一定要重新赋值，否则双向绑定会在弹窗内修改数据时造成外层数据显示错误
        $scope.resetDialogParams();
        $scope.editMode = false;
    }

    $scope.saveEditProjectSupervisor = function () {
        console.log('   ProjectSupervisorEditController.saveEditProjectSupervisor() itemToEdit = ');  console.dir($scope.itemToEdit );
        var url = '/ProjectSupervisor/add';
        var postData = {} ;
        postData.projectName = $scope.dialogParams.projectName;
        postData.repoName = $scope.dialogParams.repoName;
        postData.projectFolder = $scope.dialogParams.projectFolder;
        postData.branches = $scope.dialogParams.branches;
        if($scope.editMode) {
            console.log('           update Action ');
            url = '/ProjectSupervisor/modify';
            postData._id = $scope.dialogParams._id;
        }
        $http.post(url, postData).
        then(function(data, status, headers, config) {
            console.log('   saveEditProjectSupervisor()      api success return data = ');  console.dir(data);
            if(data.data.result == 'true' ){
                toastr.success('保存成功', '');
                $scope.confirm('success');      // 关闭弹窗，用 confirm() 在外面openConfirm的 .then 中收到结果
            } else {
                toastr.error(data.msg, 'API 错误提示： ');
            }
        }).
        catch(function(data, status, headers, config) {
            console.log('   saveEditCategory()      api error data = ');  console.dir(data);
            toastr.error(data.msg, '网络 错误提示： ');
        });
    };




    $scope.close = function () {    // 关闭
        $scope.closeThisDialog(0);              // 关闭弹窗，用 closeThisDialog() 在外面openConfirm的 .catch 中收到结果
    };


}]);