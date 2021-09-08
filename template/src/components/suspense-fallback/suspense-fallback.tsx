import React, { FC } from 'react';
import { Spin } from 'antd';
import styles from './index.module.less';

const SuspenseFallback: FC = () => (
  <div className={styles.container}>
    <Spin tip="加载中..." />
  </div>
);

export default SuspenseFallback;
