import classNames from 'classnames';
import React, { memo } from 'react';
import CommonStyle from 'styles/common.module.less';
import Styles from './index.module.less';
import { Button, Form, Input, MessagePlugin, Space, SubmitContext } from 'tdesign-react';
import request from 'utils/request';

const { FormItem } = Form;

const AddAPIKEY = () => {
  const onSubmit = async (e: SubmitContext) => {
    console.log(e);
    await request.put(`/deleteApi?id=${e.fields.id}`).then((res) => {
      console.log(res.data);
      MessagePlugin.success(res.data);
    });
  };

  const onReset = () => {
    MessagePlugin.info('重置成功');
  };

  return (
    <div className={classNames(CommonStyle.pageWithColor)}>
      <div className={Styles.formContainer}>
        <Form labelWidth={100} labelAlign='top' colon onSubmit={onSubmit} onReset={onReset}>
          <div className={Styles.titleBox}>
            <div className={Styles.titleText}>删除ApiKey</div>
            <FormItem label='ID' name='id' rules={[{ required: true, message: 'ID必填', type: 'error' }]}>
              <Input placeholder='请输入内容' />
            </FormItem>
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
