<div align="center">
  <img src="https://raw.githubusercontent.com/sunbigfly/image-insight/main/figures/logo.svg" width="52%" alt="图像深读 · Image Insight">
  <br>
  <strong>让网页图片、GIF 与视频从“看见”变成“看懂”</strong>
  <br><br>
  <a href="https://greasyfork.org/zh-CN/scripts/594142-%E5%9B%BE%E5%83%8F%E6%B7%B1%E8%AF%BB-image-insight"><img alt="安装脚本" src="https://img.shields.io/badge/Greasy%20Fork-安装脚本-536af5"></a>
  <img alt="版本" src="https://img.shields.io/badge/version-1.1.6-536af5">
  <a href="https://github.com/sunbigfly/image-insight/blob/main/LICENSE"><img alt="许可证" src="https://img.shields.io/badge/license-MIT-f5de53"></a>
</div>

---

图像深读是一款用户主动触发的网页媒体解析脚本。它把图片、GIF 和视频字幕转换为可定位的中文批注、双语字幕与上下文解读，并允许围绕画面局部继续追问。

## 1.1.5 重点更新

- **视频先字幕、后深读**：首次触发优先读取页面 CC；没有可用字幕时可转写音轨，分批生成播放器内双语字幕。只有再次点击“解析视频内容”，才会提取关键帧并生成整体解读。
- **GIF 时间序列理解**：本地预览保留原动图，模型侧按时长和画面变化选取最多 9 张关键帧，以压缩时间板理解动作与前后变化。
- **按需深度线索**：基础解析完成后，可单独补充可能来源，以及地点、时代、物种、商品、人物或真实性等与当前内容有关的线索。
- **任务队列与上传门禁**：图片和视频最多同时处理 2 个任务，其余任务自动排队；所有视觉输入在发出前统一检查尺寸、像素、编码体积与视觉 patch 数。

## 能力一览

### 图片与 GIF

- 识别文字、对象、关系与语气，通过锚点、连线和信息卡定位到原画面。
- 分层展示原文、中文翻译和含义，并结合帖子、评论或页面文本解释上下文。
- 支持锚点、方框、圆形、自由画笔和箭头选区，针对局部连续提问。
- 最多选择 9 张图片，紧密拼接为最多 3×3 的联合图后统一分析。
- GIF 按时间与画面差异挑选关键帧，不放大低清原帧；高清原动图只用于本地预览。

### 视频与双语字幕

- 优先读取 Reddit 原生 VTT、浏览器 `textTracks`、`<track>` WebVTT 及公开 HLS/DASH 字幕。
- 没有可读取的页面 CC 时，可调用兼容 OpenAI Audio Transcriptions 的接口转写音轨；设置中提供 Groq 快速配置和转写模型筛选。
- 先显示快速临时译文，再由 AI 流式翻译逐条覆盖；最终历史只保存 AI 译文。
- 中文译文显示在上方，原文显示在下方；字幕保持原时间轴，不把整段译文重复填入每个 cue。
- 用户主动解析视频内容后，按字幕对话轮次提取最多 9 张关键帧，结合字幕判断教程、访谈、影视、搞笑视频等内容的真实结构。
- Reddit 分离的视频与音轨可同步播放。

### 对话、历史与站点

- 对话会沿用媒体、基础解析、字幕、页面上下文与 Responses 会话链。
- 双语字幕完成后立即建立本地视频会话；后续视频深读会在同一条记录中补全关键帧和整体结论。
- 本地历史支持搜索、筛选和跨站宫格浏览；相同图片可命中本地解析缓存。
- 默认启用 Reddit 与 X/Twitter；其他网站可通过 URL 匹配与内容容器选择器添加站点规则。

## 使用方法

1. [从 Greasy Fork 安装脚本](https://greasyfork.org/zh-CN/scripts/594142-%E5%9B%BE%E5%83%8F%E6%B7%B1%E8%AF%BB-image-insight)。
2. 从油猴菜单打开设置，填写兼容 OpenAI Responses API 的地址、API Key 和模型。
3. 如需为无页面 CC 的视频生成字幕，再配置兼容 `/audio/transcriptions` 的转写接口；也可直接使用 Groq 快速配置。
4. 将鼠标移到媒体上并点击入口；触屏设备可长按触发。图片和 GIF 会直接解析，视频会先生成双语字幕。
5. 需要理解视频画面与完整内容时，点击播放器下方的“解析视频内容”。

脚本会注入 HTTP(S) 页面，但只有命中内置或自定义站点规则的媒体才显示入口。未配置的站点不会嗅探媒体。

## 数据与隐私

只有主动操作才会读取和发送对应材料：

| 操作 | 可能发送的数据 |
| --- | --- |
| 解析图片或 GIF | 压缩后的图片或关键帧时间板，以及可查看的页面上下文，发送至已配置的视觉模型接口 |
| 生成视频字幕 | 优先在页面内读取 CC；没有 CC 且已启用自动转写时，将可读取的媒体发送至转写接口 |
| 翻译字幕 | 字幕文本发送至已配置的模型接口；首批临时译文会使用谷歌网页翻译接口 |
| 解析视频内容 | 视频关键帧、字幕和可查看的页面上下文，发送至已配置的视觉模型接口 |

API Key 保存在油猴脚本存储中，不写入网页、历史记录或导出内容，但脚本存储并不是加密保险箱。本地历史保存解析结果、字幕和压缩预览，不保存原始媒体。

## 输入限制与兼容性

- 视觉输入会限制为长边不超过 2048px、总像素约 4MP、编码体积不超过 4MB；审核未通过时不会发起模型请求。PPI 只是打印密度元数据，不参与网页上传尺寸判断。
- 转写接口通常可直接接收 25MB 以内的 MP4、WebM 等媒体；超限时脚本会尝试在本地提取 16kHz 单声道 WAV。
- DRM、加密媒体流、分段音轨、跨域画面或封闭播放器可能无法读取。
- GIF 关键帧解析依赖浏览器的 `ImageDecoder` 能力，建议使用新版 Chromium 浏览器。
- 模型和转写服务的计费、数据保留与可用性由相应服务商决定。

## 本地调试

```bash
cd /home/sunbigfly/mywork/image-insight
python3 -m http.server 8765 --bind 127.0.0.1
```

在 Tampermonkey 中安装并启用 [`dev.user.js`](dev.user.js)，同时关闭正式版脚本。修改 `main.js` 后递增 Loader 中 `@require` 的 `v` 参数并重新保存，即可刷新本地依赖缓存。

## License

本项目采用 [MIT License](https://github.com/sunbigfly/image-insight/blob/main/LICENSE)。
