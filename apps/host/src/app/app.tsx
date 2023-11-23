import * as React from 'react';

import { Link, Route, Routes } from 'react-router-dom';
import Message from './Chat/component/Messages';
import SocketProvider from './providers/Socket/SocketProvider';


export function App() {
  return (
    <React.Suspense fallback={null}>
      <SocketProvider>
        <Routes>
          <Route path="/" element={<Message/>} />
        </Routes>
      </SocketProvider>
    </React.Suspense>
  );
}

export default App;
