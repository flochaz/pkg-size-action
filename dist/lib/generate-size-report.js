var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// node_modules/@actions/core/lib/utils.js
var require_utils = __commonJS({
  "node_modules/@actions/core/lib/utils.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.toCommandProperties = exports2.toCommandValue = void 0;
    function toCommandValue(input) {
      if (input === null || input === void 0) {
        return "";
      } else if (typeof input === "string" || input instanceof String) {
        return input;
      }
      return JSON.stringify(input);
    }
    exports2.toCommandValue = toCommandValue;
    function toCommandProperties(annotationProperties) {
      if (!Object.keys(annotationProperties).length) {
        return {};
      }
      return {
        title: annotationProperties.title,
        file: annotationProperties.file,
        line: annotationProperties.startLine,
        endLine: annotationProperties.endLine,
        col: annotationProperties.startColumn,
        endColumn: annotationProperties.endColumn
      };
    }
    exports2.toCommandProperties = toCommandProperties;
  }
});

// node_modules/@actions/core/lib/command.js
var require_command = __commonJS({
  "node_modules/@actions/core/lib/command.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.issue = exports2.issueCommand = void 0;
    var os = __importStar(require("os"));
    var utils_1 = require_utils();
    function issueCommand(command, properties, message) {
      const cmd = new Command(command, properties, message);
      process.stdout.write(cmd.toString() + os.EOL);
    }
    exports2.issueCommand = issueCommand;
    function issue(name, message = "") {
      issueCommand(name, {}, message);
    }
    exports2.issue = issue;
    var CMD_STRING = "::";
    var Command = class {
      constructor(command, properties, message) {
        if (!command) {
          command = "missing.command";
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
      }
      toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
          cmdStr += " ";
          let first = true;
          for (const key in this.properties) {
            if (this.properties.hasOwnProperty(key)) {
              const val = this.properties[key];
              if (val) {
                if (first) {
                  first = false;
                } else {
                  cmdStr += ",";
                }
                cmdStr += `${key}=${escapeProperty(val)}`;
              }
            }
          }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
      }
    };
    function escapeData(s) {
      return utils_1.toCommandValue(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
    }
    function escapeProperty(s) {
      return utils_1.toCommandValue(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A").replace(/:/g, "%3A").replace(/,/g, "%2C");
    }
  }
});

// node_modules/@actions/core/lib/file-command.js
var require_file_command = __commonJS({
  "node_modules/@actions/core/lib/file-command.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.issueCommand = void 0;
    var fs3 = __importStar(require("fs"));
    var os = __importStar(require("os"));
    var utils_1 = require_utils();
    function issueCommand(command, message) {
      const filePath = process.env[`GITHUB_${command}`];
      if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
      }
      if (!fs3.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
      }
      fs3.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: "utf8"
      });
    }
    exports2.issueCommand = issueCommand;
  }
});

// node_modules/@actions/http-client/proxy.js
var require_proxy = __commonJS({
  "node_modules/@actions/http-client/proxy.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    function getProxyUrl(reqUrl) {
      let usingSsl = reqUrl.protocol === "https:";
      let proxyUrl;
      if (checkBypass(reqUrl)) {
        return proxyUrl;
      }
      let proxyVar;
      if (usingSsl) {
        proxyVar = process.env["https_proxy"] || process.env["HTTPS_PROXY"];
      } else {
        proxyVar = process.env["http_proxy"] || process.env["HTTP_PROXY"];
      }
      if (proxyVar) {
        proxyUrl = new URL(proxyVar);
      }
      return proxyUrl;
    }
    exports2.getProxyUrl = getProxyUrl;
    function checkBypass(reqUrl) {
      if (!reqUrl.hostname) {
        return false;
      }
      let noProxy = process.env["no_proxy"] || process.env["NO_PROXY"] || "";
      if (!noProxy) {
        return false;
      }
      let reqPort;
      if (reqUrl.port) {
        reqPort = Number(reqUrl.port);
      } else if (reqUrl.protocol === "http:") {
        reqPort = 80;
      } else if (reqUrl.protocol === "https:") {
        reqPort = 443;
      }
      let upperReqHosts = [reqUrl.hostname.toUpperCase()];
      if (typeof reqPort === "number") {
        upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
      }
      for (let upperNoProxyItem of noProxy.split(",").map((x) => x.trim().toUpperCase()).filter((x) => x)) {
        if (upperReqHosts.some((x) => x === upperNoProxyItem)) {
          return true;
        }
      }
      return false;
    }
    exports2.checkBypass = checkBypass;
  }
});

// node_modules/tunnel/lib/tunnel.js
var require_tunnel = __commonJS({
  "node_modules/tunnel/lib/tunnel.js"(exports2) {
    "use strict";
    var net = require("net");
    var tls = require("tls");
    var http = require("http");
    var https = require("https");
    var events = require("events");
    var assert = require("assert");
    var util = require("util");
    exports2.httpOverHttp = httpOverHttp;
    exports2.httpsOverHttp = httpsOverHttp;
    exports2.httpOverHttps = httpOverHttps;
    exports2.httpsOverHttps = httpsOverHttps;
    function httpOverHttp(options) {
      var agent = new TunnelingAgent(options);
      agent.request = http.request;
      return agent;
    }
    function httpsOverHttp(options) {
      var agent = new TunnelingAgent(options);
      agent.request = http.request;
      agent.createSocket = createSecureSocket;
      agent.defaultPort = 443;
      return agent;
    }
    function httpOverHttps(options) {
      var agent = new TunnelingAgent(options);
      agent.request = https.request;
      return agent;
    }
    function httpsOverHttps(options) {
      var agent = new TunnelingAgent(options);
      agent.request = https.request;
      agent.createSocket = createSecureSocket;
      agent.defaultPort = 443;
      return agent;
    }
    function TunnelingAgent(options) {
      var self2 = this;
      self2.options = options || {};
      self2.proxyOptions = self2.options.proxy || {};
      self2.maxSockets = self2.options.maxSockets || http.Agent.defaultMaxSockets;
      self2.requests = [];
      self2.sockets = [];
      self2.on("free", function onFree(socket, host, port, localAddress) {
        var options2 = toOptions(host, port, localAddress);
        for (var i = 0, len = self2.requests.length; i < len; ++i) {
          var pending = self2.requests[i];
          if (pending.host === options2.host && pending.port === options2.port) {
            self2.requests.splice(i, 1);
            pending.request.onSocket(socket);
            return;
          }
        }
        socket.destroy();
        self2.removeSocket(socket);
      });
    }
    util.inherits(TunnelingAgent, events.EventEmitter);
    TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
      var self2 = this;
      var options = mergeOptions({ request: req }, self2.options, toOptions(host, port, localAddress));
      if (self2.sockets.length >= this.maxSockets) {
        self2.requests.push(options);
        return;
      }
      self2.createSocket(options, function(socket) {
        socket.on("free", onFree);
        socket.on("close", onCloseOrRemove);
        socket.on("agentRemove", onCloseOrRemove);
        req.onSocket(socket);
        function onFree() {
          self2.emit("free", socket, options);
        }
        function onCloseOrRemove(err) {
          self2.removeSocket(socket);
          socket.removeListener("free", onFree);
          socket.removeListener("close", onCloseOrRemove);
          socket.removeListener("agentRemove", onCloseOrRemove);
        }
      });
    };
    TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
      var self2 = this;
      var placeholder = {};
      self2.sockets.push(placeholder);
      var connectOptions = mergeOptions({}, self2.proxyOptions, {
        method: "CONNECT",
        path: options.host + ":" + options.port,
        agent: false,
        headers: {
          host: options.host + ":" + options.port
        }
      });
      if (options.localAddress) {
        connectOptions.localAddress = options.localAddress;
      }
      if (connectOptions.proxyAuth) {
        connectOptions.headers = connectOptions.headers || {};
        connectOptions.headers["Proxy-Authorization"] = "Basic " + new Buffer(connectOptions.proxyAuth).toString("base64");
      }
      debug2("making CONNECT request");
      var connectReq = self2.request(connectOptions);
      connectReq.useChunkedEncodingByDefault = false;
      connectReq.once("response", onResponse);
      connectReq.once("upgrade", onUpgrade);
      connectReq.once("connect", onConnect);
      connectReq.once("error", onError);
      connectReq.end();
      function onResponse(res) {
        res.upgrade = true;
      }
      function onUpgrade(res, socket, head) {
        process.nextTick(function() {
          onConnect(res, socket, head);
        });
      }
      function onConnect(res, socket, head) {
        connectReq.removeAllListeners();
        socket.removeAllListeners();
        if (res.statusCode !== 200) {
          debug2("tunneling socket could not be established, statusCode=%d", res.statusCode);
          socket.destroy();
          var error2 = new Error("tunneling socket could not be established, statusCode=" + res.statusCode);
          error2.code = "ECONNRESET";
          options.request.emit("error", error2);
          self2.removeSocket(placeholder);
          return;
        }
        if (head.length > 0) {
          debug2("got illegal response body from proxy");
          socket.destroy();
          var error2 = new Error("got illegal response body from proxy");
          error2.code = "ECONNRESET";
          options.request.emit("error", error2);
          self2.removeSocket(placeholder);
          return;
        }
        debug2("tunneling connection has established");
        self2.sockets[self2.sockets.indexOf(placeholder)] = socket;
        return cb(socket);
      }
      function onError(cause) {
        connectReq.removeAllListeners();
        debug2("tunneling socket could not be established, cause=%s\n", cause.message, cause.stack);
        var error2 = new Error("tunneling socket could not be established, cause=" + cause.message);
        error2.code = "ECONNRESET";
        options.request.emit("error", error2);
        self2.removeSocket(placeholder);
      }
    };
    TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
      var pos = this.sockets.indexOf(socket);
      if (pos === -1) {
        return;
      }
      this.sockets.splice(pos, 1);
      var pending = this.requests.shift();
      if (pending) {
        this.createSocket(pending, function(socket2) {
          pending.request.onSocket(socket2);
        });
      }
    };
    function createSecureSocket(options, cb) {
      var self2 = this;
      TunnelingAgent.prototype.createSocket.call(self2, options, function(socket) {
        var hostHeader = options.request.getHeader("host");
        var tlsOptions = mergeOptions({}, self2.options, {
          socket,
          servername: hostHeader ? hostHeader.replace(/:.*$/, "") : options.host
        });
        var secureSocket = tls.connect(0, tlsOptions);
        self2.sockets[self2.sockets.indexOf(socket)] = secureSocket;
        cb(secureSocket);
      });
    }
    function toOptions(host, port, localAddress) {
      if (typeof host === "string") {
        return {
          host,
          port,
          localAddress
        };
      }
      return host;
    }
    function mergeOptions(target) {
      for (var i = 1, len = arguments.length; i < len; ++i) {
        var overrides = arguments[i];
        if (typeof overrides === "object") {
          var keys2 = Object.keys(overrides);
          for (var j = 0, keyLen = keys2.length; j < keyLen; ++j) {
            var k = keys2[j];
            if (overrides[k] !== void 0) {
              target[k] = overrides[k];
            }
          }
        }
      }
      return target;
    }
    var debug2;
    if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
      debug2 = function() {
        var args = Array.prototype.slice.call(arguments);
        if (typeof args[0] === "string") {
          args[0] = "TUNNEL: " + args[0];
        } else {
          args.unshift("TUNNEL:");
        }
        console.error.apply(console, args);
      };
    } else {
      debug2 = function() {
      };
    }
    exports2.debug = debug2;
  }
});

// node_modules/tunnel/index.js
var require_tunnel2 = __commonJS({
  "node_modules/tunnel/index.js"(exports2, module2) {
    module2.exports = require_tunnel();
  }
});

// node_modules/@actions/http-client/index.js
var require_http_client = __commonJS({
  "node_modules/@actions/http-client/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var http = require("http");
    var https = require("https");
    var pm = require_proxy();
    var tunnel;
    var HttpCodes;
    (function(HttpCodes2) {
      HttpCodes2[HttpCodes2["OK"] = 200] = "OK";
      HttpCodes2[HttpCodes2["MultipleChoices"] = 300] = "MultipleChoices";
      HttpCodes2[HttpCodes2["MovedPermanently"] = 301] = "MovedPermanently";
      HttpCodes2[HttpCodes2["ResourceMoved"] = 302] = "ResourceMoved";
      HttpCodes2[HttpCodes2["SeeOther"] = 303] = "SeeOther";
      HttpCodes2[HttpCodes2["NotModified"] = 304] = "NotModified";
      HttpCodes2[HttpCodes2["UseProxy"] = 305] = "UseProxy";
      HttpCodes2[HttpCodes2["SwitchProxy"] = 306] = "SwitchProxy";
      HttpCodes2[HttpCodes2["TemporaryRedirect"] = 307] = "TemporaryRedirect";
      HttpCodes2[HttpCodes2["PermanentRedirect"] = 308] = "PermanentRedirect";
      HttpCodes2[HttpCodes2["BadRequest"] = 400] = "BadRequest";
      HttpCodes2[HttpCodes2["Unauthorized"] = 401] = "Unauthorized";
      HttpCodes2[HttpCodes2["PaymentRequired"] = 402] = "PaymentRequired";
      HttpCodes2[HttpCodes2["Forbidden"] = 403] = "Forbidden";
      HttpCodes2[HttpCodes2["NotFound"] = 404] = "NotFound";
      HttpCodes2[HttpCodes2["MethodNotAllowed"] = 405] = "MethodNotAllowed";
      HttpCodes2[HttpCodes2["NotAcceptable"] = 406] = "NotAcceptable";
      HttpCodes2[HttpCodes2["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
      HttpCodes2[HttpCodes2["RequestTimeout"] = 408] = "RequestTimeout";
      HttpCodes2[HttpCodes2["Conflict"] = 409] = "Conflict";
      HttpCodes2[HttpCodes2["Gone"] = 410] = "Gone";
      HttpCodes2[HttpCodes2["TooManyRequests"] = 429] = "TooManyRequests";
      HttpCodes2[HttpCodes2["InternalServerError"] = 500] = "InternalServerError";
      HttpCodes2[HttpCodes2["NotImplemented"] = 501] = "NotImplemented";
      HttpCodes2[HttpCodes2["BadGateway"] = 502] = "BadGateway";
      HttpCodes2[HttpCodes2["ServiceUnavailable"] = 503] = "ServiceUnavailable";
      HttpCodes2[HttpCodes2["GatewayTimeout"] = 504] = "GatewayTimeout";
    })(HttpCodes = exports2.HttpCodes || (exports2.HttpCodes = {}));
    var Headers;
    (function(Headers2) {
      Headers2["Accept"] = "accept";
      Headers2["ContentType"] = "content-type";
    })(Headers = exports2.Headers || (exports2.Headers = {}));
    var MediaTypes;
    (function(MediaTypes2) {
      MediaTypes2["ApplicationJson"] = "application/json";
    })(MediaTypes = exports2.MediaTypes || (exports2.MediaTypes = {}));
    function getProxyUrl(serverUrl) {
      let proxyUrl = pm.getProxyUrl(new URL(serverUrl));
      return proxyUrl ? proxyUrl.href : "";
    }
    exports2.getProxyUrl = getProxyUrl;
    var HttpRedirectCodes = [
      HttpCodes.MovedPermanently,
      HttpCodes.ResourceMoved,
      HttpCodes.SeeOther,
      HttpCodes.TemporaryRedirect,
      HttpCodes.PermanentRedirect
    ];
    var HttpResponseRetryCodes = [
      HttpCodes.BadGateway,
      HttpCodes.ServiceUnavailable,
      HttpCodes.GatewayTimeout
    ];
    var RetryableHttpVerbs = ["OPTIONS", "GET", "DELETE", "HEAD"];
    var ExponentialBackoffCeiling = 10;
    var ExponentialBackoffTimeSlice = 5;
    var HttpClientError = class extends Error {
      constructor(message, statusCode) {
        super(message);
        this.name = "HttpClientError";
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, HttpClientError.prototype);
      }
    };
    exports2.HttpClientError = HttpClientError;
    var HttpClientResponse = class {
      constructor(message) {
        this.message = message;
      }
      readBody() {
        return new Promise(async (resolve, reject) => {
          let output = Buffer.alloc(0);
          this.message.on("data", (chunk) => {
            output = Buffer.concat([output, chunk]);
          });
          this.message.on("end", () => {
            resolve(output.toString());
          });
        });
      }
    };
    exports2.HttpClientResponse = HttpClientResponse;
    function isHttps(requestUrl) {
      let parsedUrl = new URL(requestUrl);
      return parsedUrl.protocol === "https:";
    }
    exports2.isHttps = isHttps;
    var HttpClient = class {
      constructor(userAgent, handlers, requestOptions) {
        this._ignoreSslError = false;
        this._allowRedirects = true;
        this._allowRedirectDowngrade = false;
        this._maxRedirects = 50;
        this._allowRetries = false;
        this._maxRetries = 1;
        this._keepAlive = false;
        this._disposed = false;
        this.userAgent = userAgent;
        this.handlers = handlers || [];
        this.requestOptions = requestOptions;
        if (requestOptions) {
          if (requestOptions.ignoreSslError != null) {
            this._ignoreSslError = requestOptions.ignoreSslError;
          }
          this._socketTimeout = requestOptions.socketTimeout;
          if (requestOptions.allowRedirects != null) {
            this._allowRedirects = requestOptions.allowRedirects;
          }
          if (requestOptions.allowRedirectDowngrade != null) {
            this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
          }
          if (requestOptions.maxRedirects != null) {
            this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
          }
          if (requestOptions.keepAlive != null) {
            this._keepAlive = requestOptions.keepAlive;
          }
          if (requestOptions.allowRetries != null) {
            this._allowRetries = requestOptions.allowRetries;
          }
          if (requestOptions.maxRetries != null) {
            this._maxRetries = requestOptions.maxRetries;
          }
        }
      }
      options(requestUrl, additionalHeaders) {
        return this.request("OPTIONS", requestUrl, null, additionalHeaders || {});
      }
      get(requestUrl, additionalHeaders) {
        return this.request("GET", requestUrl, null, additionalHeaders || {});
      }
      del(requestUrl, additionalHeaders) {
        return this.request("DELETE", requestUrl, null, additionalHeaders || {});
      }
      post(requestUrl, data, additionalHeaders) {
        return this.request("POST", requestUrl, data, additionalHeaders || {});
      }
      patch(requestUrl, data, additionalHeaders) {
        return this.request("PATCH", requestUrl, data, additionalHeaders || {});
      }
      put(requestUrl, data, additionalHeaders) {
        return this.request("PUT", requestUrl, data, additionalHeaders || {});
      }
      head(requestUrl, additionalHeaders) {
        return this.request("HEAD", requestUrl, null, additionalHeaders || {});
      }
      sendStream(verb, requestUrl, stream, additionalHeaders) {
        return this.request(verb, requestUrl, stream, additionalHeaders);
      }
      async getJson(requestUrl, additionalHeaders = {}) {
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        let res = await this.get(requestUrl, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
      }
      async postJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.post(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
      }
      async putJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.put(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
      }
      async patchJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.patch(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
      }
      async request(verb, requestUrl, data, headers) {
        if (this._disposed) {
          throw new Error("Client has already been disposed.");
        }
        let parsedUrl = new URL(requestUrl);
        let info2 = this._prepareRequest(verb, parsedUrl, headers);
        let maxTries = this._allowRetries && RetryableHttpVerbs.indexOf(verb) != -1 ? this._maxRetries + 1 : 1;
        let numTries = 0;
        let response;
        while (numTries < maxTries) {
          response = await this.requestRaw(info2, data);
          if (response && response.message && response.message.statusCode === HttpCodes.Unauthorized) {
            let authenticationHandler;
            for (let i = 0; i < this.handlers.length; i++) {
              if (this.handlers[i].canHandleAuthentication(response)) {
                authenticationHandler = this.handlers[i];
                break;
              }
            }
            if (authenticationHandler) {
              return authenticationHandler.handleAuthentication(this, info2, data);
            } else {
              return response;
            }
          }
          let redirectsRemaining = this._maxRedirects;
          while (HttpRedirectCodes.indexOf(response.message.statusCode) != -1 && this._allowRedirects && redirectsRemaining > 0) {
            const redirectUrl = response.message.headers["location"];
            if (!redirectUrl) {
              break;
            }
            let parsedRedirectUrl = new URL(redirectUrl);
            if (parsedUrl.protocol == "https:" && parsedUrl.protocol != parsedRedirectUrl.protocol && !this._allowRedirectDowngrade) {
              throw new Error("Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.");
            }
            await response.readBody();
            if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
              for (let header in headers) {
                if (header.toLowerCase() === "authorization") {
                  delete headers[header];
                }
              }
            }
            info2 = this._prepareRequest(verb, parsedRedirectUrl, headers);
            response = await this.requestRaw(info2, data);
            redirectsRemaining--;
          }
          if (HttpResponseRetryCodes.indexOf(response.message.statusCode) == -1) {
            return response;
          }
          numTries += 1;
          if (numTries < maxTries) {
            await response.readBody();
            await this._performExponentialBackoff(numTries);
          }
        }
        return response;
      }
      dispose() {
        if (this._agent) {
          this._agent.destroy();
        }
        this._disposed = true;
      }
      requestRaw(info2, data) {
        return new Promise((resolve, reject) => {
          let callbackForResult = function(err, res) {
            if (err) {
              reject(err);
            }
            resolve(res);
          };
          this.requestRawWithCallback(info2, data, callbackForResult);
        });
      }
      requestRawWithCallback(info2, data, onResult) {
        let socket;
        if (typeof data === "string") {
          info2.options.headers["Content-Length"] = Buffer.byteLength(data, "utf8");
        }
        let callbackCalled = false;
        let handleResult = (err, res) => {
          if (!callbackCalled) {
            callbackCalled = true;
            onResult(err, res);
          }
        };
        let req = info2.httpModule.request(info2.options, (msg) => {
          let res = new HttpClientResponse(msg);
          handleResult(null, res);
        });
        req.on("socket", (sock) => {
          socket = sock;
        });
        req.setTimeout(this._socketTimeout || 3 * 6e4, () => {
          if (socket) {
            socket.end();
          }
          handleResult(new Error("Request timeout: " + info2.options.path), null);
        });
        req.on("error", function(err) {
          handleResult(err, null);
        });
        if (data && typeof data === "string") {
          req.write(data, "utf8");
        }
        if (data && typeof data !== "string") {
          data.on("close", function() {
            req.end();
          });
          data.pipe(req);
        } else {
          req.end();
        }
      }
      getAgent(serverUrl) {
        let parsedUrl = new URL(serverUrl);
        return this._getAgent(parsedUrl);
      }
      _prepareRequest(method, requestUrl, headers) {
        const info2 = {};
        info2.parsedUrl = requestUrl;
        const usingSsl = info2.parsedUrl.protocol === "https:";
        info2.httpModule = usingSsl ? https : http;
        const defaultPort = usingSsl ? 443 : 80;
        info2.options = {};
        info2.options.host = info2.parsedUrl.hostname;
        info2.options.port = info2.parsedUrl.port ? parseInt(info2.parsedUrl.port) : defaultPort;
        info2.options.path = (info2.parsedUrl.pathname || "") + (info2.parsedUrl.search || "");
        info2.options.method = method;
        info2.options.headers = this._mergeHeaders(headers);
        if (this.userAgent != null) {
          info2.options.headers["user-agent"] = this.userAgent;
        }
        info2.options.agent = this._getAgent(info2.parsedUrl);
        if (this.handlers) {
          this.handlers.forEach((handler) => {
            handler.prepareRequest(info2.options);
          });
        }
        return info2;
      }
      _mergeHeaders(headers) {
        const lowercaseKeys = (obj) => Object.keys(obj).reduce((c2, k) => (c2[k.toLowerCase()] = obj[k], c2), {});
        if (this.requestOptions && this.requestOptions.headers) {
          return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers));
        }
        return lowercaseKeys(headers || {});
      }
      _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
        const lowercaseKeys = (obj) => Object.keys(obj).reduce((c2, k) => (c2[k.toLowerCase()] = obj[k], c2), {});
        let clientHeader;
        if (this.requestOptions && this.requestOptions.headers) {
          clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
        }
        return additionalHeaders[header] || clientHeader || _default;
      }
      _getAgent(parsedUrl) {
        let agent;
        let proxyUrl = pm.getProxyUrl(parsedUrl);
        let useProxy = proxyUrl && proxyUrl.hostname;
        if (this._keepAlive && useProxy) {
          agent = this._proxyAgent;
        }
        if (this._keepAlive && !useProxy) {
          agent = this._agent;
        }
        if (!!agent) {
          return agent;
        }
        const usingSsl = parsedUrl.protocol === "https:";
        let maxSockets = 100;
        if (!!this.requestOptions) {
          maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
        }
        if (useProxy) {
          if (!tunnel) {
            tunnel = require_tunnel2();
          }
          const agentOptions = {
            maxSockets,
            keepAlive: this._keepAlive,
            proxy: __spreadProps(__spreadValues({}, (proxyUrl.username || proxyUrl.password) && {
              proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`
            }), {
              host: proxyUrl.hostname,
              port: proxyUrl.port
            })
          };
          let tunnelAgent;
          const overHttps = proxyUrl.protocol === "https:";
          if (usingSsl) {
            tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
          } else {
            tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
          }
          agent = tunnelAgent(agentOptions);
          this._proxyAgent = agent;
        }
        if (this._keepAlive && !agent) {
          const options = { keepAlive: this._keepAlive, maxSockets };
          agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
          this._agent = agent;
        }
        if (!agent) {
          agent = usingSsl ? https.globalAgent : http.globalAgent;
        }
        if (usingSsl && this._ignoreSslError) {
          agent.options = Object.assign(agent.options || {}, {
            rejectUnauthorized: false
          });
        }
        return agent;
      }
      _performExponentialBackoff(retryNumber) {
        retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
        const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
        return new Promise((resolve) => setTimeout(() => resolve(), ms));
      }
      static dateTimeDeserializer(key, value) {
        if (typeof value === "string") {
          let a = new Date(value);
          if (!isNaN(a.valueOf())) {
            return a;
          }
        }
        return value;
      }
      async _processResponse(res, options) {
        return new Promise(async (resolve, reject) => {
          const statusCode = res.message.statusCode;
          const response = {
            statusCode,
            result: null,
            headers: {}
          };
          if (statusCode == HttpCodes.NotFound) {
            resolve(response);
          }
          let obj;
          let contents;
          try {
            contents = await res.readBody();
            if (contents && contents.length > 0) {
              if (options && options.deserializeDates) {
                obj = JSON.parse(contents, HttpClient.dateTimeDeserializer);
              } else {
                obj = JSON.parse(contents);
              }
              response.result = obj;
            }
            response.headers = res.message.headers;
          } catch (err) {
          }
          if (statusCode > 299) {
            let msg;
            if (obj && obj.message) {
              msg = obj.message;
            } else if (contents && contents.length > 0) {
              msg = contents;
            } else {
              msg = "Failed request: (" + statusCode + ")";
            }
            let err = new HttpClientError(msg, statusCode);
            err.result = response.result;
            reject(err);
          } else {
            resolve(response);
          }
        });
      }
    };
    exports2.HttpClient = HttpClient;
  }
});

// node_modules/@actions/http-client/auth.js
var require_auth = __commonJS({
  "node_modules/@actions/http-client/auth.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var BasicCredentialHandler = class {
      constructor(username, password) {
        this.username = username;
        this.password = password;
      }
      prepareRequest(options) {
        options.headers["Authorization"] = "Basic " + Buffer.from(this.username + ":" + this.password).toString("base64");
      }
      canHandleAuthentication(response) {
        return false;
      }
      handleAuthentication(httpClient, requestInfo, objs) {
        return null;
      }
    };
    exports2.BasicCredentialHandler = BasicCredentialHandler;
    var BearerCredentialHandler = class {
      constructor(token) {
        this.token = token;
      }
      prepareRequest(options) {
        options.headers["Authorization"] = "Bearer " + this.token;
      }
      canHandleAuthentication(response) {
        return false;
      }
      handleAuthentication(httpClient, requestInfo, objs) {
        return null;
      }
    };
    exports2.BearerCredentialHandler = BearerCredentialHandler;
    var PersonalAccessTokenCredentialHandler = class {
      constructor(token) {
        this.token = token;
      }
      prepareRequest(options) {
        options.headers["Authorization"] = "Basic " + Buffer.from("PAT:" + this.token).toString("base64");
      }
      canHandleAuthentication(response) {
        return false;
      }
      handleAuthentication(httpClient, requestInfo, objs) {
        return null;
      }
    };
    exports2.PersonalAccessTokenCredentialHandler = PersonalAccessTokenCredentialHandler;
  }
});

// node_modules/@actions/core/lib/oidc-utils.js
var require_oidc_utils = __commonJS({
  "node_modules/@actions/core/lib/oidc-utils.js"(exports2) {
    "use strict";
    var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.OidcClient = void 0;
    var http_client_1 = require_http_client();
    var auth_1 = require_auth();
    var core_1 = require_core();
    var OidcClient = class {
      static createHttpClient(allowRetry = true, maxRetry = 10) {
        const requestOptions = {
          allowRetries: allowRetry,
          maxRetries: maxRetry
        };
        return new http_client_1.HttpClient("actions/oidc-client", [new auth_1.BearerCredentialHandler(OidcClient.getRequestToken())], requestOptions);
      }
      static getRequestToken() {
        const token = process.env["ACTIONS_ID_TOKEN_REQUEST_TOKEN"];
        if (!token) {
          throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable");
        }
        return token;
      }
      static getIDTokenUrl() {
        const runtimeUrl = process.env["ACTIONS_ID_TOKEN_REQUEST_URL"];
        if (!runtimeUrl) {
          throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable");
        }
        return runtimeUrl;
      }
      static getCall(id_token_url) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
          const httpclient = OidcClient.createHttpClient();
          const res = yield httpclient.getJson(id_token_url).catch((error2) => {
            throw new Error(`Failed to get ID Token. 
 
        Error Code : ${error2.statusCode}
 
        Error Message: ${error2.result.message}`);
          });
          const id_token = (_a = res.result) === null || _a === void 0 ? void 0 : _a.value;
          if (!id_token) {
            throw new Error("Response json body do not have ID Token field");
          }
          return id_token;
        });
      }
      static getIDToken(audience) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            let id_token_url = OidcClient.getIDTokenUrl();
            if (audience) {
              const encodedAudience = encodeURIComponent(audience);
              id_token_url = `${id_token_url}&audience=${encodedAudience}`;
            }
            core_1.debug(`ID token url is ${id_token_url}`);
            const id_token = yield OidcClient.getCall(id_token_url);
            core_1.setSecret(id_token);
            return id_token;
          } catch (error2) {
            throw new Error(`Error message: ${error2.message}`);
          }
        });
      }
    };
    exports2.OidcClient = OidcClient;
  }
});

// node_modules/@actions/core/lib/summary.js
var require_summary = __commonJS({
  "node_modules/@actions/core/lib/summary.js"(exports2) {
    "use strict";
    var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.summary = exports2.markdownSummary = exports2.SUMMARY_DOCS_URL = exports2.SUMMARY_ENV_VAR = void 0;
    var os_1 = require("os");
    var fs_1 = require("fs");
    var { access, appendFile, writeFile } = fs_1.promises;
    exports2.SUMMARY_ENV_VAR = "GITHUB_STEP_SUMMARY";
    exports2.SUMMARY_DOCS_URL = "https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary";
    var Summary = class {
      constructor() {
        this._buffer = "";
      }
      filePath() {
        return __awaiter(this, void 0, void 0, function* () {
          if (this._filePath) {
            return this._filePath;
          }
          const pathFromEnv = process.env[exports2.SUMMARY_ENV_VAR];
          if (!pathFromEnv) {
            throw new Error(`Unable to find environment variable for $${exports2.SUMMARY_ENV_VAR}. Check if your runtime environment supports job summaries.`);
          }
          try {
            yield access(pathFromEnv, fs_1.constants.R_OK | fs_1.constants.W_OK);
          } catch (_a) {
            throw new Error(`Unable to access summary file: '${pathFromEnv}'. Check if the file has correct read/write permissions.`);
          }
          this._filePath = pathFromEnv;
          return this._filePath;
        });
      }
      wrap(tag, content, attrs = {}) {
        const htmlAttrs = Object.entries(attrs).map(([key, value]) => ` ${key}="${value}"`).join("");
        if (!content) {
          return `<${tag}${htmlAttrs}>`;
        }
        return `<${tag}${htmlAttrs}>${content}</${tag}>`;
      }
      write(options) {
        return __awaiter(this, void 0, void 0, function* () {
          const overwrite = !!(options === null || options === void 0 ? void 0 : options.overwrite);
          const filePath = yield this.filePath();
          const writeFunc = overwrite ? writeFile : appendFile;
          yield writeFunc(filePath, this._buffer, { encoding: "utf8" });
          return this.emptyBuffer();
        });
      }
      clear() {
        return __awaiter(this, void 0, void 0, function* () {
          return this.emptyBuffer().write({ overwrite: true });
        });
      }
      stringify() {
        return this._buffer;
      }
      isEmptyBuffer() {
        return this._buffer.length === 0;
      }
      emptyBuffer() {
        this._buffer = "";
        return this;
      }
      addRaw(text, addEOL = false) {
        this._buffer += text;
        return addEOL ? this.addEOL() : this;
      }
      addEOL() {
        return this.addRaw(os_1.EOL);
      }
      addCodeBlock(code, lang) {
        const attrs = Object.assign({}, lang && { lang });
        const element = this.wrap("pre", this.wrap("code", code), attrs);
        return this.addRaw(element).addEOL();
      }
      addList(items, ordered = false) {
        const tag = ordered ? "ol" : "ul";
        const listItems = items.map((item) => this.wrap("li", item)).join("");
        const element = this.wrap(tag, listItems);
        return this.addRaw(element).addEOL();
      }
      addTable(rows) {
        const tableBody = rows.map((row) => {
          const cells = row.map((cell) => {
            if (typeof cell === "string") {
              return this.wrap("td", cell);
            }
            const { header, data, colspan, rowspan } = cell;
            const tag = header ? "th" : "td";
            const attrs = Object.assign(Object.assign({}, colspan && { colspan }), rowspan && { rowspan });
            return this.wrap(tag, data, attrs);
          }).join("");
          return this.wrap("tr", cells);
        }).join("");
        const element = this.wrap("table", tableBody);
        return this.addRaw(element).addEOL();
      }
      addDetails(label, content) {
        const element = this.wrap("details", this.wrap("summary", label) + content);
        return this.addRaw(element).addEOL();
      }
      addImage(src, alt, options) {
        const { width, height } = options || {};
        const attrs = Object.assign(Object.assign({}, width && { width }), height && { height });
        const element = this.wrap("img", null, Object.assign({ src, alt }, attrs));
        return this.addRaw(element).addEOL();
      }
      addHeading(text, level) {
        const tag = `h${level}`;
        const allowedTag = ["h1", "h2", "h3", "h4", "h5", "h6"].includes(tag) ? tag : "h1";
        const element = this.wrap(allowedTag, text);
        return this.addRaw(element).addEOL();
      }
      addSeparator() {
        const element = this.wrap("hr", null);
        return this.addRaw(element).addEOL();
      }
      addBreak() {
        const element = this.wrap("br", null);
        return this.addRaw(element).addEOL();
      }
      addQuote(text, cite) {
        const attrs = Object.assign({}, cite && { cite });
        const element = this.wrap("blockquote", text, attrs);
        return this.addRaw(element).addEOL();
      }
      addLink(text, href) {
        const element = this.wrap("a", text, { href });
        return this.addRaw(element).addEOL();
      }
    };
    var _summary = new Summary();
    exports2.markdownSummary = _summary;
    exports2.summary = _summary;
  }
});

// node_modules/@actions/core/lib/core.js
var require_core = __commonJS({
  "node_modules/@actions/core/lib/core.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getIDToken = exports2.getState = exports2.saveState = exports2.group = exports2.endGroup = exports2.startGroup = exports2.info = exports2.notice = exports2.warning = exports2.error = exports2.debug = exports2.isDebug = exports2.setFailed = exports2.setCommandEcho = exports2.setOutput = exports2.getBooleanInput = exports2.getMultilineInput = exports2.getInput = exports2.addPath = exports2.setSecret = exports2.exportVariable = exports2.ExitCode = void 0;
    var command_1 = require_command();
    var file_command_1 = require_file_command();
    var utils_1 = require_utils();
    var os = __importStar(require("os"));
    var path2 = __importStar(require("path"));
    var oidc_utils_1 = require_oidc_utils();
    var ExitCode;
    (function(ExitCode2) {
      ExitCode2[ExitCode2["Success"] = 0] = "Success";
      ExitCode2[ExitCode2["Failure"] = 1] = "Failure";
    })(ExitCode = exports2.ExitCode || (exports2.ExitCode = {}));
    function exportVariable(name, val) {
      const convertedVal = utils_1.toCommandValue(val);
      process.env[name] = convertedVal;
      const filePath = process.env["GITHUB_ENV"] || "";
      if (filePath) {
        const delimiter = "_GitHubActionsFileCommandDelimeter_";
        const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
        file_command_1.issueCommand("ENV", commandValue);
      } else {
        command_1.issueCommand("set-env", { name }, convertedVal);
      }
    }
    exports2.exportVariable = exportVariable;
    function setSecret(secret) {
      command_1.issueCommand("add-mask", {}, secret);
    }
    exports2.setSecret = setSecret;
    function addPath(inputPath) {
      const filePath = process.env["GITHUB_PATH"] || "";
      if (filePath) {
        file_command_1.issueCommand("PATH", inputPath);
      } else {
        command_1.issueCommand("add-path", {}, inputPath);
      }
      process.env["PATH"] = `${inputPath}${path2.delimiter}${process.env["PATH"]}`;
    }
    exports2.addPath = addPath;
    function getInput(name, options) {
      const val = process.env[`INPUT_${name.replace(/ /g, "_").toUpperCase()}`] || "";
      if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
      }
      if (options && options.trimWhitespace === false) {
        return val;
      }
      return val.trim();
    }
    exports2.getInput = getInput;
    function getMultilineInput(name, options) {
      const inputs = getInput(name, options).split("\n").filter((x) => x !== "");
      return inputs;
    }
    exports2.getMultilineInput = getMultilineInput;
    function getBooleanInput(name, options) {
      const trueValue = ["true", "True", "TRUE"];
      const falseValue = ["false", "False", "FALSE"];
      const val = getInput(name, options);
      if (trueValue.includes(val))
        return true;
      if (falseValue.includes(val))
        return false;
      throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}
Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
    }
    exports2.getBooleanInput = getBooleanInput;
    function setOutput3(name, value) {
      process.stdout.write(os.EOL);
      command_1.issueCommand("set-output", { name }, value);
    }
    exports2.setOutput = setOutput3;
    function setCommandEcho(enabled) {
      command_1.issue("echo", enabled ? "on" : "off");
    }
    exports2.setCommandEcho = setCommandEcho;
    function setFailed(message) {
      process.exitCode = ExitCode.Failure;
      error2(message);
    }
    exports2.setFailed = setFailed;
    function isDebug() {
      return process.env["RUNNER_DEBUG"] === "1";
    }
    exports2.isDebug = isDebug;
    function debug2(message) {
      command_1.issueCommand("debug", {}, message);
    }
    exports2.debug = debug2;
    function error2(message, properties = {}) {
      command_1.issueCommand("error", utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
    }
    exports2.error = error2;
    function warning2(message, properties = {}) {
      command_1.issueCommand("warning", utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
    }
    exports2.warning = warning2;
    function notice(message, properties = {}) {
      command_1.issueCommand("notice", utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
    }
    exports2.notice = notice;
    function info2(message) {
      process.stdout.write(message + os.EOL);
    }
    exports2.info = info2;
    function startGroup2(name) {
      command_1.issue("group", name);
    }
    exports2.startGroup = startGroup2;
    function endGroup2() {
      command_1.issue("endgroup");
    }
    exports2.endGroup = endGroup2;
    function group(name, fn) {
      return __awaiter(this, void 0, void 0, function* () {
        startGroup2(name);
        let result;
        try {
          result = yield fn();
        } finally {
          endGroup2();
        }
        return result;
      });
    }
    exports2.group = group;
    function saveState(name, value) {
      command_1.issueCommand("save-state", { name }, value);
    }
    exports2.saveState = saveState;
    function getState(name) {
      return process.env[`STATE_${name}`] || "";
    }
    exports2.getState = getState;
    function getIDToken(aud) {
      return __awaiter(this, void 0, void 0, function* () {
        return yield oidc_utils_1.OidcClient.getIDToken(aud);
      });
    }
    exports2.getIDToken = getIDToken;
    var summary_1 = require_summary();
    Object.defineProperty(exports2, "summary", { enumerable: true, get: function() {
      return summary_1.summary;
    } });
    var summary_2 = require_summary();
    Object.defineProperty(exports2, "markdownSummary", { enumerable: true, get: function() {
      return summary_2.markdownSummary;
    } });
  }
});

// node_modules/byte-size/dist/index.js
var require_dist = __commonJS({
  "node_modules/byte-size/dist/index.js"(exports2, module2) {
    (function(global2, factory) {
      typeof exports2 === "object" && typeof module2 !== "undefined" ? module2.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, global2.byteSize = factory());
    })(exports2, function() {
      "use strict";
      let defaultOptions = {};
      const _options = new WeakMap();
      class ByteSize {
        constructor(bytes, options) {
          options = Object.assign({
            units: "metric",
            precision: 1
          }, defaultOptions, options);
          _options.set(this, options);
          const tables = {
            metric: [
              { from: 0, to: 1e3, unit: "B", long: "bytes" },
              { from: 1e3, to: 1e6, unit: "kB", long: "kilobytes" },
              { from: 1e6, to: 1e9, unit: "MB", long: "megabytes" },
              { from: 1e9, to: 1e12, unit: "GB", long: "gigabytes" },
              { from: 1e12, to: 1e15, unit: "TB", long: "terabytes" },
              { from: 1e15, to: 1e18, unit: "PB", long: "petabytes" },
              { from: 1e18, to: 1e21, unit: "EB", long: "exabytes" },
              { from: 1e21, to: 1e24, unit: "ZB", long: "zettabytes" },
              { from: 1e24, to: 1e27, unit: "YB", long: "yottabytes" }
            ],
            metric_octet: [
              { from: 0, to: 1e3, unit: "o", long: "octets" },
              { from: 1e3, to: 1e6, unit: "ko", long: "kilooctets" },
              { from: 1e6, to: 1e9, unit: "Mo", long: "megaoctets" },
              { from: 1e9, to: 1e12, unit: "Go", long: "gigaoctets" },
              { from: 1e12, to: 1e15, unit: "To", long: "teraoctets" },
              { from: 1e15, to: 1e18, unit: "Po", long: "petaoctets" },
              { from: 1e18, to: 1e21, unit: "Eo", long: "exaoctets" },
              { from: 1e21, to: 1e24, unit: "Zo", long: "zettaoctets" },
              { from: 1e24, to: 1e27, unit: "Yo", long: "yottaoctets" }
            ],
            iec: [
              { from: 0, to: Math.pow(1024, 1), unit: "B", long: "bytes" },
              { from: Math.pow(1024, 1), to: Math.pow(1024, 2), unit: "KiB", long: "kibibytes" },
              { from: Math.pow(1024, 2), to: Math.pow(1024, 3), unit: "MiB", long: "mebibytes" },
              { from: Math.pow(1024, 3), to: Math.pow(1024, 4), unit: "GiB", long: "gibibytes" },
              { from: Math.pow(1024, 4), to: Math.pow(1024, 5), unit: "TiB", long: "tebibytes" },
              { from: Math.pow(1024, 5), to: Math.pow(1024, 6), unit: "PiB", long: "pebibytes" },
              { from: Math.pow(1024, 6), to: Math.pow(1024, 7), unit: "EiB", long: "exbibytes" },
              { from: Math.pow(1024, 7), to: Math.pow(1024, 8), unit: "ZiB", long: "zebibytes" },
              { from: Math.pow(1024, 8), to: Math.pow(1024, 9), unit: "YiB", long: "yobibytes" }
            ],
            iec_octet: [
              { from: 0, to: Math.pow(1024, 1), unit: "o", long: "octets" },
              { from: Math.pow(1024, 1), to: Math.pow(1024, 2), unit: "Kio", long: "kibioctets" },
              { from: Math.pow(1024, 2), to: Math.pow(1024, 3), unit: "Mio", long: "mebioctets" },
              { from: Math.pow(1024, 3), to: Math.pow(1024, 4), unit: "Gio", long: "gibioctets" },
              { from: Math.pow(1024, 4), to: Math.pow(1024, 5), unit: "Tio", long: "tebioctets" },
              { from: Math.pow(1024, 5), to: Math.pow(1024, 6), unit: "Pio", long: "pebioctets" },
              { from: Math.pow(1024, 6), to: Math.pow(1024, 7), unit: "Eio", long: "exbioctets" },
              { from: Math.pow(1024, 7), to: Math.pow(1024, 8), unit: "Zio", long: "zebioctets" },
              { from: Math.pow(1024, 8), to: Math.pow(1024, 9), unit: "Yio", long: "yobioctets" }
            ]
          };
          Object.assign(tables, options.customUnits);
          const prefix = bytes < 0 ? "-" : "";
          bytes = Math.abs(bytes);
          const table = tables[options.units];
          if (table) {
            const units = table.find((u) => bytes >= u.from && bytes < u.to);
            if (units) {
              const value = units.from === 0 ? prefix + bytes : prefix + (bytes / units.from).toFixed(options.precision);
              this.value = value;
              this.unit = units.unit;
              this.long = units.long;
            } else {
              this.value = prefix + bytes;
              this.unit = "";
              this.long = "";
            }
          } else {
            throw new Error(`Invalid units specified: ${options.units}`);
          }
        }
        toString() {
          const options = _options.get(this);
          return options.toStringFn ? options.toStringFn.bind(this)() : `${this.value} ${this.unit}`;
        }
      }
      function byteSize3(bytes, options) {
        return new ByteSize(bytes, options);
      }
      byteSize3.defaultOptions = function(options) {
        defaultOptions = options;
      };
      return byteSize3;
    });
  }
});

// node_modules/repeat-string/index.js
var require_repeat_string = __commonJS({
  "node_modules/repeat-string/index.js"(exports2, module2) {
    "use strict";
    var res = "";
    var cache;
    module2.exports = repeat;
    function repeat(str, num) {
      if (typeof str !== "string") {
        throw new TypeError("expected a string");
      }
      if (num === 1)
        return str;
      if (num === 2)
        return str + str;
      var max = str.length * num;
      if (cache !== str || typeof cache === "undefined") {
        cache = str;
        res = "";
      } else if (res.length >= max) {
        return res.substr(0, max);
      }
      while (max > res.length && num > 1) {
        if (num & 1) {
          res += str;
        }
        num >>= 1;
        str += str;
      }
      res += str;
      res = res.substr(0, max);
      return res;
    }
  }
});

// node_modules/markdown-table/index.js
var require_markdown_table = __commonJS({
  "node_modules/markdown-table/index.js"(exports2, module2) {
    "use strict";
    var repeat = require_repeat_string();
    module2.exports = markdownTable3;
    var trailingWhitespace = / +$/;
    var space = " ";
    var lineFeed = "\n";
    var dash = "-";
    var colon = ":";
    var verticalBar = "|";
    var x = 0;
    var C = 67;
    var L = 76;
    var R = 82;
    var c2 = 99;
    var l = 108;
    var r = 114;
    function markdownTable3(table, options) {
      var settings = options || {};
      var padding = settings.padding !== false;
      var start = settings.delimiterStart !== false;
      var end = settings.delimiterEnd !== false;
      var align = (settings.align || []).concat();
      var alignDelimiters = settings.alignDelimiters !== false;
      var alignments = [];
      var stringLength = settings.stringLength || defaultStringLength;
      var rowIndex = -1;
      var rowLength = table.length;
      var cellMatrix = [];
      var sizeMatrix = [];
      var row = [];
      var sizes = [];
      var longestCellByColumn = [];
      var mostCellsPerRow = 0;
      var cells;
      var columnIndex;
      var columnLength;
      var largest;
      var size;
      var cell;
      var lines;
      var line;
      var before;
      var after;
      var code;
      while (++rowIndex < rowLength) {
        cells = table[rowIndex];
        columnIndex = -1;
        columnLength = cells.length;
        row = [];
        sizes = [];
        if (columnLength > mostCellsPerRow) {
          mostCellsPerRow = columnLength;
        }
        while (++columnIndex < columnLength) {
          cell = serialize(cells[columnIndex]);
          if (alignDelimiters === true) {
            size = stringLength(cell);
            sizes[columnIndex] = size;
            largest = longestCellByColumn[columnIndex];
            if (largest === void 0 || size > largest) {
              longestCellByColumn[columnIndex] = size;
            }
          }
          row.push(cell);
        }
        cellMatrix[rowIndex] = row;
        sizeMatrix[rowIndex] = sizes;
      }
      columnIndex = -1;
      columnLength = mostCellsPerRow;
      if (typeof align === "object" && "length" in align) {
        while (++columnIndex < columnLength) {
          alignments[columnIndex] = toAlignment(align[columnIndex]);
        }
      } else {
        code = toAlignment(align);
        while (++columnIndex < columnLength) {
          alignments[columnIndex] = code;
        }
      }
      columnIndex = -1;
      columnLength = mostCellsPerRow;
      row = [];
      sizes = [];
      while (++columnIndex < columnLength) {
        code = alignments[columnIndex];
        before = "";
        after = "";
        if (code === l) {
          before = colon;
        } else if (code === r) {
          after = colon;
        } else if (code === c2) {
          before = colon;
          after = colon;
        }
        size = alignDelimiters ? Math.max(1, longestCellByColumn[columnIndex] - before.length - after.length) : 1;
        cell = before + repeat(dash, size) + after;
        if (alignDelimiters === true) {
          size = before.length + size + after.length;
          if (size > longestCellByColumn[columnIndex]) {
            longestCellByColumn[columnIndex] = size;
          }
          sizes[columnIndex] = size;
        }
        row[columnIndex] = cell;
      }
      cellMatrix.splice(1, 0, row);
      sizeMatrix.splice(1, 0, sizes);
      rowIndex = -1;
      rowLength = cellMatrix.length;
      lines = [];
      while (++rowIndex < rowLength) {
        row = cellMatrix[rowIndex];
        sizes = sizeMatrix[rowIndex];
        columnIndex = -1;
        columnLength = mostCellsPerRow;
        line = [];
        while (++columnIndex < columnLength) {
          cell = row[columnIndex] || "";
          before = "";
          after = "";
          if (alignDelimiters === true) {
            size = longestCellByColumn[columnIndex] - (sizes[columnIndex] || 0);
            code = alignments[columnIndex];
            if (code === r) {
              before = repeat(space, size);
            } else if (code === c2) {
              if (size % 2 === 0) {
                before = repeat(space, size / 2);
                after = before;
              } else {
                before = repeat(space, size / 2 + 0.5);
                after = repeat(space, size / 2 - 0.5);
              }
            } else {
              after = repeat(space, size);
            }
          }
          if (start === true && columnIndex === 0) {
            line.push(verticalBar);
          }
          if (padding === true && !(alignDelimiters === false && cell === "") && (start === true || columnIndex !== 0)) {
            line.push(space);
          }
          if (alignDelimiters === true) {
            line.push(before);
          }
          line.push(cell);
          if (alignDelimiters === true) {
            line.push(after);
          }
          if (padding === true) {
            line.push(space);
          }
          if (end === true || columnIndex !== columnLength - 1) {
            line.push(verticalBar);
          }
        }
        line = line.join("");
        if (end === false) {
          line = line.replace(trailingWhitespace, "");
        }
        lines.push(line);
      }
      return lines.join(lineFeed);
    }
    function serialize(value) {
      return value === null || value === void 0 ? "" : String(value);
    }
    function defaultStringLength(value) {
      return value.length;
    }
    function toAlignment(value) {
      var code = typeof value === "string" ? value.charCodeAt(0) : x;
      return code === L || code === l ? l : code === R || code === r ? r : code === C || code === c2 ? c2 : x;
    }
  }
});

// node_modules/outdent/lib/index.js
var require_lib = __commonJS({
  "node_modules/outdent/lib/index.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    function noop() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
    }
    function createWeakMap() {
      if (typeof WeakMap !== "undefined") {
        return new WeakMap();
      } else {
        return fakeSetOrMap();
      }
    }
    function fakeSetOrMap() {
      return {
        add: noop,
        delete: noop,
        get: noop,
        set: noop,
        has: function(k) {
          return false;
        }
      };
    }
    var hop = Object.prototype.hasOwnProperty;
    var has = function(obj, prop) {
      return hop.call(obj, prop);
    };
    function extend(target, source) {
      for (var prop in source) {
        if (has(source, prop)) {
          target[prop] = source[prop];
        }
      }
      return target;
    }
    var reLeadingNewline = /^[ \t]*(?:\r\n|\r|\n)/;
    var reTrailingNewline = /(?:\r\n|\r|\n)[ \t]*$/;
    var reStartsWithNewlineOrIsEmpty = /^(?:[\r\n]|$)/;
    var reDetectIndentation = /(?:\r\n|\r|\n)([ \t]*)(?:[^ \t\r\n]|$)/;
    var reOnlyWhitespaceWithAtLeastOneNewline = /^[ \t]*[\r\n][ \t\r\n]*$/;
    function _outdentArray(strings, firstInterpolatedValueSetsIndentationLevel, options) {
      var indentationLevel = 0;
      var match = strings[0].match(reDetectIndentation);
      if (match) {
        indentationLevel = match[1].length;
      }
      var reSource = "(\\r\\n|\\r|\\n).{0," + indentationLevel + "}";
      var reMatchIndent = new RegExp(reSource, "g");
      if (firstInterpolatedValueSetsIndentationLevel) {
        strings = strings.slice(1);
      }
      var newline = options.newline, trimLeadingNewline = options.trimLeadingNewline, trimTrailingNewline = options.trimTrailingNewline;
      var normalizeNewlines = typeof newline === "string";
      var l = strings.length;
      var outdentedStrings = strings.map(function(v, i) {
        v = v.replace(reMatchIndent, "$1");
        if (i === 0 && trimLeadingNewline) {
          v = v.replace(reLeadingNewline, "");
        }
        if (i === l - 1 && trimTrailingNewline) {
          v = v.replace(reTrailingNewline, "");
        }
        if (normalizeNewlines) {
          v = v.replace(/\r\n|\n|\r/g, function(_) {
            return newline;
          });
        }
        return v;
      });
      return outdentedStrings;
    }
    function concatStringsAndValues(strings, values) {
      var ret = "";
      for (var i = 0, l = strings.length; i < l; i++) {
        ret += strings[i];
        if (i < l - 1) {
          ret += values[i];
        }
      }
      return ret;
    }
    function isTemplateStringsArray(v) {
      return has(v, "raw") && has(v, "length");
    }
    function createInstance(options) {
      var arrayAutoIndentCache = createWeakMap();
      var arrayFirstInterpSetsIndentCache = createWeakMap();
      function outdent3(stringsOrOptions) {
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
          values[_i - 1] = arguments[_i];
        }
        if (isTemplateStringsArray(stringsOrOptions)) {
          var strings = stringsOrOptions;
          var firstInterpolatedValueSetsIndentationLevel = (values[0] === outdent3 || values[0] === defaultOutdent) && reOnlyWhitespaceWithAtLeastOneNewline.test(strings[0]) && reStartsWithNewlineOrIsEmpty.test(strings[1]);
          var cache = firstInterpolatedValueSetsIndentationLevel ? arrayFirstInterpSetsIndentCache : arrayAutoIndentCache;
          var renderedArray = cache.get(strings);
          if (!renderedArray) {
            renderedArray = _outdentArray(strings, firstInterpolatedValueSetsIndentationLevel, options);
            cache.set(strings, renderedArray);
          }
          if (values.length === 0) {
            return renderedArray[0];
          }
          var rendered = concatStringsAndValues(renderedArray, firstInterpolatedValueSetsIndentationLevel ? values.slice(1) : values);
          return rendered;
        } else {
          return createInstance(extend(extend({}, options), stringsOrOptions || {}));
        }
      }
      var fullOutdent = extend(outdent3, {
        string: function(str) {
          return _outdentArray([str], false, options)[0];
        }
      });
      return fullOutdent;
    }
    var defaultOutdent = createInstance({
      trimLeadingNewline: true,
      trimTrailingNewline: true
    });
    exports2.outdent = defaultOutdent;
    exports2.default = defaultOutdent;
    if (typeof module2 !== "undefined") {
      try {
        module2.exports = defaultOutdent;
        Object.defineProperty(defaultOutdent, "__esModule", { value: true });
        defaultOutdent.default = defaultOutdent;
        defaultOutdent.outdent = defaultOutdent;
      } catch (e) {
      }
    }
  }
});

// node_modules/glob-to-regexp/index.js
var require_glob_to_regexp = __commonJS({
  "node_modules/glob-to-regexp/index.js"(exports2, module2) {
    module2.exports = function(glob, opts) {
      if (typeof glob !== "string") {
        throw new TypeError("Expected a string");
      }
      var str = String(glob);
      var reStr = "";
      var extended = opts ? !!opts.extended : false;
      var globstar = opts ? !!opts.globstar : false;
      var inGroup = false;
      var flags = opts && typeof opts.flags === "string" ? opts.flags : "";
      var c2;
      for (var i = 0, len = str.length; i < len; i++) {
        c2 = str[i];
        switch (c2) {
          case "/":
          case "$":
          case "^":
          case "+":
          case ".":
          case "(":
          case ")":
          case "=":
          case "!":
          case "|":
            reStr += "\\" + c2;
            break;
          case "?":
            if (extended) {
              reStr += ".";
              break;
            }
          case "[":
          case "]":
            if (extended) {
              reStr += c2;
              break;
            }
          case "{":
            if (extended) {
              inGroup = true;
              reStr += "(";
              break;
            }
          case "}":
            if (extended) {
              inGroup = false;
              reStr += ")";
              break;
            }
          case ",":
            if (inGroup) {
              reStr += "|";
              break;
            }
            reStr += "\\" + c2;
            break;
          case "*":
            var prevChar = str[i - 1];
            var starCount = 1;
            while (str[i + 1] === "*") {
              starCount++;
              i++;
            }
            var nextChar = str[i + 1];
            if (!globstar) {
              reStr += ".*";
            } else {
              var isGlobstar = starCount > 1 && (prevChar === "/" || prevChar === void 0) && (nextChar === "/" || nextChar === void 0);
              if (isGlobstar) {
                reStr += "((?:[^/]*(?:/|$))*)";
                i++;
              } else {
                reStr += "([^/]*)";
              }
            }
            break;
          default:
            reStr += c2;
        }
      }
      if (!flags || !~flags.indexOf("g")) {
        reStr = "^" + reStr + "$";
      }
      return new RegExp(reStr, flags);
    };
  }
});

// node_modules/@actions/io/lib/io-util.js
var require_io_util = __commonJS({
  "node_modules/@actions/io/lib/io-util.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var _a;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getCmdPath = exports2.tryGetExecutablePath = exports2.isRooted = exports2.isDirectory = exports2.exists = exports2.IS_WINDOWS = exports2.unlink = exports2.symlink = exports2.stat = exports2.rmdir = exports2.rename = exports2.readlink = exports2.readdir = exports2.mkdir = exports2.lstat = exports2.copyFile = exports2.chmod = void 0;
    var fs3 = __importStar(require("fs"));
    var path2 = __importStar(require("path"));
    _a = fs3.promises, exports2.chmod = _a.chmod, exports2.copyFile = _a.copyFile, exports2.lstat = _a.lstat, exports2.mkdir = _a.mkdir, exports2.readdir = _a.readdir, exports2.readlink = _a.readlink, exports2.rename = _a.rename, exports2.rmdir = _a.rmdir, exports2.stat = _a.stat, exports2.symlink = _a.symlink, exports2.unlink = _a.unlink;
    exports2.IS_WINDOWS = process.platform === "win32";
    function exists(fsPath) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          yield exports2.stat(fsPath);
        } catch (err) {
          if (err.code === "ENOENT") {
            return false;
          }
          throw err;
        }
        return true;
      });
    }
    exports2.exists = exists;
    function isDirectory(fsPath, useStat = false) {
      return __awaiter(this, void 0, void 0, function* () {
        const stats = useStat ? yield exports2.stat(fsPath) : yield exports2.lstat(fsPath);
        return stats.isDirectory();
      });
    }
    exports2.isDirectory = isDirectory;
    function isRooted(p) {
      p = normalizeSeparators(p);
      if (!p) {
        throw new Error('isRooted() parameter "p" cannot be empty');
      }
      if (exports2.IS_WINDOWS) {
        return p.startsWith("\\") || /^[A-Z]:/i.test(p);
      }
      return p.startsWith("/");
    }
    exports2.isRooted = isRooted;
    function tryGetExecutablePath(filePath, extensions) {
      return __awaiter(this, void 0, void 0, function* () {
        let stats = void 0;
        try {
          stats = yield exports2.stat(filePath);
        } catch (err) {
          if (err.code !== "ENOENT") {
            console.log(`Unexpected error attempting to determine if executable file exists '${filePath}': ${err}`);
          }
        }
        if (stats && stats.isFile()) {
          if (exports2.IS_WINDOWS) {
            const upperExt = path2.extname(filePath).toUpperCase();
            if (extensions.some((validExt) => validExt.toUpperCase() === upperExt)) {
              return filePath;
            }
          } else {
            if (isUnixExecutable(stats)) {
              return filePath;
            }
          }
        }
        const originalFilePath = filePath;
        for (const extension of extensions) {
          filePath = originalFilePath + extension;
          stats = void 0;
          try {
            stats = yield exports2.stat(filePath);
          } catch (err) {
            if (err.code !== "ENOENT") {
              console.log(`Unexpected error attempting to determine if executable file exists '${filePath}': ${err}`);
            }
          }
          if (stats && stats.isFile()) {
            if (exports2.IS_WINDOWS) {
              try {
                const directory = path2.dirname(filePath);
                const upperName = path2.basename(filePath).toUpperCase();
                for (const actualName of yield exports2.readdir(directory)) {
                  if (upperName === actualName.toUpperCase()) {
                    filePath = path2.join(directory, actualName);
                    break;
                  }
                }
              } catch (err) {
                console.log(`Unexpected error attempting to determine the actual case of the file '${filePath}': ${err}`);
              }
              return filePath;
            } else {
              if (isUnixExecutable(stats)) {
                return filePath;
              }
            }
          }
        }
        return "";
      });
    }
    exports2.tryGetExecutablePath = tryGetExecutablePath;
    function normalizeSeparators(p) {
      p = p || "";
      if (exports2.IS_WINDOWS) {
        p = p.replace(/\//g, "\\");
        return p.replace(/\\\\+/g, "\\");
      }
      return p.replace(/\/\/+/g, "/");
    }
    function isUnixExecutable(stats) {
      return (stats.mode & 1) > 0 || (stats.mode & 8) > 0 && stats.gid === process.getgid() || (stats.mode & 64) > 0 && stats.uid === process.getuid();
    }
    function getCmdPath() {
      var _a2;
      return (_a2 = process.env["COMSPEC"]) !== null && _a2 !== void 0 ? _a2 : `cmd.exe`;
    }
    exports2.getCmdPath = getCmdPath;
  }
});

// node_modules/@actions/io/lib/io.js
var require_io = __commonJS({
  "node_modules/@actions/io/lib/io.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.findInPath = exports2.which = exports2.mkdirP = exports2.rmRF = exports2.mv = exports2.cp = void 0;
    var assert_1 = require("assert");
    var childProcess = __importStar(require("child_process"));
    var path2 = __importStar(require("path"));
    var util_1 = require("util");
    var ioUtil = __importStar(require_io_util());
    var exec2 = util_1.promisify(childProcess.exec);
    var execFile = util_1.promisify(childProcess.execFile);
    function cp(source, dest, options = {}) {
      return __awaiter(this, void 0, void 0, function* () {
        const { force, recursive, copySourceDirectory } = readCopyOptions(options);
        const destStat = (yield ioUtil.exists(dest)) ? yield ioUtil.stat(dest) : null;
        if (destStat && destStat.isFile() && !force) {
          return;
        }
        const newDest = destStat && destStat.isDirectory() && copySourceDirectory ? path2.join(dest, path2.basename(source)) : dest;
        if (!(yield ioUtil.exists(source))) {
          throw new Error(`no such file or directory: ${source}`);
        }
        const sourceStat = yield ioUtil.stat(source);
        if (sourceStat.isDirectory()) {
          if (!recursive) {
            throw new Error(`Failed to copy. ${source} is a directory, but tried to copy without recursive flag.`);
          } else {
            yield cpDirRecursive(source, newDest, 0, force);
          }
        } else {
          if (path2.relative(source, newDest) === "") {
            throw new Error(`'${newDest}' and '${source}' are the same file`);
          }
          yield copyFile(source, newDest, force);
        }
      });
    }
    exports2.cp = cp;
    function mv(source, dest, options = {}) {
      return __awaiter(this, void 0, void 0, function* () {
        if (yield ioUtil.exists(dest)) {
          let destExists = true;
          if (yield ioUtil.isDirectory(dest)) {
            dest = path2.join(dest, path2.basename(source));
            destExists = yield ioUtil.exists(dest);
          }
          if (destExists) {
            if (options.force == null || options.force) {
              yield rmRF2(dest);
            } else {
              throw new Error("Destination already exists");
            }
          }
        }
        yield mkdirP(path2.dirname(dest));
        yield ioUtil.rename(source, dest);
      });
    }
    exports2.mv = mv;
    function rmRF2(inputPath) {
      return __awaiter(this, void 0, void 0, function* () {
        if (ioUtil.IS_WINDOWS) {
          if (/[*"<>|]/.test(inputPath)) {
            throw new Error('File path must not contain `*`, `"`, `<`, `>` or `|` on Windows');
          }
          try {
            const cmdPath = ioUtil.getCmdPath();
            if (yield ioUtil.isDirectory(inputPath, true)) {
              yield exec2(`${cmdPath} /s /c "rd /s /q "%inputPath%""`, {
                env: { inputPath }
              });
            } else {
              yield exec2(`${cmdPath} /s /c "del /f /a "%inputPath%""`, {
                env: { inputPath }
              });
            }
          } catch (err) {
            if (err.code !== "ENOENT")
              throw err;
          }
          try {
            yield ioUtil.unlink(inputPath);
          } catch (err) {
            if (err.code !== "ENOENT")
              throw err;
          }
        } else {
          let isDir = false;
          try {
            isDir = yield ioUtil.isDirectory(inputPath);
          } catch (err) {
            if (err.code !== "ENOENT")
              throw err;
            return;
          }
          if (isDir) {
            yield execFile(`rm`, [`-rf`, `${inputPath}`]);
          } else {
            yield ioUtil.unlink(inputPath);
          }
        }
      });
    }
    exports2.rmRF = rmRF2;
    function mkdirP(fsPath) {
      return __awaiter(this, void 0, void 0, function* () {
        assert_1.ok(fsPath, "a path argument must be provided");
        yield ioUtil.mkdir(fsPath, { recursive: true });
      });
    }
    exports2.mkdirP = mkdirP;
    function which(tool, check) {
      return __awaiter(this, void 0, void 0, function* () {
        if (!tool) {
          throw new Error("parameter 'tool' is required");
        }
        if (check) {
          const result = yield which(tool, false);
          if (!result) {
            if (ioUtil.IS_WINDOWS) {
              throw new Error(`Unable to locate executable file: ${tool}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also verify the file has a valid extension for an executable file.`);
            } else {
              throw new Error(`Unable to locate executable file: ${tool}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also check the file mode to verify the file is executable.`);
            }
          }
          return result;
        }
        const matches = yield findInPath(tool);
        if (matches && matches.length > 0) {
          return matches[0];
        }
        return "";
      });
    }
    exports2.which = which;
    function findInPath(tool) {
      return __awaiter(this, void 0, void 0, function* () {
        if (!tool) {
          throw new Error("parameter 'tool' is required");
        }
        const extensions = [];
        if (ioUtil.IS_WINDOWS && process.env["PATHEXT"]) {
          for (const extension of process.env["PATHEXT"].split(path2.delimiter)) {
            if (extension) {
              extensions.push(extension);
            }
          }
        }
        if (ioUtil.isRooted(tool)) {
          const filePath = yield ioUtil.tryGetExecutablePath(tool, extensions);
          if (filePath) {
            return [filePath];
          }
          return [];
        }
        if (tool.includes(path2.sep)) {
          return [];
        }
        const directories = [];
        if (process.env.PATH) {
          for (const p of process.env.PATH.split(path2.delimiter)) {
            if (p) {
              directories.push(p);
            }
          }
        }
        const matches = [];
        for (const directory of directories) {
          const filePath = yield ioUtil.tryGetExecutablePath(path2.join(directory, tool), extensions);
          if (filePath) {
            matches.push(filePath);
          }
        }
        return matches;
      });
    }
    exports2.findInPath = findInPath;
    function readCopyOptions(options) {
      const force = options.force == null ? true : options.force;
      const recursive = Boolean(options.recursive);
      const copySourceDirectory = options.copySourceDirectory == null ? true : Boolean(options.copySourceDirectory);
      return { force, recursive, copySourceDirectory };
    }
    function cpDirRecursive(sourceDir, destDir, currentDepth, force) {
      return __awaiter(this, void 0, void 0, function* () {
        if (currentDepth >= 255)
          return;
        currentDepth++;
        yield mkdirP(destDir);
        const files = yield ioUtil.readdir(sourceDir);
        for (const fileName of files) {
          const srcFile = `${sourceDir}/${fileName}`;
          const destFile = `${destDir}/${fileName}`;
          const srcFileStat = yield ioUtil.lstat(srcFile);
          if (srcFileStat.isDirectory()) {
            yield cpDirRecursive(srcFile, destFile, currentDepth, force);
          } else {
            yield copyFile(srcFile, destFile, force);
          }
        }
        yield ioUtil.chmod(destDir, (yield ioUtil.stat(sourceDir)).mode);
      });
    }
    function copyFile(srcFile, destFile, force) {
      return __awaiter(this, void 0, void 0, function* () {
        if ((yield ioUtil.lstat(srcFile)).isSymbolicLink()) {
          try {
            yield ioUtil.lstat(destFile);
            yield ioUtil.unlink(destFile);
          } catch (e) {
            if (e.code === "EPERM") {
              yield ioUtil.chmod(destFile, "0666");
              yield ioUtil.unlink(destFile);
            }
          }
          const symlinkFull = yield ioUtil.readlink(srcFile);
          yield ioUtil.symlink(symlinkFull, destFile, ioUtil.IS_WINDOWS ? "junction" : null);
        } else if (!(yield ioUtil.exists(destFile)) || force) {
          yield ioUtil.copyFile(srcFile, destFile);
        }
      });
    }
  }
});

// node_modules/@actions/exec/lib/toolrunner.js
var require_toolrunner = __commonJS({
  "node_modules/@actions/exec/lib/toolrunner.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.argStringToArray = exports2.ToolRunner = void 0;
    var os = __importStar(require("os"));
    var events = __importStar(require("events"));
    var child = __importStar(require("child_process"));
    var path2 = __importStar(require("path"));
    var io = __importStar(require_io());
    var ioUtil = __importStar(require_io_util());
    var timers_1 = require("timers");
    var IS_WINDOWS = process.platform === "win32";
    var ToolRunner = class extends events.EventEmitter {
      constructor(toolPath, args, options) {
        super();
        if (!toolPath) {
          throw new Error("Parameter 'toolPath' cannot be null or empty.");
        }
        this.toolPath = toolPath;
        this.args = args || [];
        this.options = options || {};
      }
      _debug(message) {
        if (this.options.listeners && this.options.listeners.debug) {
          this.options.listeners.debug(message);
        }
      }
      _getCommandString(options, noPrefix) {
        const toolPath = this._getSpawnFileName();
        const args = this._getSpawnArgs(options);
        let cmd = noPrefix ? "" : "[command]";
        if (IS_WINDOWS) {
          if (this._isCmdFile()) {
            cmd += toolPath;
            for (const a of args) {
              cmd += ` ${a}`;
            }
          } else if (options.windowsVerbatimArguments) {
            cmd += `"${toolPath}"`;
            for (const a of args) {
              cmd += ` ${a}`;
            }
          } else {
            cmd += this._windowsQuoteCmdArg(toolPath);
            for (const a of args) {
              cmd += ` ${this._windowsQuoteCmdArg(a)}`;
            }
          }
        } else {
          cmd += toolPath;
          for (const a of args) {
            cmd += ` ${a}`;
          }
        }
        return cmd;
      }
      _processLineBuffer(data, strBuffer, onLine) {
        try {
          let s = strBuffer + data.toString();
          let n = s.indexOf(os.EOL);
          while (n > -1) {
            const line = s.substring(0, n);
            onLine(line);
            s = s.substring(n + os.EOL.length);
            n = s.indexOf(os.EOL);
          }
          return s;
        } catch (err) {
          this._debug(`error processing line. Failed with error ${err}`);
          return "";
        }
      }
      _getSpawnFileName() {
        if (IS_WINDOWS) {
          if (this._isCmdFile()) {
            return process.env["COMSPEC"] || "cmd.exe";
          }
        }
        return this.toolPath;
      }
      _getSpawnArgs(options) {
        if (IS_WINDOWS) {
          if (this._isCmdFile()) {
            let argline = `/D /S /C "${this._windowsQuoteCmdArg(this.toolPath)}`;
            for (const a of this.args) {
              argline += " ";
              argline += options.windowsVerbatimArguments ? a : this._windowsQuoteCmdArg(a);
            }
            argline += '"';
            return [argline];
          }
        }
        return this.args;
      }
      _endsWith(str, end) {
        return str.endsWith(end);
      }
      _isCmdFile() {
        const upperToolPath = this.toolPath.toUpperCase();
        return this._endsWith(upperToolPath, ".CMD") || this._endsWith(upperToolPath, ".BAT");
      }
      _windowsQuoteCmdArg(arg) {
        if (!this._isCmdFile()) {
          return this._uvQuoteCmdArg(arg);
        }
        if (!arg) {
          return '""';
        }
        const cmdSpecialChars = [
          " ",
          "	",
          "&",
          "(",
          ")",
          "[",
          "]",
          "{",
          "}",
          "^",
          "=",
          ";",
          "!",
          "'",
          "+",
          ",",
          "`",
          "~",
          "|",
          "<",
          ">",
          '"'
        ];
        let needsQuotes = false;
        for (const char of arg) {
          if (cmdSpecialChars.some((x) => x === char)) {
            needsQuotes = true;
            break;
          }
        }
        if (!needsQuotes) {
          return arg;
        }
        let reverse = '"';
        let quoteHit = true;
        for (let i = arg.length; i > 0; i--) {
          reverse += arg[i - 1];
          if (quoteHit && arg[i - 1] === "\\") {
            reverse += "\\";
          } else if (arg[i - 1] === '"') {
            quoteHit = true;
            reverse += '"';
          } else {
            quoteHit = false;
          }
        }
        reverse += '"';
        return reverse.split("").reverse().join("");
      }
      _uvQuoteCmdArg(arg) {
        if (!arg) {
          return '""';
        }
        if (!arg.includes(" ") && !arg.includes("	") && !arg.includes('"')) {
          return arg;
        }
        if (!arg.includes('"') && !arg.includes("\\")) {
          return `"${arg}"`;
        }
        let reverse = '"';
        let quoteHit = true;
        for (let i = arg.length; i > 0; i--) {
          reverse += arg[i - 1];
          if (quoteHit && arg[i - 1] === "\\") {
            reverse += "\\";
          } else if (arg[i - 1] === '"') {
            quoteHit = true;
            reverse += "\\";
          } else {
            quoteHit = false;
          }
        }
        reverse += '"';
        return reverse.split("").reverse().join("");
      }
      _cloneExecOptions(options) {
        options = options || {};
        const result = {
          cwd: options.cwd || process.cwd(),
          env: options.env || process.env,
          silent: options.silent || false,
          windowsVerbatimArguments: options.windowsVerbatimArguments || false,
          failOnStdErr: options.failOnStdErr || false,
          ignoreReturnCode: options.ignoreReturnCode || false,
          delay: options.delay || 1e4
        };
        result.outStream = options.outStream || process.stdout;
        result.errStream = options.errStream || process.stderr;
        return result;
      }
      _getSpawnOptions(options, toolPath) {
        options = options || {};
        const result = {};
        result.cwd = options.cwd;
        result.env = options.env;
        result["windowsVerbatimArguments"] = options.windowsVerbatimArguments || this._isCmdFile();
        if (options.windowsVerbatimArguments) {
          result.argv0 = `"${toolPath}"`;
        }
        return result;
      }
      exec() {
        return __awaiter(this, void 0, void 0, function* () {
          if (!ioUtil.isRooted(this.toolPath) && (this.toolPath.includes("/") || IS_WINDOWS && this.toolPath.includes("\\"))) {
            this.toolPath = path2.resolve(process.cwd(), this.options.cwd || process.cwd(), this.toolPath);
          }
          this.toolPath = yield io.which(this.toolPath, true);
          return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            this._debug(`exec tool: ${this.toolPath}`);
            this._debug("arguments:");
            for (const arg of this.args) {
              this._debug(`   ${arg}`);
            }
            const optionsNonNull = this._cloneExecOptions(this.options);
            if (!optionsNonNull.silent && optionsNonNull.outStream) {
              optionsNonNull.outStream.write(this._getCommandString(optionsNonNull) + os.EOL);
            }
            const state = new ExecState(optionsNonNull, this.toolPath);
            state.on("debug", (message) => {
              this._debug(message);
            });
            if (this.options.cwd && !(yield ioUtil.exists(this.options.cwd))) {
              return reject(new Error(`The cwd: ${this.options.cwd} does not exist!`));
            }
            const fileName = this._getSpawnFileName();
            const cp = child.spawn(fileName, this._getSpawnArgs(optionsNonNull), this._getSpawnOptions(this.options, fileName));
            let stdbuffer = "";
            if (cp.stdout) {
              cp.stdout.on("data", (data) => {
                if (this.options.listeners && this.options.listeners.stdout) {
                  this.options.listeners.stdout(data);
                }
                if (!optionsNonNull.silent && optionsNonNull.outStream) {
                  optionsNonNull.outStream.write(data);
                }
                stdbuffer = this._processLineBuffer(data, stdbuffer, (line) => {
                  if (this.options.listeners && this.options.listeners.stdline) {
                    this.options.listeners.stdline(line);
                  }
                });
              });
            }
            let errbuffer = "";
            if (cp.stderr) {
              cp.stderr.on("data", (data) => {
                state.processStderr = true;
                if (this.options.listeners && this.options.listeners.stderr) {
                  this.options.listeners.stderr(data);
                }
                if (!optionsNonNull.silent && optionsNonNull.errStream && optionsNonNull.outStream) {
                  const s = optionsNonNull.failOnStdErr ? optionsNonNull.errStream : optionsNonNull.outStream;
                  s.write(data);
                }
                errbuffer = this._processLineBuffer(data, errbuffer, (line) => {
                  if (this.options.listeners && this.options.listeners.errline) {
                    this.options.listeners.errline(line);
                  }
                });
              });
            }
            cp.on("error", (err) => {
              state.processError = err.message;
              state.processExited = true;
              state.processClosed = true;
              state.CheckComplete();
            });
            cp.on("exit", (code) => {
              state.processExitCode = code;
              state.processExited = true;
              this._debug(`Exit code ${code} received from tool '${this.toolPath}'`);
              state.CheckComplete();
            });
            cp.on("close", (code) => {
              state.processExitCode = code;
              state.processExited = true;
              state.processClosed = true;
              this._debug(`STDIO streams have closed for tool '${this.toolPath}'`);
              state.CheckComplete();
            });
            state.on("done", (error2, exitCode) => {
              if (stdbuffer.length > 0) {
                this.emit("stdline", stdbuffer);
              }
              if (errbuffer.length > 0) {
                this.emit("errline", errbuffer);
              }
              cp.removeAllListeners();
              if (error2) {
                reject(error2);
              } else {
                resolve(exitCode);
              }
            });
            if (this.options.input) {
              if (!cp.stdin) {
                throw new Error("child process missing stdin");
              }
              cp.stdin.end(this.options.input);
            }
          }));
        });
      }
    };
    exports2.ToolRunner = ToolRunner;
    function argStringToArray(argString) {
      const args = [];
      let inQuotes = false;
      let escaped = false;
      let arg = "";
      function append(c2) {
        if (escaped && c2 !== '"') {
          arg += "\\";
        }
        arg += c2;
        escaped = false;
      }
      for (let i = 0; i < argString.length; i++) {
        const c2 = argString.charAt(i);
        if (c2 === '"') {
          if (!escaped) {
            inQuotes = !inQuotes;
          } else {
            append(c2);
          }
          continue;
        }
        if (c2 === "\\" && escaped) {
          append(c2);
          continue;
        }
        if (c2 === "\\" && inQuotes) {
          escaped = true;
          continue;
        }
        if (c2 === " " && !inQuotes) {
          if (arg.length > 0) {
            args.push(arg);
            arg = "";
          }
          continue;
        }
        append(c2);
      }
      if (arg.length > 0) {
        args.push(arg.trim());
      }
      return args;
    }
    exports2.argStringToArray = argStringToArray;
    var ExecState = class extends events.EventEmitter {
      constructor(options, toolPath) {
        super();
        this.processClosed = false;
        this.processError = "";
        this.processExitCode = 0;
        this.processExited = false;
        this.processStderr = false;
        this.delay = 1e4;
        this.done = false;
        this.timeout = null;
        if (!toolPath) {
          throw new Error("toolPath must not be empty");
        }
        this.options = options;
        this.toolPath = toolPath;
        if (options.delay) {
          this.delay = options.delay;
        }
      }
      CheckComplete() {
        if (this.done) {
          return;
        }
        if (this.processClosed) {
          this._setResult();
        } else if (this.processExited) {
          this.timeout = timers_1.setTimeout(ExecState.HandleTimeout, this.delay, this);
        }
      }
      _debug(message) {
        this.emit("debug", message);
      }
      _setResult() {
        let error2;
        if (this.processExited) {
          if (this.processError) {
            error2 = new Error(`There was an error when attempting to execute the process '${this.toolPath}'. This may indicate the process failed to start. Error: ${this.processError}`);
          } else if (this.processExitCode !== 0 && !this.options.ignoreReturnCode) {
            error2 = new Error(`The process '${this.toolPath}' failed with exit code ${this.processExitCode}`);
          } else if (this.processStderr && this.options.failOnStdErr) {
            error2 = new Error(`The process '${this.toolPath}' failed because one or more lines were written to the STDERR stream`);
          }
        }
        if (this.timeout) {
          clearTimeout(this.timeout);
          this.timeout = null;
        }
        this.done = true;
        this.emit("done", error2, this.processExitCode);
      }
      static HandleTimeout(state) {
        if (state.done) {
          return;
        }
        if (!state.processClosed && state.processExited) {
          const message = `The STDIO streams did not close within ${state.delay / 1e3} seconds of the exit event from process '${state.toolPath}'. This may indicate a child process inherited the STDIO streams and has not yet exited.`;
          state._debug(message);
        }
        state._setResult();
      }
    };
  }
});

// node_modules/@actions/exec/lib/exec.js
var require_exec = __commonJS({
  "node_modules/@actions/exec/lib/exec.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getExecOutput = exports2.exec = void 0;
    var string_decoder_1 = require("string_decoder");
    var tr = __importStar(require_toolrunner());
    function exec2(commandLine, args, options) {
      return __awaiter(this, void 0, void 0, function* () {
        const commandArgs = tr.argStringToArray(commandLine);
        if (commandArgs.length === 0) {
          throw new Error(`Parameter 'commandLine' cannot be null or empty.`);
        }
        const toolPath = commandArgs[0];
        args = commandArgs.slice(1).concat(args || []);
        const runner = new tr.ToolRunner(toolPath, args, options);
        return runner.exec();
      });
    }
    exports2.exec = exec2;
    function getExecOutput(commandLine, args, options) {
      var _a, _b;
      return __awaiter(this, void 0, void 0, function* () {
        let stdout = "";
        let stderr = "";
        const stdoutDecoder = new string_decoder_1.StringDecoder("utf8");
        const stderrDecoder = new string_decoder_1.StringDecoder("utf8");
        const originalStdoutListener = (_a = options === null || options === void 0 ? void 0 : options.listeners) === null || _a === void 0 ? void 0 : _a.stdout;
        const originalStdErrListener = (_b = options === null || options === void 0 ? void 0 : options.listeners) === null || _b === void 0 ? void 0 : _b.stderr;
        const stdErrListener = (data) => {
          stderr += stderrDecoder.write(data);
          if (originalStdErrListener) {
            originalStdErrListener(data);
          }
        };
        const stdOutListener = (data) => {
          stdout += stdoutDecoder.write(data);
          if (originalStdoutListener) {
            originalStdoutListener(data);
          }
        };
        const listeners = Object.assign(Object.assign({}, options === null || options === void 0 ? void 0 : options.listeners), { stdout: stdOutListener, stderr: stdErrListener });
        const exitCode = yield exec2(commandLine, args, Object.assign(Object.assign({}, options), { listeners }));
        stdout += stdoutDecoder.end();
        stderr += stderrDecoder.end();
        return {
          exitCode,
          stdout,
          stderr
        };
      });
    }
    exports2.getExecOutput = getExecOutput;
  }
});

// src/lib/generate-size-report.js
__export(exports, {
  default: () => generate_size_report_default
});
var import_core3 = __toModule(require_core());

// src/report-templates/regression/index.js
var import_core = __toModule(require_core());
var import_byte_size = __toModule(require_dist());
var import_markdown_table = __toModule(require_markdown_table());
var import_outdent = __toModule(require_lib());

// src/lib/markdown.js
var c = (string) => `\`${string}\``;
var link = (text, href) => `[${text}](${href})`;
var sub = (string) => `<sub>${string}</sub>`;
var sup = (string) => `<sup>${string}</sup>`;
var strong = (string) => `**${string}**`;

// node_modules/lodash-es/_freeGlobal.js
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
var freeGlobal_default = freeGlobal;

// node_modules/lodash-es/_root.js
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal_default || freeSelf || Function("return this")();
var root_default = root;

// node_modules/lodash-es/_Symbol.js
var Symbol = root_default.Symbol;
var Symbol_default = Symbol;

// node_modules/lodash-es/_getRawTag.js
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
var nativeObjectToString = objectProto.toString;
var symToStringTag = Symbol_default ? Symbol_default.toStringTag : void 0;
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
  try {
    value[symToStringTag] = void 0;
    var unmasked = true;
  } catch (e) {
  }
  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}
var getRawTag_default = getRawTag;

// node_modules/lodash-es/_objectToString.js
var objectProto2 = Object.prototype;
var nativeObjectToString2 = objectProto2.toString;
function objectToString(value) {
  return nativeObjectToString2.call(value);
}
var objectToString_default = objectToString;

// node_modules/lodash-es/_baseGetTag.js
var nullTag = "[object Null]";
var undefinedTag = "[object Undefined]";
var symToStringTag2 = Symbol_default ? Symbol_default.toStringTag : void 0;
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag2 && symToStringTag2 in Object(value) ? getRawTag_default(value) : objectToString_default(value);
}
var baseGetTag_default = baseGetTag;

// node_modules/lodash-es/isObjectLike.js
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
var isObjectLike_default = isObjectLike;

// node_modules/lodash-es/isSymbol.js
var symbolTag = "[object Symbol]";
function isSymbol(value) {
  return typeof value == "symbol" || isObjectLike_default(value) && baseGetTag_default(value) == symbolTag;
}
var isSymbol_default = isSymbol;

// node_modules/lodash-es/_arrayMap.js
function arrayMap(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length, result = Array(length);
  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}
var arrayMap_default = arrayMap;

// node_modules/lodash-es/isArray.js
var isArray = Array.isArray;
var isArray_default = isArray;

// node_modules/lodash-es/_baseToString.js
var INFINITY = 1 / 0;
var symbolProto = Symbol_default ? Symbol_default.prototype : void 0;
var symbolToString = symbolProto ? symbolProto.toString : void 0;
function baseToString(value) {
  if (typeof value == "string") {
    return value;
  }
  if (isArray_default(value)) {
    return arrayMap_default(value, baseToString) + "";
  }
  if (isSymbol_default(value)) {
    return symbolToString ? symbolToString.call(value) : "";
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY ? "-0" : result;
}
var baseToString_default = baseToString;

// node_modules/lodash-es/_trimmedEndIndex.js
var reWhitespace = /\s/;
function trimmedEndIndex(string) {
  var index = string.length;
  while (index-- && reWhitespace.test(string.charAt(index))) {
  }
  return index;
}
var trimmedEndIndex_default = trimmedEndIndex;

// node_modules/lodash-es/_baseTrim.js
var reTrimStart = /^\s+/;
function baseTrim(string) {
  return string ? string.slice(0, trimmedEndIndex_default(string) + 1).replace(reTrimStart, "") : string;
}
var baseTrim_default = baseTrim;

// node_modules/lodash-es/isObject.js
function isObject(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var isObject_default = isObject;

// node_modules/lodash-es/toNumber.js
var NAN = 0 / 0;
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
var reIsBinary = /^0b[01]+$/i;
var reIsOctal = /^0o[0-7]+$/i;
var freeParseInt = parseInt;
function toNumber(value) {
  if (typeof value == "number") {
    return value;
  }
  if (isSymbol_default(value)) {
    return NAN;
  }
  if (isObject_default(value)) {
    var other = typeof value.valueOf == "function" ? value.valueOf() : value;
    value = isObject_default(other) ? other + "" : other;
  }
  if (typeof value != "string") {
    return value === 0 ? value : +value;
  }
  value = baseTrim_default(value);
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
var toNumber_default = toNumber;

// node_modules/lodash-es/toFinite.js
var INFINITY2 = 1 / 0;
var MAX_INTEGER = 17976931348623157e292;
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber_default(value);
  if (value === INFINITY2 || value === -INFINITY2) {
    var sign = value < 0 ? -1 : 1;
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}
var toFinite_default = toFinite;

// node_modules/lodash-es/toInteger.js
function toInteger(value) {
  var result = toFinite_default(value), remainder = result % 1;
  return result === result ? remainder ? result - remainder : result : 0;
}
var toInteger_default = toInteger;

// node_modules/lodash-es/identity.js
function identity(value) {
  return value;
}
var identity_default = identity;

// node_modules/lodash-es/isFunction.js
var asyncTag = "[object AsyncFunction]";
var funcTag = "[object Function]";
var genTag = "[object GeneratorFunction]";
var proxyTag = "[object Proxy]";
function isFunction(value) {
  if (!isObject_default(value)) {
    return false;
  }
  var tag = baseGetTag_default(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}
var isFunction_default = isFunction;

// node_modules/lodash-es/_coreJsData.js
var coreJsData = root_default["__core-js_shared__"];
var coreJsData_default = coreJsData;

// node_modules/lodash-es/_isMasked.js
var maskSrcKey = function() {
  var uid = /[^.]+$/.exec(coreJsData_default && coreJsData_default.keys && coreJsData_default.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var isMasked_default = isMasked;

// node_modules/lodash-es/_toSource.js
var funcProto = Function.prototype;
var funcToString = funcProto.toString;
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {
    }
    try {
      return func + "";
    } catch (e) {
    }
  }
  return "";
}
var toSource_default = toSource;

// node_modules/lodash-es/_baseIsNative.js
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto2 = Function.prototype;
var objectProto3 = Object.prototype;
var funcToString2 = funcProto2.toString;
var hasOwnProperty2 = objectProto3.hasOwnProperty;
var reIsNative = RegExp("^" + funcToString2.call(hasOwnProperty2).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
function baseIsNative(value) {
  if (!isObject_default(value) || isMasked_default(value)) {
    return false;
  }
  var pattern = isFunction_default(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource_default(value));
}
var baseIsNative_default = baseIsNative;

// node_modules/lodash-es/_getValue.js
function getValue(object, key) {
  return object == null ? void 0 : object[key];
}
var getValue_default = getValue;

// node_modules/lodash-es/_getNative.js
function getNative(object, key) {
  var value = getValue_default(object, key);
  return baseIsNative_default(value) ? value : void 0;
}
var getNative_default = getNative;

// node_modules/lodash-es/_WeakMap.js
var WeakMap2 = getNative_default(root_default, "WeakMap");
var WeakMap_default = WeakMap2;

// node_modules/lodash-es/_isIndex.js
var MAX_SAFE_INTEGER = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
var isIndex_default = isIndex;

// node_modules/lodash-es/eq.js
function eq(value, other) {
  return value === other || value !== value && other !== other;
}
var eq_default = eq;

// node_modules/lodash-es/isLength.js
var MAX_SAFE_INTEGER2 = 9007199254740991;
function isLength(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER2;
}
var isLength_default = isLength;

// node_modules/lodash-es/isArrayLike.js
function isArrayLike(value) {
  return value != null && isLength_default(value.length) && !isFunction_default(value);
}
var isArrayLike_default = isArrayLike;

// node_modules/lodash-es/_isPrototype.js
var objectProto4 = Object.prototype;
function isPrototype(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto4;
  return value === proto;
}
var isPrototype_default = isPrototype;

// node_modules/lodash-es/_baseTimes.js
function baseTimes(n, iteratee) {
  var index = -1, result = Array(n);
  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}
var baseTimes_default = baseTimes;

// node_modules/lodash-es/_baseIsArguments.js
var argsTag = "[object Arguments]";
function baseIsArguments(value) {
  return isObjectLike_default(value) && baseGetTag_default(value) == argsTag;
}
var baseIsArguments_default = baseIsArguments;

// node_modules/lodash-es/isArguments.js
var objectProto5 = Object.prototype;
var hasOwnProperty3 = objectProto5.hasOwnProperty;
var propertyIsEnumerable = objectProto5.propertyIsEnumerable;
var isArguments = baseIsArguments_default(function() {
  return arguments;
}()) ? baseIsArguments_default : function(value) {
  return isObjectLike_default(value) && hasOwnProperty3.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
};
var isArguments_default = isArguments;

// node_modules/lodash-es/stubFalse.js
function stubFalse() {
  return false;
}
var stubFalse_default = stubFalse;

// node_modules/lodash-es/isBuffer.js
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var Buffer2 = moduleExports ? root_default.Buffer : void 0;
var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
var isBuffer = nativeIsBuffer || stubFalse_default;
var isBuffer_default = isBuffer;

// node_modules/lodash-es/_baseIsTypedArray.js
var argsTag2 = "[object Arguments]";
var arrayTag = "[object Array]";
var boolTag = "[object Boolean]";
var dateTag = "[object Date]";
var errorTag = "[object Error]";
var funcTag2 = "[object Function]";
var mapTag = "[object Map]";
var numberTag = "[object Number]";
var objectTag = "[object Object]";
var regexpTag = "[object RegExp]";
var setTag = "[object Set]";
var stringTag = "[object String]";
var weakMapTag = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]";
var dataViewTag = "[object DataView]";
var float32Tag = "[object Float32Array]";
var float64Tag = "[object Float64Array]";
var int8Tag = "[object Int8Array]";
var int16Tag = "[object Int16Array]";
var int32Tag = "[object Int32Array]";
var uint8Tag = "[object Uint8Array]";
var uint8ClampedTag = "[object Uint8ClampedArray]";
var uint16Tag = "[object Uint16Array]";
var uint32Tag = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag2] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag2] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
function baseIsTypedArray(value) {
  return isObjectLike_default(value) && isLength_default(value.length) && !!typedArrayTags[baseGetTag_default(value)];
}
var baseIsTypedArray_default = baseIsTypedArray;

// node_modules/lodash-es/_baseUnary.js
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}
var baseUnary_default = baseUnary;

// node_modules/lodash-es/_nodeUtil.js
var freeExports2 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule2 = freeExports2 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports2 = freeModule2 && freeModule2.exports === freeExports2;
var freeProcess = moduleExports2 && freeGlobal_default.process;
var nodeUtil = function() {
  try {
    var types = freeModule2 && freeModule2.require && freeModule2.require("util").types;
    if (types) {
      return types;
    }
    return freeProcess && freeProcess.binding && freeProcess.binding("util");
  } catch (e) {
  }
}();
var nodeUtil_default = nodeUtil;

// node_modules/lodash-es/isTypedArray.js
var nodeIsTypedArray = nodeUtil_default && nodeUtil_default.isTypedArray;
var isTypedArray = nodeIsTypedArray ? baseUnary_default(nodeIsTypedArray) : baseIsTypedArray_default;
var isTypedArray_default = isTypedArray;

// node_modules/lodash-es/_arrayLikeKeys.js
var objectProto6 = Object.prototype;
var hasOwnProperty4 = objectProto6.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
  var isArr = isArray_default(value), isArg = !isArr && isArguments_default(value), isBuff = !isArr && !isArg && isBuffer_default(value), isType = !isArr && !isArg && !isBuff && isTypedArray_default(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes_default(value.length, String) : [], length = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty4.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex_default(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
var arrayLikeKeys_default = arrayLikeKeys;

// node_modules/lodash-es/_overArg.js
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var overArg_default = overArg;

// node_modules/lodash-es/_nativeKeys.js
var nativeKeys = overArg_default(Object.keys, Object);
var nativeKeys_default = nativeKeys;

// node_modules/lodash-es/_baseKeys.js
var objectProto7 = Object.prototype;
var hasOwnProperty5 = objectProto7.hasOwnProperty;
function baseKeys(object) {
  if (!isPrototype_default(object)) {
    return nativeKeys_default(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty5.call(object, key) && key != "constructor") {
      result.push(key);
    }
  }
  return result;
}
var baseKeys_default = baseKeys;

// node_modules/lodash-es/keys.js
function keys(object) {
  return isArrayLike_default(object) ? arrayLikeKeys_default(object) : baseKeys_default(object);
}
var keys_default = keys;

// node_modules/lodash-es/_isKey.js
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
var reIsPlainProp = /^\w*$/;
function isKey(value, object) {
  if (isArray_default(value)) {
    return false;
  }
  var type = typeof value;
  if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol_default(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}
var isKey_default = isKey;

// node_modules/lodash-es/_nativeCreate.js
var nativeCreate = getNative_default(Object, "create");
var nativeCreate_default = nativeCreate;

// node_modules/lodash-es/_hashClear.js
function hashClear() {
  this.__data__ = nativeCreate_default ? nativeCreate_default(null) : {};
  this.size = 0;
}
var hashClear_default = hashClear;

// node_modules/lodash-es/_hashDelete.js
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var hashDelete_default = hashDelete;

// node_modules/lodash-es/_hashGet.js
var HASH_UNDEFINED = "__lodash_hash_undefined__";
var objectProto8 = Object.prototype;
var hasOwnProperty6 = objectProto8.hasOwnProperty;
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate_default) {
    var result = data[key];
    return result === HASH_UNDEFINED ? void 0 : result;
  }
  return hasOwnProperty6.call(data, key) ? data[key] : void 0;
}
var hashGet_default = hashGet;

// node_modules/lodash-es/_hashHas.js
var objectProto9 = Object.prototype;
var hasOwnProperty7 = objectProto9.hasOwnProperty;
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate_default ? data[key] !== void 0 : hasOwnProperty7.call(data, key);
}
var hashHas_default = hashHas;

// node_modules/lodash-es/_hashSet.js
var HASH_UNDEFINED2 = "__lodash_hash_undefined__";
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate_default && value === void 0 ? HASH_UNDEFINED2 : value;
  return this;
}
var hashSet_default = hashSet;

// node_modules/lodash-es/_Hash.js
function Hash(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
Hash.prototype.clear = hashClear_default;
Hash.prototype["delete"] = hashDelete_default;
Hash.prototype.get = hashGet_default;
Hash.prototype.has = hashHas_default;
Hash.prototype.set = hashSet_default;
var Hash_default = Hash;

// node_modules/lodash-es/_listCacheClear.js
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}
var listCacheClear_default = listCacheClear;

// node_modules/lodash-es/_assocIndexOf.js
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq_default(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var assocIndexOf_default = assocIndexOf;

// node_modules/lodash-es/_listCacheDelete.js
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete(key) {
  var data = this.__data__, index = assocIndexOf_default(data, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}
var listCacheDelete_default = listCacheDelete;

// node_modules/lodash-es/_listCacheGet.js
function listCacheGet(key) {
  var data = this.__data__, index = assocIndexOf_default(data, key);
  return index < 0 ? void 0 : data[index][1];
}
var listCacheGet_default = listCacheGet;

// node_modules/lodash-es/_listCacheHas.js
function listCacheHas(key) {
  return assocIndexOf_default(this.__data__, key) > -1;
}
var listCacheHas_default = listCacheHas;

// node_modules/lodash-es/_listCacheSet.js
function listCacheSet(key, value) {
  var data = this.__data__, index = assocIndexOf_default(data, key);
  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}
var listCacheSet_default = listCacheSet;

// node_modules/lodash-es/_ListCache.js
function ListCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
ListCache.prototype.clear = listCacheClear_default;
ListCache.prototype["delete"] = listCacheDelete_default;
ListCache.prototype.get = listCacheGet_default;
ListCache.prototype.has = listCacheHas_default;
ListCache.prototype.set = listCacheSet_default;
var ListCache_default = ListCache;

// node_modules/lodash-es/_Map.js
var Map = getNative_default(root_default, "Map");
var Map_default = Map;

// node_modules/lodash-es/_mapCacheClear.js
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash_default(),
    "map": new (Map_default || ListCache_default)(),
    "string": new Hash_default()
  };
}
var mapCacheClear_default = mapCacheClear;

// node_modules/lodash-es/_isKeyable.js
function isKeyable(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
var isKeyable_default = isKeyable;

// node_modules/lodash-es/_getMapData.js
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable_default(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
var getMapData_default = getMapData;

// node_modules/lodash-es/_mapCacheDelete.js
function mapCacheDelete(key) {
  var result = getMapData_default(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
var mapCacheDelete_default = mapCacheDelete;

// node_modules/lodash-es/_mapCacheGet.js
function mapCacheGet(key) {
  return getMapData_default(this, key).get(key);
}
var mapCacheGet_default = mapCacheGet;

// node_modules/lodash-es/_mapCacheHas.js
function mapCacheHas(key) {
  return getMapData_default(this, key).has(key);
}
var mapCacheHas_default = mapCacheHas;

// node_modules/lodash-es/_mapCacheSet.js
function mapCacheSet(key, value) {
  var data = getMapData_default(this, key), size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
var mapCacheSet_default = mapCacheSet;

// node_modules/lodash-es/_MapCache.js
function MapCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
MapCache.prototype.clear = mapCacheClear_default;
MapCache.prototype["delete"] = mapCacheDelete_default;
MapCache.prototype.get = mapCacheGet_default;
MapCache.prototype.has = mapCacheHas_default;
MapCache.prototype.set = mapCacheSet_default;
var MapCache_default = MapCache;

// node_modules/lodash-es/memoize.js
var FUNC_ERROR_TEXT = "Expected a function";
function memoize(func, resolver) {
  if (typeof func != "function" || resolver != null && typeof resolver != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache_default)();
  return memoized;
}
memoize.Cache = MapCache_default;
var memoize_default = memoize;

// node_modules/lodash-es/_memoizeCapped.js
var MAX_MEMOIZE_SIZE = 500;
function memoizeCapped(func) {
  var result = memoize_default(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });
  var cache = result.cache;
  return result;
}
var memoizeCapped_default = memoizeCapped;

// node_modules/lodash-es/_stringToPath.js
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var reEscapeChar = /\\(\\)?/g;
var stringToPath = memoizeCapped_default(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46) {
    result.push("");
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
  });
  return result;
});
var stringToPath_default = stringToPath;

// node_modules/lodash-es/toString.js
function toString(value) {
  return value == null ? "" : baseToString_default(value);
}
var toString_default = toString;

// node_modules/lodash-es/_castPath.js
function castPath(value, object) {
  if (isArray_default(value)) {
    return value;
  }
  return isKey_default(value, object) ? [value] : stringToPath_default(toString_default(value));
}
var castPath_default = castPath;

// node_modules/lodash-es/_toKey.js
var INFINITY3 = 1 / 0;
function toKey(value) {
  if (typeof value == "string" || isSymbol_default(value)) {
    return value;
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY3 ? "-0" : result;
}
var toKey_default = toKey;

// node_modules/lodash-es/_baseGet.js
function baseGet(object, path2) {
  path2 = castPath_default(path2, object);
  var index = 0, length = path2.length;
  while (object != null && index < length) {
    object = object[toKey_default(path2[index++])];
  }
  return index && index == length ? object : void 0;
}
var baseGet_default = baseGet;

// node_modules/lodash-es/get.js
function get(object, path2, defaultValue) {
  var result = object == null ? void 0 : baseGet_default(object, path2);
  return result === void 0 ? defaultValue : result;
}
var get_default = get;

// node_modules/lodash-es/_arrayPush.js
function arrayPush(array, values) {
  var index = -1, length = values.length, offset = array.length;
  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}
var arrayPush_default = arrayPush;

// node_modules/lodash-es/_createRound.js
var nativeIsFinite = root_default.isFinite;
var nativeMin = Math.min;
function createRound(methodName) {
  var func = Math[methodName];
  return function(number, precision) {
    number = toNumber_default(number);
    precision = precision == null ? 0 : nativeMin(toInteger_default(precision), 292);
    if (precision && nativeIsFinite(number)) {
      var pair = (toString_default(number) + "e").split("e"), value = func(pair[0] + "e" + (+pair[1] + precision));
      pair = (toString_default(value) + "e").split("e");
      return +(pair[0] + "e" + (+pair[1] - precision));
    }
    return func(number);
  };
}
var createRound_default = createRound;

// node_modules/lodash-es/_stackClear.js
function stackClear() {
  this.__data__ = new ListCache_default();
  this.size = 0;
}
var stackClear_default = stackClear;

// node_modules/lodash-es/_stackDelete.js
function stackDelete(key) {
  var data = this.__data__, result = data["delete"](key);
  this.size = data.size;
  return result;
}
var stackDelete_default = stackDelete;

// node_modules/lodash-es/_stackGet.js
function stackGet(key) {
  return this.__data__.get(key);
}
var stackGet_default = stackGet;

// node_modules/lodash-es/_stackHas.js
function stackHas(key) {
  return this.__data__.has(key);
}
var stackHas_default = stackHas;

// node_modules/lodash-es/_stackSet.js
var LARGE_ARRAY_SIZE = 200;
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache_default) {
    var pairs = data.__data__;
    if (!Map_default || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache_default(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
var stackSet_default = stackSet;

// node_modules/lodash-es/_Stack.js
function Stack(entries) {
  var data = this.__data__ = new ListCache_default(entries);
  this.size = data.size;
}
Stack.prototype.clear = stackClear_default;
Stack.prototype["delete"] = stackDelete_default;
Stack.prototype.get = stackGet_default;
Stack.prototype.has = stackHas_default;
Stack.prototype.set = stackSet_default;
var Stack_default = Stack;

// node_modules/lodash-es/_arrayFilter.js
function arrayFilter(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}
var arrayFilter_default = arrayFilter;

// node_modules/lodash-es/stubArray.js
function stubArray() {
  return [];
}
var stubArray_default = stubArray;

// node_modules/lodash-es/_getSymbols.js
var objectProto10 = Object.prototype;
var propertyIsEnumerable2 = objectProto10.propertyIsEnumerable;
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbols = !nativeGetSymbols ? stubArray_default : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter_default(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable2.call(object, symbol);
  });
};
var getSymbols_default = getSymbols;

// node_modules/lodash-es/_baseGetAllKeys.js
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray_default(object) ? result : arrayPush_default(result, symbolsFunc(object));
}
var baseGetAllKeys_default = baseGetAllKeys;

// node_modules/lodash-es/_getAllKeys.js
function getAllKeys(object) {
  return baseGetAllKeys_default(object, keys_default, getSymbols_default);
}
var getAllKeys_default = getAllKeys;

// node_modules/lodash-es/_DataView.js
var DataView = getNative_default(root_default, "DataView");
var DataView_default = DataView;

// node_modules/lodash-es/_Promise.js
var Promise2 = getNative_default(root_default, "Promise");
var Promise_default = Promise2;

// node_modules/lodash-es/_Set.js
var Set = getNative_default(root_default, "Set");
var Set_default = Set;

// node_modules/lodash-es/_getTag.js
var mapTag2 = "[object Map]";
var objectTag2 = "[object Object]";
var promiseTag = "[object Promise]";
var setTag2 = "[object Set]";
var weakMapTag2 = "[object WeakMap]";
var dataViewTag2 = "[object DataView]";
var dataViewCtorString = toSource_default(DataView_default);
var mapCtorString = toSource_default(Map_default);
var promiseCtorString = toSource_default(Promise_default);
var setCtorString = toSource_default(Set_default);
var weakMapCtorString = toSource_default(WeakMap_default);
var getTag = baseGetTag_default;
if (DataView_default && getTag(new DataView_default(new ArrayBuffer(1))) != dataViewTag2 || Map_default && getTag(new Map_default()) != mapTag2 || Promise_default && getTag(Promise_default.resolve()) != promiseTag || Set_default && getTag(new Set_default()) != setTag2 || WeakMap_default && getTag(new WeakMap_default()) != weakMapTag2) {
  getTag = function(value) {
    var result = baseGetTag_default(value), Ctor = result == objectTag2 ? value.constructor : void 0, ctorString = Ctor ? toSource_default(Ctor) : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag2;
        case mapCtorString:
          return mapTag2;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag2;
        case weakMapCtorString:
          return weakMapTag2;
      }
    }
    return result;
  };
}
var getTag_default = getTag;

// node_modules/lodash-es/_Uint8Array.js
var Uint8Array2 = root_default.Uint8Array;
var Uint8Array_default = Uint8Array2;

// node_modules/lodash-es/_setCacheAdd.js
var HASH_UNDEFINED3 = "__lodash_hash_undefined__";
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED3);
  return this;
}
var setCacheAdd_default = setCacheAdd;

// node_modules/lodash-es/_setCacheHas.js
function setCacheHas(value) {
  return this.__data__.has(value);
}
var setCacheHas_default = setCacheHas;

// node_modules/lodash-es/_SetCache.js
function SetCache(values) {
  var index = -1, length = values == null ? 0 : values.length;
  this.__data__ = new MapCache_default();
  while (++index < length) {
    this.add(values[index]);
  }
}
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd_default;
SetCache.prototype.has = setCacheHas_default;
var SetCache_default = SetCache;

// node_modules/lodash-es/_arraySome.js
function arraySome(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}
var arraySome_default = arraySome;

// node_modules/lodash-es/_cacheHas.js
function cacheHas(cache, key) {
  return cache.has(key);
}
var cacheHas_default = cacheHas;

// node_modules/lodash-es/_equalArrays.js
var COMPARE_PARTIAL_FLAG = 1;
var COMPARE_UNORDERED_FLAG = 2;
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }
  var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache_default() : void 0;
  stack.set(array, other);
  stack.set(other, array);
  while (++index < arrLength) {
    var arrValue = array[index], othValue = other[index];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== void 0) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    if (seen) {
      if (!arraySome_default(other, function(othValue2, othIndex) {
        if (!cacheHas_default(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
          return seen.push(othIndex);
        }
      })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
      result = false;
      break;
    }
  }
  stack["delete"](array);
  stack["delete"](other);
  return result;
}
var equalArrays_default = equalArrays;

// node_modules/lodash-es/_mapToArray.js
function mapToArray(map) {
  var index = -1, result = Array(map.size);
  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}
var mapToArray_default = mapToArray;

// node_modules/lodash-es/_setToArray.js
function setToArray(set) {
  var index = -1, result = Array(set.size);
  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}
var setToArray_default = setToArray;

// node_modules/lodash-es/_equalByTag.js
var COMPARE_PARTIAL_FLAG2 = 1;
var COMPARE_UNORDERED_FLAG2 = 2;
var boolTag2 = "[object Boolean]";
var dateTag2 = "[object Date]";
var errorTag2 = "[object Error]";
var mapTag3 = "[object Map]";
var numberTag2 = "[object Number]";
var regexpTag2 = "[object RegExp]";
var setTag3 = "[object Set]";
var stringTag2 = "[object String]";
var symbolTag2 = "[object Symbol]";
var arrayBufferTag2 = "[object ArrayBuffer]";
var dataViewTag3 = "[object DataView]";
var symbolProto2 = Symbol_default ? Symbol_default.prototype : void 0;
var symbolValueOf = symbolProto2 ? symbolProto2.valueOf : void 0;
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag3:
      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;
    case arrayBufferTag2:
      if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array_default(object), new Uint8Array_default(other))) {
        return false;
      }
      return true;
    case boolTag2:
    case dateTag2:
    case numberTag2:
      return eq_default(+object, +other);
    case errorTag2:
      return object.name == other.name && object.message == other.message;
    case regexpTag2:
    case stringTag2:
      return object == other + "";
    case mapTag3:
      var convert = mapToArray_default;
    case setTag3:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG2;
      convert || (convert = setToArray_default);
      if (object.size != other.size && !isPartial) {
        return false;
      }
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG2;
      stack.set(object, other);
      var result = equalArrays_default(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack["delete"](object);
      return result;
    case symbolTag2:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}
var equalByTag_default = equalByTag;

// node_modules/lodash-es/_equalObjects.js
var COMPARE_PARTIAL_FLAG3 = 1;
var objectProto11 = Object.prototype;
var hasOwnProperty8 = objectProto11.hasOwnProperty;
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG3, objProps = getAllKeys_default(object), objLength = objProps.length, othProps = getAllKeys_default(other), othLength = othProps.length;
  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty8.call(other, key))) {
      return false;
    }
  }
  var objStacked = stack.get(object);
  var othStacked = stack.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);
  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key], othValue = other[key];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
    }
    if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == "constructor");
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor, othCtor = other.constructor;
    if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack["delete"](object);
  stack["delete"](other);
  return result;
}
var equalObjects_default = equalObjects;

// node_modules/lodash-es/_baseIsEqualDeep.js
var COMPARE_PARTIAL_FLAG4 = 1;
var argsTag3 = "[object Arguments]";
var arrayTag2 = "[object Array]";
var objectTag3 = "[object Object]";
var objectProto12 = Object.prototype;
var hasOwnProperty9 = objectProto12.hasOwnProperty;
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray_default(object), othIsArr = isArray_default(other), objTag = objIsArr ? arrayTag2 : getTag_default(object), othTag = othIsArr ? arrayTag2 : getTag_default(other);
  objTag = objTag == argsTag3 ? objectTag3 : objTag;
  othTag = othTag == argsTag3 ? objectTag3 : othTag;
  var objIsObj = objTag == objectTag3, othIsObj = othTag == objectTag3, isSameTag = objTag == othTag;
  if (isSameTag && isBuffer_default(object)) {
    if (!isBuffer_default(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack_default());
    return objIsArr || isTypedArray_default(object) ? equalArrays_default(object, other, bitmask, customizer, equalFunc, stack) : equalByTag_default(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG4)) {
    var objIsWrapped = objIsObj && hasOwnProperty9.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty9.call(other, "__wrapped__");
    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
      stack || (stack = new Stack_default());
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack_default());
  return equalObjects_default(object, other, bitmask, customizer, equalFunc, stack);
}
var baseIsEqualDeep_default = baseIsEqualDeep;

// node_modules/lodash-es/_baseIsEqual.js
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || !isObjectLike_default(value) && !isObjectLike_default(other)) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep_default(value, other, bitmask, customizer, baseIsEqual, stack);
}
var baseIsEqual_default = baseIsEqual;

// node_modules/lodash-es/_baseIsMatch.js
var COMPARE_PARTIAL_FLAG5 = 1;
var COMPARE_UNORDERED_FLAG3 = 2;
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length, length = index, noCustomizer = !customizer;
  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0], objValue = object[key], srcValue = data[1];
    if (noCustomizer && data[2]) {
      if (objValue === void 0 && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack_default();
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === void 0 ? baseIsEqual_default(srcValue, objValue, COMPARE_PARTIAL_FLAG5 | COMPARE_UNORDERED_FLAG3, customizer, stack) : result)) {
        return false;
      }
    }
  }
  return true;
}
var baseIsMatch_default = baseIsMatch;

// node_modules/lodash-es/_isStrictComparable.js
function isStrictComparable(value) {
  return value === value && !isObject_default(value);
}
var isStrictComparable_default = isStrictComparable;

// node_modules/lodash-es/_getMatchData.js
function getMatchData(object) {
  var result = keys_default(object), length = result.length;
  while (length--) {
    var key = result[length], value = object[key];
    result[length] = [key, value, isStrictComparable_default(value)];
  }
  return result;
}
var getMatchData_default = getMatchData;

// node_modules/lodash-es/_matchesStrictComparable.js
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
  };
}
var matchesStrictComparable_default = matchesStrictComparable;

// node_modules/lodash-es/_baseMatches.js
function baseMatches(source) {
  var matchData = getMatchData_default(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable_default(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch_default(object, source, matchData);
  };
}
var baseMatches_default = baseMatches;

// node_modules/lodash-es/_baseHasIn.js
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}
var baseHasIn_default = baseHasIn;

// node_modules/lodash-es/_hasPath.js
function hasPath(object, path2, hasFunc) {
  path2 = castPath_default(path2, object);
  var index = -1, length = path2.length, result = false;
  while (++index < length) {
    var key = toKey_default(path2[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength_default(length) && isIndex_default(key, length) && (isArray_default(object) || isArguments_default(object));
}
var hasPath_default = hasPath;

// node_modules/lodash-es/hasIn.js
function hasIn(object, path2) {
  return object != null && hasPath_default(object, path2, baseHasIn_default);
}
var hasIn_default = hasIn;

// node_modules/lodash-es/_baseMatchesProperty.js
var COMPARE_PARTIAL_FLAG6 = 1;
var COMPARE_UNORDERED_FLAG4 = 2;
function baseMatchesProperty(path2, srcValue) {
  if (isKey_default(path2) && isStrictComparable_default(srcValue)) {
    return matchesStrictComparable_default(toKey_default(path2), srcValue);
  }
  return function(object) {
    var objValue = get_default(object, path2);
    return objValue === void 0 && objValue === srcValue ? hasIn_default(object, path2) : baseIsEqual_default(srcValue, objValue, COMPARE_PARTIAL_FLAG6 | COMPARE_UNORDERED_FLAG4);
  };
}
var baseMatchesProperty_default = baseMatchesProperty;

// node_modules/lodash-es/_baseProperty.js
function baseProperty(key) {
  return function(object) {
    return object == null ? void 0 : object[key];
  };
}
var baseProperty_default = baseProperty;

// node_modules/lodash-es/_basePropertyDeep.js
function basePropertyDeep(path2) {
  return function(object) {
    return baseGet_default(object, path2);
  };
}
var basePropertyDeep_default = basePropertyDeep;

// node_modules/lodash-es/property.js
function property(path2) {
  return isKey_default(path2) ? baseProperty_default(toKey_default(path2)) : basePropertyDeep_default(path2);
}
var property_default = property;

// node_modules/lodash-es/_baseIteratee.js
function baseIteratee(value) {
  if (typeof value == "function") {
    return value;
  }
  if (value == null) {
    return identity_default;
  }
  if (typeof value == "object") {
    return isArray_default(value) ? baseMatchesProperty_default(value[0], value[1]) : baseMatches_default(value);
  }
  return property_default(value);
}
var baseIteratee_default = baseIteratee;

// node_modules/lodash-es/_arrayAggregator.js
function arrayAggregator(array, setter, iteratee, accumulator) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    var value = array[index];
    setter(accumulator, value, iteratee(value), array);
  }
  return accumulator;
}
var arrayAggregator_default = arrayAggregator;

// node_modules/lodash-es/_createBaseFor.js
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}
var createBaseFor_default = createBaseFor;

// node_modules/lodash-es/_baseFor.js
var baseFor = createBaseFor_default();
var baseFor_default = baseFor;

// node_modules/lodash-es/_baseForOwn.js
function baseForOwn(object, iteratee) {
  return object && baseFor_default(object, iteratee, keys_default);
}
var baseForOwn_default = baseForOwn;

// node_modules/lodash-es/_createBaseEach.js
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike_default(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length, index = fromRight ? length : -1, iterable = Object(collection);
    while (fromRight ? index-- : ++index < length) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}
var createBaseEach_default = createBaseEach;

// node_modules/lodash-es/_baseEach.js
var baseEach = createBaseEach_default(baseForOwn_default);
var baseEach_default = baseEach;

// node_modules/lodash-es/_baseAggregator.js
function baseAggregator(collection, setter, iteratee, accumulator) {
  baseEach_default(collection, function(value, key, collection2) {
    setter(accumulator, value, iteratee(value), collection2);
  });
  return accumulator;
}
var baseAggregator_default = baseAggregator;

// node_modules/lodash-es/_createAggregator.js
function createAggregator(setter, initializer) {
  return function(collection, iteratee) {
    var func = isArray_default(collection) ? arrayAggregator_default : baseAggregator_default, accumulator = initializer ? initializer() : {};
    return func(collection, setter, baseIteratee_default(iteratee, 2), accumulator);
  };
}
var createAggregator_default = createAggregator;

// node_modules/lodash-es/partition.js
var partition = createAggregator_default(function(result, value, key) {
  result[key ? 0 : 1].push(value);
}, function() {
  return [[], []];
});
var partition_default = partition;

// node_modules/lodash-es/round.js
var round = createRound_default("round");
var round_default = round;

// src/report-templates/utils.js
var import_glob_to_regexp = __toModule(require_glob_to_regexp());
function partionHidden(hideFilesGlob, files) {
  if (!hideFilesGlob) {
    return [[], files];
  }
  const hideFilesPtrn = (0, import_glob_to_regexp.default)(hideFilesGlob, { extended: true });
  return partition_default(files, (file) => hideFilesPtrn.test(file.path));
}
function getSizeLabels(displaySizes) {
  if (displaySizes.length === 1 && displaySizes[0].property === "size") {
    return "";
  }
  return ` (${displaySizes.map((s) => s.label).join(" / ")})`;
}
var supportedSizes = {
  uncompressed: {
    label: "Size",
    property: "size"
  },
  gzip: {
    label: "Gzip",
    property: "sizeGzip"
  },
  brotli: {
    label: "Brotli",
    property: "sizeBrotli"
  }
};
function parseDisplaySize(displaySize) {
  return displaySize.split(",").map((s) => s.trim()).filter((s) => supportedSizes.hasOwnProperty(s)).map((s) => supportedSizes[s]);
}
var listSizes = (displaySizes, callback) => displaySizes.map(({ property: property2 }) => callback(property2)).join(" / ");
function sortFiles(files, sortBy, sortOrder) {
  files.sort((a, b) => b[sortBy] - a[sortBy] || a.path.localeCompare(b.path));
  if (sortOrder === "asc") {
    files.reverse();
  }
}

// src/report-templates/regression/compare-packages.js
var percent = (fraction) => {
  if (fraction < 1e-3) {
    fraction = round_default(fraction, 4);
  } else if (fraction < 0.01) {
    fraction = round_default(fraction, 3);
  } else {
    fraction = round_default(fraction, 2);
  }
  return fraction.toLocaleString(void 0, {
    style: "percent",
    maximumSignificantDigits: 3
  });
};
function calculateDiffBy(head, base, property2) {
  const delta = head[property2] - base[property2];
  return {
    delta,
    percent: percent(delta / base[property2])
  };
}
function calculateDiff(head, base) {
  return {
    size: calculateDiffBy(head, base, "size"),
    sizeGzip: calculateDiffBy(head, base, "sizeGzip"),
    sizeBrotli: calculateDiffBy(head, base, "sizeBrotli")
  };
}
function processPkgFiles(fileMap, type, pkgData) {
  for (const file of pkgData.files) {
    if (!fileMap[file.path]) {
      fileMap[file.path] = {
        path: file.path,
        label: file.label
      };
    }
    const entry = fileMap[file.path];
    entry[type] = file;
    if (entry.head && entry.base) {
      entry.diff = calculateDiff(entry.head, entry.base);
    }
  }
}
function comparePackages(head, base, {
  sortBy,
  sortOrder,
  hideFiles
} = {}) {
  const fileMap = {};
  processPkgFiles(fileMap, "head", head);
  processPkgFiles(fileMap, "base", base);
  const allFiles = Object.values(fileMap);
  sortFiles(allFiles, sortBy, sortOrder);
  const [hidden, files] = partionHidden(hideFiles, allFiles);
  const [unchanged, changed] = partition_default(files, (file) => file.diff && file.diff.size.delta === 0);
  return {
    head,
    base,
    diff: __spreadProps(__spreadValues({}, calculateDiff(head, base)), {
      tarballSize: calculateDiffBy(head, base, "tarballSize")
    }),
    files: {
      changed,
      unchanged,
      hidden
    }
  };
}
var compare_packages_default = comparePackages;

// src/report-templates/regression/index.js
var directionSymbol = (value) => {
  if (value < 0) {
    return "\u2193";
  }
  if (value > 0) {
    return "\u2191";
  }
  return "";
};
var formatDelta = ({ delta, percent: percent2 }) => delta ? percent2 + directionSymbol(delta) : "";
function generateComment({
  headPkgData,
  basePkgData,
  sortBy,
  sortOrder,
  hideFiles,
  unchangedFiles,
  displaySize
}) {
  const regressionData = compare_packages_default(headPkgData, basePkgData, {
    sortBy,
    sortOrder,
    hideFiles
  });
  (0, import_core.setOutput)("regressionData", regressionData);
  const { changed, unchanged, hidden } = regressionData.files;
  const displaySizes = parseDisplaySize(displaySize);
  const sizeHeadingLabel = getSizeLabels(displaySizes);
  const table = (0, import_markdown_table.default)([
    ["File", `Before${sizeHeadingLabel}`, `After${sizeHeadingLabel}`],
    ...[
      ...changed,
      ...unchangedFiles === "show" ? unchanged : []
    ].map((file) => [
      file.label,
      file.base && file.base.size ? listSizes(displaySizes, (p) => c((0, import_byte_size.default)(file.base[p]))) : "\u2014",
      file.head && file.head.size ? listSizes(displaySizes, (p) => (file.base && file.base[p] ? sup(formatDelta(file.diff[p])) : "") + c((0, import_byte_size.default)(file.head[p]))) : "\u2014"
    ]),
    [
      `${strong("Total")} ${unchangedFiles === "show" ? "" : sub("_(Includes all files)_")}`,
      listSizes(displaySizes, (p) => c((0, import_byte_size.default)(regressionData.base[p]))),
      listSizes(displaySizes, (p) => sup(formatDelta(regressionData.diff[p])) + c((0, import_byte_size.default)(regressionData.head[p])))
    ],
    [
      strong("Tarball size"),
      c((0, import_byte_size.default)(regressionData.base.tarballSize)),
      sup(formatDelta(regressionData.diff.tarballSize)) + c((0, import_byte_size.default)(regressionData.head.tarballSize))
    ]
  ], {
    align: ["", "r", "r"]
  });
  let unchangedTable = "";
  if (unchangedFiles === "collapse" && unchanged.length > 0) {
    unchangedTable = (0, import_markdown_table.default)([
      ["File", `Size${sizeHeadingLabel}`],
      ...unchanged.map((file) => [
        file.label,
        listSizes(displaySizes, (p) => c((0, import_byte_size.default)(file.base[p])))
      ])
    ], {
      align: ["", "r"]
    });
    unchangedTable = `<summary>Unchanged files</summary>

${unchangedTable}
`;
  }
  let hiddenTable = "";
  if (hidden.length > 0) {
    hiddenTable = (0, import_markdown_table.default)([
      ["File", `Before${sizeHeadingLabel}`, `After${sizeHeadingLabel}`],
      ...hidden.map((file) => [
        file.label,
        file.base && file.base.size ? listSizes(displaySizes, (p) => c((0, import_byte_size.default)(file.base[p]))) : "\u2014",
        file.head && file.head.size ? listSizes(displaySizes, (p) => (file.base && file.base[p] ? sup(formatDelta(file.diff[p])) : "") + c((0, import_byte_size.default)(file.head[p]))) : "\u2014"
      ])
    ], {
      align: ["", "r", "r"]
    });
    hiddenTable = `<summary>Hidden files</summary>

${hiddenTable}
`;
  }
  return import_outdent.default`
	### 📊 Package size report&nbsp;&nbsp;&nbsp;<kbd>${formatDelta(regressionData.diff.size) || "No changes"}</kbd>

	${table}

	${unchangedTable}

	${hiddenTable}
	`;
}
var regression_default = generateComment;

// src/report-templates/head-only.js
var import_byte_size2 = __toModule(require_dist());
var import_markdown_table2 = __toModule(require_markdown_table());
var import_outdent2 = __toModule(require_lib());
function headOnly({
  headPkgData,
  hideFiles,
  displaySize,
  sortBy,
  sortOrder
}) {
  const displaySizes = parseDisplaySize(displaySize);
  const sizeHeadingLabel = getSizeLabels(displaySizes);
  sortFiles(headPkgData.files, sortBy, sortOrder);
  const [hidden, files] = partionHidden(hideFiles, headPkgData.files);
  const table = (0, import_markdown_table2.default)([
    ["File", `Size${sizeHeadingLabel}`],
    ...files.map((file) => [
      file.label,
      listSizes(displaySizes, (p) => c((0, import_byte_size2.default)(file[p])))
    ]),
    [
      strong("Total"),
      listSizes(displaySizes, (p) => c((0, import_byte_size2.default)(headPkgData[p])))
    ],
    [
      strong("Tarball size"),
      c((0, import_byte_size2.default)(headPkgData.tarballSize))
    ]
  ], {
    align: ["", "r"]
  });
  let hiddenTable = "";
  if (hidden.length > 0) {
    hiddenTable = (0, import_markdown_table2.default)([
      ["File", `Size${sizeHeadingLabel}`],
      ...hidden.map((file) => [
        file.label,
        listSizes(displaySizes, (p) => c((0, import_byte_size2.default)(file[p])))
      ])
    ], {
      align: ["", "r"]
    });
    hiddenTable = `<summary>Hidden files</summary>

${hiddenTable}
`;
  }
  return import_outdent2.default`
	### 📊 Package size report

	${table}

	${hiddenTable}
	`;
}
var head_only_default = headOnly;

// src/lib/exec.js
var import_exec = __toModule(require_exec());
async function exec(command, options) {
  let stdout = "";
  let stderr = "";
  const startTime = Date.now();
  let exitCode = "127";
  try {
    exitCode = await (0, import_exec.exec)(command, null, __spreadProps(__spreadValues({}, options), {
      silent: true,
      listeners: {
        stdout(data) {
          stdout += data.toString();
        },
        stderr(data) {
          stderr += data.toString();
        }
      }
    }));
  } catch (error2) {
    stderr += error2.toString();
  }
  const duration = Date.now() - startTime;
  return {
    exitCode,
    duration,
    stdout,
    stderr
  };
}
var exec_default = exec;

// src/lib/is-base-diff-from-head.js
async function isBaseDiffFromHead(baseRef) {
  try {
    await exec_default(`git fetch origin ${baseRef} --depth=1`);
  } catch (error2) {
    throw new Error(`Failed to git fetch ${baseRef} ${error2.message}`);
  }
  const { exitCode } = await exec_default(`git diff --quiet origin/${baseRef}`, { ignoreReturnCode: true });
  return exitCode !== 0;
}
var is_base_diff_from_head_default = isBaseDiffFromHead;

// src/lib/build-ref.js
var import_fs2 = __toModule(require("fs"));

// src/lib/log.js
var import_core2 = __toModule(require_core());

// src/lib/npm-ci.js
var import_fs = __toModule(require("fs"));
var import_path = __toModule(require("path"));
var import_io = __toModule(require_io());
async function npmCi({ cwd } = {}) {
  if (import_fs.default.existsSync("node_modules")) {
    import_core2.info("Cleaning node_modules");
    await (0, import_io.rmRF)(import_path.default.join(cwd, "node_modules"));
  }
  const options = {
    cwd,
    ignoreReturnCode: true
  };
  if (!import_fs.default.existsSync("package-lock.json")) {
    import_core2.error("No lock file detected. Installing dependencies with npm");
    throw new Error("No lock file detected. Installing dependencies with npm");
  }
  const installCommand = "npm ci --foreground-scripts";
  const { exitCode, stdout, stderr } = await exec_default(installCommand, options);
  if (exitCode > 0) {
    throw new Error(`${stderr}
${stdout}`);
  }
}
var npm_ci_default = npmCi;

// src/lib/is-file-tracked.js
async function isFileTracked(filePath) {
  const { exitCode } = await exec_default(`git ls-files --error-unmatch ${filePath}`, { ignoreReturnCode: true });
  return exitCode === 0;
}
var is_file_tracked_default = isFileTracked;

// src/lib/build-ref.js
var pkgSizeInstalled = false;
async function buildRef({
  checkoutRef,
  refData,
  buildCommand,
  workDirectory,
  distDirectory,
  skipNpmCi
}) {
  const cwd = process.cwd() + workDirectory;
  import_core2.info(`Current working directory: ${cwd}`);
  if (checkoutRef) {
    import_core2.info(`Checking out ref '${checkoutRef}'`);
    await exec_default(`git checkout -f ${checkoutRef}`);
  }
  if (buildCommand !== "false") {
    if (!buildCommand) {
      let pkgJson;
      try {
        pkgJson = JSON.parse(import_fs2.default.readFileSync("./package.json"));
      } catch (error2) {
        import_core2.warning("Error reading package.json", error2);
      }
      if (pkgJson && pkgJson.scripts && pkgJson.scripts.build) {
        import_core2.info("Build script found in package.json");
        buildCommand = "npm run build";
      }
    }
    if (buildCommand) {
      if (!skipNpmCi) {
        await npm_ci_default({ cwd: process.cwd() }).catch((error2) => {
          throw new Error(`Failed to install dependencies:
${error2.message}`);
        });
      }
      import_core2.info(`Running build command: ${buildCommand}`);
      const buildStart = Date.now();
      const commandsToRun = buildCommand.split("&&");
      const commandArrayLength = commandsToRun.length;
      import_core2.info(`Nb command ${commandsToRun.length}`);
      for (let index = 0; index < commandArrayLength; index += 1) {
        import_core2.info(`Running command ${commandsToRun[index]}`);
        const {
          exitCode,
          duration,
          stdout,
          stderr
        } = await exec_default(commandsToRun[index], { cwd }).catch((error2) => {
          throw new Error(`Failed to run build command: ${buildCommand}
		 Error:
${error2}
#####`);
        });
        import_core2.info(`Build command finished in ${duration}ms with exit code ${exitCode} and output:
${stdout} 

and stderr: ${stderr}`);
        import_core2.info(`Build completed in ${(Date.now() - buildStart) / 1e3}s`);
      }
    }
  }
  if (!pkgSizeInstalled) {
    import_core2.info("Installing pkg-size globally");
    const result2 = await exec_default("npm i -g pkg-size", {
      cwd: process.cwd() + distDirectory
    }).catch((error2) => {
      throw new Error(`Failed to install  pkg-size: ${error2.message}`);
    });
    import_core2.info(JSON.stringify(result2, null, 4));
    pkgSizeInstalled = true;
  }
  import_core2.info(`Getting package size running pkg-size --json in ${process.cwd() + distDirectory}`);
  await exec_default("ls", { cwd: process.cwd() + distDirectory });
  const result = await exec_default("pkg-size --json", {
    cwd: process.cwd() + distDirectory
  }).catch((error2) => {
    throw new Error(`Failed to determine package size: ${error2.message}`);
  });
  import_core2.info(JSON.stringify(result, null, 4));
  const pkgData = __spreadProps(__spreadValues({}, JSON.parse(result.stdout)), {
    ref: refData,
    size: 0,
    sizeGzip: 0,
    sizeBrotli: 0
  });
  await Promise.all(pkgData.files.map(async (file) => {
    pkgData.size += file.size;
    pkgData.sizeGzip += file.sizeGzip;
    pkgData.sizeBrotli += file.sizeBrotli;
    const isTracked = await is_file_tracked_default(file.path);
    file.isTracked = isTracked;
    file.label = isTracked ? link(c(file.path), `${refData.repo.html_url}/blob/${refData.ref}/${file.path}`) : c(file.path);
  }));
  import_core2.info("Cleaning up");
  await exec_default("git reset --hard");
  const { stdout: cleanList } = await exec_default("git clean -dfx");
  import_core2.debug(cleanList);
  return pkgData;
}
var build_ref_default = buildRef;

// src/lib/generate-size-report.js
async function generateSizeReport({
  pr,
  buildCommand,
  workDirectory,
  distDirectory,
  skipNpmCi,
  commentReport,
  mode,
  unchangedFiles,
  hideFiles,
  sortBy,
  sortOrder,
  displaySize
}) {
  import_core2.startGroup("Build HEAD");
  import_core2.info(`HEAD ref: ${pr.head.ref}`);
  import_core2.info(`HEAD repo name: ${pr.head.repo.full_name}`);
  import_core2.info(`BASE ref: ${pr.base.ref}`);
  import_core2.info(`BASE repo name: ${pr.base.repo.full_name}`);
  const headPkgData = await build_ref_default({
    refData: pr.head,
    buildCommand,
    workDirectory,
    distDirectory,
    skipNpmCi
  });
  (0, import_core3.setOutput)("headPkgData", headPkgData);
  import_core2.endGroup();
  if (mode === "head-only") {
    if (commentReport !== "false") {
      return head_only_default({
        headPkgData,
        displaySize,
        sortBy,
        sortOrder,
        hideFiles
      });
    }
    return false;
  }
  const { ref: baseRef } = pr.base;
  let basePkgData;
  if (await is_base_diff_from_head_default(baseRef)) {
    import_core2.info("HEAD is different from BASE. Triggering build.");
    import_core2.startGroup("Build BASE");
    basePkgData = await build_ref_default({
      checkoutRef: baseRef,
      refData: pr.base,
      buildCommand,
      workDirectory,
      distDirectory,
      skipNpmCi
    });
    import_core2.endGroup();
  } else {
    import_core2.info("HEAD is identical to BASE. Skipping base build.");
    basePkgData = __spreadProps(__spreadValues({}, headPkgData), {
      ref: pr.base
    });
  }
  (0, import_core3.setOutput)("basePkgData", basePkgData);
  if (commentReport !== "false") {
    return regression_default({
      headPkgData,
      basePkgData,
      displaySize,
      sortBy,
      sortOrder,
      hideFiles,
      unchangedFiles
    });
  }
  return false;
}
var generate_size_report_default = generateSizeReport;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
/*!
 * repeat-string <https://github.com/jonschlinkert/repeat-string>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */
/**
 * @license
 * Lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="es" -o ./`
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
