# LineBot 搭配 NestJS 後端

## 專案介紹

封裝 line-sdk 的功能，分別針對不同的訊息封裝成物件處理，搭配 LineBot Reply 分享使用。

> [LineBot 分享文件](https://hackmd.io/FvkDLxfCQfSJekSJd4gzfQ)

## 專案結構說明

主要以修改  line-event-handler.service.ts 檔案中處理 Message 事件的方法替換，就可以感受 LineBot 回應的不同。

```text
LINE-BOT
├── src
│   ├── config // 放置 LINEBOT 設定檔案(讀取環境變數檔案)
│   ├── line-event-handler // 處理 LinePlatform 透過 /webhook 傳入的事件(event)
│   │   ├── line-event-handler.service.ts  // 目前僅處理 follow(加入) & message(訊息) 事件
│   ├── service
│   │   ├── message.service.ts // 將各種訊息處理的方法獨立成全域使用
│   ├── type // 放置 TS 所需的型別
│   │   ├── enum // 枚舉類型
│   │   ├── message // 個別訊息 TS type
│   │   ├── express.d.ts // express 擴展使用
│   │   ├── message-req.ts // 搭配 message.service 使用，所有方法傳入的物件型別
│   ├── global.module.ts  // 透過 global 模組將 message 服務注入根模組，達到全域使用效果
│   ├── line.middleware.ts // 處理進入 /webhook 路由處理之前的驗證
│   ├── app.module.ts // 根模組
│   ├── main.ts // 啟動檔案

```
## 安裝方式

```bash=
npm install
```

## 使用版本

* nodejs - v18.19.1
* npm - 10.9.2

## 設定環境變數

### 根據 .env.example 的格式，分別將已註冊的 LineBot Channel secret 及 Channel access token 放入

* **Channel secret**：主要負責驗證 client 端發出請求至 /webhook route，透過 Request header 判斷 Line platform X-Line-Signature。(可於 LINE Develop Basic settings 標籤下取得)
* **Channel access token**：主要用於驗證 Bot Server 身份。(可於 LINE Develop Messaging API 標籤下取得)

## 啟動方式

啟用了 Nest.js 的熱重載(Hot Reload)模式，程式碼更新的情況下，會自動更新並重新啟動

伺服器預設使用：<http://localhost:3000>

```bash=
npm run start:dev
```

### 成功啟動畫面

![NestJS 後台成功啟動畫面](https://res.cloudinary.com/dseg0uwc9/image/upload/v1741190804/20250305%20LINEBOT%20%E6%87%89%E7%94%A8%E5%88%86%E4%BA%AB/messageImage_1741190789118_e95uqm.jpg)

## 打包方式

```bash=
npm run build
```
