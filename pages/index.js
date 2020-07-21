import useSWR from "swr";

const fetcher = (query) =>
  fetch("/api/graphql", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then((json) => json.data);

export default function Index() {
  const { data, error } = useSWR("{ user { id name email } }", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const { user } = data;

  return (
    <div>
      <div>ID: {user.id}</div>
      <div>name: {user.name}</div>
      <div>email: {user.email}</div>
    </div>
  );
}
