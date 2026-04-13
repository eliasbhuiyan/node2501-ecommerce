import AuthFormCard from "@/components/auth/AuthFormCard";

const signUpFields = [
  {
    name: "name",
    label: "Full Name",
    type: "text",
    placeholder: "Alex Carter",
  },
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
    placeholder: "Create password",
  },
];

export default function SignUpPage() {
  return (
    <section className="flex min-h-[calc(100vh-180px)] items-center justify-center px-4 py-12">
      <AuthFormCard
        title="Create Account"
        subtitle="Join NexaMart and start shopping your favorite styles."
        submitLabel="Sign Up"
        fields={signUpFields}
        footerText="Already have an account?"
        footerLinkLabel="Sign in"
        footerLinkHref="/signin"
      />
    </section>
  );
}
