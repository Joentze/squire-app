interface IChatMe {
  message: string;
}

const ChatMe: React.FC<IChatMe> = ({ message }) => {
  return (
    <div className="chat chat-end ">
      <div className="chat-bubble bg-pink-600 text-white text-2xl">
        {message}
      </div>
    </div>
  );
};
export default ChatMe;
