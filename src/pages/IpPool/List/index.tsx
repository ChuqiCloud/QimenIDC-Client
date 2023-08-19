import React, { memo, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import CommonStyles from 'styles/common.module.less';
import { Table } from 'tdesign-react';
import request from 'utils/request';

const SecondList = () => {
  const [data, setData] = useState({ total: 0, records: [] });

  useEffect(() => {
    request.get('/selectIpPoolList').then((res) => {
      const parsedRecords = res.data.records.map((record: any) => ({
        ...record,
        createDate: new Date(record.createDate).toLocaleDateString(),
      }));
      setData({ total: res.data.total, records: parsedRecords });
      console.log(data);
    });
  }, []);

  const tableRef = useRef(null);

  return (
    <div className={classNames(CommonStyles.pageWithColor, CommonStyles.pageWithPadding)}>
      <Table
        ref={tableRef}
        rowKey='id'
        columns={[
          { colKey: 'id', title: '序号', width: '25' },
          { colKey: 'name', title: '名称', width: '75' },
          { colKey: 'gateway', title: '网关', width: '100' },
          { colKey: 'createDate', title: '创建日期', width: '100' },
          {
            colKey: 'detial',
            title: '查看详情',
            width: '25',
            cell: (row) => <div>{row.row}</div>,
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
              .get('/selectIpPoolList', { params: { page: pageInfo.current, size: pageInfo.pageSize } })
              .then((res) => {
                const parsedRecords = res.data.records.map((record: any) => ({
                  ...record,
                  createDate: new Date(record.createDate).toLocaleDateString(),
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

export default memo(SecondList);
