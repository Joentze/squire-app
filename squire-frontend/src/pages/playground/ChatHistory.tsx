import { useAuth } from "../../firebase/auth/AuthContextWrapper";
import ChatOther from "./ChatOther";
import ChatMe from "./ChatMe";
import { useEffect, useRef } from "react";

const ChatHistory = () => {
  const auth = useAuth();
  const bottomLine = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomLine.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  return (
    <div className="w-full h-full flex flex-col pb-10">
      <div className="flex-grow"></div>
      <ChatOther message="hello" />
      <ChatMe message="hello" />
      <ChatOther message="hello" />
      <ChatMe message="hello" />
      <ChatOther message="hello" />
      <ChatMe message="hello" />
      <ChatOther message="hello" />
      <ChatMe message="hello" />
      <ChatOther message="hello" />
      <ChatMe message="hello" />
      <ChatOther message="hello" />
      <ChatMe message="hello" />
      <ChatOther message="hello" />
      <ChatMe message="hello" />
      <ChatOther message="hello" />
      <ChatMe message="hello" />
      <ChatOther message="hello" />
      <ChatMe message="hello" />
      <div className="w-full mt-6" ref={bottomLine}></div>
    </div>
  );
};
export default ChatHistory;
