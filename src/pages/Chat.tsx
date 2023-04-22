import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { socket } from '../Router';
import ChatMsg from '../components/ChatMsg';

const Chat = () => {
  const [msg, setMsg] = useState('');
  const [receiveMsg, setReceiveMsg] = useState<string[]>([]);
  const navigate = useNavigate();
  const { room } = useParams();

  const onSubmitMsg = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!msg) return alert('메세지를 입력해주세요.');
    socket.emit('chat_message', room, msg, (res: string) => {
      console.log(`${res} 메세지 전송에 성공`);
    });
    setMsg('');
  };

  const onChangeMsg = (e: ChangeEvent<HTMLInputElement>) => {
    setMsg(e.target.value);
  };

  useEffect(() => {
    const onConnect = () => {
      console.log('연결');
    };

    const onDisconnect = () => {
      console.log('연결끊김');
      navigate('/');
    };

    const onMessage = (msg: string) => {
      setReceiveMsg((prev) => [...prev, msg]);
    };

    const onEnterRoom = (msg: string) => {
      if (msg === 'success') console.log('방 입장 성공');
    };

    // TODO: 챗방에서 새로고침하면 방입장이 안됨
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('enter_room', onEnterRoom);
    socket.on('receive_message', onMessage);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('enter_room', onEnterRoom);
      socket.off('receive_message', onMessage);
    };
  }, []);

  return (
    <>
      <section className='flex flex-col h-[calc(100%-36px)] pb-[52px] overflow-y-scroll'>
        {/* {receiveMsg.map((msg, i) => {  FIXME: 소켓 연결 시 수정  */}
        {ChatMockData.map(({ message, status }, i) => {
          return <ChatMsg key={i} message={message} status={status} />;
        })}

        <form onSubmit={onSubmitMsg} className=' absolute bottom-0 flex w-full'>
          <input
            type='text'
            placeholder='채팅입력'
            value={msg}
            onChange={onChangeMsg}
            className=' w-full h-14 border-2 border-green-200 text-center focus:outline-green-300'
          />
          <button
            className=' shrink-0 w-14 bg-green-300 disabled:bg-green-200'
            disabled={msg === ''}
          >
            전송
          </button>
        </form>
      </section>
    </>
  );
};

export default Chat;

const ChatMockData = [
  { message: '안녕', status: 'send' },
  { message: '안녕1', status: 'receive' },
  { message: '안녕2', status: 'send' },
  { message: '안녕2', status: 'send' },
  { message: '안녕2', status: 'receive' },
  { message: '안녕2', status: 'send' },
  { message: '안녕2', status: 'send' },
  { message: '안녕2', status: 'receive' },
  { message: '안녕2', status: 'send' },
  { message: '안녕2', status: 'send' },
  { message: '안녕2', status: 'send' },
  { message: '안녕2', status: 'send' },
  { message: '안녕2', status: 'receive' },
  { message: '안녕2', status: 'send' },
  { message: '안녕2', status: 'send' },
  { message: '안녕2', status: 'receive' },
  { message: '안녕2', status: 'send' },
  { message: '안녕2', status: 'send' },
  { message: '안녕2', status: 'send' },
  { message: '안녕2', status: 'send' },
];
