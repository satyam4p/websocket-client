import * as React from 'react';

import { Link, Route, Routes } from 'react-router-dom';
import Message from './Chat/component/Messages';
import SocketProvider from './providers/Socket/SocketProvider';
import AuthProvider from './providers/AuthProvider';
import Join from './Chat/join';

export function App() {
  return (
    <React.Suspense fallback={null}>
      <AuthProvider>
        <SocketProvider>
          <Routes>
            <Route path="/" element={<Join/>} />
            <Route path="/message" element={<Message/>} />
          </Routes>
        </SocketProvider>
      </AuthProvider>
    </React.Suspense>
  );
}

export default App;
