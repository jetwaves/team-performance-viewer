adminPanelApp = angular.module('adminPanel', [ 'ngRoute',
    'ui.bootstrap.datetimepicker','angularMoment','ngAnimate','ui.checkbox','mwl.confirm', 'ngCookies',
    'ngDialog','ngSanitize','toastr','ui.bootstrap','oc.lazyLoad'
]);
adminPanelApp.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        jsLoader: requirejs,
        debug: true
    });
}]);
adminPanelApp.config(['ngDialogProvider', function (ngDialogProvider) {
    ngDialogProvider.setDefaults({
        className: 'ngdialog-theme-default',
        plain: false,
        showClose: true,
        closeByDocument: true,
        closeByEscape: false,
        appendTo: false,
        preCloseCallback: function () {
            console.log(' main.js       ngDialog default pre-close callback');
        }
    });
}]);
/*
adminPanelApp.config(['dndListsProvider ', function ($dndListsProvider ) {
    $dndListsProvider.config({
        //jsLoader: requirejs,
        //debug: true
    });
}]);*/

/*  Toaster 风格弹窗提示，通用配置   */
adminPanelApp.config(function (toastrConfig) {
    angular.extend(toastrConfig, {
        autoDismiss: false,
        containerId: 'toast-container',
        maxOpened: 0,
        newestOnTop: true,
        positionClass: 'toast-top-center',
        timeOut: 3000, /* 自动消失计时器，0表示不自动消失*/
        extendedTimeOut: 3000, /* 鼠标悬浮后的消失计时器, 悬浮后 3000毫秒自动消失  */
        preventDuplicates: false,
        preventOpenDuplicates: false,
        target: 'body'
    });
});

adminPanelApp.factory('instance', function () {
    return {};
});

adminPanelApp.constant('_',
    window._
);


adminPanelApp.controller('layoutController', [
         '$scope','$ocLazyLoad','$http','instance','_','$uibModal','ngDialog','$rootScope','$cookies',
function ($scope,  $ocLazyLoad,  $http,  instance,  _,  $uibModal,  ngDialog,  $rootScope,  $cookies) {    /*uibModel是弹窗*/
// adminPanelApp.controller('layoutController', ['$scope', '$ocLazyLoad', '$http', '$uibModal', 'ngDialog','$rootScope', '$cookies',
//     function ($scope, $ocLazyLoad, $http,  $uibModal,ngDialog, $rootScope, $cookies) {    /*uibModel是弹窗*/

        //加载DialogService和ListService by Hisheng
        // msg:例如可以全局调用显示机构列表的对话框 Dialog.showStoreList() 依赖注入是 Dialog
        $ocLazyLoad.load(['/webapp/service/DialogService.js', '/webapp/service/ListService.js','/webapp/service/CheckService.js']).then(function (){},function (e){});
        // $ocLazyLoad.load(['/webapp/service/DialogService.js']).then(function (){},function (e){});
        // //加载自定义的angular filter
        // $ocLazyLoad.load(['/webapp/filter.js']).then(function(){},function(e){});
        // //---------- 提前加载区域信息 -----------
        // if ( !localStorage.regions){
        //     setTimeout(function(){      // 手动延迟加载
        //         $http({
        //             method: 'POST',
        //             url: "/Region/get",
        //             data: {}
        //         }).success(function (res) {
        //             //console.log(res);
        //             if (res.result && res.result.toLowerCase() == "true") {
        //                 localStorage.regions = JSON.stringify(res.data);
        //                 $rootScope.regions = res.data;
        //                 //console.log($rootScope.regions);
        //             } else {
        //                 console.log(res.msg);
        //                 alert('获取区域列表失败');
        //             }
        //         });
        //     }, 8000);
        // } else {
        //     console.log('           $rootScope.regions  NOT NULL ');
        //     $rootScope.regions = JSON.parse(localStorage.regions);
        // }
        console.log('           AAAA        1 ');

        // 载入用户菜单权限信息
        // if( !localStorage.menu_userRights){
        //     setTimeout(function(){      // 手动延迟加载
        //         $http({
        //             method: 'POST',
        //             url: "/Role/getRights",
        //             data: {}
        //         }).success(function (res) {
        //             if (res.result && res.result.toLowerCase() == "true") {
        //                 $rootScope.menu_userRights = res.data.userRights;
        //                 localStorage.menu_userRights = JSON.stringify(res.data.userRights);
        //             } else {
        //                 console.log(res.msg);
        //                 alert('获取用户菜单权限失败');
        //             }
        //         });
        //     }, 8000);
        // } else {
        //     console.log('           $rootScope.menu_userRights  NOT NULL ');
        //     $rootScope.menu_userRights = JSON.parse(localStorage.menu_userRights);
        // }
        console.log('           AAAA        2 ');

        //一些设置项
        //时间控件设置
        $rootScope.timepicker_options = {'show-meridian': false};

        //工作台
        $scope.tabs = [];
        /**
         * 在工作区打开新的工作窗口
         * @param titleValue    string      卡片的中文标题
         * @param url           string      模板页面网址      eg.  /getPanel?app=ModelName
         * @param controller    string      页面angularjs控制器名称        eg.  ModelNameController
         * @param scene         string      工作场景：当同一个控制器管理新增，修改界面的时候，会根据场景不同做数据填充和交互
         * */
        $scope.addTab = function (titleValue, url, controller, scene, closeable) {
            if(closeable === undefined||closeable != false){
                closeable = true;
            }else{
                closeable = false;
            }
            console.log('           closeable  = ');  console.dir(closeable);
            $scope.navShow = 'no';
            var tabId = controller + '_' + scene;
            console.log('  main.js   addTab()       tabId = ');
            console.dir(tabId);
            // 如果tab存在则启用
            var tabs = $scope.tabs;
            console.log('  main.js   addTab()       tabs = ');
            console.dir(tabs);
            // var tabToActive = _.findWhere(tabs, {id: tabId});
            var tabToActive = tabs[ _.findIndex(tabs, {id: tabId})];
            console.log('  main.js   addTab()       tabToActive = ');
            console.dir(tabToActive);
            if (tabToActive) {
                console.log('  main.js   addTab()       found tabToActive   ID      = ');
                console.dir(tabToActive.id);
                console.log('  main.js   addTab()       found tabToActive   title   = ');
                console.dir(tabToActive.title);
                tabToActive.active = true;
                return;
            }
            // 没有同名tab存在，则新增
            // $ocLazyLoad.load(['/webapp' + controller + '.js', 'DateSelectionController']).then(function () {
            $ocLazyLoad.load(['/webapp' + controller + '.js']).then(function () {
                console.log('           after controller ' + controller + '  loding');
                console.log('  main.js   addTab()       before Add a new Tab');
                $scope.tabs.push({title: titleValue, url: url, id: tabId, disabled: false, name: tabId, active: true, closeable: closeable});
                console.log('  main.js   addTab()       after set ActiveTab');
            }, function (e) {
                console.log(' addTab     after load module 000.then Error  ');
                console.dir(e);
            });

        };

        $scope.reloadTab = function (titleValue, url, controller, scene, closeable) {
            if(closeable === undefined||closeable != false){
                closeable = true;
            }else{
                closeable = false;
            }
            $scope.navShow = 'no';
            var tabId = controller + '_' + scene;
            // 如果tab存在则启用
            var tabs = $scope.tabs;
            var tabToActive = _.findWhere(tabs, {id: tabId});

            if (tabToActive) {
                $scope.closeTab(tabToActive.id)
            }
            // 没有同名tab存在，则新增
            $ocLazyLoad.load(['/webapp/c/' + controller + '.js', 'DateSelectionController']).then(function () {
                $scope.tabs.push({title: titleValue, url: url, id: tabId, disabled: false, name: tabId, active: true, closeable: closeable});
            }, function (e) {
            });

        };
        // /**
        //  *默认加载界面
        //  */
        // // $scope.addTab('首页','/SafetyStock','/SafetyStock/SafetyStockController','SafetyStock');
        //
        //
        /**
         * 点击卡片旁边的小叉，关闭卡片
         * */
        $scope.closeTab = function (id) {
            var tabs = $scope.tabs;
            var newTabs = _.reject(tabs, function (tab) {
                return tab.id == id;
            });
            $scope.tabs = newTabs;
        };


        console.log('           AAAA        3 ');
        /**
         * 用于打开对话框
         * */
        //卡片名称，模板路径，C层controllerName,传递参数，返回controllerName
        $rootScope.dialog = function (captionText, templateUrl, AppName, options, returnedEventName, modalSize, modalType) {
            var baseUrl = '/getPanel?app=';
            if (modalType == 'mini') baseUrl = '/getMiniPanel?app=';
            if (modalSize == undefined) modalSize = 'lg';
            $ocLazyLoad.load('/webapp/c/' + AppName + 'Controller.js').then(function () {
                templateUrl = baseUrl + AppName;
                console.log(' open Dialog after load Controller  .then ');
                dialogBox = $uibModal.open({
                    animation: $scope.animationsEnabled, /* 是否使用动画 */
                    keyboard: false, /*是否能用esc关闭*/
                    templateUrl: templateUrl, /*  html模板名称 */
                    controller: AppName + 'Controller', /* 控制器名称 */
                    backdrop: 'static', /* backdrop = static的时候点击背景不会关闭弹窗  */
                    size: modalSize, /* 内容尺寸大小   sm, md, lg */
                    resolve: {
                        /*  传入对话框的参数   */
                        params: function () {
                            console.log('main.js    openDialog   options = ');
                            console.dir(options);
                            return options;
                        }
                    }
                });
                return dialogBox;
            }, function (e) {
                console.log(' open Dialog after load Controller  .then Error');
                console.dir(e);
            });
        };

        console.log('           AAAA        4 ');

        /**
         * 用于打开对话框
         * */
        //卡片名称，模板路径，C层controllerName,传递参数，返回controllerName
        $rootScope.openDialog = function (captionText, templateUrl, AppName, options, returnedEventName, modalSize, modalType) {
            var baseUrl = '/getPanel?app=';
            if (modalType == 'mini') baseUrl = '/getMiniPanel?app=';
            if (modalSize == undefined) modalSize = 'lg';
            $ocLazyLoad.load('/webapp/c/' + AppName + 'Controller.js').then(function () {
                templateUrl = baseUrl + AppName;
                console.log(' open Dialog after load Controller  .then ');
                var dialogBox = $uibModal.open({
                    animation: $scope.animationsEnabled, /* 是否使用动画 */
                    keyboard: false, /*是否能用esc关闭*/
                    templateUrl: templateUrl, /*  html模板名称 */
                    controller: AppName + 'Controller', /* 控制器名称 */
                    backdrop: 'static', /* backdrop = static的时候点击背景不会关闭弹窗  */
                    size: modalSize, /* 内容尺寸大小   sm, md, lg */
                    resolve: {
                        /*  传入对话框的参数   */
                        params: function () {
                            console.log('main.js    openDialog   options = ');
                            console.dir(options);
                            return options;
                        }
                    }
                });
                dialogBox.result.then(function (ret) {      // 接收成功返回值
                    $scope.ret = ret;
                    console.log('  dialogBox.result.then        ret = ');
                    console.dir(ret);
                    $scope.dialogOutput = ret;
                    $scope.$broadcast(returnedEventName + 'Success', ret);
                }, function (ret) {             // 接收到失败返回值
                    console.log('  dialogBox.result.then        dismiss  ret 2 = ');
                    console.dir(ret);
                    console.log('Modal dismissed at: ' + new Date());
                    $scope.$broadcast(returnedEventName + 'Error', ret);
                });
            }, function (e) {
                console.log(' open Dialog after load Controller  .then Error');
                console.dir(e);
            });
        };

        console.log('           AAAA        5 ');

        // $scope.currentUser = function () {
        //     var cookie = $cookies.get('currentUser');
        //     var currentUser;
        //     if (typeof cookie === 'string') {
        //         currentUser = JSON.parse(cookie);
        //     } else {
        //         currentUser = cookie;
        //     }
        //     console.log('Main.js/$rootScope.CurrentUserInfo');
        //     console.dir(currentUser);
        //     return currentUser;
        // };
        // $rootScope.currentUserInfo = $scope.currentUser();

        console.log('           AAAA        6 ');

        if($rootScope.currentUserInfo === undefined){
            // window.location.reload();
        }

        console.log('           AAAA        7 ');

        $scope.selectTab = function (tabName) {
            console.log('   main.js   selectTab()       tabName = ' + tabName);
            $scope.activeTab = tabName;
            $scope.$apply();
        }

        console.log('           AAAA        8 ');
        //显示二级菜单
        $scope.showSubItems = function (item) {
            $scope.navItem = item;
        }

        console.log('           AAAA        9 ');

        //-------------- 显示密码修改弹窗 --------------
        // $scope.showResetPassword = function(){
        //     $scope.reset = {password_new:'',password_again:'',password_old:''};
        //     var user = $rootScope.currentUserInfo;
        //     $scope.currentUser = {gid:user.gid,name:user.name};
        //     ngDialog.openConfirm({
        //         template: '/webapp/v/ModifyPwd/modifyPass.html',
        //         className: 'ngdialog-theme-default', //弹窗的类名
        //         controller : ['$scope','params','toastr',function($scope,params,toastr){
        //             params.gid =  $scope.currentUser.gid;
        //             $scope.reset = params.reset;
        //             $scope.checked_staffs = params.gid;
        //             $scope.dialog_title = params.dialog_title;
        //             //console.log(JSON.stringify(params.gid));
        //             //----------- 修改密码 -------------
        //             $scope.resetPassword = function(){
        //                 console.log($scope.checked_staffs.toString());
        //                 console.log('------/webapp/main/showResetPassword()验证开始-------');
        //                 //md5加密
        //                 var md5 = new Hashes.MD5;
        //                 var post_data = {gid:$scope.checked_staffs.toString(),name: $scope.currentUser.name,
        //                     newPassword1:md5.hex($scope.reset.password_new),newPassword2:md5.hex($scope.reset.password_again),
        //                     oldPassword:md5.hex($scope.reset.password_old)};
        //                 console.log('提交的参数'+post_data+'================');
        //                 if(!$scope.reset.password_new || !$scope.reset.password_again){
        //                     toastr.error('请输入有效的密码信息！',{timeOut:2000});return;
        //                 }else if($scope.reset.password_again.length < 6){
        //                     toastr.error('密码不能小于6位！',{timeOut:2000});return;
        //                 }else if($scope.reset.password_again.length > 20){
        //                     toastr.error('密码长度不能大于20位！',{timeOut:2000});return;
        //                 }
        //                 if($scope.reset.password_new !== $scope.reset.password_again){
        //                     toastr.error('两次输入的密码不一致！',{timeOut:2000});return;
        //                 }
        //                 $http({
        //                     method:'POST',
        //                     url:"/Admin/checkUser",
        //                     data:post_data
        //                 }).success(function(res){
        //                     console.log(JSON.stringify(res)+'----返回结果-----');
        //                     if(res.result && res.result.toLowerCase() == "true"){
        //                         console.log('密码修改成功！---------------------------');
        //                         toastr.success('成功修改了 ' + $scope.currentUser.name + ' 的密码信息！',{timeOut:2000});
        //                         $scope.closeThisDialog(0);
        //                     }else{
        //                         toastr.error(res.msg,{timeOut:2000});
        //                         console.log(res.msg+'\n'+res.data);
        //                     }
        //                 });
        //             }
        //             $scope.cancel = function(){$scope.closeThisDialog(0);}
        //         }],
        //         preCloseCallback: function(){ //关闭前的触发事件
        //             return true;
        //         },
        //         closeByDocument: false, //点击背景关闭弹窗
        //         closeByEscape: false, //通过键盘Esc按钮关闭弹窗
        //         showClose: true, //显示关闭按钮
        //         scope: $scope,
        //         appendTo: '#panel', //绑定到哪个元素节点
        //         resolve: { //将所需参数传递给弹窗的控制器
        //             params : function(){
        //                 return {
        //                     dialog_title : '重置员工密码',
        //                     reset  : $scope.reset,
        //                     checked_staffs: $scope.checked_staffs
        //                 };
        //             }
        //         }
        //     }).then(function (value) {
        //     }, function (reason) {
        //     });
        // }
        console.log('           AAAA        10 ');

    }]);

console.log('           888 ');
//启动AngularJs应用
angular.bootstrap(document.body,['adminPanel']);