import { useStore } from 'effector-react';
import { timeLoop } from './lib/entities/time/model';
import './lib/entities/init';
import { SECOND } from './lib/entities/time/model/timeLoop';

function App(): JSX.Element {
  const date = useStore(timeLoop.$date);
  return <div className="container">Date: {date / SECOND}</div>;
}

export default App;
