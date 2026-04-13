import AuthFormCard from "@/components/auth/AuthFormCard";

const signInFields = [
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "you@example.com",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter password",
  },
];

export default function SignInPage() {
  return (
    <section className="flex min-h-[calc(100vh-180px)] items-center justify-center px-4 py-12">
      <AuthFormCard
        title="Welcome Back"
        subtitle="Sign in to manage your cart, orders, and profile."
        submitLabel="Sign In"
        fields={signInFields}
        footerText="New here?"
        footerLinkLabel="Create an account"
        footerLinkHref="/signup"
      />
    </section>
  );
}
