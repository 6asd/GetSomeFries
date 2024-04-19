class Lodash{static name="Lodash";static version="1.2.2";static about(){return console.log(`\n🟧 ${this.name} v${this.version}\n`)}static get(e={},t="",s=void 0){Array.isArray(t)||(t=this.toPath(t));const a=t.reduce(((e,t)=>Object(e)[t]),e);return void 0===a?s:a}static set(e={},t="",s){return Array.isArray(t)||(t=this.toPath(t)),t.slice(0,-1).reduce(((e,s,a)=>Object(e[s])===e[s]?e[s]:e[s]=/^\d+$/.test(t[a+1])?[]:{}),e)[t[t.length-1]]=s,e}static unset(e={},t=""){return Array.isArray(t)||(t=this.toPath(t)),t.reduce(((e,s,a)=>a===t.length-1?(delete e[s],!0):Object(e)[s]),e)}static toPath(e){return e.replace(/\[(\d+)\]/g,".$1").split(".").filter(Boolean)}static escape(e){const t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};return e.replace(/[&<>"']/g,(e=>t[e]))}static unescape(e){const t={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'"};return e.replace(/&amp;|&lt;|&gt;|&quot;|&#39;/g,(e=>t[e]))}}class $Storage{static name="$Storage";static version="1.0.9";static about(){return console.log(`\n🟧 ${this.name} v${this.version}\n`)}static data=null;static dataFile="box.dat";static#e=/^@(?<key>[^.]+)(?:\.(?<path>.*))?$/;static#t(){return"undefined"!=typeof $environment&&$environment["surge-version"]?"Surge":"undefined"!=typeof $environment&&$environment["stash-version"]?"Stash":"undefined"!=typeof module&&module.exports?"Node.js":"undefined"!=typeof $task?"Quantumult X":"undefined"!=typeof $loon?"Loon":"undefined"!=typeof $rocket?"Shadowrocket":"undefined"!=typeof Egern?"Egern":void 0}static getItem(e=new String,t=null){let s=t;if(!0===e.startsWith("@")){const{key:t,path:a}=e.match(this.#e)?.groups;e=t;let o=this.getItem(e,{});"object"!=typeof o&&(o={}),s=Lodash.get(o,a);try{s=JSON.parse(s)}catch(e){}}else{switch(this.#t()){case"Surge":case"Loon":case"Stash":case"Egern":case"Shadowrocket":s=$persistentStore.read(e);break;case"Quantumult X":s=$prefs.valueForKey(e);break;case"Node.js":this.data=this.#s(this.dataFile),s=this.data?.[e];break;default:s=this.data?.[e]||null}try{s=JSON.parse(s)}catch(e){}}return s??t}static setItem(e=new String,t=new String){let s=!1;if("object"==typeof t)t=JSON.stringify(t);else t=String(t);if(!0===e.startsWith("@")){const{key:a,path:o}=e.match(this.#e)?.groups;e=a;let r=this.getItem(e,{});"object"!=typeof r&&(r={}),Lodash.set(r,o,t),s=this.setItem(e,r)}else switch(this.#t()){case"Surge":case"Loon":case"Stash":case"Egern":case"Shadowrocket":s=$persistentStore.write(t,e);break;case"Quantumult X":s=$prefs.setValueForKey(t,e);break;case"Node.js":this.data=this.#s(this.dataFile),this.data[e]=t,this.#a(this.dataFile),s=!0;break;default:s=this.data?.[e]||null}return s}static removeItem(e){let t=!1;if(!0===e.startsWith("@")){const{key:s,path:a}=e.match(this.#e)?.groups;e=s;let o=this.getItem(e);"object"!=typeof o&&(o={}),keyValue=Lodash.unset(o,a),t=this.setItem(e,o)}else switch(this.#t()){case"Surge":case"Loon":case"Stash":case"Egern":case"Shadowrocket":case"Node.js":default:t=!1;break;case"Quantumult X":t=$prefs.removeValueForKey(e)}return t}static clear(){let e=!1;switch(this.#t()){case"Surge":case"Loon":case"Stash":case"Egern":case"Shadowrocket":case"Node.js":default:e=!1;break;case"Quantumult X":e=$prefs.removeAllValues()}return e}static#s(e){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(e),s=this.path.resolve(process.cwd(),e),a=this.fs.existsSync(t),o=!a&&this.fs.existsSync(s);if(!a&&!o)return{};{const e=a?t:s;try{return JSON.parse(this.fs.readFileSync(e))}catch(e){return{}}}}}static#a(e=this.dataFile){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(e),s=this.path.resolve(process.cwd(),e),a=this.fs.existsSync(t),o=!a&&this.fs.existsSync(s),r=JSON.stringify(this.data);a?this.fs.writeFileSync(t,r):o?this.fs.writeFileSync(s,r):this.fs.writeFileSync(t,r)}}}class ENV{static name="ENV";static version="1.8.3";static about(){return console.log(`\n🟧 ${this.name} v${this.version}\n`)}constructor(e,t){console.log(`\n🟧 ${ENV.name} v${ENV.version}\n`),this.name=e,this.logs=[],this.isMute=!1,this.isMuteLog=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,t),this.log(`\n🚩 开始!\n${e}\n`)}environment(){switch(this.platform()){case"Surge":return $environment.app="Surge",$environment;case"Stash":return $environment.app="Stash",$environment;case"Egern":return $environment.app="Egern",$environment;case"Loon":let e=$loon.split(" ");return{device:e[0],ios:e[1],"loon-version":e[2],app:"Loon"};case"Quantumult X":return{app:"Quantumult X"};case"Node.js":return process.env.app="Node.js",process.env;default:return{}}}platform(){return"undefined"!=typeof $environment&&$environment["surge-version"]?"Surge":"undefined"!=typeof $environment&&$environment["stash-version"]?"Stash":"undefined"!=typeof module&&module.exports?"Node.js":"undefined"!=typeof $task?"Quantumult X":"undefined"!=typeof $loon?"Loon":"undefined"!=typeof $rocket?"Shadowrocket":"undefined"!=typeof Egern?"Egern":void 0}isNode(){return"Node.js"===this.platform()}isQuanX(){return"Quantumult X"===this.platform()}isSurge(){return"Surge"===this.platform()}isLoon(){return"Loon"===this.platform()}isShadowrocket(){return"Shadowrocket"===this.platform()}isStash(){return"Stash"===this.platform()}isEgern(){return"Egern"===this.platform()}async getScript(e){return await this.fetch(e).then((e=>e.body))}async runScript(e,t){let s=$Storage.getItem("@chavy_boxjs_userCfgs.httpapi");s=s?.replace?.(/\n/g,"")?.trim();let a=$Storage.getItem("@chavy_boxjs_userCfgs.httpapi_timeout");a=1*a??20,a=t?.timeout??a;const[o,r]=s.split("@"),i={url:`http://${r}/v1/scripting/evaluate`,body:{script_text:e,mock_type:"cron",timeout:a},headers:{"X-Key":o,Accept:"*/*"},timeout:a};await this.fetch(i).then((e=>e.body),(e=>this.logErr(e)))}initGotEnv(e){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,e&&(e.headers=e.headers?e.headers:{},void 0===e.headers.Cookie&&void 0===e.cookieJar&&(e.cookieJar=this.ckjar))}async fetch(e={}||"",t={}){switch(e.constructor){case Object:e={...t,...e};break;case String:e={...t,url:e}}e.method||(e.method="GET",(e.body??e.bodyBytes)&&(e.method="POST")),delete e.headers?.Host,delete e.headers?.[":authority"],delete e.headers?.["Content-Length"],delete e.headers?.["content-length"];const s=e.method.toLocaleLowerCase();switch(this.platform()){case"Loon":case"Surge":case"Stash":case"Egern":case"Shadowrocket":default:return e.timeout&&(e.timeout=parseInt(e.timeout,10),this.isSurge()||(e.timeout=1e3*e.timeout)),e.policy&&(this.isLoon()&&(e.node=e.policy),this.isStash()&&Lodash.set(e,"headers.X-Stash-Selected-Proxy",encodeURI(e.policy)),this.isShadowrocket()&&Lodash.set(e,"headers.X-Surge-Proxy",e.policy)),"boolean"==typeof e.redirection&&(e["auto-redirect"]=e.redirection),e.bodyBytes&&!e.body&&(e.body=e.bodyBytes,delete e.bodyBytes),await new Promise(((t,a)=>{$httpClient[s](e,((s,o,r)=>{s?a(s):(o.ok=/^2\d\d$/.test(o.status),o.statusCode=o.status,r&&(o.body=r,1==e["binary-mode"]&&(o.bodyBytes=r)),t(o))}))}));case"Quantumult X":return e.policy&&Lodash.set(e,"opts.policy",e.policy),"boolean"==typeof e["auto-redirect"]&&Lodash.set(e,"opts.redirection",e["auto-redirect"]),e.body instanceof ArrayBuffer?(e.bodyBytes=e.body,delete e.body):ArrayBuffer.isView(e.body)?(e.bodyBytes=e.body.buffer.slice(e.body.byteOffset,e.body.byteLength+e.body.byteOffset),delete object.body):e.body&&delete e.bodyBytes,await $task.fetch(e).then((e=>(e.ok=/^2\d\d$/.test(e.statusCode),e.status=e.statusCode,e)),(e=>Promise.reject(e.error)));case"Node.js":let t=require("iconv-lite");this.initGotEnv(e);const{url:a,...o}=e;return await this.got[s](a,o).on("redirect",((e,t)=>{try{if(e.headers["set-cookie"]){const s=e.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),t.cookieJar=this.ckjar}}catch(e){this.logErr(e)}})).then((e=>(e.statusCode=e.status,e.body=t.decode(e.rawBody,this.encoding),e.bodyBytes=e.rawBody,e)),(e=>Promise.reject(e.message)))}}time(e,t=null){const s=t?new Date(t):new Date;let a={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let t in a)new RegExp("("+t+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?a[t]:("00"+a[t]).substr((""+a[t]).length)));return e}msg(e=name,t="",s="",a){const o=e=>{switch(typeof e){case void 0:return e;case"string":switch(this.platform()){case"Surge":case"Stash":case"Egern":default:return{url:e};case"Loon":case"Shadowrocket":return e;case"Quantumult X":return{"open-url":e};case"Node.js":return}case"object":switch(this.platform()){case"Surge":case"Stash":case"Egern":case"Shadowrocket":default:return{url:e.url||e.openUrl||e["open-url"]};case"Loon":return{openUrl:e.openUrl||e.url||e["open-url"],mediaUrl:e.mediaUrl||e["media-url"]};case"Quantumult X":return{"open-url":e["open-url"]||e.url||e.openUrl,"media-url":e["media-url"]||e.mediaUrl,"update-pasteboard":e["update-pasteboard"]||e.updatePasteboard};case"Node.js":return}default:return}};if(!this.isMute)switch(this.platform()){case"Surge":case"Loon":case"Stash":case"Egern":case"Shadowrocket":default:$notification.post(e,t,s,o(a));break;case"Quantumult X":$notify(e,t,s,o(a));case"Node.js":}if(!this.isMuteLog){let a=["","==============📣系统通知📣=============="];a.push(e),t&&a.push(t),s&&a.push(s),console.log(a.join("\n")),this.logs=this.logs.concat(a)}}log(...e){e.length>0&&(this.logs=[...this.logs,...e]),console.log(e.join(this.logSeparator))}logErr(e){switch(this.platform()){case"Surge":case"Loon":case"Stash":case"Egern":case"Shadowrocket":case"Quantumult X":default:this.log("",`❗️ ${this.name}, 错误!`,e);break;case"Node.js":this.log("",`❗️${this.name}, 错误!`,e.stack)}}wait(e){return new Promise((t=>setTimeout(t,e)))}done(e={}){const t=((new Date).getTime()-this.startTime)/1e3;switch(this.log("",`🚩 ${this.name}, 结束! 🕛 ${t} 秒`,""),this.platform()){case"Surge":e.policy&&Lodash.set(e,"headers.X-Surge-Policy",e.policy),$done(e);break;case"Loon":e.policy&&(e.node=e.policy),$done(e);break;case"Stash":e.policy&&Lodash.set(e,"headers.X-Stash-Selected-Proxy",encodeURI(e.policy)),$done(e);break;case"Egern":case"Shadowrocket":default:$done(e);break;case"Quantumult X":e.policy&&Lodash.set(e,"opts.policy",e.policy),delete e["auto-redirect"],delete e["auto-cookie"],delete e["binary-mode"],delete e.charset,delete e.host,delete e.insecure,delete e.method,delete e.opt,delete e.path,delete e.policy,delete e["policy-descriptor"],delete e.scheme,delete e.sessionIndex,delete e.statusCode,delete e.timeout,e.body instanceof ArrayBuffer?(e.bodyBytes=e.body,delete e.body):ArrayBuffer.isView(e.body)?(e.bodyBytes=e.body.buffer.slice(e.body.byteOffset,e.body.byteLength+e.body.byteOffset),delete e.body):e.body&&delete e.bodyBytes,$done(e);break;case"Node.js":process.exit(1)}}}var Settings$2={Switch:!0},Default={Settings:Settings$2},Default$1=Object.freeze({__proto__:null,Settings:Settings$2,default:Default}),Settings$1={Switch:!0},WeChat={Settings:Settings$1},WeChat$1=Object.freeze({__proto__:null,Settings:Settings$1,default:WeChat}),Settings={Switch:!0,CountryCode:"TW",Carrier:"中華電信"},Configs={MCCMNC:{docomo:"44010",SoftBank:"44020",au:"44050",SKT:"45005",KT:"45008","LG U+":"45006","中国联通":"46001","中国移动":"46002","中国电信":"46003","中華電信":"46692","遠傳電信":"46693","台灣大哥大":"46697","台灣之星":"46699",Verizon:"310004",Rogers:"302720",Bell:"302610",Telus:"302220","T-Mobile":"310260","AT&T":"310410",Sprint:"310120"},TimeZone:{US:"America/New_York",TW:"Asia/Taipei",KR:"Asia/Seoul",JP:"Asia/Tokyo",CN:"Asia/Shanghai",DE:"Europe/Berlin",FR:"Europe/Paris",GB:"Europe/London",RU:"Europe/Moscow",IN:"Asia/Kolkata",SG:"Asia/Singapore",CA:"America/Toronto",BR:"America/Sao_Paulo",MX:"America/Mexico_City"}},TikTok={Settings:Settings,Configs:Configs},TikTok$1=Object.freeze({__proto__:null,Configs:Configs,Settings:Settings,default:TikTok}),Database$1=Database={Default:Default$1,WeChat:WeChat$1,TikTok:TikTok$1};function getStorage(e,t,s){let a=$Storage.getItem(e,s),o={};if("undefined"!=typeof $argument&&Boolean($argument)){let e=Object.fromEntries($argument.split("&").map((e=>e.split("=").map((e=>e.replace(/\"/g,""))))));for(let t in e)Lodash.set(o,t,e[t])}const r={Settings:s?.Default?.Settings||{},Configs:s?.Default?.Configs||{},Caches:{}};Array.isArray(t)||(t=[t]);for(let e of t)r.Settings={...r.Settings,...s?.[e]?.Settings,...o,...a?.[e]?.Settings},r.Configs={...r.Configs,...s?.[e]?.Configs},a?.[e]?.Caches&&"string"==typeof a?.[e]?.Caches&&(a[e].Caches=JSON.parse(a?.[e]?.Caches)),r.Caches={...r.Caches,...a?.[e]?.Caches};return function e(t,s){for(var a in t){var o=t[a];t[a]="object"==typeof o&&null!==o?e(o,s):s(a,o)}return t}(r.Settings,((e,t)=>("true"===t||"false"===t?t=JSON.parse(t):"string"==typeof t&&(t=t.includes(",")?t.split(",").map((e=>i(e))):i(t)),t))),r;function i(e){return e&&!isNaN(e)&&(e=parseInt(e,10)),e}}function setENV(e,t,s){console.log("☑️ Set Environment Variables","");let{Settings:a,Caches:o,Configs:r}=getStorage(e,t,s);return console.log(`✅ Set Environment Variables, Settings: ${typeof a}, Settings内容: ${JSON.stringify(a)}`,""),{Settings:a,Caches:o,Configs:r}}const $=new ENV("🍟 GetSomeFries: WeChat v0.3.0(1002) response"),url=new URL($request.url);$.log(`⚠ url: ${url.toJSON()}`,"");const METHOD=$request.method,HOST=url.hostname,PATH=url.pathname;$.log(`⚠ METHOD: ${METHOD}, HOST: ${HOST}, PATH: ${PATH}`,"");const FORMAT=($response.headers?.["Content-Type"]??$response.headers?.["content-type"]??$request.headers?.Accept??$request.headers?.accept)?.split(";")?.[0];$.log(`⚠ FORMAT: ${FORMAT}`,""),(async()=>{const{Settings:Settings,Caches:Caches,Configs:Configs}=setENV("GetSomeFries","WeChat",Database$1);switch($.log(`⚠ ${$.name}`,`Settings.Switch: ${Settings?.Switch}`,""),Settings.Switch){case!0:default:let body={};switch(FORMAT){case void 0:case"application/x-www-form-urlencoded":case"text/plain":default:case"application/x-mpegURL":case"application/x-mpegurl":case"application/vnd.apple.mpegurl":case"audio/mpegurl":break;case"text/xml":case"text/html":case"text/plist":case"application/xml":case"application/plist":case"application/x-plist":switch(body=(new DOMParser).parseFromString($response.body,FORMAT),PATH){case"cgi-bin/mmsupport-bin/readtemplate":break;case"cgi-bin/mmspamsupport-bin/newredirectconfirmcgi":let script=body?.querySelector("script")?.textContent?.trim();if(eval(script),cgiData?.url){let e=new URL(cgiData.url);switch(e?.hostname){case"mp.weixin.qq.com":default:break;case"qr.alipay.com":url.protocol="alipays",url.hostname="platformapi",url.pathname="startapp",url.searchParams.set("appId",20000067),url.searchParams.set("url",cgiData.url);break;case"www.taobao.com":case"taobao.com":case"www.tmall.com":case"tmall.com":case"c.tb.cn":case"m.tb.cn":case"s.tb.cn":case"t.tb.cn":case"tb.cn":url.protocol="taobao"}switch(e.protocol){case"alipays":case"taobao":default:if("Quantumult X"===$.platform())$response.status="HTTP/1.1 302 Temporary Redirect";else $response.status=302;$response.headers={Location:e.toString()},delete $response.body;break;case"http":case"https":$response=await $.fetch(cgiData.url)}}}case"text/vtt":case"application/vtt":case"text/json":case"application/json":case"application/protobuf":case"application/x-protobuf":case"application/vnd.google.protobuf":case"application/grpc":case"application/grpc+proto":case"application/octet-stream":}case!1:}})().catch((e=>$.logErr(e))).finally((()=>$.done($response)));
