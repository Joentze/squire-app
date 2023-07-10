import { Progress } from "@mantine/core";
import {
  and,
  collection,
  DocumentData,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBuildDetails } from "../../buildHandler/buildHandler";
import { db } from "../../firebase/base";
import { Chunk } from "../../types/documentTypes";

const BuildLogPage = () => {
  const { buildId } = useParams();
  const [chunks, setChunks] = useState<Chunk[]>([]);
  const [chunkNo, setChunkNo] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);
  useEffect(() => {
    const getBuild = async () => {
      const buildDetails = await getBuildDetails(buildId as string);
      setChunkNo(buildDetails.chunkNo as number);
    };
    getBuild();
  }, []);
  useEffect(() => {
    const queryForChunks = query(
      collection(db, "chunks"),
      and(
        where("build_id", "==", buildId as string),
        where("status", "==", "SUCCESS")
      )
    );
    let newChunks: Chunk[] = [];
    onSnapshot(queryForChunks, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        newChunks.push((doc as DocumentData).data());
      });

      setChunks(newChunks);
    });
  }, []);
  useEffect(() => {
    if (chunks.length === chunkNo) {
      setCompleted(true);
    }
  }, [chunks]);
  return (
    <>
      {completed ? (
        <p>completed</p>
      ) : (
        <div className="w-full h-full flex flex-col">
          <div className="m-auto">
            <Progress
              className="w-full"
              color={"pink"}
              animate
              value={((chunks.length * 100) / (chunkNo as number)) as number}
            ></Progress>
            <p className="font-mono text-sm text-gray-400">{`${chunks.length}/${
              chunkNo as number
            } Chunks Uploaded...`}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default BuildLogPage;
