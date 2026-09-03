<div align="center">
  <img src="https://raw.githubusercontent.com/sunbigfly/image-insight/main/figures/logo.svg" width="52%" alt="图像深读 · Image Insight">
  <br>
  <strong>让网页图片从“看见”变成“看懂”</strong>
  <br><br>
  <a href="https://greasyfork.org/zh-CN/scripts/594142-%E5%9B%BE%E5%83%8F%E6%B7%B1%E8%AF%BB-image-insight"><img alt="安装脚本" src="https://img.shields.io/badge/Greasy%20Fork-安装脚本-536af5"></a>
  <img alt="版本" src="https://img.shields.io/badge/version-1.0.2-536af5">
  <a href="https://github.com/sunbigfly/image-insight/blob/main/LICENSE"><img alt="许可证" src="https://img.shields.io/badge/license-MIT-f5de53"></a>
</div>

---

### 1. 介绍

图像深读是一款网页图片解析用户脚本。它会在图片旁生成可视化批注，呈现原文、翻译与上下文含义，并支持围绕图片继续提问。

### 2. 核心能力

- **区域解析**：识别图片中的文字、对象、关系与语气。
- **可视化批注**：通过锚点、连线与信息卡定位解析内容。
- **上下文理解**：结合帖子、评论或页面内容解释图片。
- **连续对话**：基于图片与解析结果继续提问。
- **站点接入**：内置 Reddit 与 X/Twitter 图片嗅探，可为其他站点自定义解析入口。
- **本地历史**：保存解析记录与压缩预览，不保存原图。
- **批量处理**：一次联合解析最多 8 张图片。

### 3. 快速开始

1. [从 Greasy Fork 安装脚本](https://greasyfork.org/zh-CN/scripts/594142-%E5%9B%BE%E5%83%8F%E6%B7%B1%E8%AF%BB-image-insight)。
2. 从油猴菜单打开设置，填写兼容 OpenAI Responses API 的地址与密钥。
3. 将鼠标移到网页图片上，点击识图按钮。

内置嗅探仅覆盖 Reddit 与 X/Twitter。其他网站可在设置中新增自定义 `@match` 与图片选择器；同一 Match 需添加到 Tampermonkey 的“用户匹配”后生效。

### 4. 隐私

只有主动解析时才会发送图片及可查看的页面上下文。API Key 仅保存在油猴脚本存储中，不写入网页、历史记录或导出内容。

### 5. License

本项目采用 [MIT License](https://github.com/sunbigfly/image-insight/blob/main/LICENSE)。
