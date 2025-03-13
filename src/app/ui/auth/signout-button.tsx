import { signOut } from "@/auth";
import PowerIcon from "@heroicons/react/24/outline/PowerIcon";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
      className="w-full"
    >
      <button
        // onClick={handleLogout}
        // disabled={loading}
        className="flex items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-gray-100 hover:text-gray-600 md:flex-none md:justify-start md:p-2 md:px-3"
      >
        <PowerIcon className="w-6" />
        {/* <div className="hidden md:block">{loading ? "Saindo..." : "Sair"}</div> */}
      </button>
    </form>
  );
}
