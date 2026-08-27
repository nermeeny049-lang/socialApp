import axios from "axios";
import { useFormik } from "formik";
import { ArrowLeft, KeyRound, LoaderCircle, ShieldCheck } from "lucide-react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import * as yup from "yup";
import { userContext } from "../../context/UserContext";

const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const Schema = yup.object({
  password: yup.string().required("Enter your current password"),
  newPassword: yup
    .string()
    .required("Enter a new password")
    .matches(
      passwordRegex,
      "Use 8+ characters with uppercase, lowercase, number, and symbol",
    ),
});

export default function ChangePassword() {
  const navigate = useNavigate();
  const { token, setToken } = useContext(userContext);

  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
    },
    validationSchema: Schema,
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log(values);
        const options = {
          url: "https://route-posts.routemisr.com/users/change-password",
          method: "patch",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          data: {
            password: values.password,
            newPassword: values.newPassword,
          },
        };

        const { data } = await axios.request(options);
        const newToken = data?.data?.token;
        if (newToken) {
          setToken(newToken);
          localStorage.setItem("token", newToken);
        }
        resetForm();
        toast.success("Password changed successfully");
        navigate("/profile");
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    },
  });

  const renderPasswordField = (fieldName, label, placeholder) => {
    const hasError = formik.errors[fieldName] && formik.touched[fieldName];

    return (
      <div>
        <label
          htmlFor={fieldName}
          className="mb-2 block text-sm font-bold text-slate-800"
        >
          {label}
        </label>
        <div className="relative">
          <input
            id={fieldName}
            name={fieldName}
            type="password"
            placeholder={placeholder}
            value={formik.values[fieldName]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
              hasError
                ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                : "border-slate-200 focus:border-purple-800 focus:ring-purple-100"
            }`}
          />
        </div>
        {hasError && (
          <p className="mt-1.5 text-xs font-medium text-red-600">
            {formik.errors[fieldName]}
          </p>
        )}
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-[#f7f7f4] px-5 py-8 text-slate-900 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/profile"
          className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-purple-900"
        >
          <ArrowLeft size={17} />
          Back to profile
        </Link>

        <section className="grid overflow-hidden rounded-4xl border border-slate-200/80 bg-white shadow-[0_20px_60px_-35px_rgba(15,23,42,0.45)] lg:grid-cols-[0.8fr_1.2fr]">
          <div className="relative overflow-hidden bg-slate-900 px-7 py-10 text-white sm:px-10 lg:px-12 lg:py-14">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-32 border-purple-300/15" />
            <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-purple-700/30 blur-3xl" />
            <div className="relative">
              <div className="mb-12 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500 text-white shadow-lg shadow-purple-950/30">
                <KeyRound size={27} />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-purple-300">
                Account security
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Keep your account yours.
              </h1>
              <p className="mt-4 max-w-xs text-sm leading-7 text-slate-300">
                Create a fresh password you can remember and nobody else can
                guess.
              </p>
              <div className="mt-10 flex items-start gap-3 border-t border-white/10 pt-5 text-sm text-slate-300">
                <ShieldCheck
                  className="mt-0.5 shrink-0 text-emerald-400"
                  size={19}
                />
                <span>
                  Your password is sent securely over an encrypted connection.
                </span>
              </div>
            </div>
          </div>

          <div className="px-7 py-9 sm:px-10 lg:px-14 lg:py-14">
            <div className="mb-8">
              <h2 className="text-2xl font-bold tracking-tight">
                Change password
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Enter your current password, then choose a new one.
              </p>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-5">
              {renderPasswordField(
                "password",
                "Current password",
                "Enter current password",
              )}
              {renderPasswordField(
                "newPassword",
                "New password",
                "Enter new password",
              )}

              <button
                type="submit"
                disabled={
                  formik.isSubmitting || !(formik.dirty && formik.isValid)
                }
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-purple-900 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-purple-900/20 transition hover:bg-purple-950 disabled:cursor-not-allowed disabled:bg-purple-900/40 disabled:shadow-none"
              >
                {formik.isSubmitting ? (
                  <LoaderCircle className="animate-spin" size={19} />
                ) : (
                  "Update password"
                )}
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
