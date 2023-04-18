import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function Chat() {
  const [msg, setMsg] = useState('');
  const [socket, setSocket] = useState<any>();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit('chat message', msg);
    setMsg('');
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMsg(e.target.value);
  };

  useEffect(() => {
    const newSocket = io('ws://10.58.52.81:3000');
    setSocket(newSocket);

    socket.on('chat message', (msg: any) => {
      console.log(msg);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <>
      <form onSubmit={onSubmit} className=' absolute bottom-0 flex w-full'>
        <input
          type='text'
          placeholder='채팅입력'
          value={msg}
          onChange={onChange}
          className=' w-full h-10 border-2 border-gray-300 rounded-lg text-center'
        />
        <button className=' shrink-0 w-10'>전송</button>
      </form>
    </>
  );
}
