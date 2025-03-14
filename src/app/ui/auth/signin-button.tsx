import { providerMap, signIn } from "@/auth";
import { Button } from "@/ui/button";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";

// export function SignIn() {

  export function SignIn({
    // provider,
    ...props
  }: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
    
  const SIGNIN_ERROR_URL = "/";

  return (
    <div className="space-y-5">
      {Object.values(providerMap).map((provider) => (
        <form
          key={provider.id}
          className="space-y-4"
          action={async () => {
            "use server";
            try {
              await signIn(provider.id, {
                // redirectTo: sP?.callbackUrl ?? "/dashboard",
                redirectTo: "/dashboard",
              });
            } catch (error) {
              if (error instanceof AuthError) {
                return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
              }
              throw error;
            }
          }}
        >
          <Button
            {...props}
            className="space-x-5 rounded-full bg-white px-6 py-3 sm:px-7 sm:py-4 transition duration-150 ease-in hover:bg-neutral-300"
            style={{ boxShadow: "8px 8px 25px rgba(0,0,0,.2)" }}
          >
            <span className="text-center text-black text-[0.825rem] uppercase tracking-wider">
              ENTRAR COM
            </span>
            <Image
              src="/assets/images/microsoft365-logo.svg"
              alt="Microsoft"
              width={100}
              height={100}
            />
          </Button>
        </form>
      ))}
    </div>
  );
}
