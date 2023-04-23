interface Props {
  message: string;
  status: string;
}

const ChatMsg = ({ message, status }: Props) => {
  return (
    <div
      className={` ${
        status === 'send' ? 'self-start' : 'self-end'
      } bg-green-300 p-4 m-2 w-1/2 rounded-xl `}
    >
      {message}
    </div>
  );
};
export default ChatMsg;
