import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Result, Button } from 'antd';
import { CoffeeOutlined } from '@ant-design/icons';

const Other: FC = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push('/');
  };

  return (
    <div className="home">
      <Result
        icon={<CoffeeOutlined />}
        title="The Other page"
        extra={<Button type="primary" onClick={handleClick}>The home page</Button>}
      />
    </div>
  );
};

export default Other;
