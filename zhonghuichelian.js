const appName = 'zhonghuichelian'; // 换为当前app分配的 appId 或 openKey
window[appName] = {
   getLocation(params, resCallBack) {
    // 内部逻辑可任意修改，只需保证 最后通过 resCallBack 方法将经纬度回传即可
    // 以下内容作为参考，具体交互逻辑以当前APP自定义为准
    const ua = window.navigator.userAgent.toLowerCase();
      if (/android/.test(ua)) {
      // android 逻辑处理

      // 如需转换参数格式为 string
      const paramsStr = JSON.stringify(params);
      // 如需定义全局callbackName
      window.locationCallback = function(lng, lat) {
        resCallBack({lng, lat});
      }
      // 调用Android交互方法：通过字符串参数交互
      window.thirdAPPLocation(params, 'locationCallback');
    } else {
      // IOS 逻辑处理

      // 如需定义全局callbackName
      window.locationCallback = function(lng, lat) {
        resCallBack({lng, lat});
      }
      // 调用IOS交互方法：通过JSON对象交互
      window.webkit.messageHandlers.app.postMessage({
        action: 'getLocation',
        callbackName: 'locationCallback'
      });
    }
  },
    launchNav(params) {
   // do something
    },
  setReferer(params) {
    // do something
  }
}