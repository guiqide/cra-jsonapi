import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Result, Button } from 'antd';
import { BankOutlined } from '@ant-design/icons';

const Home: FC = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push('/other');
  };

  return (
    <div className="home">
      <Result
        icon={<BankOutlined />}
        title="The home page"
        extra={<Button type="primary" onClick={handleClick}>The other page</Button>}
      />
    </div>
  );
};

export default Home;
