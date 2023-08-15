export default {
  mock: {
    // 本地mock数据
    API: '',
  },
  development: {
    // 开发环境接口请求
    API: 'https://idc.chuqiyun.com/admin',
  },
  test: {
    // 测试环境接口地址
    API: 'https://idc.chuqiyun.com/admin',
  },
  release: {
    // 正式环境接口地址
    API: 'https://idc.chuqiyun.com/admin',
  },
  site: {
    // TDesign部署特殊需要 与release功能一致
    API: 'https://idc.chuqiyun.com/admin',
  },
};
