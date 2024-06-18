'use client';

import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import { useEffect, useState } from "react";

export default function TopicsList() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTopics = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch topics");
      }

      const data = await res.json();
      setTopics(data);
      console.log(data);
      console.log(data.map((t) => t.title));
    } catch (error) {
      console.log("Error loading topics: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
    console.log("fetching topics");
  }, []);

  return (
    <>
      {loading ? <>
        <div>
          <div className="animate-pulse p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start">
            <div>
              <h2 className="font-bold text-2xl">Loading...</h2>
              <div>Loading...</div>
            </div>

            <div className="flex gap-2">
            <RemoveBtn className="animate-pulse bg-red-500 text-white px-3 py-1 rounded" />
            <HiPencilAlt size={24} className="animate-pulse bg-blue-500 text-white px-3 py-1 rounded" />
            </div>
          </div>
        </div>
      </> : (
        topics.length > 0 ? (
          topics.map((t) => (
            <div
              key={t._id}
              className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
            >
              <div>
                <h2 className="font-bold text-2xl">{t.title}</h2>
                <div>{t.description}</div>
              </div>

              <div className="flex gap-2">
                <RemoveBtn id={t._id} />
                <Link href={`/editTopic/${t._id}`}>
                  <HiPencilAlt size={24} />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No topics found.</p>
        )
      )}

    </>
  );
}
