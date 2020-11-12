!function(e){function t(i){if(r[i])return r[i].exports;var n=r[i]={i:i,l:!1,exports:{}};return e[i].call(n.exports,n,n.exports,t),n.l=!0,n.exports}var r={};t.m=e,t.c=r,t.i=function(e){return e},t.d=function(e,r,i){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=494)}({256:function(e,t,r){var i,n,s;/* @license
Papa Parse
v4.6.3
https://github.com/mholt/PapaParse
License: MIT
*/
Array.isArray||(Array.isArray=function(e){return"[object Array]"===Object.prototype.toString.call(e)}),function(r,a){n=[],i=a,void 0!==(s="function"==typeof i?i.apply(t,n):i)&&(e.exports=s)}(0,function(){"use strict";function e(e){this._handle=null,this._finished=!1,this._completed=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},function(e){var t=c(e);t.chunkSize=parseInt(t.chunkSize),e.step||e.chunk||(t.chunkSize=null),this._handle=new s(t),(this._handle.streamer=this)._config=t}.call(this,e),this.parseChunk=function(e,t){if(this.isFirstChunk&&d(this._config.beforeFirstChunk)){var r=this._config.beforeFirstChunk(e);void 0!==r&&(e=r)}this.isFirstChunk=!1;var i=this._partialLine+e;this._partialLine="";var n=this._handle.parse(i,this._baseIndex,!this._finished);if(!this._handle.paused()&&!this._handle.aborted()){var s=n.meta.cursor;this._finished||(this._partialLine=i.substring(s-this._baseIndex),this._baseIndex=s),n&&n.data&&(this._rowCount+=n.data.length);var a=this._finished||this._config.preview&&this._rowCount>=this._config.preview;if(y)m.postMessage({results:n,workerId:b.WORKER_ID,finished:a});else if(d(this._config.chunk)&&!t){if(this._config.chunk(n,this._handle),this._handle.paused()||this._handle.aborted())return;n=void 0,this._completeResults=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(n.data),this._completeResults.errors=this._completeResults.errors.concat(n.errors),this._completeResults.meta=n.meta),this._completed||!a||!d(this._config.complete)||n&&n.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),a||n&&n.meta.paused||this._nextChunk(),n}},this._sendError=function(e){d(this._config.error)?this._config.error(e):y&&this._config.error&&m.postMessage({workerId:b.WORKER_ID,error:e,finished:!1})}}function t(t){var r;(t=t||{}).chunkSize||(t.chunkSize=b.RemoteChunkSize),e.call(this,t),this._nextChunk=g?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(e){this._input=e,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(r=new XMLHttpRequest,this._config.withCredentials&&(r.withCredentials=this._config.withCredentials),g||(r.onload=f(this._chunkLoaded,this),r.onerror=f(this._chunkError,this)),r.open("GET",this._input,!g),this._config.downloadRequestHeaders){var e=this._config.downloadRequestHeaders;for(var t in e)r.setRequestHeader(t,e[t])}if(this._config.chunkSize){var i=this._start+this._config.chunkSize-1;r.setRequestHeader("Range","bytes="+this._start+"-"+i),r.setRequestHeader("If-None-Match","webkit-no-cache")}try{r.send()}catch(e){this._chunkError(e.message)}g&&0===r.status?this._chunkError():this._start+=this._config.chunkSize}},this._chunkLoaded=function(){4===r.readyState&&(r.status<200||400<=r.status?this._chunkError():(this._finished=!this._config.chunkSize||this._start>function(e){var t=e.getResponseHeader("Content-Range");return null===t?-1:parseInt(t.substr(t.lastIndexOf("/")+1))}(r),this.parseChunk(r.responseText)))},this._chunkError=function(e){var t=r.statusText||e;this._sendError(new Error(t))}}function r(t){var r,i;(t=t||{}).chunkSize||(t.chunkSize=b.LocalChunkSize),e.call(this,t);var n="undefined"!=typeof FileReader;this.stream=function(e){this._input=e,i=e.slice||e.webkitSlice||e.mozSlice,n?((r=new FileReader).onload=f(this._chunkLoaded,this),r.onerror=f(this._chunkError,this)):r=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var e=this._input;if(this._config.chunkSize){var t=Math.min(this._start+this._config.chunkSize,this._input.size);e=i.call(e,this._start,t)}var s=r.readAsText(e,this._config.encoding);n||this._chunkLoaded({target:{result:s}})},this._chunkLoaded=function(e){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(e.target.result)},this._chunkError=function(){this._sendError(r.error)}}function i(t){var r;e.call(this,t=t||{}),this.stream=function(e){return r=e,this._nextChunk()},this._nextChunk=function(){if(!this._finished){var e=this._config.chunkSize,t=e?r.substr(0,e):r;return r=e?r.substr(e):"",this._finished=!r,this.parseChunk(t)}}}function n(t){e.call(this,t=t||{});var r=[],i=!0,n=!1;this.pause=function(){e.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){e.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(e){this._input=e,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){n&&1===r.length&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),r.length?this.parseChunk(r.shift()):i=!0},this._streamData=f(function(e){try{r.push("string"==typeof e?e:e.toString(this._config.encoding)),i&&(i=!1,this._checkIsFinished(),this.parseChunk(r.shift()))}catch(e){this._streamError(e)}},this),this._streamError=f(function(e){this._streamCleanUp(),this._sendError(e)},this),this._streamEnd=f(function(){this._streamCleanUp(),n=!0,this._streamData("")},this),this._streamCleanUp=f(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)},this)}function s(e){function t(t){return"greedy"===e.skipEmptyLines?""===t.join("").trim():1===t.length&&0===t[0].length}function r(){if(w&&l&&(s("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+b.DefaultDelimiter+"'"),l=!1),e.skipEmptyLines)for(var r=0;r<w.data.length;r++)t(w.data[r])&&w.data.splice(r--,1);return i()&&function(){if(w){for(var t=0;i()&&t<w.data.length;t++)for(var r=0;r<w.data[t].length;r++){var n=w.data[t][r];e.trimHeaders&&(n=n.trim()),k.push(n)}w.data.splice(0,1)}}(),function(){if(!w||!e.header&&!e.dynamicTyping&&!e.transform)return w;for(var t=0;t<w.data.length;t++){var r,i=e.header?{}:[];for(r=0;r<w.data[t].length;r++){var a=r,o=w.data[t][r];e.header&&(a=r>=k.length?"__parsed_extra":k[r]),e.transform&&(o=e.transform(o,a)),o=n(a,o),"__parsed_extra"===a?(i[a]=i[a]||[],i[a].push(o)):i[a]=o}w.data[t]=i,e.header&&(r>k.length?s("FieldMismatch","TooManyFields","Too many fields: expected "+k.length+" fields but parsed "+r,g+t):r<k.length&&s("FieldMismatch","TooFewFields","Too few fields: expected "+k.length+" fields but parsed "+r,g+t))}return e.header&&w.meta&&(w.meta.fields=k),g+=w.data.length,w}()}function i(){return e.header&&0===k.length}function n(t,r){return i=t,e.dynamicTypingFunction&&void 0===e.dynamicTyping[i]&&(e.dynamicTyping[i]=e.dynamicTypingFunction(i)),!0===(e.dynamicTyping[i]||e.dynamicTyping)?"true"===r||"TRUE"===r||"false"!==r&&"FALSE"!==r&&(f.test(r)?parseFloat(r):p.test(r)?new Date(r):""===r?null:r):r;var i}function s(e,t,r,i){w.errors.push({type:e,code:t,message:r,row:i})}var u,h,l,f=/^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i,p=/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,_=this,m=0,g=0,y=!1,v=!1,k=[],w={data:[],errors:[],meta:{}};if(d(e.step)){var E=e.step;e.step=function(t){if(w=t,i())r();else{if(r(),0===w.data.length)return;m+=t.data.length,e.preview&&m>e.preview?h.abort():E(w,_)}}}this.parse=function(i,n,s){var f=e.quoteChar||'"';if(e.newline||(e.newline=function(e,t){e=e.substr(0,1048576);var r=new RegExp(a(t)+"([^]*?)"+a(t),"gm"),i=(e=e.replace(r,"")).split("\r"),n=e.split("\n"),s=1<n.length&&n[0].length<i[0].length;if(1===i.length||s)return"\n";for(var o=0,u=0;u<i.length;u++)"\n"===i[u][0]&&o++;return o>=i.length/2?"\r\n":"\r"}(i,f)),l=!1,e.delimiter)d(e.delimiter)&&(e.delimiter=e.delimiter(i),w.meta.delimiter=e.delimiter);else{var p=function(r,i,n,s){for(var a,u,h,l=[",","\t","|",";",b.RECORD_SEP,b.UNIT_SEP],c=0;c<l.length;c++){var f=l[c],d=0,p=0,_=0;h=void 0;for(var m=new o({comments:s,delimiter:f,newline:i,preview:10}).parse(r),g=0;g<m.data.length;g++)if(n&&t(m.data[g]))_++;else{var y=m.data[g].length;p+=y,void 0!==h?1<y&&(d+=Math.abs(y-h),h=y):h=0}0<m.data.length&&(p/=m.data.length-_),(void 0===u||u<d)&&1.99<p&&(u=d,a=f)}return{successful:!!(e.delimiter=a),bestDelimiter:a}}(i,e.newline,e.skipEmptyLines,e.comments);p.successful?e.delimiter=p.bestDelimiter:(l=!0,e.delimiter=b.DefaultDelimiter),w.meta.delimiter=e.delimiter}var _=c(e);return e.preview&&e.header&&_.preview++,u=i,h=new o(_),w=h.parse(u,n,s),r(),y?{meta:{paused:!0}}:w||{meta:{paused:!1}}},this.paused=function(){return y},this.pause=function(){y=!0,h.abort(),u=u.substr(h.getCharIndex())},this.resume=function(){y=!1,_.streamer.parseChunk(u,!0)},this.aborted=function(){return v},this.abort=function(){v=!0,h.abort(),w.meta.aborted=!0,d(e.complete)&&e.complete(w),u=""}}function a(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function o(e){var t,r=(e=e||{}).delimiter,i=e.newline,n=e.comments,s=e.step,o=e.preview,u=e.fastMode,h=t=void 0===e.quoteChar?'"':e.quoteChar;if(void 0!==e.escapeChar&&(h=e.escapeChar),("string"!=typeof r||-1<b.BAD_DELIMITERS.indexOf(r))&&(r=","),n===r)throw"Comment character same as delimiter";!0===n?n="#":("string"!=typeof n||-1<b.BAD_DELIMITERS.indexOf(n))&&(n=!1),"\n"!==i&&"\r"!==i&&"\r\n"!==i&&(i="\n");var l=0,c=!1;this.parse=function(e,f,p){function _(e){R.push(e),D=l}function m(t){var r=0;if(-1!==t){var i=e.substring(A+1,t);i&&""===i.trim()&&(r=i.length)}return r}function g(t){return p||(void 0===t&&(t=e.substr(l)),O.push(t),l=w,_(O),S&&k()),v()}function y(t){l=t,_(O),O=[],P=e.indexOf(i,l)}function v(e){return{data:R,errors:x,meta:{delimiter:r,linebreak:i,aborted:c,truncated:!!e,cursor:D+(f||0)}}}function k(){s(v()),R=[],x=[]}if("string"!=typeof e)throw"Input must be a string";var w=e.length,b=r.length,E=i.length,C=n.length,S=d(s),R=[],x=[],O=[],D=l=0;if(!e)return v();if(u||!1!==u&&-1===e.indexOf(t)){for(var T=e.split(i),I=0;I<T.length;I++){if(O=T[I],l+=O.length,I!==T.length-1)l+=i.length;else if(p)return v();if(!n||O.substr(0,C)!==n){if(S){if(R=[],_(O.split(r)),k(),c)return v()}else _(O.split(r));if(o&&o<=I)return R=R.slice(0,o),v(!0)}}return v()}for(var A,M=e.indexOf(r,l),P=e.indexOf(i,l),L=new RegExp(a(h)+a(t),"g");;)if(e[l]!==t)if(n&&0===O.length&&e.substr(l,C)===n){if(-1===P)return v();l=P+E,P=e.indexOf(i,l),M=e.indexOf(r,l)}else if(-1!==M&&(M<P||-1===P))O.push(e.substring(l,M)),l=M+b,M=e.indexOf(r,l);else{if(-1===P)break;if(O.push(e.substring(l,P)),y(P+E),S&&(k(),c))return v();if(o&&R.length>=o)return v(!0)}else for(A=l,l++;;){if(-1===(A=e.indexOf(t,A+1)))return p||x.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:R.length,index:l}),g();if(A===w-1)return g(e.substring(l,A).replace(L,t));if(t!==h||e[A+1]!==h){if(t===h||0===A||e[A-1]!==h){var z=m(-1===P?M:Math.min(M,P));if(e[A+1+z]===r){O.push(e.substring(l,A).replace(L,t)),l=A+1+z+b,M=e.indexOf(r,l),P=e.indexOf(i,l);break}var F=m(P);if(e.substr(A+1+F,E)===i){if(O.push(e.substring(l,A).replace(L,t)),y(A+1+F+E),M=e.indexOf(r,l),S&&(k(),c))return v();if(o&&R.length>=o)return v(!0);break}x.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:R.length,index:l}),A++}}else A++}return g()},this.abort=function(){c=!0},this.getCharIndex=function(){return l}}function u(e){var t=e.data,r=k[t.workerId],i=!1;if(t.error)r.userError(t.error,t.file);else if(t.results&&t.results.data){var n={abort:function(){i=!0,h(t.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:l,resume:l};if(d(r.userStep)){for(var s=0;s<t.results.data.length&&(r.userStep({data:[t.results.data[s]],errors:t.results.errors,meta:t.results.meta},n),!i);s++);delete t.results}else d(r.userChunk)&&(r.userChunk(t.results,n,t.file),delete t.results)}t.finished&&!i&&h(t.workerId,t.results)}function h(e,t){var r=k[e];d(r.userComplete)&&r.userComplete(t),r.terminate(),delete k[e]}function l(){throw"Not implemented."}function c(e){if("object"!=typeof e||null===e)return e;var t=Array.isArray(e)?[]:{};for(var r in e)t[r]=c(e[r]);return t}function f(e,t){return function(){e.apply(t,arguments)}}function d(e){return"function"==typeof e}var p,_,m="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==m?m:{},g=!m.document&&!!m.postMessage,y=g&&/(\?|&)papaworker(=|&|$)/.test(m.location.search),v=!1,k={},w=0,b={parse:function(e,s){var a=(s=s||{}).dynamicTyping||!1;if(d(a)&&(s.dynamicTypingFunction=a,a={}),s.dynamicTyping=a,s.transform=!!d(s.transform)&&s.transform,s.worker&&b.WORKERS_SUPPORTED){var o=function(){if(!b.WORKERS_SUPPORTED)return!1;if(!v&&null===b.SCRIPT_PATH)throw new Error("Script path cannot be determined automatically when Papa Parse is loaded asynchronously. You need to set Papa.SCRIPT_PATH manually.");var e=b.SCRIPT_PATH||p;e+=(-1!==e.indexOf("?")?"&":"?")+"papaworker";var t=new m.Worker(e);return t.onmessage=u,t.id=w++,k[t.id]=t}();return o.userStep=s.step,o.userChunk=s.chunk,o.userComplete=s.complete,o.userError=s.error,s.step=d(s.step),s.chunk=d(s.chunk),s.complete=d(s.complete),s.error=d(s.error),delete s.worker,void o.postMessage({input:e,config:s,workerId:o.id})}var h=null;return b.NODE_STREAM_INPUT,"string"==typeof e?h=s.download?new t(s):new i(s):!0===e.readable&&d(e.read)&&d(e.on)?h=new n(s):(m.File&&e instanceof File||e instanceof Object)&&(h=new r(s)),h.stream(e)},unparse:function(e,t){function r(e){if("object"!=typeof e)return[];var t=[];for(var r in e)t.push(r);return t}function i(e,t,r){var i="";"string"==typeof e&&(e=JSON.parse(e)),"string"==typeof t&&(t=JSON.parse(t));var s=Array.isArray(e)&&0<e.length,a=!Array.isArray(t[0]);if(s&&o){for(var l=0;l<e.length;l++)0<l&&(i+=u),i+=n(e[l],l);0<t.length&&(i+=h)}for(var c=0;c<t.length;c++){var f=s?e.length:t[c].length,d=!1,p=s?0===Object.keys(t[c]).length:0===t[c].length;if(r&&!s&&(d="greedy"===r?""===t[c].join("").trim():1===t[c].length&&0===t[c][0].length),"greedy"===r&&s){for(var _=[],m=0;m<f;m++){var g=a?e[m]:m;_.push(t[c][g])}d=""===_.join("").trim()}if(!d){for(var y=0;y<f;y++){0<y&&!p&&(i+=u);var v=s&&a?e[y]:y;i+=n(t[c][v],y)}c<t.length-1&&(!r||0<f&&!p)&&(i+=h)}}return i}function n(e,t){return null==e?"":e.constructor===Date?JSON.stringify(e).slice(1,25):(e=e.toString().replace(f,l+l),"boolean"==typeof s&&s||Array.isArray(s)&&s[t]||function(e,t){for(var r=0;r<t.length;r++)if(-1<e.indexOf(t[r]))return!0;return!1}(e,b.BAD_DELIMITERS)||-1<e.indexOf(u)||" "===e.charAt(0)||" "===e.charAt(e.length-1)?l+e+l:e)}var s=!1,o=!0,u=",",h="\r\n",l='"',c=!1;!function(){"object"==typeof t&&("string"!=typeof t.delimiter||b.BAD_DELIMITERS.filter(function(e){return-1!==t.delimiter.indexOf(e)}).length||(u=t.delimiter),("boolean"==typeof t.quotes||Array.isArray(t.quotes))&&(s=t.quotes),"boolean"!=typeof t.skipEmptyLines&&"string"!=typeof t.skipEmptyLines||(c=t.skipEmptyLines),"string"==typeof t.newline&&(h=t.newline),"string"==typeof t.quoteChar&&(l=t.quoteChar),"boolean"==typeof t.header&&(o=t.header))}();var f=new RegExp(a(l),"g");if("string"==typeof e&&(e=JSON.parse(e)),Array.isArray(e)){if(!e.length||Array.isArray(e[0]))return i(null,e,c);if("object"==typeof e[0])return i(r(e[0]),e,c)}else if("object"==typeof e)return"string"==typeof e.data&&(e.data=JSON.parse(e.data)),Array.isArray(e.data)&&(e.fields||(e.fields=e.meta&&e.meta.fields),e.fields||(e.fields=Array.isArray(e.data[0])?e.fields:r(e.data[0])),Array.isArray(e.data[0])||"object"==typeof e.data[0]||(e.data=[e.data])),i(e.fields||[],e.data||[],c);throw"exception: Unable to serialize unrecognized input"}};if(b.RECORD_SEP=String.fromCharCode(30),b.UNIT_SEP=String.fromCharCode(31),b.BYTE_ORDER_MARK="\ufeff",b.BAD_DELIMITERS=["\r","\n",'"',b.BYTE_ORDER_MARK],b.WORKERS_SUPPORTED=!g&&!!m.Worker,b.SCRIPT_PATH=null,b.NODE_STREAM_INPUT=1,b.LocalChunkSize=10485760,b.RemoteChunkSize=5242880,b.DefaultDelimiter=",",b.Parser=o,b.ParserHandle=s,b.NetworkStreamer=t,b.FileStreamer=r,b.StringStreamer=i,b.ReadableStreamStreamer=n,m.jQuery){var E=m.jQuery;E.fn.parse=function(e){function t(){if(0!==n.length){var t,i,s,a,o=n[0];if(d(e.before)){var u=e.before(o.file,o.inputElem);if("object"==typeof u){if("abort"===u.action)return t="AbortError",i=o.file,s=o.inputElem,a=u.reason,void(d(e.error)&&e.error({name:t},i,s,a));if("skip"===u.action)return void r();"object"==typeof u.config&&(o.instanceConfig=E.extend(o.instanceConfig,u.config))}else if("skip"===u)return void r()}var h=o.instanceConfig.complete;o.instanceConfig.complete=function(e){d(h)&&h(e,o.file,o.inputElem),r()},b.parse(o.file,o.instanceConfig)}else d(e.complete)&&e.complete()}function r(){n.splice(0,1),t()}var i=e.config||{},n=[];return this.each(function(e){if("INPUT"!==E(this).prop("tagName").toUpperCase()||"file"!==E(this).attr("type").toLowerCase()||!m.FileReader||!this.files||0===this.files.length)return!0;for(var t=0;t<this.files.length;t++)n.push({file:this.files[t],inputElem:this,instanceConfig:E.extend({},i)})}),t(),this}}return y?m.onmessage=function(e){var t=e.data;if(void 0===b.WORKER_ID&&t&&(b.WORKER_ID=t.workerId),"string"==typeof t.input)m.postMessage({workerId:b.WORKER_ID,results:b.parse(t.input,t.config),finished:!0});else if(m.File&&t.input instanceof File||t.input instanceof Object){var r=b.parse(t.input,t.config);r&&m.postMessage({workerId:b.WORKER_ID,results:r,finished:!0})}}:b.WORKERS_SUPPORTED&&(_=document.getElementsByTagName("script"),p=_.length?_[_.length-1].src:"",document.body?document.addEventListener("DOMContentLoaded",function(){v=!0},!0):v=!0),(t.prototype=Object.create(e.prototype)).constructor=t,(r.prototype=Object.create(e.prototype)).constructor=r,(i.prototype=Object.create(i.prototype)).constructor=i,(n.prototype=Object.create(e.prototype)).constructor=n,b})},494:function(module,__webpack_exports__,__webpack_require__){"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:!0});var __WEBPACK_IMPORTED_MODULE_0_papaparse__=__webpack_require__(256),__WEBPACK_IMPORTED_MODULE_0_papaparse___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_papaparse__);window.ckan.module("table_view",function($){function initialize(){this.options.resource=JSON.parse(this.options.resource),this.options.resourceView=JSON.parse(this.options.resourceView),this.el.ready(_onReady.bind(this))}function _onReady(){function showError(e){e=e||"error loading view",window.ckan.pubsub.publish("data-viewer-error",e)}function getDecimalPlaces(e){var t=0;return e.toString().indexOf(".")>-1&&(t=e.toString().length-(e.toString().indexOf(".")+3)),Math.max(0,t)}function formatNumber(e){var t=e.toString().split(".");return t[0]=t[0].replace(/\B(?=(\d{3})+(?!\d))/g,","),t.join(".")}var _this=this,resourceData=this.options.resource,errorMsg=this.options.i18n.errorLoadingPreview+": ",fields=this.options.fields,columns=fields.map(function(e){var t=e.text;return e.unit_of_measure&&e.unit_of_measure!==e.text&&(t+=" ("+e.unit_of_measure+")"),{title:t,data:e.value.replace(".","\\."),type:"numeric"===e.type?"num-fmt":"string",render:function(t,r,i,n){if(t)if("display"===r){if("numeric"===e.type&&!isNull(t))return"percentage"===e.sub_type?100===e.percentage_type?formatNumber(t)+"%":formatNumber(parseFloat((100*t).toFixed(getDecimalPlaces(t))))+"%":formatNumber(t)}else if("numeric"===e.type&&"percentage"===e.sub_type)return"100"===e.percentage_type?t+"%":parseFloat((100*t).toFixed(getDecimalPlaces(t)))+"%";return t}}}),limit=2e3;resourceData.datastore_active?(errorMsg+=this.options.i18n.errorDataStore,$.ajax({type:"GET",url:"/dataset/"+resourceData.package_id+"/resource/"+resourceData.id+"/data",data:{limit:limit},success:function(e){if(e){var t=e.records,r=e.total;initializeView(_this.el,t,columns,r)}else showError(errorMsg)},error:function error(xhr,status,_error){var err=eval("("+xhr.responseText+")");err.error.message&&(errorMsg+=" ("+err.error.message+")"),showError(errorMsg)}})):"CSV"===resourceData.format.toUpperCase()&&__WEBPACK_IMPORTED_MODULE_0_papaparse___default.a.parse(resourceData.url,{download:!0,header:!0,skipEmptyLines:!0,complete:function(e){var t=e.data.map(function(e,t){return e._id=t,e}),r=t.length;t=t.slice(0,limit),0===columns.length&&e.meta.fields.forEach(function(e){columns.push({title:e,data:e})}),initializeView(_this.el,t,columns,r)},error:function(e){e&&(errorMsg+=" ("+e+")"),showError(errorMsg)}})}function isNull(e){var t=["na","-","s"];return!e||t.indexOf(e.trim().toLowerCase())>-1}function initializeView(e,t,r,i){t.sort(function(e,t){return e._id-t._id});var n=i>2e3?"Showing _START_ to _END_ of "+i+" records (Only last 2000 records shown)":"Showing _START_ to _END_ of _TOTAL_ records";$(e).find("#resource_table").dataTable({data:t,columns:r,order:[[0,"dsc"]],language:{info:n,lengthMenu:"Display _MENU_ records",paginate:{previous:"&laquo",next:"&raquo"}},pageLength:15,scrollX:!0,scrollY:"440px",scrollCollapse:!0,dom:'t<"row-fluid"<"span5"i><"span7"p>>'});$(e).find("#resource_table").DataTable()}return{initialize:initialize,options:{i18n:{errorLoadingPreview:"Could not load view",errorDataProxy:"DataProxy returned an error",errorDataStore:"DataStore returned an error"}}}})}});
//# sourceMappingURL=table-view.js.map