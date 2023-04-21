import { socket } from '../Router';
import { BiWifi, BiWifiOff } from 'react-icons/bi';

export default function Nav() {
  return (
    <header className='w-full bg-red-300 py-2 px-4 '>
      <span className=' ml-20 text-xl font-bold'>
        {socket.connected ? <BiWifi /> : <BiWifiOff />}
      </span>
    </header>
  );
}
