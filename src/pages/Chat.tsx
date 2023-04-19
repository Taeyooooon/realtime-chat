import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { socket } from '..';

const Chat = () => {
  const [msg, setMsg] = useState('');
  const [receiveMsg, setReceiveMsg] = useState<string[]>([]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit('chat message', msg); // event 이름 백엔드랑 동일하게
    setMsg('');
  };

  useEffect(() => {
    const onConnect = () => {
      console.log('연결');
    };

    const onDisconnect = () => {
      console.log('연결끊김');
    };

    const onMessage = (msg: string) => {
      console.log(msg);
      setReceiveMsg((prev) => [...prev, msg]);
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('receive message', onMessage);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('receive message', onMessage);
    };
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMsg(e.target.value);
  };

  return (
    <>
      {receiveMsg.map((msg, i) => {
        return <div key={i}>{msg}</div>;
      })}
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
};

export default Chat;
