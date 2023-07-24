import { AiFillRobot } from "react-icons/ai";
import CircleProgress from "../../components/progress/CircleProgress";

interface IChatOther {
  message: string | undefined;
}

const ChatOther: React.FC<IChatOther> = ({ message }) => {
  return (
    <div className="chat chat-start w-1/2">
      <div className="chat-image avatar">
        <AiFillRobot className="w-6 h-6 text-pink-600" />
      </div>
      <div className="chat-bubble bg-pink-100 text-xl text-pink-800 font-mono">
        {message === undefined ? (
          <CircleProgress className="w-8 h-8 text-pink-700" />
        ) : (
          <>{message}</>
        )}
      </div>
    </div>
  );
};
export default ChatOther;
