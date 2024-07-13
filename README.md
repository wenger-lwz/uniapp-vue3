# pj-uniapp-web-back

> A uniApp + Vue3 + vite + tailwindcss  project

#### 启动命令

```
yarn dev:h5 || npm run dev:h5 (通过网页预览项目)
```

#### 打包项目

```
yarn build:h5 || npm run build:h5 (打包生成H5代码)

......更多打包命令查看package.json
```

#### 生成android|IOS包资源

```
使用HbuilderX => 发行 => 原生App 本地打包 => 生成本地打包App资源
```

#### android|IOS项目预览

```
参考uni官网 下载安装APP原生工程及开发工具
官网地址[https://nativesupport.dcloud.net.cn/AppDocs/]
```

#### 更多拓展

```
脚手架开发可安装第三方库
```

```
   <uni-popup ref="alertDialog" type="dialog" >
      <uni-popup-dialog type="warn" cancelText="关闭" confirmText="同意" title="通知" content="是否登陆" @confirm="dialogConfirm"
                        @close="dialogConfirm"></uni-popup-dialog>
    </uni-popup>
    
    let alertDialog=ref()
    
    alertDialog.value.open()
```

#### env配置说明
* 在`vite-config.js`中，可以使用`loadEnv`方法获取相应配置，详情请看相应文件注释掉的代码
* 在代码中可以使用`import.meta.env.[env变量名]`获取