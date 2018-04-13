/*   环境变量和配置   */
"use strict";
var config = {
    // api :{          // not using
    //     app_port    : 3000,
    //     temp_file_folder : 'temp',
    //     api_host: 'http://localhost',
    //     api_port: 80,
    //     api_url : '/api',            /* 这个url在模块对外暴露前会被拼接成完整的  http://hostname:port/uri 格式   */
    // },

    ui  :   {
        company             : 'company',                   //  company abbreviation str
        page_title          : 'page_title',                   //  进入系统后浏览器标签的title，可以自定义
        company_cns_name    : 'company_cns_name',                   //  公司中文名
        company_web_site    : 'company_web_site',                   //  公司网站
        company_cns_abbrev  : 'company_cns_abbrev',                   //  公司中文简称
        ICP_beian_sn        : 'ICP_beian_sn',                   //  ICP备案号
        copy_right_year     : 'copy_right_year',                   //  版权有效期
        title_pic           : 'title_pic'                    //  暂时没用
    },

    system  :   {
        env             : 'dev',                       //   [dev, int, prod]
        session_secret  : 'local session secret for session store',
    },

    admin: {        /*  管理后台管理员相关配置  */

    },

    mongoDB:{                   /*  MongoDB 数据库连接参数   */
        host     : 'localhost',
        port     : '27017',
        user     : 'git',
        password : '123456',
        db       : 'gitperf',
        collection: 'test'
    }
};

// if(config.api_port == 80){
//     config.api_url = config.api_host + '/api';
// }else {
//     config.api_url = config.api_host + ':' + config.api_port  + config.api_url;
// }



module.exports = config;