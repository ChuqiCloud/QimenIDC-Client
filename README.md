应用仓库中的目录格式以及意义如下所示：
```.
├── application-id.yaml #应用定义，启动顺序
├── components
│   ├── component-A.yaml #服务定义
│   └── component-B.yaml
├── configs
│   └── configmap-A.yaml #配置定义
├── dashboards
│   └── app-dashboard-A.yaml #应用级自定义监控面板
├── db-migrations
│   ├── ${db}
│   │   └── $timestamp.sql #数据库变更脚本
│   └── snapshot.yaml #数据库模型的结构化快照
├── environments
│   ├── prod
│   │   ├── component-configs
│   │   │   └── component-A.yaml #环境中-服务配置覆盖
│   │   ├── dashboards
│   │   │   └── dashboard-B.yaml #环境级自定义监控面板
│   │   └── env-prod.yaml #环境定义
│   └── testing
│       ├── configs
│       │   └── configmap-A.yaml #环境中-配置文件覆盖
│       └── env-testing.yaml
├── pipelines
│   └── pipeline-A.yaml #部署流程 
├── strategies
│   └── canary.yaml #部署策略
└── versions
    └── ${versionId}.yaml #版本定义，包含应用镜像变更，数据库变更文件和顺序
```