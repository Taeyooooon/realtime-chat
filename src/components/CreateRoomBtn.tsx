interface Props {
  isCreateRoomView: boolean;
  ToggleCreateRoomView: () => void;
}

const CreateRoomBtn = ({ isCreateRoomView, ToggleCreateRoomView }: Props) => {
  return (
    <button
      onClick={ToggleCreateRoomView}
      className={` block mx-auto ${
        isCreateRoomView ? 'bg-green-300' : 'bg-green-200'
      }  px-10 py-4 my-5 rounded-lg font-semibold`}
    >
      방 생성하기
    </button>
  );
};
export default CreateRoomBtn;
