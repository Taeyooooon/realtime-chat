import { socket } from '../Router';

export default function Nav() {
  return (
    <header className='w-full bg-red-300 p-2 flex justify-center'>
      <div>웹소켓 {socket.connected ? '연결됨' : '연결안됨'}</div>
    </header>
  );
}
