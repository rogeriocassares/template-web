import { auth } from "@/auth"

export default async function Page() {
  const session = await auth()
  return (
    <h1 className="">Dashboard Home</h1>
  );
}
