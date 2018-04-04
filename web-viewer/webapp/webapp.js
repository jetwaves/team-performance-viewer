require.config({
    waitSeconds : 20,
    baseUrl: 'webapp/',
    paths: {
        'adminPanel'             : 'main',
        'dateTimePicker'         : '../public/javascripts/datetime-picker',
        'jquery'                 : '../public/javascripts/jquery-1.9.1.min',
        'ngLocale'               : '../public/javascripts/angular-locale_zh-cn',
        'ngConfirm'              : '../public/javascripts/ngConfirm',  /*自己改过z-index的 ngConfirm */
        'angular'                : '../fe/angular/angular.min',
        'amMoment'               : '../fe/angular-moment/angular-moment.min',
        'ngAnimate'              : '../fe/angular-animate/angular-animate.min',
        'ngCheckbox'             : '../fe/angular-bootstrap-checkbox/angular-bootstrap-checkbox',
        'ngCookies'              : '../fe/angular-cookies/angular-cookies.min',
        'ngDialog'               : '../fe/ng-dialog/js/ngDialog.min',
        'ngRoute'                : '../fe/angular-route/angular-route.min',
        'ngSanitize'             : '../fe/angular-sanitize/angular-sanitize.min',
        'ngToastr'               : '../fe/angular-toastr/dist/angular-toastr.tpls.min',
        'ngUiBs'                 : '../fe/angular-bootstrap/ui-bootstrap-tpls.min',
        'ocLazyLoad'             : '../fe/oclazyload/dist/ocLazyLoad.require.min'


        // 'angularDragAndDropLists': '../js/angularDragAndDropLists/angular-drag-and-drop-lists',
        // 'angularFileUpload'      : '../js/angularFileUpload/dist/angular-file-upload.min',
        // 'angularUeditor'         : '../js/angularUeditor/dist/angular-ueditor.min',
        // 'ueditor'                : '../public/javascripts/ueditor.all',
        // 'ueditorConfig'          : '../public/javascripts/ueditor.config'
        // 'ngTree'                 : '../fe/angular-tree-control/angular-tree-control',
        // 'ngGrid'                 : '../fe/angular-ui-grid/ui-grid.min',

    },
    shim: {
        'adminPanel':   [
            'dateTimePicker',
            'amMoment',
            'ngCheckbox',
            'ngConfirm',
            'ngDialog',
            'ngSanitize',
            'ngToastr',
            'ngUiBs',
            'ocLazyLoad',
            'ngCookies'
            // 'angularDragAndDropLists','angularFileUpload','angularUeditor','ngCookies','ngGrid',
            // 'ngTree','highcharts-ng','Highcharts','ueditor','ueditorConfig'
        ],
        'dateTimePicker'         : ['ngUiBs'],
        'angular'                : {
            exports: "angular"
        },
        'amMoment'               : ['angular'],
        'ngAnimate'              : ['ngRoute'],
        'ngCheckbox'             : ['angular'],
        'ngConfirm'              : ['ngSanitize', 'ngUiBs'],
        'ngCookies'              : ['angular'],
        'ngDialog'               : ['angular'],
        'ngLocale'               : ['angular'],
        'ngRoute'                : ['angular'],
        'ngSanitize'             : ['angular'],
        'ngToastr'               : ['angular'],
        'ngUiBs'                 : ['ngAnimate','ngLocale'],
        'ocLazyLoad'             : ['angular']
        // 'angularDragAndDropLists': ['angular','ngRoute'],
        // 'angularFileUpload'      : ['angular'],
        // 'angularUeditor'         : ['angular'],
        // 'angularCkeditor'        : ['angular'],
        // 'ngTree'                 : ['angular'],
        // 'ngGrid'                 : ['angular'],
        // 'testControllerModule'   : ['DateSelectionController'],
        // 'DateSelectionController': ['ngUiBs', 'ocLazyLoad'],

    },
    priority: [
        'angular'
    ],
    deps: [
        'adminPanel'
    ]
});
//------------- ngService是最后一个加载的文件 --------------
require(['adminPanel'], function() {
    console.log('开始加载所需JS文件...\n');
});

