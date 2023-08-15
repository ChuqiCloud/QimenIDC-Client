import React, { memo, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import CommonStyles from 'styles/common.module.less';
import { Table } from 'tdesign-react';
import request from 'utils/request';

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

  return (
    <div className={classNames(CommonStyles.pageWithColor, CommonStyles.pageWithPadding)}>
      <Table
        ref={tabelRef}
        rowKey='id'
        columns={[
          { colKey: 'id', title: '序号', width: '25' },
          { colKey: 'info', title: '名称', width: '75' },
          { colKey: 'appid', title: 'AppID', width: '100' },
          { colKey: 'createDate', title: '创建日期', width: '100' },
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
