import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Popup, Dropdown, Space } from 'tdesign-react';
import { Icon, SettingIcon, PoweroffIcon } from 'tdesign-icons-react';
import { useAppDispatch } from 'modules/store';
import { toggleSetting } from 'modules/global';
import { logout } from 'modules/user';
import Style from './HeaderIcon.module.less';

const { DropdownMenu, DropdownItem } = Dropdown;

export default memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const clickHandler = (data: any) => {
    if (data.value === 1) {
      navigate('/user/index');
    }
  };
  const handleLogout = async () => {
    await logout();
    navigate('/login/index');
  };

  return (
    <Space align='center'>
      <Dropdown trigger={'click'} onClick={clickHandler}>
        <Button variant='text' className={Style.dropdown}>
          <Icon name='user-circle' className={Style.icon} />
          <Icon name='chevron-down' className={Style.icon} />
        </Button>
        <DropdownMenu>
          <DropdownItem value={1} onClick={handleLogout}>
            <div className={Style.dropItem}>
              <PoweroffIcon />
              <span>退出登录</span>
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Popup content='页面设置' placement='bottom' showArrow destroyOnClose>
        <Button
          className={Style.menuIcon}
          shape='square'
          size='large'
          variant='text'
          onClick={() => dispatch(toggleSetting())}
          icon={<SettingIcon />}
        />
      </Popup>
    </Space>
  );
});
