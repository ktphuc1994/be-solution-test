import { FC, useEffect, useState } from 'react';
import './assets/styles/app.css';
import './assets/styles/app.scss';

const App: FC = () => {
  const [fullname, setFullname] = useState('Dư Thanh Được');
  useEffect(() => {
    setFullname('Phuc');
  }, []);
  console.log(fullname);
  return (
    <div>
      <h1>{fullname}</h1>
      <h2>Bài viết được viết tại {process.env.HOST}</h2>
    </div>
  );
};

export default App;
