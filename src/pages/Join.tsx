import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from '../Router';
import CreateRoomBtn from '../components/join/CreateRoomBtn';

interface RoomList {
  _id: string;
  room_id: string;
  user_id: string;
}

export default function Join() {
  const [roomValue, setRoomValue] = useState('');
  const [roomList, setRoomList] = useState<RoomList[]>([]);
  const [isCreateRoomView, setIsCreateRoomView] = useState(false);
  const navigate = useNavigate();

  const ToggleCreateRoomView = () => {
    setIsCreateRoomView((prev) => !prev);
    setRoomValue('');
  };

  const onChangeRoom = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomValue(e.target.value);
  };

  const onCreateRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!roomValue) return alert('방번호를 입력해주세요.');
    socket.emit('create_room', roomValue, (response: string) => {
      if (response === 'success') {
        return navigate(`/chat/${roomValue}`);
      }
      alert('방 생성에 실패했습니다.');
    });
  };

  const onRoomEnter = (room_id: string) => {
    socket.emit('enter_room', room_id, (response: string) => {
      if (response === 'success') {
        return navigate(`/chat/${room_id}`);
      }
      alert('방 참가에 실패했습니다.');
    });
  };

  useEffect(() => {
    const getRoomList = (rooms: RoomList[]) => {
      setRoomList(rooms);
    };

    socket.emit('room_list', getRoomList);

    return () => {
      socket.off('room_list', getRoomList);
    };
  }, []);

  return (
    <>
      <CreateRoomBtn
        ToggleCreateRoomView={ToggleCreateRoomView}
        isCreateRoomView={isCreateRoomView}
      />

      {isCreateRoomView && (
        <section>
          <form
            onSubmit={onCreateRoom}
            className='flex flex-col justify-center mb-5'
          >
            <input
              type='number'
              placeholder='채팅방 번호 입력'
              value={roomValue}
              onChange={onChangeRoom}
              min={0}
              max={9999}
              className=' mb-4 p-4 rounded-lg text-center border border-green-100 focus:outline-green-200'
            />
            <button className=' bg-green-200 p-4 font-semibold rounded-lg hover:bg-green-300'>
              채팅방 생성하고 입장하기
            </button>
          </form>
        </section>
      )}

      <section className='flex flex-col justify-center items-center'>
        <div className='text-2xl font-bold'>채팅방 리스트</div>
        {roomList.length === 0 ? (
          <>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-bold'>
              생성된 방이 없습니다.
            </div>
          </>
        ) : (
          roomList.map(({ _id, room_id, user_id }: RoomList) => {
            return (
              <div key={room_id}>
                <span>{room_id}</span>
                <span onClick={() => onRoomEnter(room_id)}>입장하기</span>
              </div>
            );
          })
        )}
      </section>
    </>
  );
}
