//---------------------By Hisheng---------------------------
angular.module('adminPanel').service('Dialog',['ngDialog','$ocLazyLoad','$q',
//adminPanelApp.service('Dialog',['ngDialog','$ocLazyLoad','$q',
    function(ngDialog,$ocLazyLoad,$q){
        //--------------------显示机构列表弹窗---------------
        //msg:注意，这个是用来显示非末级的机构(不包含门店)，与显示门店列表不同
        //指定机构的level可以通过options传入
        this.showInstitutionList = function(options){
            return $q(function(resolve,reject){
                $ocLazyLoad.load(['/webapp/c/Dialog/InstitutionListDialogController.js']).then(function(){
                    ngDialog.openConfirm({
                        template: '/webapp/v/Dialog/institutionDialog.html',
                        //className: 'ngdialog-theme-default', //弹窗的类名
                        controller : 'InstitutionListDialogController',
                        preCloseCallback: function(){ //关闭前的触发事件
                            //return confirm('你确定要退出吗？');
                            return true;
                        },
                        closeByDocument: false, //点击背景关闭弹窗
                        closeByEscape: false, //通过键盘Esc按钮关闭弹窗
                        showClose: true, //显示关闭按钮
                        scope: '',
                        appendTo: 'body', //绑定到哪个元素节点
                        resolve: { //将所需参数传递给弹窗的控制器
                            params : function(){
                                return {
                                    dialog_title : '选择运营中心', //对话框的title
                                    options  : options
                                };
                            }
                        }
                    }).then(function(returnData){//成功的返回值
                        console.log('DialogService.showInstitutionList 接收到的返回值\n');
                        console.log(returnData);
                        resolve(returnData);
                    }, function(error){
                        console.log('DialogService.showInstitutionList 接收到的错误信息\n');
                        console.log(error);
                    });
                }, function(e){
                    console.log('DialogService.showInstitutionList 接收到的异常信息\n');
                    console.log(e);
                    reject(e);
                });
            });
        };
        //------------------显示配送中心的列表------------------
        this.showWarehouseList = function(controller,options){
            return $q(function(resolve,reject){
                $ocLazyLoad.load(['/webapp/c/Dialog/WarehouseListDialogController.js']).then(function(){
                    ngDialog.openConfirm({
                        template: '/webapp/v/Dialog/warehouseListDialog.html',
                        //className: 'ngdialog-theme-default', //弹窗的类名
                        controller : 'WarehouseListDialogController',
                        preCloseCallback: function(){ //关闭前的触发事件
                            return true;
                        },
                        closeByDocument: false, //点击背景关闭弹窗
                        closeByEscape: false, //通过键盘Esc按钮关闭弹窗
                        showClose: true, //显示关闭按钮
                        scope: '',
                        appendTo: 'body', //绑定到哪个元素节点
                        resolve: { //将所需参数传递给弹窗的控制器
                            params : function(){
                                return {
                                    dialog_title : '选择配送中心', //对话框的title
                                    options  : options,
                                    controller: controller
                                };
                            }
                        }
                    }).then(function(returnData){//成功的返回值
                        console.log('DialogService.showWarehouseList 接收到的返回值\n');
                        console.log(returnData);
                        resolve(returnData);
                    }, function(error){
                        console.log('DialogService.showWarehouseList 接收到的错误信息\n');
                        console.log(error);
                    });
                }, function(e){
                    console.log('DialogService.showWarehouseList 接收到的异常信息\n');
                    console.log(e);
                    reject(e);
                });
            });
        };
        //------------------显示银行卡的列表------------------
        this.showBankAccountList = function(controller,options){
            return $q(function(resolve,reject){
                $ocLazyLoad.load(['/webapp/c/Dialog/BankAccountListDialogController.js']).then(function(){
                    ngDialog.openConfirm({
                        template: '/webapp/v/Dialog/bankAccountListDialog.html',
                        className: 'ngdialog-theme-default dialog-width-sm', //弹窗的类名
                        controller : 'BankAccountListDialogController',
                        preCloseCallback: function(){ //关闭前的触发事件
                            return true;
                        },
                        closeByDocument: false, //点击背景关闭弹窗
                        closeByEscape: false, //通过键盘Esc按钮关闭弹窗
                        showClose: true, //显示关闭按钮
                        scope: '',
                        appendTo: 'body', //绑定到哪个元素节点
                        resolve: { //将所需参数传递给弹窗的控制器
                            params : function(){
                                return {
                                    dialog_title : '选择银行卡', //对话框的title
                                    options  : options,
                                    controller: controller
                                };
                            }
                        }
                    }).then(function(returnData){//成功的返回值
                        console.log('DialogService.showBankAccountList 接收到的返回值\n');
                        console.log(returnData);
                        resolve(returnData);
                    }, function(error){
                        console.log('DialogService.showBankAccountList 接收到的错误信息\n');
                        console.log(error);
                    });
                }, function(e){
                    console.log('DialogService.showBankAccountList 接收到的异常信息\n');
                    console.log(e);
                    reject(e);
                });
            });
        };
        //------------------ 显示省市区的选择弹窗 -------------------
        this.showRegionSelect = function(options){
            return $q(function(resolve,reject){
                $ocLazyLoad.load(['/webapp/c/Dialog/RegionSelectDialogController.js']).then(function(){
                    ngDialog.openConfirm({
                        template: '/webapp/v/Dialog/regionSelectDialog.html',
                        //className: 'ngdialog-theme-default', //弹窗的类名
                        controller : 'RegionSelectDialogController',
                        preCloseCallback: function(){ //关闭前的触发事件
                            return true;
                        },
                        closeByDocument: false, //点击背景关闭弹窗
                        closeByEscape: false, //通过键盘Esc按钮关闭弹窗
                        showClose: true, //显示关闭按钮
                        scope: '',
                        appendTo: 'body', //绑定到哪个元素节点
                        resolve: { //将所需参数传递给弹窗的控制器
                            params : function(){
                                return {
                                    dialog_title : '选择区域(省市区)', //对话框的title
                                    options  : options
                                };
                            }
                        }
                    }).then(function(returnData){//成功的返回值
                        console.log('DialogService.showRegionSelect 接收到的返回值\n');
                        console.log(returnData);
                        resolve(returnData);
                    }, function(error){
                        console.log('DialogService.showRegionSelect 接收到的错误信息\n');
                        console.log(error);
                    });
                }, function(e){
                    console.log('DialogService.showRegionSelect 接收到的异常信息\n');
                    console.log(e);
                    reject(e);
                });
            });
        };
        //------------------显示银行卡开户行列表的弹窗----------------
        this.showBankTypeList = function(controller,options){
            return $q(function(resolve,reject){
                $ocLazyLoad.load(['/webapp/c/Dialog/BankTypeSelectDialogController.js']).then(function(){
                    ngDialog.openConfirm({
                        template: '/webapp/v/Dialog/BankTypeSelectDialog.html',
                        //className: 'ngdialog-theme-default', //弹窗的类名
                        controller : 'BankTypeSelectDialogController',
                        preCloseCallback: function(){ //关闭前的触发事件
                            return true;
                        },
                        closeByDocument: false, //点击背景关闭弹窗
                        closeByEscape: false, //通过键盘Esc按钮关闭弹窗
                        showClose: true, //显示关闭按钮
                        scope: '',
                        appendTo: 'body', //绑定到哪个元素节点
                        resolve: { //将所需参数传递给弹窗的控制器
                            params : function(){
                                return {
                                    dialog_title : '选择银行卡类别', //对话框的title
                                    options  : options,
                                    controller: controller
                                };
                            }
                        }
                    }).then(function(returnData){//成功的返回值
                        console.log('DialogService.showBankTypeList 接收到的返回值\n');
                        console.log(returnData);
                        resolve(returnData);
                    }, function(error){
                        console.log('DialogService.showBankTypeList 接收到的错误信息\n');
                        console.log(error);
                    });
                }, function(e){
                    console.log('DialogService.showBankTypeList 接收到的异常信息\n');
                    console.log(e);
                    reject(e);
                });
            });
        }

        //------------------显示商品分类列表------------------
        /*
         * @param    controller  用于接收返回值广播的控制器名称(发起对话框的控制器名称)
         * @param    options     当options 包含  gid和name字段并且内容非空的时候，弹窗会默认选中gid和name对应的分类
         * */
        this.showCategoryList = function(controller,options){
            return $q(function(resolve, reject){
                $ocLazyLoad.load(['/webapp/c/Category/SelectCategoryController.js']).then(function(){
                    ngDialog.openConfirm({
                        template: '/webapp/v/Category/SelectCategory.html',    /*className: 'ngdialog-theme-default',*/
                        controller : 'SelectCategoryController',               preCloseCallback: 'preCloseCallbackOnScope',
                        closeByDocument: false,     closeByEscape: false,   showClose: false,    /*scope: $scope,*/
                        resolve: {
                            params : function(){
                                return {
                                    action : '',
                                    data : options,
                                    controller: controller
                                };
                            }
                        }
                    }).then(function (selectedCategory) {
                        console.log('   DialogService.showCategoryList()      confirmed. value = ', selectedCategory);
                        resolve(selectedCategory);          // 成功返回值
                    }, function (reason) {
                        console.log('   DialogService.showCategoryList()      closed. Reason: ', reason);
                    });
                }, function(e){
                    console.log('   DialogService.showCategoryList()       error = ');
                    console.dir(e);
                    reject(e);                  // 失败返回值
                });
            });
        };

        this.showBrandList = function(options){
            return $q(function(resolve, reject){
                $ocLazyLoad.load(['/webapp/c/Brand/SelectBrandController.js']).then(function(){
                    ngDialog.openConfirm({
                        template: '/webapp/v/Brand/SelectBrand.html',    /*className: 'ngdialog-theme-default',*/
                        controller : 'SelectBrandController',               preCloseCallback: 'preCloseCallbackOnScope',
                        closeByDocument: false,     closeByEscape: false,   showClose: false,
                        resolve: {
                            params : function(){
                                return options;
                            }
                        }
                    }).then(function (value) {
                        console.log('StockPosController.selectBrand()       value = '); console.dir(value);
                        console.log('   selectBrandController confirmed. value ', value);
                        var selectedBrand = {gid: value.gid, name: value.name};
                        resolve(selectedBrand);
                    }, function (reason) {
                        console.log('   selectBrandController cancelled. Reason: ', reason);
                    });
                }, function(e){
                    console.log('   BrandController.EditCategoryController.selectCategory()       error = ');
                    console.dir(e);
                    reject(e);
                });
            });
        }

        //门店
        this.showStoreList = function(options){
            return $q(function(resolve, reject){
                $ocLazyLoad.load(['/webapp/c/NewStore/SelectStoreController.js']).then(function(){
                    ngDialog.openConfirm({
                        template: '/webapp/v/NewStore/SelectStore.html',    className: 'ngdialog-theme-defaul900t',
                        controller : 'SelectStoreController',               preCloseCallback: 'preCloseCallbackOnScope',
                        closeByDocument: false,     closeByEscape: false,   showClose: true,
                        resolve: {
                            params : function(){
                                return options;
                            }
                        }
                    }).then(function (value) {
                        // console.log('StockPosController.selectStore()       value = '); console.dir(value);
                        // console.log('   selectBrandController confirmed. value ', value);
                        var selectedStore = {gid: value.gid, name: value.name,list:value.list};
                        console.log(selectedStore);
                        //resolve(selectedStore);
                        resolve(value);
                    }, function (reason) {
                        // console.log('   selectBrandController cancelled. Reason: ', reason);
                    });
                }, function(e){
                    // console.log('   BrandController.EditCategoryController.selectCategory()       error = ');
                    console.dir(e);
                    reject(e);
                });
            });
        }

        //会员改密记录
        this.showClientChangePwdLog = function(options){
            return $q(function(resolve, reject){
                $ocLazyLoad.load(['/webapp/c/ClientChangePwdLog/ClientChangePwdLogController.js']).then(function(){
                    ngDialog.openConfirm({
                        template: '/webapp/v/ClientChangePwdLog/ClientChangePwdLog.html',    className: 'ngdialog-theme-defaul900t',
                        controller : 'ClientChangePwdLogController',               preCloseCallback: 'preCloseCallbackOnScope',
                        closeByDocument: false,     closeByEscape: false,   showClose: false,
                        resolve: {
                            params : function(){
                                return options;
                            }
                        }
                    }).then(function (value) {

                    }, function (reason) {

                    });
                }, function(e){
                    console.dir(e);
                    reject(e);
                });
            });
        }

        //制单人
        this.showCreatorList = function(options){
            return $q(function(resolve, reject){
                $ocLazyLoad.load(['/webapp/c/Creator/SelectCreatorController.js']).then(function(){
                    ngDialog.openConfirm({
                        template: '/webapp/v/Creator/SelectCreator.html',    className: 'ngdialog-theme-defaul900t',
                        controller : 'SelectCreatorController',               preCloseCallback: 'preCloseCallbackOnScope',
                        closeByDocument: false,     closeByEscape: false,   showClose: false,
                        resolve: {
                            params : function(){
                                return options;
                            }
                        }
                    }).then(function (value) {
                        // console.log('StockPosController.selectStore()       value = '); console.dir(value);
                        // console.log('   selectBrandController confirmed. value ', value);

                        var selectedCreator = {gid: value.gid, name: value.name};
                        resolve(selectedCreator);
                    }, function (reason) {
                        // console.log('   selectBrandController cancelled. Reason: ', reason);
                    });
                }, function(e){
                    // console.log('   BrandController.EditCategoryController.selectCategory()       error = ');
                    console.dir(e);
                    reject(e);
                });
            });
        }

        this.showOperator = function(options){
            return $q(function(resolve, reject){
                $ocLazyLoad.load(['/webapp/c/Dialog/OperatorDialogController.js']).then(function(){
                    ngDialog.openConfirm({
                        template: '/webapp/v/Dialog/operatorDialog.html',           className: 'ngdialog-theme-defaul900t',
                        controller : 'OperatorDialogController',               preCloseCallback: 'preCloseCallbackOnScope',
                        closeByDocument: false,     closeByEscape: false,   showClose: true,
                        resolve: {
                            params : function(){
                                return {
                                    role_name  : options
                                };
                            }
                        }
                    }).then(function (value) {
                        console.log('   OperatorDialogController confirmed. value ', value);
                        resolve(value);
                    }, function (reason) {
                        console.log('   OperatorDialogController rejected. Reason: ', reason);
                    });
                }, function(e){
                    console.log('   Dialog.OperatorDialogController()       error = ');
                    console.dir(e);
                    reject(e);
                });
            });
        }


        //查看供应商历史记录弹窗  by liansi
        this.showSupplierLogList = function(options){
            return $q(function(resolve, reject){
                $ocLazyLoad.load(['/webapp/c/SupplierLog/SupplierLogController.js']).then(function(){
                    ngDialog.openConfirm({
                        template: '/webapp/v/SupplierLog/ListSupplierLog.html',    className: 'ngdialog-theme-defaul900t',
                        controller : 'SupplierLogController',               preCloseCallback: 'preCloseCallbackOnScope',
                        closeByDocument: false,     closeByEscape: false,   showClose: false,
                        resolve: {
                            params : function(){
                                return options;
                            }
                        }
                    }).then(function (value) {

                    }, function (reason) {
                        // console.log('   selectBrandController cancelled. Reason: ', reason);
                    });
                }, function(e){
                    // console.log('   BrandController.EditCategoryController.selectCategory()       error = ');
                    console.dir(e);
                    reject(e);
                });
            });
        }



        //员工列表弹窗 by Hisheng
        this.showStaffList = function(options){
            return $q(function(resolve, reject){
                $ocLazyLoad.load(['/webapp/c/Creator/SelectCreatorController.js']).then(function(){
                    ngDialog.openConfirm({
                        template: '/webapp/v/Creator/SelectCreator.html',    className: 'ngdialog-theme-defaul900t',
                        controller : 'SelectCreatorController',               preCloseCallback: 'preCloseCallbackOnScope',
                        closeByDocument: false,     closeByEscape: false,   showClose: false,
                        resolve: {
                            params : function(){
                                return options;
                            }
                        }
                    }).then(function (value) {
                        // console.log('StockPosController.selectStore()       value = '); console.dir(value);
                        // console.log('   selectBrandController confirmed. value ', value);

                        var selectedCreator = {gid: value.gid, name: value.name};
                        resolve(selectedCreator);
                    }, function (reason) {
                        // console.log('   selectBrandController cancelled. Reason: ', reason);
                    });
                }, function(e){
                    // console.log('   BrandController.EditCategoryController.selectCategory()       error = ');
                    console.dir(e);
                    reject(e);
                });
            });
        }


    //采购员弹窗
    this.showPurchaserList = function(options,action){
        return $q(function(resolve, reject) {
            $ocLazyLoad.load(['/webapp/c/Dialog/PurchaserListDialogController.js']).then(function(){
                ngDialog.openConfirm({
                    template: '/webapp/v/Dialog/SelectPurchaser.html',
                    //className: 'ngdialog-theme-defaul900t',
                    controller : 'PurchaserListDialogController',
                    preCloseCallback: 'preCloseCallbackOnScope',
                    closeByDocument: false,
                    closeByEscape: false,
                    showClose: false,
                    scope: '',
                    resolve: {
                        params : function(){
                            return {
                                action : action,
                                data  : options
                            };
                        }
                    }
                }).then(function (value) {
                    console.log('   PurchaserListDialogController confirmed. value ', value);
                    var selectedPurchaser = {gid: value.gid, name: value.name};
                    resolve(selectedPurchaser);
                }, function (reason) {
                    console.log('   PurchaserListDialogController rejected. Reason: ', reason);
                });
            }, function(e){
                console.log('   Dialog.PurchaserListDialogController()       error = ');
                console.dir(e);
                reject(e);
            });
        })
    }

    //采购员弹窗
    this.showProductSource = function(options,action){
        return $q(function(resolve, reject) {
            $ocLazyLoad.load(['/webapp/c/Dialog/ProductSourceListDialogController.js']).then(function(){
                ngDialog.openConfirm({
                    template: '/webapp/v/Dialog/SelectProductSource.html',
                    //className: 'ngdialog-theme-defaul900t',
                    controller : 'ProductSourceListDialogController',
                    preCloseCallback: 'preCloseCallbackOnScope',
                    closeByDocument: false,
                    closeByEscape: false,
                    showClose: false,
                    scope: '',
                    resolve: {
                        params : function(){
                            return {
                                action : action,
                                data  : options
                            };
                        }
                    }
                }).then(function (value) {
                    console.log('   ProductSourceListDialogController confirmed. value ', value);
                    var selectedProductSource = {id: value.id, source_name: value.source_name};
                    resolve(selectedProductSource);
                }, function (reason) {
                    console.log('   ProductSourceListDialogController rejected. Reason: ', reason);
                });
            }, function(e){
                console.log('   Dialog.ProductSourceListDialogController()       error = ');
                console.dir(e);
                reject(e);
            });
        })
    }

    //会员档案
    this.showClient = function(options,action){
        return $q(function(resolve, reject){
            $ocLazyLoad.load(['/webapp/c/ClientArchives/SelectClientArchivesController.js']).then(function(){
                ngDialog.openConfirm({
                    template: '/webapp/v/ClientArchives/index.html',    className: 'ngdialog-theme-defaul900t',
                    controller : 'SelectClientArchivesController',               preCloseCallback: 'preCloseCallbackOnScope',
                    closeByDocument: false,     closeByEscape: false,   showClose: false,
                    resolve: {
                        params: function () {
                            return {
                                options: options,
                                action: action
                            };
                        }
                    }
                    }).then(function (value) {
                        // console.log('StockPosController.selectStore()       value = '); console.dir(value);
                        // console.log('   selectBrandController confirmed. value ', value);
                        var SelectClientList = {list:value.list};
                        console.log(SelectClientList);
                        resolve(SelectClientList);
                    }, function (reason) {
                        // console.log('   selectBrandController cancelled. Reason: ', reason);
                    });
                }, function(e){
                    // console.log('   BrandController.EditCategoryController.selectCategory()       error = ');
                    console.dir(e);
                    reject(e);
                });
            });
        }

        // //充值方案
        // this.showRechargePlan = function(options){
        //     return $q(function(resolve, reject){
        //         $ocLazyLoad.load(['/webapp/c/RechargePlanView/SelectRechargePlanController.js']).then(function(){
        //             ngDialog.openConfirm({
        //                 template: '/webapp/v/RechargePlanView/index.html',    className: 'ngdialog-theme-defaul900t',
        //                 controller : 'SelectRechargePlanController',               preCloseCallback: 'preCloseCallbackOnScope',
        //                 closeByDocument: false,     closeByEscape: false,   showClose: false,
        //                 resolve: {
        //                     params : function(){
        //                         return options;
        //                     }
        //                 }
        //             }).then(function (value) {
        //                 // console.log('StockPosController.selectStore()       value = '); console.dir(value);
        //                 // console.log('   selectBrandController confirmed. value ', value);
        //                 var SelectRechargePlan = {list:value.list};
        //                 console.log(SelectRechargePlan);
        //                 resolve(SelectRechargePlan);
        //             }, function (reason) {
        //                 // console.log('   selectBrandController cancelled. Reason: ', reason);
        //             });
        //         }, function(e){
        //             // console.log('   BrandController.EditCategoryController.selectCategory()       error = ');
        //             console.dir(e);
        //             reject(e);
        //         });
        //     });
        // }


        //门店盘点差异
        this.showInventoryList = function(options){
            return $q(function(resolve, reject){
                $ocLazyLoad.load(['/webapp/c/Inventory/SelectInventoryController.js']).then(function(){
                    ngDialog.openConfirm({
                        template: '/webapp/v/Inventory/index.html',    className: 'ngdialog-theme-default purchaseOrder-add-dialog dialog-width-xlg',
                        controller : 'SelectInventoryController',               preCloseCallback: 'preCloseCallbackOnScope',
                        closeByDocument: false,     closeByEscape: false,   showClose: false,
                        resolve: {
                            params : function(){
                                return options;
                            }
                        }
                    }).then(function () {
                    }, function (reason) {
                        // console.log('   selectBrandController cancelled. Reason: ', reason);
                    });
                }, function(e){
                    // console.log('   BrandController.EditCategoryController.selectCategory()       error = ');
                    console.dir(e);
                    reject(e);
                });
            });
        }

        //仓库盘点差异
        this.showWarehouseInventoryList = function(options){
            return $q(function(resolve, reject){
                $ocLazyLoad.load(['/webapp/c/WarehouseInventory/SelectWarehouseInventoryController.js']).then(function(){
                    ngDialog.openConfirm({
                        template: '/webapp/v/WarehouseInventory/index.html',    className: 'ngdialog-theme-default purchaseOrder-add-dialog dialog-width-xlg',
                        controller : 'SelectWarehouseInventoryController',               preCloseCallback: 'preCloseCallbackOnScope',
                        closeByDocument: false,     closeByEscape: false,   showClose: false,
                        resolve: {
                            params : function(){
                                return options;
                            }
                        }
                    }).then(function () {
                    }, function (reason) {
                        // console.log('   selectBrandController cancelled. Reason: ', reason);
                    });
                }, function(e){
                    // console.log('   BrandController.EditCategoryController.selectCategory()       error = ');
                    console.dir(e);
                    reject(e);
                });
            });
        }

        //商品品牌内弹窗
        this.UpdateBrand = function(options,action){
            return $q(function(resolve, reject){
                $ocLazyLoad.load(['/webapp/c/Brand/UpdateBrandController.js']).then(function(){
                    ngDialog.openConfirm({
                        template: '/webapp/v/Brand/UpdateBrand.html',
                        controller : 'UpdateBrandController',               preCloseCallback: 'preCloseCallbackOnScope',
                        closeByDocument: false,     closeByEscape: false,   showClose: false,
                        resolve: {
                            params : function(){
                                return {
                                    options:options,
                                    action:action
                                };
                            }
                        }
                    }).then(function (value) {
                        console.log('StockPosController.selectBrand()       value = '); console.dir(value);
                        console.log('   selectBrandController confirmed. value ', value);
                        // var selectedBrand = {gid: value.gid, name: value.name};
                        var selectedBrand = value;
                        resolve(selectedBrand);
                    }, function (reason) {
                        console.log('   selectBrandController cancelled. Reason: ', reason);
                    });
                }, function(e){
                    console.log('   BrandController.EditCategoryController.selectCategory()       error = ');
                    console.dir(e);
                    reject(e);
                });
            });
        }


        //商品标签内弹窗
        this.UpdateLabel = function(options,action){
            return $q(function(resolve, reject){
                $ocLazyLoad.load(['/webapp/c/Label/UpdateLabelController.js']).then(function(){
                    ngDialog.openConfirm({
                        template: '/webapp/v/Label/UpdateLabel.html',
                        controller : 'UpdateLabelController',               preCloseCallback: 'preCloseCallbackOnScope',
                        closeByDocument: false,     closeByEscape: false,   showClose: false,
                        resolve: {
                            params : function(){
                                return {
                                    options:options,
                                    action:action
                                };
                            }
                        }
                    }).then(function (value) {
                        console.log('StockPosController.selectBrand()       value = '); console.dir(value);
                        console.log('   selectBrandController confirmed. value ', value);
                        // var selectedBrand = {gid: value.gid, name: value.name};
                        resolve(value);
                    }, function (reason) {
                        console.log('   selectBrandController cancelled. Reason: ', reason);
                    });
                }, function(e){
                    console.log('   BrandController.EditCategoryController.selectCategory()       error = ');
                    console.dir(e);
                    reject(e);
                });
            });
        }

        //商品单位内弹窗
        this.UpdateUom = function(options,action){
            return $q(function(resolve, reject){
                $ocLazyLoad.load(['/webapp/c/Uom/UpdateUomController.js']).then(function(){
                    ngDialog.openConfirm({
                        template: '/webapp/v/Uom/UpdateUom.html',
                        controller : 'UpdateUomController',               preCloseCallback: 'preCloseCallbackOnScope',
                        closeByDocument: false,     closeByEscape: false,   showClose: false,
                        resolve: {
                            params : function(){
                                return {
                                    options:options,
                                    action:action
                                };
                            }
                        }
                    }).then(function (value) {
                        console.log('StockPosController.selectBrand()       value = '); console.dir(value);
                        console.log('   selectBrandController confirmed. value ', value);
                        resolve(value);
                    }, function (reason) {
                        console.log('   selectBrandController cancelled. Reason: ', reason);
                    });
                }, function(e){
                    console.log('   BrandController.EditCategoryController.selectCategory()       error = ');
                    console.dir(e);
                    reject(e);
                });
            });
        }

        //------------------供应商列表弹窗 by Lingengrui------------------
        this.showSupplierList = function(options){
            return $q(function(resolve,reject){
                $ocLazyLoad.load(['/webapp/c/Dialog/SupplierListDialogController.js']).then(function(){
                    ngDialog.openConfirm({
                        template: '/webapp/v/Dialog/SupplierListDialog.html',
                        className: 'ngdialog-theme-default dialog-width-lg', //弹窗的类名
                        controller : 'SupplierListDialogController',
                        preCloseCallback: function(){ //关闭前的触发事件
                            return true;
                        },
                        closeByDocument: false, //点击背景关闭弹窗
                        closeByEscape: false, //通过键盘Esc按钮关闭弹窗
                        showClose: true, //显示关闭按钮
                        scope: '',
                        appendTo: 'body', //绑定到哪个元素节点
                        resolve: { //将所需参数传递给弹窗的控制器
                            params : function(){
                                return {
                                    dialog_title : '选择供应商', //对话框的title
                                    options  : options
                                };
                            }
                        }
                    }).then(function(returnData){//成功的返回值
                        console.log('DialogService.showSupplierList 接收到的返回值\n');
                        console.log(returnData);
                        resolve(returnData);
                    }, function(error){
                        console.log('DialogService.showSupplierList 接收到的错误信息\n');
                        console.log(error);
                    });
                }, function(e){
                    console.log('DialogService.showSupplierList 接收到的异常信息\n');
                    console.log(e);
                    reject(e);
                });
            });
        };


        //区域类别
        this.showBranchType = function(options){
            return $q(function(resolve, reject){
                $ocLazyLoad.load(['/webapp/c/BranchType/SelectBranchTypeListController.js']).then(function(){
                    ngDialog.openConfirm({
                        template: '/webapp/v/BranchType/index.html',    className: 'ngdialog-theme-defaul600t',
                        controller : 'SelectBranchTypeListController',               preCloseCallback: 'preCloseCallbackOnScope',
                        closeByDocument: false,     closeByEscape: false,   showClose: false,
                        resolve: {
                            params : function(){
                                return options;
                            }
                        }
                    }).then(function (value) {
                        resolve(value);
                    }, function (reason) {
                        // console.log('   selectBrandController cancelled. Reason: ', reason);
                    });
                }, function(e){
                    // console.log('   BrandController.EditCategoryController.selectCategory()       error = ');
                    console.dir(e);
                    reject(e);
                });
            });
        }

        //订货单详情弹窗
        this.GatherProcourementOrder = function(options,action){
            return $q(function(resolve, reject){
                $ocLazyLoad.load(['/webapp/c/GatherProcourementOrder/GatherSelectProcourementOrderController.js']).then(function(){
                    ngDialog.openConfirm({
                        //template: '/webapp/v/ProcourementOrder/SelectProcourementOrder.html', className: 'ngdialog-theme-defaul900t',
                        template: '/webapp/v/GatherProcourementOrder/SelectProcourementOrder.html',
                        className: 'ngdialog-theme-defaul900t',
                        controller : 'GatherSelectProcourementOrderController',               preCloseCallback: 'preCloseCallbackOnScope',
                        closeByDocument: false,
                        closeByEscape: false,
                        showClose: true,
                        resolve: {
                            params : function(){
                                return {
                                    options:options,
                                    action:action
                                };
                            }
                        }
                    }).then(function (value) {
                        console.log('StockPosController.selectBrand()       value = '); console.dir(value);
                        console.log('   selectBrandController confirmed. value ', value);
                        // var selectedBrand = {gid: value.gid, name: value.name};
                        var selectedBrand = value;
                        resolve(selectedBrand);
                    }, function (reason) {
                        console.log('   selectBrandController cancelled. Reason: ', reason);
                    });
                }, function(e){
                    console.log('   BrandController.EditCategoryController.selectCategory()       error = ');
                    console.dir(e);
                    reject(e);
                });
            });
        }

        //订货单详情弹窗
        this.ProcourementOrder = function(options,action){
            return $q(function(resolve, reject){
                $ocLazyLoad.load(['/webapp/c/ProcourementOrder/SelectProcourementOrderController.js']).then(function(){
                    ngDialog.openConfirm({
                        //template: '/webapp/v/ProcourementOrder/SelectProcourementOrder.html', className: 'ngdialog-theme-defaul900t',
                        template: '/webapp/v/ProcourementOrder/SelectProcourementOrder.html',
                        className: 'ngdialog-theme-defaul900t',
                        controller : 'SelectProcourementOrderController',               preCloseCallback: 'preCloseCallbackOnScope',
                        closeByDocument: false,
                        closeByEscape: false,
                        showClose: true,
                        resolve: {
                            params : function(){
                                return {
                                    options:options,
                                    action:action
                                };
                            }
                        }
                    }).then(function (value) {
                        console.log('StockPosController.selectBrand()       value = '); console.dir(value);
                        console.log('   selectBrandController confirmed. value ', value);
                        // var selectedBrand = {gid: value.gid, name: value.name};
                        var selectedBrand = value;
                        resolve(selectedBrand);
                    }, function (reason) {
                        console.log('   selectBrandController cancelled. Reason: ', reason);
                    });
                }, function(e){
                    console.log('   BrandController.EditCategoryController.selectCategory()       error = ');
                    console.dir(e);
                    reject(e);
                });
            });
        }


        //充值方案弹窗
        this.SelectRechargeScheme = function(options,action){
            return $q(function(resolve, reject){
                $ocLazyLoad.load(['/webapp/c/RechargeSchemePop/RechargeSchemePopController.js']).then(function(){
                    ngDialog.openConfirm({
                        template: '/webapp/v/RechargeSchemePop/index.html',    className: 'ngdialog-theme-defaul900t',
                        controller : 'RechargeSchemePopController',               preCloseCallback: 'preCloseCallbackOnScope',
                        closeByDocument: false,     closeByEscape: false,   showClose: false,
                        resolve: {
                            params : function(){
                                return {
                                    options:options,
                                    action:action
                                };
                            }
                        }
                    }).then(function (value) {
                        console.log('StockPosController.selectBrand()       value = '); console.dir(value);
                        console.log('   selectBrandController confirmed. value ', value);
                        // var selectedBrand = {gid: value.gid, name: value.name};
                        var selectedBrand = value;
                        resolve(selectedBrand);
                    }, function (reason) {
                        console.log('   selectBrandController cancelled. Reason: ', reason);
                    });
                }, function(e){
                    console.log('   BrandController.EditCategoryController.selectCategory()       error = ');
                    console.dir(e);
                    reject(e);
                });
            });
        }

        //会员充值弹窗
        this.MembeRechargePop = function(options){
            return $q(function(resolve, reject){
                $ocLazyLoad.load(['/webapp/c/MembeRechargePop/MembeRechargePopController.js']).then(function(){
                    ngDialog.openConfirm({
                        template: '/webapp/v/MembeRechargePop/index.html',    className: 'ngdialog-theme-defaul900t',
                        controller : 'MembeRechargePopController',               preCloseCallback: 'preCloseCallbackOnScope',
                        closeByDocument: false,     closeByEscape: false,   showClose: false,
                        resolve: {
                            params : function(){
                                return options
                            }
                        }
                    }).then(function (value) {
                        resolve(value);
                    }, function (reason) {
                        console.log('   selectBrandController cancelled. Reason: ', reason);
                    });
                }, function(e){
                    console.log('   BrandController.EditCategoryController.selectCategory()       error = ');
                    console.dir(e);
                    reject(e);
                });
            });
        }

        //储值卡修改密码
        this.GiftCardPwdPop = function(options){
            return $q(function(resolve, reject){
                $ocLazyLoad.load(['/webapp/c/ModifyPwd/ModifyPwdController.js']).then(function(){
                    ngDialog.openConfirm({
                        template: '/webapp/v/ModifyPwd/index.html',    className: 'ngdialog-theme-defaul600t',
                        controller : 'ModifyPwdController',               preCloseCallback: 'preCloseCallbackOnScope',
                        closeByDocument: false,     closeByEscape: false,   showClose: false,
                        resolve: {
                            params : function(){
                                return options
                            }
                        }
                    }).then(function (value) {
                        resolve(value);
                    }, function (reason) {
                        console.log('   selectBrandController cancelled. Reason: ', reason);
                    });
                }, function(e){
                    console.log('   BrandController.EditCategoryController.selectCategory()       error = ');
                    console.dir(e);
                    reject(e);
                });
            });
        }

        //商品列表弹窗 by Hisheng
        this.showProductList = function(options){
            return $q(function(resolve,reject){
                $ocLazyLoad.load(['/webapp/c/Dialog/ProductListDialogController.js']).then(function(){
                    ngDialog.openConfirm({
                        template: '/webapp/v/Dialog/productListDialog.html',
                        className: 'ngdialog-theme-default dialog-width-md', //弹窗的类名
                        controller : 'ProductListDialogController',
                        preCloseCallback: function(){ //关闭前的触发事件
                            return true;
                        },
                        closeByDocument: false, //点击背景关闭弹窗
                        closeByEscape: false, //通过键盘Esc按钮关闭弹窗
                        showClose: true, //显示关闭按钮
                        scope: '',
                        appendTo: 'body', //绑定到哪个元素节点
                        resolve: { //将所需参数传递给弹窗的控制器
                            params : function(){
                                return {
                                    dialog_title : '选择商品', //对话框的title
                                    options  : options
                                };
                            }
                        }
                    }).then(function(returnData){//成功的返回值
                        console.log('DialogService.showProductList 接收到的返回值\n');
                        console.log(returnData);
                        resolve(returnData);
                    }, function(error){
                        console.log('DialogService.showProductList 接收到的错误信息\n');
                        console.log(error);
                    });
                }, function(e){
                    console.log('DialogService.showProductList 接收到的异常信息\n');
                    console.log(e);
                    reject(e);
                });
            });
        };

        this.getCategoryList = function(type){
            return $q(function(resolve,reject) {
                $ocLazyLoad.load(['/webapp/c/Dialog/CategoryListDialogController.js']).then(function () {
                    ngDialog.openConfirm({
                        template: '/webapp/v/Dialog/CategoryListDialog.html',
                        /*className: 'ngdialog-theme-defaul900t',*/
                        controller: 'CategoryListDialogController',
                        preCloseCallback: 'preCloseCallbackOnScope',
                        closeByDocument: false,
                        closeByEscape: false,
                        showClose: false,
                        scope: '',
                        resolve: {
                            params: function () {
                                return {
                                    dialog_title: '选择商品分类', //对话框的title
                                    type: type
                                };
                            }
                        }
                    }).then(function (returnData) {
                        console.log('    confirmed. value ', returnData);
                        console.log(returnData);
                        resolve(returnData);
                    }, function (reason) {
                        console.log('    rejected. Reason: ', reason);
                    });
                }, function (e) {
                    console.log('   Dialog/CategoryListDialogController.()       error = ');
                    console.dir(e);
                    reject(e);
                });
            })
        }

        //加盟店-余额充值审核
        this.CheckedStorePop = function(options){
            return $q(function(resolve, reject){
                $ocLazyLoad.load(['/webapp/c/StoreRechargeLog/CheckedStoreRechargeLogController.js']).then(function(){
                    ngDialog.openConfirm({
                        template: '/webapp/v/StoreRechargeLog/checked.html',    className: 'ngdialog-theme-defaul600t',
                        controller : 'CheckedStoreRechargeLogController',               preCloseCallback: 'preCloseCallbackOnScope',
                        closeByDocument: false,     closeByEscape: false,   showClose: false,
                        resolve: {
                            params : function(){
                                return options
                            }
                        }
                    }).then(function (value) {
                        resolve(value);
                    }, function (reason) {
                        console.log('   selectBrandController cancelled. Reason: ', reason);
                    });
                }, function(e){
                    console.log('   BrandController.EditCategoryController.selectCategory()       error = ');
                    console.dir(e);
                    reject(e);
                });
            });
        }

        //加盟店-余额充值新增
        this.AddStorePop = function(options){
            return $q(function(resolve, reject){
                $ocLazyLoad.load(['/webapp/c/StoreRechargeLog/AddStoreRechargeLogController.js']).then(function(){
                    ngDialog.openConfirm({
                        template: '/webapp/v/StoreRechargeLog/add.html',    className: 'ngdialog-theme-defaul900t',
                        controller : 'AddStoreRechargeLogController',               preCloseCallback: 'preCloseCallbackOnScope',
                        closeByDocument: false,     closeByEscape: false,   showClose: false,
                        resolve: {
                            params : function(){
                                return options
                            }
                        }
                    }).then(function (value) {
                        resolve(value);
                    }, function (reason) {
                        console.log('   selectBrandController cancelled. Reason: ', reason);
                    });
                }, function(e){
                    console.log('   BrandController.EditCategoryController.selectCategory()       error = ');
                    console.dir(e);
                    reject(e);
                });
            });
        }

        //新增系统配置
        this.UpdateSystemConfigurationSettings = function(options,action){
            return $q(function(resolve, reject){
                $ocLazyLoad.load(['/webapp/c/SystemConfigurationSettings/UpdateSystemConfigurationSettingsController.js']).then(function(){
                    ngDialog.openConfirm({
                        template: '/webapp/v/SystemConfigurationSettings/UpdateSystemConfigurationSettings.html',
                        controller : 'UpdateSystemConfigurationSettingsController',               preCloseCallback: 'preCloseCallbackOnScope',
                        closeByDocument: false,     closeByEscape: false,   showClose: false,
                        resolve: {
                            params : function(){
                                return {
                                    options:options,
                                    action:action
                                };
                            }
                        }
                    }).then(function (value) {
                        resolve(value);
                    }, function (reason) {
                        //console.log('   selectBrandController cancelled. Reason: ', reason);
                    });
                }, function(e){
                    //console.log('   BrandController.EditCategoryController.selectCategory()       error = ');
                    //console.dir(e);
                    reject(e);
                });
            });
        }

        this.uploadFileDialog = function(type,info,multi){
            return $q(function(resolve,reject) {
                $ocLazyLoad.load(['/webapp/c/Dialog/UploadFileDialogController.js']).then(function () {
                    ngDialog.openConfirm({
                        template: '/webapp/v/Dialog/UploadFileDialog.html',
                        className: 'ngdialog-theme-defaul900t',
                        controller: 'UploadFileDialogController',
                        preCloseCallback: 'preCloseCallbackOnScope',
                        closeByDocument: false,
                        closeByEscape: false,
                        showClose: false,
                        scope: '',
                        resolve: {
                            params: function () {
                                return {
                                    type: type, //上传文件类型
                                    info: info, //上传文件信息，将拼接到图片链接中
                                    multiple : !(multi === undefined || multi === false) //是否开启多图上传
                                };
                            }
                        }
                    }).then(function (returnData) {
                        console.log('    confirmed. value ', returnData);
                        console.log(returnData);
                        resolve(returnData);
                    }, function (reason) {
                        console.log('    rejected. Reason: ', reason);
                    });
                }, function (e) {
                    console.log('   Dialog/UploadFileDialogController.()       error = ');
                    console.dir(e);
                    reject(e);
                });
            })
        }

        this.selectScrapProduct = function(lines){
            return $q(function(resolve, reject){
                $ocLazyLoad.load(['/webapp/c/ComplaintBill/ComplaintBillSelectScrapProductController.js']).then(function(){
                    ngDialog.openConfirm({
                        template: '/webapp/v/ComplaintBill/selectScrapProduct.html',           className: 'ngdialog-theme-defaul900t',
                        controller : 'ComplaintBillSelectScrapProductController',               preCloseCallback: 'preCloseCallbackOnScope',
                        closeByDocument: false,     closeByEscape: false,   showClose: true,
                        resolve: {
                            params : function(){
                                return {
                                    data  : lines
                                };
                            }
                        }
                    }).then(function (value) {
                        console.log('   ComplaintBillSelectScrapProductController confirmed. value ', value);
                        resolve(value);
                    }, function (reason) {
                        console.log('   ComplaintBillSelectScrapProductController rejected. Reason: ', reason);
                    });
                }, function(e){
                    console.log('   ComplaintBill.ComplaintBillSelectScrapProductController()       error = ');
                    console.dir(e);
                    reject(e);
                });
            });
        }

    }]);
