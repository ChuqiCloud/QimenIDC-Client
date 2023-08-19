/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Group {
  id: number;
  /** 地区名 */
  name: string;
  /** 父级节点id */
  parent?: number | null;
  /** 目录级别，0为顶级，1为子级 */
  realm: number;
}

export interface Os {
  id: number;
  /** 系统名称（别称） */
  name: string;
  /** 镜像文件全名 */
  fileName: string;
  /** 镜像类型[windows，linux] */
  type: string;
  /** 镜像架构【x86_64，aarch64】 */
  arch: string;
  /** 镜像操作系统【centos,debian,ubuntu,alpine,fedora,opensuse,archlinux等】 */
  osType: string;
  /** 0=url下载;1=手动上传，该字段禁止修改 */
  downType: number;
  url: string;
  /** 镜像大小禁止修改 */
  size: string;
  /** 路径 */
  path: string;
  /** cloud-init【0=不使用;1=使用】 */
  cloud: number;
  /** 0:正常 1:停用 2:异常 */
  status: number;
}

export interface VmParams {
  /** 节点ID */
  nodeid: number;
  /** 虚拟机名 */
  hostname: string;
  /** 插槽数，默认为1 */
  sockets?: number | null;
  /** 核心，默认1 */
  cores?: number | null;
  /** 线程数，默认1 */
  threads?: number | null;
  /** 是否开启嵌套虚拟化，默认关闭 */
  nested?: boolean | null;
  /** cpu类型，默认kvm64，如果开启了nested，cpu必须为host或max */
  cpu?: string | null;
  /** cpu限制(单位:百分比)，列：10 为10% */
  cpuUnits?: number | null;
  /** 系统架构(x86_64,arrch64)，默认x86_64 */
  arch?: string | null;
  /** acpi 默认1 开启 */
  acpi?: string | null;
  /** 内存 单位Mb，默认512 */
  memory?: number | null;
  /** PVE磁盘名，auto为自动 */
  storage: string;
  /** 系统盘大小，单位Gb */
  systemDiskSize: number;
  dataDisk?: string;
  /** 网桥 */
  bridge?: string | null;
  ipConfig?: string;
  /** 操作系统，可填镜像名称或id */
  os: string;
  /** 操作系统类型，（win|linux） */
  osType: string;
  /** 带宽，单位Mbps */
  bandwidth: number;
  /** 是否开机自启 0:否 1:是，默认0关闭 */
  onBoot?: number | null;
  /** 虚拟机登录用户名 */
  username?: string | null;
  /** 虚拟机登录密码 */
  password: string;
  /** 到期时间，时间戳 */
  expirationTime?: number | null;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = '';
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join('&');
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : '';
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string') ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== 'string' ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title ProxmoxVE-AMS
 * @version 1.0.0
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  adminPath = {
    /**
     * @description 新增api key，该appkey只会本次显示，后续查询将不显示
     *
     * @tags 后台/API管理
     * @name InsertApiKeyCreate
     * @summary 添加API key
     * @request POST:/{adminPath}/insertApiKey
     */
    insertApiKeyCreate: (
      adminPath: string,
      data: {
        /** 备注 */
        info?: string | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: number;
          message: string;
          data: {
            id: number;
            appid: string;
            appkey: string;
            info: string;
            createDate: number;
          };
        },
        any
      >({
        path: `/${adminPath}/insertApiKey`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 登陆接口，
     *
     * @tags 后台/登录鉴权
     * @name LoginDoCreate
     * @summary 登陆接口
     * @request POST:/{adminPath}/loginDo
     */
    loginDoCreate: (
      adminPath: string,
      data: {
        username: string;
        password: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<object, any>({
        path: `/${adminPath}/loginDo`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 添加超管账号
     *
     * @tags 后台/超管账号管理
     * @name RegisterDoCreate
     * @summary 添加超管账号
     * @request POST:/{adminPath}/registerDo
     */
    registerDoCreate: (
      adminPath: string,
      data: {
        phone: string;
        password: string;
        email: string;
        username: string;
        name: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: number;
          message: string;
          data: string;
        },
        any
      >({
        path: `/${adminPath}/registerDo`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 根据掩码位批量插入IP到IP池，并创建IP池
     *
     * @tags 后台/IP池管理
     * @name InsertIpPoolByMaskCreate
     * @summary 根据掩码位批量插入IP
     * @request POST:/{adminPath}/insertIpPoolByMask
     */
    insertIpPoolByMaskCreate: (
      adminPath: string,
      data: {
        /** 池名 */
        poolName: string;
        /** 绑定节点ID */
        nodeId: number;
        /** 网关 */
        gateway: string;
        /** 掩码位，如：24 */
        mask: number;
        dns1: string;
        dns2: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<object, any>({
        path: `/${adminPath}/insertIpPoolByMask`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 根据IP范围批量插入IP到已创建的IP池
     *
     * @tags 后台/IP池管理
     * @name InsertIpPoolByRangeCreate
     * @summary 根据IP范围批量插入IP
     * @request POST:/{adminPath}/insertIpPoolByRange
     */
    insertIpPoolByRangeCreate: (
      adminPath: string,
      data: {
        /** IP池ID */
        poolId: number;
        /** 起始IP */
        startIp: string;
        /** 结束IP */
        endIp: string;
        /** dns1 */
        dns1: string;
        /** dns2 */
        dns2: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<object, any>({
        path: `/${adminPath}/insertIpPoolByRange`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 分页查询IP池列表
     *
     * @tags 后台/IP池管理
     * @name SelectIpPoolListDetail
     * @summary 分页查询IP池列表
     * @request GET:/{adminPath}/selectIpPoolList
     */
    selectIpPoolListDetail: (
      adminPath: string,
      query?: {
        /**
         * 页码
         * @example "1"
         */
        page?: number;
        /**
         * 页数据量
         * @example "20"
         */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: number;
          message: string;
          data: {
            records: {
              id: number;
              name: string;
              gateway: string;
              mask: number;
              dns1: string;
              dns2: string;
              available: null;
              used: null;
              disable: null;
              nodeid: number;
            }[];
            total: number;
            size: number;
            current: number;
            orders: string[];
            optimizeCountSql: boolean;
            searchCount: boolean;
            maxLimit: null;
            countId: null;
            pages: number;
          };
        },
        any
      >({
        path: `/${adminPath}/selectIpPoolList`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description 查询指定IP池下的IP列表
     *
     * @tags 后台/IP池管理
     * @name SelectIpListByPoolIdDetail
     * @summary 查询指定IP池下的IP列表
     * @request GET:/{adminPath}/selectIpListByPoolId
     */
    selectIpListByPoolIdDetail: (
      adminPath: string,
      query?: {
        /**
         * IP池ID
         * @example "1"
         */
        poolid?: number;
        /**
         * 页码
         * @example "1"
         */
        page?: number;
        /**
         * 页数量
         * @example "50"
         */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: number;
          message: string;
          data: {
            records: {
              id: number;
              nodeId: number;
              vmId: null;
              poolId: number;
              ip: string;
              subnetMask: string;
              gateway: string;
              dns1: string;
              dns2: string;
              status: number;
            }[];
            total: number;
            size: number;
            current: number;
            orders: string[];
            optimizeCountSql: boolean;
            searchCount: boolean;
            maxLimit: null;
            countId: null;
            pages: number;
          };
        },
        any
      >({
        path: `/${adminPath}/selectIpListByPoolId`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description 更新IP池信息，支持post请求
     *
     * @tags 后台/IP池管理
     * @name UpdateIpPoolUpdate
     * @summary 更新IP池信息
     * @request PUT:/{adminPath}/updateIpPool
     */
    updateIpPoolUpdate: (
      adminPath: string,
      data: {
        id: number;
        name?: string | null;
        gateway?: string | null;
        mask?: number | null;
        dns1?: string | null;
        dns2?: string | null;
        /** 节点ID */
        nodeid?: number | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<object, any>({
        path: `/${adminPath}/updateIpPool`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 修改IP信息，可多个，支持post请求
     *
     * @tags 后台/IP池管理
     * @name UpdateIpUpdate
     * @summary 修改IP信息
     * @request PUT:/{adminPath}/updateIp
     */
    updateIpUpdate: (
      adminPath: string,
      data: {
        id: number;
        nodeId?: number | null;
        vmId?: number | null;
        poolId?: number | null;
        subnetMask?: string | null;
        gateway?: string | null;
        dns1?: string | null;
        dns2?: string | null;
        /** 0正常1正在使用2停止 */
        status?: number | null;
      }[],
      params: RequestParams = {},
    ) =>
      this.request<object, any>({
        path: `/${adminPath}/updateIp`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 获取在线系统列表
     *
     * @tags 后台/OS管理
     * @name SelectOsByOnlineDetail
     * @summary 获取在线系统列表
     * @request GET:/{adminPath}/selectOsByOnline
     */
    selectOsByOnlineDetail: (
      adminPath: string,
      query?: {
        /** @example "1" */
        page?: number;
        /** @example "20" */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<object, any>({
        path: `/${adminPath}/selectOsByOnline`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description 新增OS
     *
     * @tags 后台/OS管理
     * @name InsertOsCreate
     * @summary 手动新增OS
     * @request POST:/{adminPath}/insertOs
     */
    insertOsCreate: (
      adminPath: string,
      data: {
        /** 系统名称（别称，可自定义） */
        name: string;
        /** 文件全称，带后缀 */
        fileName: string;
        /** 镜像类型（win，linux） */
        type: string;
        /** 镜像架构（默认x86_64）[x86_64,arm64,arm64,armhf,ppc64el,riscv64,s390x,aarch64,armv7l] */
        arch?: string | null;
        /** 镜像系统类别名称，type为linux时必须填写[centos,debian,ubuntu,alpine,fedora,opensuse,ubuntukylin,other] */
        osType?: string | null;
        /** 添加类型（0=自动下载;1=手动上传），为0时url参数不能为空 */
        downType: number;
        /** 下载地址（downType为0时禁止为空） */
        url?: string | null;
        /** pve节点下储存路径，值为空或default则默认为/home/images */
        path?: string | null;
        /** 是否开启cloud-init（0=未开启，1=开启，默认为0） */
        cloud?: number | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: number;
          message: string;
          data: string;
        },
        any
      >({
        path: `/${adminPath}/insertOs`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 分页获取已添加OS
     *
     * @tags 后台/OS管理
     * @name SelectOsByPageDetail
     * @summary 分页获取已添加OS
     * @request GET:/{adminPath}/selectOsByPage
     */
    selectOsByPageDetail: (
      adminPath: string,
      query?: {
        /**
         * 页码
         * @example "1"
         */
        page?: number;
        /**
         * 每页数据量
         * @example "20"
         */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: number;
          message: string;
          data: {
            records: {
              id?: number;
              name?: string;
              fileName?: string;
              type?: string;
              arch?: string;
              osType?: string;
              nodeStatus?: null;
              downType?: number;
              url?: string;
              size?: string;
              path?: string;
              cloud?: number;
              status?: number;
              createTime?: number;
            }[];
            total: number;
            size: number;
            current: number;
            orders: string[];
            optimizeCountSql: boolean;
            searchCount: boolean;
            maxLimit: null;
            countId: null;
            pages: number;
          };
        },
        any
      >({
        path: `/${adminPath}/selectOsByPage`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description 分页带条件获取已添加os，该接口为模糊匹配
     *
     * @tags 后台/OS管理
     * @name SelectOsByPageAndConditionDetail
     * @summary 分页带条件获取已添加os
     * @request GET:/{adminPath}/selectOsByPageAndCondition
     */
    selectOsByPageAndConditionDetail: (
      adminPath: string,
      query: {
        /**
         * 页码
         * @example "1"
         */
        page?: number;
        /**
         * 每页数据量
         * @example "20"
         */
        size?: number;
        /**
         * 匹配参数
         * @example "osType"
         */
        param: string;
        /**
         * 匹配值
         * @example "ubuntu"
         */
        value: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: number;
          message: string;
          data: {
            records: {
              id?: number;
              name?: string;
              fileName?: string;
              type?: string;
              arch?: string;
              osType?: string;
              nodeStatus?: null;
              downType?: number;
              url?: string;
              size?: string;
              path?: string;
              cloud?: number;
              status?: number;
              createTime?: number;
            }[];
            total: number;
            size: number;
            current: number;
            orders: string[];
            optimizeCountSql: boolean;
            searchCount: boolean;
            maxLimit: null;
            countId: null;
            pages: number;
          };
        },
        any
      >({
        path: `/${adminPath}/selectOsByPageAndCondition`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description 分页获取集群节点列表
     *
     * @tags 后台/节点池管理
     * @name SelectNodeByPageDetail
     * @summary 分页获取集群节点列表
     * @request GET:/{adminPath}/selectNodeByPage
     */
    selectNodeByPageDetail: (
      adminPath: string,
      query?: {
        /**
         * 页码
         * @example "1"
         */
        page?: number;
        /**
         * 每页数据量
         * @example "20"
         */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: number;
          message: string;
          data: {
            records: {
              id: number;
              host: string;
              port: number;
              username: string;
              password: string;
              realm: string;
              status: number;
              csrfToken: string;
              ticket: string;
              nodeName: string;
              autoStorage: string;
              sshPort: number;
              sshUsername: string;
              sshPassword: string;
              controllerStatus: number | null;
            }[];
            total: number;
            size: number;
            current: number;
            orders: string[];
            optimizeCountSql: boolean;
            searchCount: boolean;
            maxLimit: null;
            countId: null;
            pages: number;
          };
        },
        any
      >({
        path: `/${adminPath}/selectNodeByPage`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description 分页获取API信息
     *
     * @tags 后台/API管理
     * @name SelectApiByPageDetail
     * @summary 分页获取API信息
     * @request GET:/{adminPath}/selectApiByPage
     */
    selectApiByPageDetail: (
      adminPath: string,
      query?: {
        /**
         * 页码
         * @example "1"
         */
        page?: number;
        /**
         * 每页数据量
         * @example "20"
         */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: number;
          message: string;
          data: {
            records: {
              id?: number;
              appid?: string;
              appkey?: string;
              info?: null;
              createDate?: null;
            }[];
            total: number;
            size: number;
            current: number;
            orders: string[];
            optimizeCountSql: boolean;
            searchCount: boolean;
            maxLimit: null;
            countId: null;
            pages: number;
          };
        },
        any
      >({
        path: `/${adminPath}/selectApiByPage`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description 删除指定ID的API key，可以post请求
     *
     * @tags 后台/API管理
     * @name DeleteApiDelete
     * @summary 删除指定ID的API key
     * @request DELETE:/{adminPath}/deleteApi
     */
    deleteApiDelete: (
      adminPath: string,
      query?: {
        /**
         * api id
         * @example "2"
         */
        id?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: number;
          message: string;
          data: string;
        },
        any
      >({
        path: `/${adminPath}/deleteApi`,
        method: 'DELETE',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description 修改集群节点信息
     *
     * @tags 后台/节点池管理
     * @name UpdateNodeInfoUpdate
     * @summary 修改集群节点信息
     * @request PUT:/{adminPath}/updateNodeInfo
     */
    updateNodeInfoUpdate: (
      adminPath: string,
      data: {
        id: number;
        host: string;
        port: number;
        username: string;
        password: string;
        realm: string;
        status: number;
        nodeName: string;
        sshPort: number;
        sshUsername: string;
        sshPassword: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<object, any>({
        path: `/${adminPath}/updateNodeInfo`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 下载指定id镜像到指定节点
     *
     * @tags 后台/OS管理
     * @name DownloadOsCreate
     * @summary 下载镜像
     * @request POST:/{adminPath}/downloadOs
     */
    downloadOsCreate: (
      adminPath: string,
      data: {
        /** 镜像id */
        osId: number;
        /** 节点id */
        nodeId: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<object, any>({
        path: `/${adminPath}/downloadOs`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 分页查询超管账号
     *
     * @tags 后台/超管账号管理
     * @name GetSysuserDetail
     * @summary 分页查询超管账号
     * @request GET:/{adminPath}/getSysuser
     */
    getSysuserDetail: (
      adminPath: string,
      query?: {
        /**
         * 页码
         * @example "1"
         */
        page?: number;
        /**
         * 页数据量
         * @example "20"
         */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: number;
          message: string;
          data: {
            records: {
              id: number;
              username: string;
              password: string;
              name: string | null;
              phone: string | null;
              email: string | null;
              logindate: number;
            }[];
            total: number;
            size: number;
            current: number;
            orders: string[];
            optimizeCountSql: boolean;
            searchCount: boolean;
            maxLimit: null;
            countId: null;
            pages: number;
          };
        },
        any
      >({
        path: `/${adminPath}/getSysuser`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description 修改超管账号接口
     *
     * @tags 后台/超管账号管理
     * @name UpdateSysuserCreate
     * @summary 修改超管账号接口
     * @request POST:/{adminPath}/updateSysuser
     */
    updateSysuserCreate: (
      adminPath: string,
      data: {
        id: number;
        username: string;
        phone: string;
        /** 密码为空不修改 */
        password: string | null;
        /** 姓名 */
        name: string;
        email: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<object, any>({
        path: `/${adminPath}/updateSysuser`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 查询单个节点状态
     *
     * @tags 后台/负载信息
     * @name GetNodeInfoByOneDetail
     * @summary 查询单个节点状态
     * @request GET:/{adminPath}/getNodeInfoByOne
     */
    getNodeInfoByOneDetail: (
      adminPath: string,
      query: {
        /**
         * 节点ID
         * @example "1"
         */
        nodeId: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: number;
          message: string;
          data: {
            cpuinfo: {
              flags: string;
              model: string;
              sockets: number;
              user_hz: number;
              mhz: string;
              cpus: number;
              hvm: string;
              cores: number;
            };
            wait: number;
            memory: {
              free: number;
              total: number;
              used: number;
            };
            idle: number;
            ksm: {
              shared: number;
            };
            loadavg: string[];
            kversion: string;
            cpu: number;
            rootfs: {
              avail: number;
              used: number;
              free: number;
              total: number;
            };
            swap: {
              total: number;
              free: number;
              used: number;
            };
            pveversion: string;
            uptime: number;
          };
        },
        any
      >({
        path: `/${adminPath}/getNodeInfoByOne`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description 获取指定节点负载信息
     *
     * @tags 后台/负载信息
     * @name GetNodeLoadAvgDetail
     * @summary 获取指定节点负载信息
     * @request GET:/{adminPath}/getNodeLoadAvg
     */
    getNodeLoadAvgDetail: (
      adminPath: string,
      query: {
        /**
         * 节点id
         * @example "1"
         */
        nodeId: number;
        /**
         * 采样时间 [hour, day, week, month, year] 默认为hour
         * @example "hour"
         */
        timeframe?: string;
        /**
         * 采样方式 [AVERAGE, MAX] 默认为AVERAGE
         * @example "AVERAGE"
         */
        cf?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: number;
          message: string;
          data: {
            memused: number;
            roottotal: number;
            memtotal: number;
            rootused: number;
            iowait: number;
            cpu: number;
            time: number;
            swapused: number;
            netin: number;
            netout: number;
            swaptotal: number;
            loadavg: number;
            maxcpu: number;
          }[];
        },
        any
      >({
        path: `/${adminPath}/getNodeLoadAvg`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description 创建虚拟机
     *
     * @tags 后台/虚拟机管理
     * @name CreateVmCreate
     * @summary 创建虚拟机
     * @request POST:/{adminPath}/createVm
     */
    createVmCreate: (adminPath: string, data: VmParams, params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/${adminPath}/createVm`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 获取被控通讯密钥
     *
     * @tags 后台/系统设置
     * @name GetControlledSecretKeyDetail
     * @summary 获取被控通讯密钥
     * @request GET:/{adminPath}/getControlledSecretKey
     */
    getControlledSecretKeyDetail: (adminPath: string, params: RequestParams = {}) =>
      this.request<
        {
          code: number;
          message: string;
          data: string;
        },
        any
      >({
        path: `/${adminPath}/getControlledSecretKey`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description 获取全局虚拟机默认系统盘大小
     *
     * @tags 后台/系统设置
     * @name GetVmDefaultDiskSizeDetail
     * @summary 获取全局虚拟机默认系统盘大小
     * @request GET:/{adminPath}/getVmDefaultDiskSize
     */
    getVmDefaultDiskSizeDetail: (adminPath: string, params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/${adminPath}/getVmDefaultDiskSize`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description 修改全局虚拟机默认系统盘大小，该接口支持POST,PUT请求方法
     *
     * @tags 后台/系统设置
     * @name UpdateVmDefaultDiskSizeCreate
     * @summary 修改全局虚拟机默认系统盘大小
     * @request POST:/{adminPath}/updateVmDefaultDiskSize
     */
    updateVmDefaultDiskSizeCreate: (
      adminPath: string,
      data: {
        /** 单位GB */
        Linux: number | null;
        /** 单位GB */
        Windows: number | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: number;
          message: string;
          data: null;
        },
        any
      >({
        path: `/${adminPath}/updateVmDefaultDiskSize`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 激活在线OS到数据库
     *
     * @tags 后台/OS管理
     * @name ActiveOsByOnlineCreate
     * @summary 激活在线OS
     * @request POST:/{adminPath}/activeOsByOnline
     */
    activeOsByOnlineCreate: (
      adminPath: string,
      data: {
        /** 镜像文件全名 */
        fileName: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<object, any>({
        path: `/${adminPath}/activeOsByOnline`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 删除os
     *
     * @tags 后台/OS管理
     * @name DeleteOsDelete
     * @summary 删除os
     * @request DELETE:/{adminPath}/deleteOs
     */
    deleteOsDelete: (
      adminPath: string,
      data: {
        osId: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: number;
          message: string;
          data: string;
        },
        any
      >({
        path: `/${adminPath}/deleteOs`,
        method: 'DELETE',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 修改os
     *
     * @tags 后台/OS管理
     * @name UpdateOsUpdate
     * @summary 修改os
     * @request PUT:/{adminPath}/updateOs
     */
    updateOsUpdate: (
      adminPath: string,
      data: {
        id: number;
        /** 系统名称（别称） */
        name: string;
        /** 镜像文件全名 */
        fileName: string;
        /** 镜像类型[windows，linux] */
        type: string;
        /** 镜像架构【x86_64，aarch64】 */
        arch: string;
        /** 镜像操作系统【centos,debian,ubuntu,alpine,fedora,opensuse,archlinux等】 */
        osType: string;
        /** 0=url下载;1=手动上传，该字段禁止修改 */
        downType: number;
        url: string;
        /** 镜像大小禁止修改 */
        size: string;
        /** 路径 */
        path: string;
        /** cloud-init【0=不使用;1=使用】 */
        cloud: number;
        /** 0:正常 1:停用 2:异常 */
        status: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<object, any>({
        path: `/${adminPath}/updateOs`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 增加地区
     *
     * @tags 后台/地区管理
     * @name AddAreaCreate
     * @summary 增加地区
     * @request POST:/{adminPath}/addArea
     */
    addAreaCreate: (
      adminPath: string,
      data: {
        /** 地区名 */
        name: string;
        /** 父级节点id */
        parent?: number | null;
        /** 目录级别，0为顶级，1为子级 */
        realm: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: number;
          message: string;
          data: null;
        },
        any
      >({
        path: `/${adminPath}/addArea`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 删除地区
     *
     * @tags 后台/地区管理
     * @name DeleteAreaDelete
     * @summary 删除地区
     * @request DELETE:/{adminPath}/deleteArea/{id}
     */
    deleteAreaDelete: (adminPath: string, id: string, params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/${adminPath}/deleteArea/${id}`,
        method: 'DELETE',
        format: 'json',
        ...params,
      }),

    /**
     * @description 修改地区
     *
     * @tags 后台/地区管理
     * @name UpdateAreaUpdate
     * @summary 修改地区
     * @request PUT:/{adminPath}/updateArea
     */
    updateAreaUpdate: (
      adminPath: string,
      data: {
        id: number;
        /** 地区名 */
        name: string;
        /** 父级节点id */
        parent?: number | null;
        /** 目录级别，0为顶级，1为子级 */
        realm: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<object, any>({
        path: `/${adminPath}/updateArea`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 分页查询地区
     *
     * @tags 后台/地区管理
     * @name GetAreaListDetail
     * @summary 分页查询地区
     * @request GET:/{adminPath}/getAreaList
     */
    getAreaListDetail: (
      adminPath: string,
      query?: {
        /** @example "1" */
        page?: number;
        /** @example "20" */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: number;
          message: string;
          data: {
            records: {
              id?: number;
              name?: string;
              parent?: number;
              realm?: number;
            }[];
            total: number;
            size: number;
            current: number;
            orders: string[];
            optimizeCountSql: boolean;
            searchCount: boolean;
            maxLimit: null;
            countId: null;
            pages: number;
          };
        },
        any
      >({
        path: `/${adminPath}/getAreaList`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description 查询指定id的地区
     *
     * @tags 后台/地区管理
     * @name GetAreaDetail
     * @summary 查询指定id的地区
     * @request GET:/{adminPath}/getArea
     */
    getAreaDetail: (
      adminPath: string,
      query: {
        /** @example "" */
        id: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: number;
          message: string;
          data: {
            id: number;
            name: string;
            parent: number;
            realm: number;
          };
        },
        any
      >({
        path: `/${adminPath}/getArea`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description 添加某节点到指定地区
     *
     * @tags 后台/地区管理
     * @name AddNodeToAreaUpdate
     * @summary 添加某节点到指定地区
     * @request PUT:/{adminPath}/addNodeToArea
     */
    addNodeToAreaUpdate: (
      adminPath: string,
      data: {
        /** 节点id */
        id: number;
        /** 地区id */
        area: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: number;
          message: string;
          data: string;
        },
        any
      >({
        path: `/${adminPath}/addNodeToArea`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 停用指定API
     *
     * @tags 后台/API管理
     * @name DisableApiUpdate
     * @summary 停用指定API
     * @request PUT:/{adminPath}/disableApi/{id}
     */
    disableApiUpdate: (adminPath: string, id: number, params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/${adminPath}/disableApi/${id}`,
        method: 'PUT',
        format: 'json',
        ...params,
      }),

    /**
     * @description 获取指定地区的节点列表
     *
     * @tags 后台/地区管理
     * @name GetNodeListByAreaDetail
     * @summary 获取指定地区的节点列表
     * @request GET:/{adminPath}/getNodeListByArea
     */
    getNodeListByAreaDetail: (
      adminPath: string,
      query: {
        /**
         * 地区分类ID
         * @example "1"
         */
        area: number;
        /** @example "1" */
        page?: number;
        /** @example "20" */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: number;
          message: string;
          data: {
            records: {
              id?: number;
              name?: null;
              area?: number;
              host?: string;
              port?: number;
              username?: string;
              password?: string;
              realm?: string;
              status?: number;
              csrfToken?: string;
              ticket?: string;
              nodeName?: string;
              autoStorage?: string;
              sshPort?: number;
              sshUsername?: string;
              sshPassword?: string;
              controllerStatus?: number;
            }[];
            total: number;
            size: number;
            current: number;
            orders: string[];
            optimizeCountSql: boolean;
            searchCount: boolean;
            maxLimit: null;
            countId: null;
            pages: number;
          };
        },
        any
      >({
        path: `/${adminPath}/getNodeListByArea`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),
  };
  admin = {
    /**
     * @description 添加PVE主控集群节点
     *
     * @tags 后台/节点池管理
     * @name InsertNodeMasterCreate
     * @summary 添加PVE主控节点
     * @request POST:/admin/insertNodeMaster
     */
    insertNodeMasterCreate: (
      data: {
        /** 地址 */
        host: string;
        /** 端口 */
        port: number;
        /** 用户名 */
        username: string;
        /** 密码 */
        password: string;
        /** 权限，默认pam */
        realm?: string | null;
        /** 指定节点名，默认pve */
        nodeName?: string | null;
        /** ssh端口 */
        sshPort: string;
        /** ssh登录账号 */
        sshUsername: string;
        /** ssh登录密码 */
        sshPassword: string;
        /** 0正常1停止 */
        status?: string | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: number;
          message: string;
          data: string;
        },
        any
      >({
        path: `/admin/insertNodeMaster`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  api = {
    /**
     * No description
     *
     * @tags API
     * @name V1CerateVmCreate
     * @summary 创建虚拟机
     * @request POST:/api/v1/cerateVM
     */
    v1CerateVmCreate: (
      data: {
        /** 节点ID */
        nodeid: number;
        /** 虚拟机名 */
        hostname: string;
        /** 插槽数 */
        sockets?: number | null;
        /** 核心 */
        cores: number;
        /** 是否开启嵌套虚拟化，默认关闭 */
        nested?: boolean | null;
        /** 内存 单位Mb */
        memory: number;
        /** PVE磁盘名，auto为自动 */
        storage: string;
        /** 系统盘大小，单位Gb */
        systemDiskSize: number;
        dataDisk?: string;
        /** 网桥 */
        bridge?: string | null;
        ipConfig?: string;
        /** 操作系统 */
        os: string;
        /** 操作系统类型，（win|linux） */
        osType: string;
        /** 带宽，单位Mbps */
        bandwidth: number;
        /** 虚拟机登录用户名 */
        username?: string | null;
        /** 虚拟机登录密码 */
        password: string;
        /** 到期时间，时间戳 */
        expirationTime?: number | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: number;
          message: string;
          data: {
            id?: number;
            nodeid?: number;
            vmid?: number;
            name?: string;
            cores?: number;
            memory?: number;
            agent?: number;
            ide0?: string;
            ide2?: string | null;
            net0?: string;
            net1?: string | null;
            os?: string;
            bandwidth?: number;
            storage?: string;
            systemDiskSize?: number;
            dataDisk?: object;
            bridge?: string;
            ipConfig?: object;
            nested?: number;
            task?: object;
            status?: string;
            createTime?: number;
            expirationTime?: number;
          }[];
        },
        any
      >({
        path: `/api/v1/cerateVM`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description 获取指定虚拟机数据
     *
     * @tags API
     * @name V1GetVmInfoList
     * @summary 获取指定虚拟机数据
     * @request GET:/api/v1/getVmInfo
     */
    v1GetVmInfoList: (
      query?: {
        /**
         * 数据库中的虚拟机ID（非vmid）
         * @example ""
         */
        hostId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          code: number;
          message: string;
          data: {
            info: {
              id: number;
              nodeid: number;
              vmid: number;
              name: string;
              cores: number;
              memory: number;
              agent: number;
              ide0: string;
              ide2: string | null;
              net0: string;
              net1: string | null;
              os: string;
              bandwidth: number;
              storage: string;
              systemDiskSize: number;
              dataDisk: {
                '1': number;
              };
              bridge: string;
              ipConfig: {
                '1': string;
              };
              nested: number;
              task: {
                '1689664264882': number;
                '1689664264900': number;
                '1689664279791': number;
                '1689664280959': number;
                '1689664282054': number;
                '1689664282539': number;
              };
              status: string;
              createTime: number;
              expirationTime: number;
            };
            status: {
              'running-machine': string;
              agent: number;
              pid: number;
              diskread: number;
              uptime: number;
              mem: number;
              vmid: number;
              freemem: number;
              maxmem: number;
              cpus: number;
              cpu: number;
              balloon: number;
              nics: {
                tap101i0: {
                  netin: number;
                  netout: number;
                };
              };
              netin: number;
              blockstat: {
                scsi1: {
                  wr_operations: number;
                  wr_total_time_ns: number;
                  idle_time_ns: number;
                  timed_stats: string[];
                  account_failed: boolean;
                  invalid_unmap_operations: number;
                  rd_bytes: number;
                  rd_merged: number;
                  failed_rd_operations: number;
                  account_invalid: boolean;
                  unmap_merged: number;
                  failed_wr_operations: number;
                  invalid_wr_operations: number;
                  failed_unmap_operations: number;
                  wr_bytes: number;
                  wr_merged: number;
                  rd_operations: number;
                  unmap_bytes: number;
                  invalid_flush_operations: number;
                  rd_total_time_ns: number;
                  unmap_operations: number;
                  wr_highest_offset: number;
                  flush_operations: number;
                  failed_flush_operations: number;
                  unmap_total_time_ns: number;
                  flush_total_time_ns: number;
                  invalid_rd_operations: number;
                };
                scsi0: {
                  failed_rd_operations: number;
                  account_invalid: boolean;
                  unmap_merged: number;
                  failed_wr_operations: number;
                  invalid_wr_operations: number;
                  wr_operations: number;
                  wr_total_time_ns: number;
                  timed_stats: string[];
                  idle_time_ns: number;
                  account_failed: boolean;
                  rd_bytes: number;
                  invalid_unmap_operations: number;
                  rd_merged: number;
                  wr_highest_offset: number;
                  unmap_operations: number;
                  failed_flush_operations: number;
                  flush_operations: number;
                  unmap_total_time_ns: number;
                  flush_total_time_ns: number;
                  invalid_rd_operations: number;
                  failed_unmap_operations: number;
                  wr_bytes: number;
                  wr_merged: number;
                  unmap_bytes: number;
                  rd_operations: number;
                  invalid_flush_operations: number;
                  rd_total_time_ns: number;
                };
                ide2: {
                  failed_unmap_operations: number;
                  wr_bytes: number;
                  wr_merged: number;
                  unmap_bytes: number;
                  rd_operations: number;
                  invalid_flush_operations: number;
                  rd_total_time_ns: number;
                  unmap_operations: number;
                  wr_highest_offset: number;
                  failed_flush_operations: number;
                  flush_operations: number;
                  unmap_total_time_ns: number;
                  flush_total_time_ns: number;
                  invalid_rd_operations: number;
                  wr_operations: number;
                  wr_total_time_ns: number;
                  timed_stats: string[];
                  idle_time_ns: number;
                  account_failed: boolean;
                  invalid_unmap_operations: number;
                  rd_bytes: number;
                  rd_merged: number;
                  failed_rd_operations: number;
                  account_invalid: boolean;
                  unmap_merged: number;
                  failed_wr_operations: number;
                  invalid_wr_operations: number;
                };
              };
              ballooninfo: {
                actual: number;
                minor_page_faults: number;
                total_mem: number;
                last_update: number;
                mem_swapped_in: number;
                free_mem: number;
                max_mem: number;
                mem_swapped_out: number;
                major_page_faults: number;
              };
              'running-qemu': string;
              disk: number;
              diskwrite: number;
              ha: {
                managed: number;
              };
              name: string;
              qmpstatus: string;
              'proxmox-support': {
                'pbs-masterkey': boolean;
                'pbs-library-version': string;
                'pbs-dirty-bitmap-migration': boolean;
                'query-bitmap-info': boolean;
                'pbs-dirty-bitmap': boolean;
                'pbs-dirty-bitmap-savevm': boolean;
              };
              maxdisk: number;
              netout: number;
              status: string;
            };
          };
        },
        any
      >({
        path: `/api/v1/getVmInfo`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description 虚拟机电源状态管理，action类型有start=开机、stop=关机、reboot=重启、shutdown=强制关机、suspend=挂起、resume=恢复、pause=暂停、unpause=恢复
     *
     * @tags API
     * @name V1PowerUpdate
     * @summary 虚拟机电源状态管理
     * @request PUT:/api/v1/power/{hostId}/{action}
     */
    v1PowerUpdate: (hostId: string, action: string, params: RequestParams = {}) =>
      this.request<
        {
          code: number;
          message: string;
          data: string | null;
        },
        any
      >({
        path: `/api/v1/power/${hostId}/${action}`,
        method: 'PUT',
        format: 'json',
        ...params,
      }),
  };
  status = {
    /**
     * @description 获取状态
     *
     * @tags 受控端
     * @name StatusList
     * @summary 状态查询
     * @request GET:/status
     */
    statusList: (params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/status`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  pathFile = {
    /**
     * @description 获取指定目录文件列表
     *
     * @tags 受控端
     * @name PathFileList
     * @summary 获取指定目录文件列表
     * @request GET:/pathFile
     */
    pathFileList: (
      query?: {
        /** @example "/home/images" */
        path?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<object, any>({
        path: `/pathFile`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),
  };
  wget = {
    /**
     * @description 下载文件到指定目录
     *
     * @tags 受控端
     * @name WgetList
     * @summary 下载文件到指定目录
     * @request GET:/wget
     */
    wgetList: (
      query?: {
        /** @example "http://oa.chuqiyun.com:8877/CentOS-Stream-8_x86_64.qcow2" */
        url?: string;
        /** @example "/home/images" */
        path?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<object, any>({
        path: `/wget`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),
  };
  changePassword = {
    /**
     * @description 重置虚拟机密码
     *
     * @tags 受控端
     * @name ChangePasswordCreate
     * @summary 重置虚拟机密码
     * @request POST:/changePassword
     */
    changePasswordCreate: (
      data: {
        /** vmid */
        id: number;
        /** 用户名 */
        username: string;
        /** 新密码 */
        password: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<object, any>({
        path: `/changePassword`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  version = {
    /**
     * @description 获取版本号
     *
     * @tags 受控端
     * @name VersionList
     * @summary 获取版本号
     * @request GET:/version
     */
    versionList: (params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/version`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  deleteFile = {
    /**
     * @description 删除指定目录下的指定文件
     *
     * @tags 受控端
     * @name DeleteFileCreate
     * @summary 删除指定目录下的指定文件
     * @request POST:/deleteFile
     */
    deleteFileCreate: (
      data: {
        path: string;
        file: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<object, any>({
        path: `/deleteFile`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  update = {
    /**
     * @description 更新程序
     *
     * @tags 受控端
     * @name UpdateCreate
     * @summary 更新程序
     * @request POST:/update
     */
    updateCreate: (params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/update`,
        method: 'POST',
        format: 'json',
        ...params,
      }),
  };
}
