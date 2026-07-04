# tab-killer · 标签杀手

当打开的网页太多时，自动关掉最老的标签页，让浏览器永远清爽！

现已支持 **Chrome**、**Chromium** 和 **Safari**！

🌐 [English](README.md) | 中文

> 浏览器扩展，自动管理标签页，保持浏览器清爽。支持 Chrome、Chromium 和 Safari。

---

## Safari

![safari-tab-killer](safari-tab-killer.png)

<video src="safari-tab-killer.mp4" controls width="100%"></video>

### 安装 (仅限 macOS，需 Xcode)

项目已包含 Safari Web Extension。构建安装：

```bash
cd safari-tab-killer
xcrun safari-web-extension-converter . --macos-only --app-name "TabsKiller"
```

然后打开生成的 Xcode 项目，选择开发团队，构建运行 (⌘R)。扩展会出现在 Safari → 偏好设置 → 扩展中。

也可以直接在 Xcode 中打开 `safari-tab-killer/TabsKiller.xcodeproj`，配置签名后运行。

---

## Chrome

### 快速安装

从 Chrome 商店安装：

[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/hgmdeeoighmhomddlghfjcidkdcpbllf)](https://chromewebstore.google.com/detail/tabs-killer/hgmdeeoighmhomddlghfjcidkdcpbllf)

### 手动安装

1. 打开 Chrome，地址栏输入 `chrome://extensions` 并回车
2. 开启右上角的 **开发者模式**
3. 点击 **加载已解压的扩展程序**，选择 `chrome-tab-killer/` 目录

![chrome](https://cloud.githubusercontent.com/assets/5022872/10262586/ddc451b0-6a00-11e5-8b10-da16c9658221.jpg)

---

## 功能

1. 当打开的标签页超过设定数量时，自动关闭最老的标签页
2. 可自定义最大标签数量
3. 可设置 URL 锁定规则，匹配规则的标签页不会被关闭

---

## 由来

我经常打开很多标签页，然后一次次按 Ctrl+W 一个个关掉。重复又重复。于是我想写个扩展解决这个问题。后来发现了 "Tab Wrangler" 扩展，它会关掉一段时间不活跃的标签页。我借鉴了它的思路，做了一个当标签超过上限就自动关闭最老标签页的扩展，并加了 URL 锁定功能保护重要页面。它帮我省了很多事，标签页再也不会堆积如山了。希望你也喜欢。

—— 智维，2016 ⸱ 2026 Safari 版
