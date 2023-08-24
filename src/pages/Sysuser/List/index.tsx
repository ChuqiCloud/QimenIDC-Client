import React, { memo, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import CommonStyles from 'styles/common.module.less';
import { Button, Drawer, Form, Input, Link, PrimaryTableCellParams, Table, Tag } from 'tdesign-react';
import request from 'utils/request';
import { CheckCircleFilledIcon, CloseCircleFilledIcon } from 'tdesign-icons-react';

const { FormItem } = Form;

const UserList = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({ total: 0, records: [] });

  useEffect(() => {
    request.get('/getSysuser', { params: { page: 1, size: 20 } }).then((res) => {
      const parsedRecords = res.data.records.map((record: any) => ({
        ...record,
        logindate: new Date(record.logindate).toLocaleDateString(), // Parse timestamp to date string
      }));
      setData({ total: res.data.total, records: parsedRecords });
      console.log(data);
    });
  }, []);

  const tableRef = useRef(null);

  const handleNew = () => setVisible(true);

  const handleDelete = (id: number) => {
    request.delete('/deleteUser', { params: { id } });
    let newData = data;
    newData = {
      ...newData,
      records: newData.records.filter((obj: any) => obj.id !== id),
    };
    setData(newData);
  };

  const handleCancel = () => setVisible(false);

  const [form] = Form.useForm();

  const handleClose = () => handleCancel();

  const handleSubmit = () => {
    console.log('submit');
    const data = {
      phone: form.getFieldValue('phone'),
      password: form.getFieldValue('password'),
      email: form.getFieldValue('email'),
      username: form.getFieldValue('username'),
      name: form.getFieldValue('name'),
    };
    request.post('/registerDo', data).then(() => {
      handleClose();
      request.get('/getSysuser', { params: { page: 1, size: 20 } }).then((res) => {
        const parsedRecords = res.data.records.map((record: any) => ({
          ...record,
          logindate: new Date(record.logindate).toLocaleDateString(), // Parse timestamp to date string
        }));
        setData({ total: res.data.total, records: parsedRecords });
        console.log(data);
      });
    });
  };

  return (
    <div className={classNames(CommonStyles.pageWithColor, CommonStyles.pageWithPadding)}>
      <Drawer
        header='新增用户'
        visible={visible}
        size='medium'
        onCancel={handleCancel}
        onClose={handleClose}
        onConfirm={handleSubmit}
      >
        <Form onSubmit={handleSubmit} form={form}>
          <FormItem label='手机号' name='phone' rules={[{ required: true, message: '手机号必填' }]}>
            <Input placeholder='请输入手机号' />
          </FormItem>
          <FormItem label='密码' name='password' rules={[{ required: true, message: '密码必填' }]}>
            <Input placeholder='请输入密码' type='password' />
          </FormItem>
          <FormItem label='邮箱' name='email' rules={[{ required: true, message: '邮箱必填' }]}>
            <Input placeholder='请输入邮箱' />
          </FormItem>
          <FormItem label='用户名' name='username' rules={[{ required: true, message: '用户名必填' }]}>
            <Input placeholder='请输入用户名' />
          </FormItem>
          <FormItem label='姓名' name='name' rules={[{ required: true, message: '姓名必填' }]}>
            <Input placeholder='请输入姓名' />
          </FormItem>
        </Form>
      </Drawer>
      <Button theme='primary' onClick={handleNew} style={{ marginBottom: '15px' }}>
        新增用户
      </Button>
      <Table
        ref={tableRef}
        rowKey='id'
        columns={[
          { colKey: 'id', title: '序号', width: '25' },
          { colKey: 'username', title: '用户名', width: '75' },
          { colKey: 'name', title: '姓名', width: '75' },
          { colKey: 'phone', title: '手机号', width: '75' },
          { colKey: 'email', title: '邮箱', width: '75' },
          { colKey: 'logindate', title: '登录日期', width: '75' },
          {
            colKey: 'detial',
            title: '操作栏',
            width: '35',
            cell: (row: PrimaryTableCellParams<any>) => (
              <span>
                <Link theme='primary' onClick={() => handleDelete(row.row.id)}>
                  删除
                </Link>
              </span>
            ),
          },
        ]}
        data={data.records}
        pagination={{
          defaultCurrent: 1,
          defaultPageSize: 20,
          total: data.total,
          showJumper: true,
          onChange(pageInfo) {
            console.log(pageInfo, 'onChange pageInfo');
            request.get('/getUserList', { params: { page: pageInfo.current, size: pageInfo.pageSize } }).then((res) => {
              const parsedRecords = res.data.records.map((record: any) => ({
                ...record,
                logindate: new Date(record.logindate).toLocaleDateString(), // Parse timestamp to date string
              }));
              setData({ total: res.data.total, records: parsedRecords });
              console.log(data);
            });
          },
        }}
        bordered
      />
    </div>
  );
};

export default memo(UserList);
