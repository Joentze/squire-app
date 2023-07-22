import { useAuth } from "../../firebase/auth/AuthContextWrapper";
import ChatOther from "./ChatOther";
import ChatMe from "./ChatMe";
import { useEffect, useRef, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/base";
import { ChatType } from "../../chatHandler/chatHandler";

const ChatHistory = () => {
  const auth = useAuth();
  const bottomLine = useRef<HTMLDivElement>(null);
  const [chats, setChats] = useState<ChatType[]>([]);
  useEffect(() => {
    bottomLine.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  useEffect(() => {
    const queryForChats = query(
      collection(db, "chats"),
      where("createdBy", "==", auth)
    );

    onSnapshot(queryForChats, (querySnapshot) => {
      let currMessages: ChatType[] = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc.data());
        const data = doc.data();
        currMessages.push({
          ...data,
          createdOn: (data["createdOn"] as Timestamp).toDate(),
        } as ChatType);
      });
      currMessages.sort((a, b) => {
        return a.createdOn.getTime() - b.createdOn.getTime();
      });
      setChats(currMessages);
    });
  }, []);

  return (
    <div className="w-full h-full flex flex-col pb-10 gap-4">
      <div className="flex-grow"></div>
      <>
        {chats.map((item) => {
          return (
            <>
              <ChatMe message={item.query} />
              <ChatOther message={item.response as string} />
            </>
          );
        })}
      </>
      <div className="w-full mt-6" ref={bottomLine}></div>
    </div>
  );
};
export default ChatHistory;
