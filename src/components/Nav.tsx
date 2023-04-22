import { useParams } from 'react-router-dom';
import { socket } from '../Router';
import { BiWifi, BiWifiOff } from 'react-icons/bi';

export default function Nav() {
  const { room } = useParams();

  return (
    <header className=' relative w-full bg-red-300 py-2 px-4 '>
      <span className=' text-xl font-bold'>
        {socket.connected ? <BiWifi /> : <BiWifiOff />}
      </span>
      {room && (
        <span className=' absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-bold '>
          {room}번 채팅방
        </span>
      )}
    </header>
  );
}
