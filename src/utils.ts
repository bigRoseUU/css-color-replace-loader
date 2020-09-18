
/**
 * 方便使用vue-cli的项目批量在css-loader前插入loader配置
 * @param config 
 * @param loaderName 
 * @param loader 
 */
export function insertBeforeLoader (config: any, loaderName: string, loader: any) {

  config.module.rules.forEach((rule: any) => {
    if (rule.use) {
      insertLoader(rule.use, loaderName, loader);
    }
    if (rule.oneOf) {
      rule.oneOf.forEach((item: any) =>
        insertLoader(item.use, loaderName, loader)
      );
    }
  });

  function insertLoader(loaderList: any, loaderName: any, insertLoader: any) {
    let loaderIndex = -1;
  
    for (let i = 0; i < loaderList.length; i++) {
      if (loaderList[i].loader.indexOf(loaderName) !== -1) {
        loaderIndex = i;
        break;
      }
    }
  
    if (loaderIndex >= 0) {
      loaderList.splice(loaderIndex, 0, insertLoader);
    }
  }
}