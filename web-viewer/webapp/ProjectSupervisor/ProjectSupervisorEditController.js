angular.module('adminPanel')
    .controller('ProjectSupervisorEditController',
        ['$scope', '$filter','instance','_','$http', '$rootScope','params','ngDialog','toastr','$ocLazyLoad', /* 注意！！ 不要忘了这里的逗号 , */
            /*  注意 ！！， 前面字符串注入顺序必须和function里面的注入顺序一致         */
    function($scope,$filter, instance, _, $http,  $rootScope,  params,  ngDialog , toastr,  $ocLazyLoad){

    if(params.action == 'edit' || params.action == 1){
        $scope.itemToEdit = {};         // 注意这里一定要重新赋值，否则双向绑定会在弹窗内修改数据时造成外层数据显示错误
        $scope.itemToEdit.name = params.data.name;
        $scope.itemToEdit.sn   = params.data.sn;
        $scope.itemToEdit.gid  = params.data.gid;
        $scope.editMode = true;
        $scope.actionName = '编辑监控项目';
    }else{
        $scope.parentCategory  = {};
        $scope.parentCategory.gid = 0;
        $scope.parentCategory.sn = '';
        $scope.parentCategory.name = '';
        $scope.editMode = false;
        $scope.actionName = '新增监控项目';
    }

    $scope.saveEditCategory = function (type) {     // 保存//   type=new 新建   type=save 保存
        console.log('   EditCategoryController.saveEditCategory() itemToEdit = ');  console.dir($scope.itemToEdit );
        var url = '/Category/add';
        var postData = {parent_gid : $scope.parentCategory.gid, name: $scope.itemToEdit.name };
        console.log('   saveEditCategory()      api postData 000 = ');  console.dir(postData);
        if(params.action == 'edit' && type !='new') {
            url = '/Category/modify';
            postData.gid = $scope.itemToEdit.gid;
            postData.parent_gid = $scope.parentCategory.gid;
        }
        console.log('   saveEditCategory()      api url = ');  console.dir(url);
        console.log('   saveEditCategory()      api postData 001 = ');  console.dir(postData);
        $http.post(url, postData).
        success(function(data, status, headers, config) {
            console.log('   saveEditCategory()      api success return data = ');  console.dir(data);
            if(data.result == 'true' ){
                toastr.success('保存成功', '');
                if(type=='new'){
                    $scope.itemToEdit = undefined;
                    //$scope.parentCategory = undefined;        // 减少操作步骤，不清空上级分类名字
                } else if ( type == 'save'){
                    $scope.parentCategory = undefined
                    $scope.closeThisDialog('success');      // 关闭弹窗，
                }
                $scope.feedTree();
            } else {
                toastr.error(data.msg, '错误提示： ');
            }
        }).
        error(function(data, status, headers, config) {
            console.log('   saveEditCategory()      api error data = ');  console.dir(data);
        });
    };


    $scope.closeEditCategory = function () {    // 关闭
        $scope.closeThisDialog(0);
    };


}]);