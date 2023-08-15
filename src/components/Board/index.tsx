import React from 'react';
import { ChevronRightIcon } from 'tdesign-icons-react';
import { Card } from 'tdesign-react';
import classnames from 'classnames';
import Style from './index.module.less';

export enum ETrend {
  up,
  down,
}

export interface IBoardProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  count?: string;
  Icon?: React.ReactElement;
  desc?: string;
  trend?: ETrend;
  trendNum?: string;
  dark?: boolean;
  border?: boolean;
}

export const TrendIcon = ({ trend, trendNum }: { trend?: ETrend; trendNum?: string | number }) => (
  <div
    className={classnames({
      [Style.trendColorUp]: trend === ETrend.up,
      [Style.trendColorDown]: trend === ETrend.down,
    })}
  ></div>
);

const Board = ({ title, count, Icon, dark, border = false }: IBoardProps) => (
  <Card
    title={<span className={Style.boardTitle}>{title}</span>}
    className={classnames({
      [Style.boardPanelDark]: dark,
      [Style.boardPanel]: true,
    })}
    bordered={border}
    // footer={
    //   <div className={Style.boardItemBottom}>
    //     <div className={Style.boardItemDesc}>
    //       {desc}
    //       <TrendIcon trend={trend} trendNum={trendNum} />
    //     </div>
    //     <ChevronRightIcon className={Style.boardItemIcon} />
    //   </div>
    // }
  >
    <div className={Style.boardItem}>
      <div className={Style.boardItemLeft}>{count}</div>
      <div className={Style.boardItemRight}>{Icon}</div>
    </div>
  </Card>
);

export default React.memo(Board);
