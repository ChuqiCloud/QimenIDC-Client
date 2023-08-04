import React from 'react';
import { Layout, Row } from 'tdesign-react';
import { useAppSelector } from 'modules/store';
import { selectGlobal } from 'modules/global';

const { Footer: TFooter } = Layout;

const Footer = () => {
  const globalState = useAppSelector(selectGlobal);
  if (!globalState.showFooter) {
    return null;
  }

  return (
    <TFooter>
      <Row justify='center'>Copyright © 2023-{new Date().getFullYear()} Chuqiscm. All Rights Reserved</Row>
    </TFooter>
  );
};

export default React.memo(Footer);
