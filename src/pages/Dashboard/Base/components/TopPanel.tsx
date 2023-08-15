import React from 'react';
import { Col, Row } from 'tdesign-react';
import Board, { IBoardProps } from 'components/Board';
import request from 'utils/request';

const totalOS = await request.get('/selectOsByOnline', { params: { page: 1, size: 20 } });
const totalNode = await request.get('/selectNodeByPage', { params: { page: 1, size: 20 } });
const totalIpPool = await request.get('/selectIpPoolList', { params: { page: 1, size: 20 } });
const totalSysuser = await request.get('/getSysuser', { params: { page: 1, size: 20 } });
const PANE_LIST: Array<IBoardProps> = [
  {
    title: 'OS数量',
    count: `${totalOS.data.total} 个`,
  },
  {
    title: '集群节点',
    count: `${totalNode.data.total} 个`,
  },
  {
    title: 'IP池',
    count: `${totalIpPool.data.total} 个`,
  },
  {
    title: '超管账号',
    count: `${totalSysuser.data.total} 个`,
  },
];

const TopPanel = () => (
  <Row gutter={[16, 16]}>
    {PANE_LIST.map((item, index) => (
      <Col key={item.title} xs={6} xl={3}>
        <Board
          title={item.title}
          trend={item.trend}
          trendNum={item.trendNum}
          count={item.count}
          Icon={item.Icon}
          dark={index === 0}
        />
      </Col>
    ))}
  </Row>
);

export default React.memo(TopPanel);
