/*          所有控制器公用的依赖类库        */
// cacheHelper = require('../helpers/cachehelper.js');
// util = require('../helpers/util');
// myApp = require('../helpers/myApp');

const async = require('async');
const moment = require('moment');
const _ = require('lodash');
const http = require('http');
const url = require('url');
const qs = require('querystring');
const fs = require('fs');
const sysConf = require('../config/config.js');
const crypto = require('crypto');
const sha1 = require('sha1');
const Promise = require('promise');
// const encoding = require('encoding');
const path = require('path');
const os = require('os');
const JSON = require('json-bigint')({"storeAsString": true});

// const CachemanFile = require('cacheman-file');
// const globalCacheOptions = {
//     ttl: 86400,
//     engine: 'in file',
//     tmpDir: 'tempLocal/cache'
// };
//
// var cache = new CachemanFile(globalCacheOptions);