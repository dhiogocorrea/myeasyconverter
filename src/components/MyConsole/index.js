import React, {useEffect, useState} from 'react';
import {Hook, Console, Decode} from 'console-feed';

const MyConsole = params => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    Hook(window.console, log => {
      setLogs([...logs, Decode(log)]);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {params.showLog === true && (
        <div style={{backgroundColor: '#242424'}}>
          <Console logs={logs} variant="dark" />
        </div>
      )}
    </div>
  );
};

export default MyConsole;
