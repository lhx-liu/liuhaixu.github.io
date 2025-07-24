# 1.0 什么是UmiJs?

## 插件化的企业级前端应用框架

_当前学习文档基于v3.x版本, 当前v4已发布_

# 2.0 为什么使用UmiJs?

## 2.1 特点：
* **开箱即用** Umi内置了路由、构建、部署等，仅需一个依赖即可上手开发，可满足日常开发。
* **完备路由** 同时支持配置式路由和约定式路由，支持动态、权限、嵌套等功能。
* **可扩展** Umi内容由插件完成，支持插件和插件集，以支持完成不同功能需要。
* **业务整合** Umi因为是阿里系的前端框架，对自家的antd、ahooks、dva等整合度比较高。

## 2.2 对比creat-react-app?
* cra是封装了webpack的一个打包方案，无路由，无数据量，不支持配置，且当遇到需要修改配置时会比较困难。

## 2.3 缺点
* umijs官方文档不明确 很多不知所云
* 高度藕合 适合快速开发的项目

# 3.0 如何使用

## 3.1 启动

推荐使用官方推荐的工具进行项目搭建

```JS
 tyarn create @umijs/umi-app
```



### 框架结构


### app.ts app.tsx
在src下新建app.ts文件 启动运行时配置文件或在src下新建app.tsx文件 启动运行时配置。

```JS
import React from 'react';
import {
  BasicLayoutProps,
  Settings as LayoutSettings,
} from '@ant-design/pro-layout';
import he from '@/assets/he.jpg';
import UserInfo from '@/components/UserInfo';
import axios from 'axios';

export async function getInitialState() {
    try {
        const res = await axios({
            url: '/yiyu/getUserInfo/',
            method: 'GET'
        });
        // 这里异步请求数据
        const data = res.data.data;
        return data;
    } catch (error) {
        console.error('获取用户信息失败', error);        
    }
}

export const layout = ({
  initialState
}): BasicLayoutProps => {
  return {
    logo: he,
    rightContentRender: () => <UserInfo/>,
    menuHeaderRender: undefined,
    ...initialState?.settings,
  };
};


```

安装依赖&&启动
```JS
tyarn

tyarn start
```

### 启动


## 3.2 配置

Umi是在 **.umirc.ts** 中进行配置

常用配置

```JS
import { defineConfig } from 'umi';
import routes from './config/routes';

// defineConfig 增加配置提示
export default defineConfig({
  nodeModulesTransform: {   //依赖打包方式
    type: 'none',
  },
  outputPath: 'build',      //输出路径 不配置默认dist
  hash: true,               //是否启用编译hash  每次编译后文件后缀会生成hash 以防浏览器缓存
  history: {                //路由方式
    type: 'hash',
  },
  routes: routes,           //配置式路由 如果写约定式 可以不用配置
  fastRefresh: {},          //快速刷新
  locale: {                 //本地化
    antd: true,
  },
  mfsu: {},                 //提升打包速度 再非首次启动热更新时 速度非常快 依赖越多 效果越明显
  dva: {                    //dva数据流的配置项
    immer: true,
    hmr: false
  },
  devServer: {              //服务启动项配置
    port: 3000,
  },
  proxy: {                  //代理
    '/yiyunadmin': {
      'target': 'http://127.0.0.1:9999/',
      'changeOrigin': true,
      // 'pathRewrite': { '^/lk' : '' },
    },
  },
  dynamicImport: {          //组件的异步加载 开启之后 只有当使用到某个界面之后 才加载对应的
    loading: '@/components/PageLoading',  //异步加载是的自定义loading效果
  },
  title: "亿云管理平台",    //网站标题
  favicon: './hreflogo.png',  //网站标题图片
  alias: {                    //配置别名
    demo1: '/src/pages/Demo1',
  },
  layout: {                 //umi内置集成了antd Layout 可以直接通过配置进行生成layout
    name: '集成antd',
    navTheme: 'dark',
    locale: true,
    layout: 'side',
  },
});


```

## 3.3 路由

在配置文件中通过 routes 进行配置，格式为路由信息的数组。  
如果路由过多，可将路由文件提出来。新建config/routes.ts文件  

基本路由数据格式如下  
下面样例展示了 **重定向 菜单权限 子路由** 等路由功能  
```JS
export default [
    { exact: true, path: '/', redirect: '/home' },
    {
        path: '/login',
        component: '@/pages/Login',
        // 不展示菜单
        menuRender: false,
        // 不展示导航
        headerRender: false,
    },
    {
        path: '/home',
        name: '首页',
        component: '@/pages/index',
        icon: 'FontColors',
    },
    {
        path: '/account',
        name: '用户',
        component: '@/pages/Account/list',
        icon: 'FontColors',
        access: 'canQuery',   //配置该路由权限
    },
    {
        path: '/test',
        component: '@/layouts/index',
        name: '测试',
        routes: [
            { path: '/test/testa', name: '测试A', component: '@/pages/Test/TestA' },
            { path: '/test/testb', name: '测试B', component: '@/pages/Test/TestB' },
        ],
    },
];

```
_如果不在.umirc.ts中声明路由 umijs会根据约定目录。 生成约定式路由 当你访问对应路径时 依旧可以直接访问_

路由中常用api

**history、useLocation**

  history支持的动作 **push、replace、pop**  
  history中location 对象，包含 **pathname、search 和 hash**  
  也可以直接使用**useLocation**获取location对象  

```JS

  import { history } from 'umi';

  // 跳转到指定路由
  history.push('/testa');

  // 带参数跳转到指定路由
  history.push('/list?a=b');
  history.push({
    pathname: '/list',
    query: {
      a: 'b',
    },
  });

  // 跳转到上一个路由
  history.goBack();

```

## 3.4 Mock

Umijs内置了mock，可以直接使用。UmiJs约定了 **/mock**下的所有文件均为mock文件  

**定义**
```JS
export default {
    // GET POST 可省略
    'POST /yiyu/login/': {
        code: 0,
        data: {
            name: '早坂爱',
            role: 'admin',
            id: '1001',
            token: '1213213545',
            avatar: 'https://s1.ax1x.com/2023/01/05/pSkz8gA.jpg'
        },
        message: '成功',
    },

    // 支持自定义函数
    'POST /api/users/create': (req, res) => {
        res.end('OK');
    },
};

```

**使用**
```JS
const res = await axios({
            url: '/yiyu/login/',
            method: 'POST'
        });
        // 这里异步请求数据
        const data = res.data.data;
        return data;

```
**效果**



_更多mock使用 请参考[Mock.JS](http://mockjs.com/)_

## 3.5 插件

### 3.5.1 @umijs/preset-react

umijs 针对react的一个插件集合

* plugin-antd 整合 antd UI 组件
* plugin-layout 配置启用 ant-design-pro 的布局
* plugin-model 基于 hooks 的简易数据流
* plugin-initial-state 初始化数据管理
* plugin-access 权限管理
* _plugin-request 基于 umi-request 和 umi-hooks 的请求方案_
* _plugin-dva 整合 dva_
* _plugin-locale 国际化能力_
* _plugin-analytics 统计管理_
* _plugin-crossorigin 通常用于 JS 出错统计_
* _plugin-helmet 整合 react-helmet 管理 HTML 文档标签（如标题、描述等）_

### 3.5.2 plugin-antd
在umijs中 无需yarn add antd 以及配置按需加载 umijs 一步到位，可直接使用antd组件。  

### 3.5.3 plugin-layout
通过配置启动ant-design-pro 布局。  

可以配置产品名称、logo、主题色等。以及通过运行时配置登录用户展示、登出操作等。  

具体使用可参考3.1章节 app.tsx示例  

### 3.5.4 plugin-model
基于hooks的简易数据流，数据生产消费非常简单，用于项目中的全局共享数据。

**启用**
在src/models 目录下所有hooks modal均被认为为model

```JS
/**
 * 计数model
 */
import { useState } from 'react';

export default function testModel() {
    const [count, setCount] = useState(0)
  
    return {
      count,
      setCount
    }
  }

```

**使用**

通过使用useModal hooks可以拿到存在modal中的数据。  

useModal接受两个参数 第一个是model名。第二个是可选参数，当该组件引用了model中的某个状态，并且希望只有这个状态更新时才render。  

```JS
import { history, useModel } from 'umi';
import { Button } from 'antd';
import { useEffect } from 'react';
export default function TestA() {
    // const { count, setCount } = useModel('testModel');
    const { count, setCount } = useModel('testModel', model => ({ count: model.count, setCount: model.setCount }));
    useEffect(() => {
        console.log('新的count来了:' + count);
    }, [count]);

    return (
        <div>
            <h2>TestA</h2>
            <h3>{count}</h3>
            <Button
                onClick={() => {
                    setCount(count + 1);
                }}
            >
                +
            </Button>
        </div>
    );
}

```
**副作用**

类比react-redux,你也可以在model中进行副作用的操作。  

```JS
/*
 * @file: 服务列表model
 */

import { getServiceListByDoctorId } from '../service/api';

export default {
    namespace: 'serviceModel',
    state: {
        serviceNoList: [],
        selectServiceNo: null,
    },
    reducers: {
        saveServiceList(state, { payload }) {
            return {
                ...state,
                serviceNoList: payload,
            };
        },
        saveSelectService(state, { payload }) {
            return {
                ...state,
                selectServiceNo: payload,
            };
        },
    },
    effects: {
        // 查询服务列表
        *queryServiceList({ payload }, { call, put }) {
            const { data } = yield call(getServiceListByDoctorId, payload);
            let list = [];
            if(data && data.info && data.info instanceof Array && data.info.length) {
                data.info.forEach(item => {
                    list.push({
                        ...item,
                        value: item.serviceid,
                        label: item.title
                    });
                });
                // 判断下是否正常
                yield put({
                    type: 'saveServiceList',
                    payload:  list
                });
                yield put({
                    type: 'saveSelectService',
                    payload: list[0].value
                });
            }
        },
    },
};


```

### 3.5.5 plugin-initial-state 

在src下新建app.ts并在次文件中导出**getInitialState**方法时启动。  

**定义**  
在此方法中 可以放一些需要全局消费的数据 比如当前登录者的信息  

```JS
//src/app.ts
export async function getInitialState() {
    try {
        const res = await axios({
            url: '/yiyu/getUserInfo/',
            method: 'GET'
        });
        // 这里异步请求数据
        const data = res.data.data;
        return data;
    } catch (error) {
        console.error('获取用户信息失败', error);        
    }
}
```

**使用**

```JS
import { useModal } from 'umi';

export default function index() {

  const { initialState } = useModel('@@initialState');
  const loginInfo = initialState;

  return (
    <span>{loginInfo?.name}欢迎您</span>
  );
}

```

### 3.5.6 plugin-access

权限插件，关于路由权限或者页面操作级别的权限均可通过此插件实现。  
约定创建src/access.ts启用，改文件在项目初始时被执行，文件内需要返回一个对象，该对象的每个键值对代表定义的权限。

**定义权限**

```JS

// 权限插件  新建access.tsx 代表开启该插件
interface User {
    role: string;
    userId: string;
}

export default function (initialState: User) {
    const { userId, role } = initialState;

    return {
        // 定义是否可查询
        // canQuery: true,
        canQuery: false,
        // 定义是否可新增
        canAdd: role === 'admin',
        // 定义是否可批量删除
        canBatchDelete: role === 'admin',
        // 定义只能删除普通用户
        canDeleteFoo: (role: string) => {
            return role === 'ordinary';
        },
    };
}

```


**使用权限**

可以通过useAccess hooks获取权限对象，通过Access包裹需要控制权限的组件。  
以此达到对操作级别的权限控制。

```JS
import { useAccess, Access } from 'umi';

// 获取权限对象
const access = useAccess();

<Access accessible={access.canDeleteFoo(record.role)}>
  <span>删除</span>
</Access>

// 通过权限Access包裹组件
<Access accessible={access.canBatchDelete}>
  <Button className="delete" disabled={!selectKeyTable.length}>
    批量删除
  </Button>
</Access>

```

**配合路由使用**

可以在路由配置项中增加access字段。以此来达到控制菜单的权限

```JS

/*
 * @file:全局路由
 */
export default [
    {
        path: '/account',
        name: '用户',
        component: '@/pages/Account/list',
        icon: 'FontColors',
        // 只有用户权限canQuery为true的才能查看用户这个菜单 否则不显示此菜单
        access: 'canQuery',
    }
];

```
_其他插件大家有兴趣或需要用到的可以自己研究下_


# 4.0 结语

以上是目前学到并用到的umijs的知识

[文档中的demo](https://gitee.com/NaMiSuang/umijs-demo)  
[umijs文档](https://v3.umijs.org/zh-CN/docs)
