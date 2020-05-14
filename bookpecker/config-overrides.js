const { override, fixBabelImports,addLessLoader} = require('customize-cra');

// module.exports = function override(config, env) {
//     // do stuff with the webpack config...
//     return config;
//   };


// 使用 babel-plugin-import 按需加载
module.exports = override(
    fixBabelImports('antd', {
        libraryDirectory: 'es',
        // style: 'css', //处理编译以后的css文件
        style: true, //处理原本的less文件
    }),
    // 变更主题色
    /*
    @primary-color: #1890ff; // 全局主色
    @link-color: #1890ff; // 链接色
    @success-color: #52c41a; // 成功色
    @warning-color: #faad14; // 警告色
    @error-color: #f5222d; // 错误色
    @font-size-base: 14px; // 主字号
    @heading-color: rgba(0, 0, 0, 0.85); // 标题色
    @text-color: rgba(0, 0, 0, 0.65); // 主文本色
    @text-color-secondary: rgba(0, 0, 0, 0.45); // 次文本色
    @disabled-color: rgba(0, 0, 0, 0.25); // 失效色
    @border-radius-base: 4px; // 组件/浮层圆角
    @border-color-base: #d9d9d9; // 边框色
    @box-shadow-base: 0 2px 8px rgba(0, 0, 0, 0.15); // 浮层阴影
    */

    addLessLoader({
        // lessOptions: { // If you are using less-loader@5 please spread the lessOptions to options directly
          javascriptEnabled: true,
          modifyVars: { 
            '@primary-color': '#BCD0A7',
            '@heading-color':'rgba(46, 50, 44,0.85)',
            '@text-color':'rgba(46, 50, 44,0.65)',
            '@text-color-secondary':'rgba(46, 50, 44,0.45)',
        },
        // },
    }),
);