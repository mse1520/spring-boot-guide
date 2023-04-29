import React, { useMemo } from 'react';
import { Outlet, useMatch } from 'react-router-dom';
import { SWRConfig } from 'swr';
import { useServerData } from '../utils/preload';

const AppLayout = () => {
  const data = useServerData();
  const boardDetailMatch = useMatch('/board/info/:boardId');
  const boardUpdateMatch = useMatch('/board/info/:boardId/update');

  const fallback = useMemo(() => {
    const result = {};

    result['/api/user/info'] = data?.session;
    if (boardDetailMatch)
      result[`/api/board/info/${boardDetailMatch.params.boardId}`] = data?.board;
    if (boardUpdateMatch)
      result[`/api/board/info/${boardUpdateMatch.params.boardId}`] = data?.board;

    return result;
  }, []);

  return <>
    <SWRConfig value={{ fallback }}>
      <Outlet />
    </SWRConfig>
  </>;
};

export default AppLayout;