// ==UserScript==
// @name         [DEV] 图像深读 · Local Loader
// @namespace    local.image-insight.dev
// @version      1.3.3.1
// @description  从本地 HTTP 服务加载图像深读主脚本，用于开发调试。
// @match        http://*/*
// @match        https://*/*
// @run-at       document-start
// @noframes
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_registerMenuCommand
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @connect      *
// @require      http://localhost:8765/main.js?v=1.3.3.1
// ==/UserScript==

/*
 * 启动本地服务：
 *   cd /home/sunbigfly/mywork/image-insight
 *   python3 -m http.server 8765 --bind 127.0.0.1
 *
 * Tampermonkey 中只启用本 Loader，关闭正式版脚本，避免重复注入。
 * main.js 更新后递增 @require 的 v 参数并重新保存 Loader，以刷新依赖缓存。
 * Loader 已匹配全部 HTTP(S) 页面；自定义网站是否显示图片或视频入口由 main.js 中保存的站点规则决定。
 */

console.info('[图像深读 DEV] main.js 已通过本地 @require 加载。');
