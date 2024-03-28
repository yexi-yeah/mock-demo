## Installation

```bash
$ yarn install
```

--mock
  --controllers
    --api.js
  --app.js
  --controller.js

## Running the app

```bash
# mock
$ yarn run mock
```

- 将mock目录放置于项目中
- 配置controllers的api.js的你需要的mock数据格式，可安装mockjs造数据
- yarn run mock
- 配置 api.js 和 vue.config.js

```js
// api.js
import request from "@/utils/request";
const api =  window.$globalConfig.isMock && isDev ? "mock" : window.$globalConfig.api;

export function mockGet(params) {
  return request({
    url: api + "/declare-manage/manage/qualification/listApply", // mock request
    method: "get",
    params,
  });
}

// POST /declare-manage/inoculateBill/listBillUserPage
export function listBillUserPage(data) {
  return request({
    url: api + "/declare-manage/inoculateBill/listBillUserPage", // mock request
    method: "post",
    data,
  });
}
```

```js
// vue.config.js
  devServer: {
    proxy: {
      [process.env.VUE_APP_BASE_API + '/mock']: {
        target: 'http://192.168.199.112:5000', // 本地mock环境
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API+ '/mock']: ''
        }
      },
      [process.env.VUE_APP_BASE_API]: {
        target: 'http://192.168.66.81:8886', // 开发环境
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  },
```
