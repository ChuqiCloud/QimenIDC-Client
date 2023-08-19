import React, { memo, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import CommonStyles from 'styles/common.module.less';
import { Link, PrimaryTableCellParams, Table, Tag } from 'tdesign-react';
import request from 'utils/request';
import { CheckCircleFilledIcon, CloseCircleFilledIcon } from 'tdesign-icons-react';

const ApiList = () => {
  const [data, setData] = useState({ total: 0, records: [] });

  useEffect(() => {
    request.get('/selectApiByPage', { params: { page: 1, size: 20 } }).then((res) => {
      const parsedRecords = res.data.records.map((record: any) => ({
        ...record,
        createDate: new Date(record.createDate).toLocaleDateString(), // Parse timestamp to date string
      }));
      setData({ total: res.data.total, records: parsedRecords });
      console.log(data);
    });
  }, []);

  const tabelRef = useRef(null);

  const handleDelete = (id: number) => {
    request.delete('/deleteApi', { params: { id } });
    let newData = data;
    newData = {
      ...newData,
      records: newData.records.filter((obj: any) => obj.id !== id),
    };
    setData(newData);
  };

  const handleDisable = (id: number) => {
    request.put(`/disableApi/${id}`).then(() => {
      request.get('/selectApiByPage', { params: { page: 1, size: 20 } }).then((res) => {
        const parsedRecords = res.data.records.map((record: any) => ({
          ...record,
          createDate: new Date(record.createDate).toLocaleDateString(), // Parse timestamp to date string
        }));
        setData({ total: res.data.total, records: parsedRecords });
        console.log(data);
      });
    });
  };

  const statusNameListMap: {
    [key: number]: {
      label: string;
      theme: 'success' | 'danger' | 'default' | 'primary' | 'warning' | undefined;
      icon: JSX.Element;
    };
  } = {
    0: { label: '启用', theme: 'success', icon: <CheckCircleFilledIcon /> },
    1: { label: '禁用', theme: 'danger', icon: <CloseCircleFilledIcon /> },
  };

  return (
    <div className={classNames(CommonStyles.pageWithColor, CommonStyles.pageWithPadding)}>
      <Table
        ref={tabelRef}
        rowKey='id'
        columns={[
          { colKey: 'id', title: '序号', width: '25' },
          { colKey: 'info', title: '名称', width: '75' },
          { colKey: 'appid', title: 'AppID', width: '75' },
          { colKey: 'createDate', title: '创建日期', width: '75' },
          {
            colKey: 'status',
            title: '当前状态',
            width: '50',
            cell: (row: PrimaryTableCellParams<any>) => (
              <Tag
                shape='round'
                theme={statusNameListMap[row.row.status].theme}
                variant='light-outline'
                icon={statusNameListMap[row.row.status].icon}
              >
                {statusNameListMap[row.row.status].label}
              </Tag>
            ),
          },
          {
            colKey: 'detial',
            title: '操作栏',
            width: '35',
            cell: (row: PrimaryTableCellParams<any>) => (
              <span>
                <Link theme='primary' onClick={() => handleDelete(row.row.id)}>
                  删除
                </Link>
                <Link theme='primary' style={{ marginLeft: '15px' }} onClick={() => handleDisable(row.row.id)}>
                  停用
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
            request
              .get('/selectApiByPage', { params: { page: pageInfo.current, size: pageInfo.pageSize } })
              .then((res) => {
                const parsedRecords = res.data.records.map((record: any) => ({
                  ...record,
                  createDate: new Date(record.createDate).toLocaleDateString(), // Parse timestamp to date string
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

export default memo(ApiList);
