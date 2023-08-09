import React, { memo } from 'react';
import Style from './Menu.module.less';
import { useNavigate } from 'react-router-dom';

interface IProps {
  collapsed?: boolean;
}

export default memo((props: IProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className={Style.menuLogo} onClick={handleClick}>
      {props.collapsed ? <h2>初</h2> : <h2>初七云管</h2>}
    </div>
  );
});
