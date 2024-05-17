import _ from './ENV/Lodash.mjs'
import $Storage from './ENV/$Storage.mjs'
import ENV from "./ENV/ENV.mjs";

import Database from "./database/index.mjs";
import setENV from "./function/setENV.mjs";

const $ = new ENV("🍟 GetSomeFries: ▶️ YouTube v0.1.0(1004) response.beta");

/***************** Processing *****************/
// 解构URL
const url = new URL($request.url);
$.log(`⚠ url: ${url.toJSON()}`, "");
// 获取连接参数
const METHOD = $request.method, HOST = url.hostname, PATH = url.pathname;
$.log(`⚠ METHOD: ${METHOD}, HOST: ${HOST}, PATH: ${PATH}` , "");
// 解析格式
const FORMAT = ($response.headers?.["Content-Type"] ?? $response.headers?.["content-type"] ?? $request.headers?.Accept ?? $request.headers?.accept)?.split(";")?.[0];
$.log(`⚠ FORMAT: ${FORMAT}`, "");
!(async () => {
	const { Settings, Caches, Configs } = setENV("GetSomeFries", "YouTube", Database);
	$.log(`⚠ ${$.name}`, `Settings.Switch: ${Settings?.Switch}`, "");
	switch (Settings.Switch) {
		case true:
		default:
			// 创建空数据
			let body = {};
			// 格式判断
			switch (FORMAT) {
				case undefined: // 视为无body
					break;
				case "application/x-www-form-urlencoded":
				case "text/plain":
				default:
					break;
				case "application/x-mpegURL":
				case "application/x-mpegurl":
				case "application/vnd.apple.mpegurl":
				case "audio/mpegurl":
					//body = M3U8.parse($response.body);
					//$.log(`🚧 ${$.name}`, `body: ${JSON.stringify(body)}`, "");
					//$response.body = M3U8.stringify(body);
					break;
				case "text/xml":
				case "text/html":
				case "text/plist":
				case "application/xml":
				case "application/plist":
				case "application/x-plist":
					$.log(`🚧 ${$.name}`, `body: ${$response.body}`, "");
					//body = new DOMParser().parseFromString($response.body, FORMAT);
					//$.log(`🚧 ${$.name}`, `body: ${JSON.stringify(body)}`, "");
					// 路径判断
					switch (PATH) {
						case "/watch":
							$response.body = $response.body.replace('"contextId":"WEB_PLAYER_CONTEXT_CONFIG_ID_KEVLAR_WATCH",','"contextId":"WEB_PLAYER_CONTEXT_CONFIG_ID_KEVLAR_WATCH","controlsType":"3",');
							$response.body = $response.body.replace('"platform":"DESKTOP",','"platform":"MOBILE",');
							//let script = body.querySelector("head > script:nth-child(22)");
							//$.log(`🚧 ${$.name}`, `script: ${JSON.stringify(script)}`, "");
							//$.log(`🚧 ${$.name}`, `cgiData: ${JSON.stringify(cgiData ?? undefined)}`, "");
							//document.getElementById("movie_player").classList.add("ytp-hide-controls");
							//document.getElementById("movie_player").classList.add("ytp-native-controls");
							//document.getElementById("movie_player").classList.remove("ytp-branding-shown");
							//document.getElementById("video").classList.remove("ytp-branding-shown");
							//class="branding-img-container ytp-button"
							//#movie_player > div:nth-child(30) > div > button
							break;
					};
					//$.log(`🚧 ${$.name}`, `body: ${JSON.stringify(body)}`, "");
					//$response.body = new XMLSerializer().serializeToString(body);
					break;
				case "text/vtt":
				case "application/vtt":
					//body = VTT.parse($response.body);
					//$.log(`🚧 ${$.name}`, `body: ${JSON.stringify(body)}`, "");
					//$response.body = VTT.stringify(body);
					break;
				case "text/json":
				case "application/json":
					//body = JSON.parse($request.body ?? "{}");
					//$.log(`🚧 ${$.name}`, `body: ${JSON.stringify(body)}`, "");
					//$request.body = JSON.stringify(body);
					break;
				case "application/protobuf":
				case "application/x-protobuf":
				case "application/vnd.google.protobuf":
				case "application/grpc":
				case "application/grpc+proto":
				case "application/octet-stream":
					break;
			};
			break;
		case false:
			break;
	};
})()
	.catch((e) => $.logErr(e))
	.finally(() => $.done($response))
