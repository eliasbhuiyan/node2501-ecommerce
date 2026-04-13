import Link from "next/link";

export default function AuthFormCard({
  title,
  subtitle,
  submitLabel,
  fields,
  footerText,
  footerLinkLabel,
  footerLinkHref,
}) {
  return (
    <div className="w-full max-w-md rounded-4xl border border-slate-200 bg-white p-7 shadow-xl sm:p-9">
      <div className="mb-7 space-y-2">
        <h1 className="text-3xl font-black tracking-tight text-slate-900">{title}</h1>
        <p className="text-sm text-slate-600">{subtitle}</p>
      </div>

      <form className="space-y-4">
        {fields.map((field) => (
          <label key={field.name} className="block space-y-2">
            <span className="text-sm font-semibold text-slate-700">{field.label}</span>
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />
          </label>
        ))}

        <button
          type="button"
          className="mt-2 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
        >
          {submitLabel}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        {footerText}{" "}
        <Link href={footerLinkHref} className="font-semibold text-orange-600">
          {footerLinkLabel}
        </Link>
      </p>
    </div>
  );
}
