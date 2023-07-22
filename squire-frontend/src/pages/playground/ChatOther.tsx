interface IChatOther {
  message: string;
}

const ChatOther: React.FC<IChatOther> = ({ message }) => {
  return (
    <div className="chat chat-start w-1/2">
      <div className="chat-bubble bg-pink-100 text-xl text-pink-800 font-mono">
        {message}
      </div>
    </div>
  );
};
export default ChatOther;
