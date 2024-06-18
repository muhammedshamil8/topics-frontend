import EditTopicForm from "@/components/EditTopicForm";

const getTopicById = async (id) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default async function EditTopic({ params }) {
  const { id } = params;
  const topic = await getTopicById(id);

  if (!topic) {
    return <div>Error loading topic.</div>;
  }

  const { title, description } = { ...topic};

  return <EditTopicForm id={id} title={title} description={description} />;
}
