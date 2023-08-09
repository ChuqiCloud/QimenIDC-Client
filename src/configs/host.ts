export default {
  mock: {
    // 本地mock数据
    API: '',
  },
  development: {
    // 开发环境接口请求
    API: 'http://idc.chuqiyun.com:8088/admin',
  },
  test: {
    // 测试环境接口地址
    API: 'http://idc.chuqiyun.com:8088/admin',
  },
  release: {
    // 正式环境接口地址
    API: 'http://idc.chuqiyun.com:8088/admin',
  },
  site: {
    // TDesign部署特殊需要 与release功能一致
    API: 'http://idc.chuqiyun.com:8088/admin',
  },
};
