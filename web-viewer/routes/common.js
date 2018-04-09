/*          所有控制器公用的依赖类库        */

var async = require('async');
var moment = require('moment');
var _ = require('lodash');
var http = require('http');
var url = require('url');
var qs = require('querystring');
var fs = require('fs');
var sysConf = require('../config/config.js');
var crypto = require('crypto');
var sha1 = require('sha1');
var Promise = require('promise');
// const encoding = require('encoding');
var path = require('path');
var os = require('os');
var JSON = require('json-bigint')({"storeAsString": true});

// const CachemanFile = require('cacheman-file');
// const globalCacheOptions = {
//     ttl: 86400,
//     engine: 'in file',
//     tmpDir: 'tempLocal/cache'
// };
//
// var cache = new CachemanFile(globalCacheOptions);