import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from '..';

interface RoomList {
  _id: string;
  room_id: string;
  user_id: string;
}

export default function Join() {
  const [roomValue, setRoomValue] = useState('');
  const [roomList, setRoomList] = useState<RoomList[]>([]);
  const navigate = useNavigate();

  const onChangeRoom = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomValue(e.target.value);
  };

  const onCreateRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!roomValue) return alert('방번호를 입력해주세요.');
    socket.emit('create_room', roomValue, (response: any) => {
      console.log('res : ', response);
      if (response === 'success') {
        return navigate(`/chat/${roomValue}`);
      }
      alert('방 생성에 실패했습니다.');
    });
  };

  const onRoomEnter = (room_id: string) => {
    socket.emit('enter_room', room_id, (response: any) => {
      console.log('res123 : ', response);
      if (response === 'success') {
        return navigate(`/chat/${room_id}`);
      }
      alert('방 참가에 실패했습니다.');
    });
  };

  useEffect(() => {
    const getRoomList = (rooms: RoomList[]) => {
      console.log('rooms : ', rooms);
      setRoomList(rooms);
    };

    socket.emit('room_list', getRoomList);

    return () => {
      socket.off('room_list', getRoomList);
    };
  }, []);

  return (
    <>
      <form onSubmit={onCreateRoom}>
        <input
          type='text'
          placeholder='방번호 입력'
          value={roomValue}
          onChange={onChangeRoom}
        />
        <button>생성</button>
      </form>
      <div>방리스트 나올 자리</div>
      {roomList.map(({ _id, room_id, user_id }: RoomList) => {
        return (
          <div key={room_id}>
            <span>{room_id}</span>
            <span onClick={() => onRoomEnter(room_id)}>입장하기</span>
          </div>
        );
      })}
    </>
  );
}
