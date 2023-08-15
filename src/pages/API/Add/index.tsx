import classNames from 'classnames';
import React, { memo, useState } from 'react';
import CommonStyle from 'styles/common.module.less';
import Styles from './index.module.less';
import { Button, Form, Input, MessagePlugin, Space, SubmitContext } from 'tdesign-react';
import request from 'utils/request';

const { FormItem } = Form;

const AddAPIKEY = () => {
  const [appkey, setAppKey] = useState({
    appid: '',
    appkey: '',
  });
  const onSubmit = async (e: SubmitContext) => {
    console.log(e);
    await request.post('/insertApiKey', { info: e.fields.info }).then((res) => {
      setAppKey({
        appid: res.data.appid,
        appkey: res.data.appkey,
      });
      MessagePlugin.warning('AppKey仅创建时可见, 请妥善保存');
    });
  };

  const onReset = () => {
    setAppKey({ appid: '', appkey: '' });
    MessagePlugin.info('重置成功');
  };

  return (
    <div className={classNames(CommonStyle.pageWithColor)}>
      <div className={Styles.formContainer}>
        <Form labelWidth={100} labelAlign='top' colon onSubmit={onSubmit} onReset={onReset}>
          <div className={Styles.titleBox}>
            <div className={Styles.titleText}>新增ApiKey</div>
            <FormItem label='名称' name='info' rules={[{ required: true, message: 'APIKEY名称必填', type: 'error' }]}>
              <Input placeholder='请输入内容' />
            </FormItem>
            <FormItem label='AppID'>{appkey.appid}</FormItem>
            <FormItem label='AppKey'>{appkey.appkey}</FormItem>
            <FormItem>
              <Space>
                <Button type='submit' theme='primary'>
                  提交
                </Button>
                <Button type='reset' theme='default'>
                  重置
                </Button>
              </Space>
            </FormItem>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default memo(AddAPIKEY);
