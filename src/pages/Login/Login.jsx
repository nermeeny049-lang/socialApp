import { useFormik } from "formik";
import signupImg from "../../assets/signupImg.jpg";
import { toast, Toaster } from "sonner";
import axios from "axios";
import * as yup from "yup";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { userContext } from "../../context/UserContext";
export default function Login() {
  const navigate = useNavigate();
  const { setToken } = useContext(userContext);
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  const schema = yup.object({
    email: yup.string().required("email is required").email("email is invalid"),
    password: yup
      .string()
      .required("password is required")
      .matches(passwordRegex, "password is invalid"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async function (values) {
      try {
        const options = {
          method: "POST",
          url: "https://route-posts.routemisr.com/users/signin",
          headers: {
            "Content-Type": "application/json",
          },
          data: values,
        };
        const { data } = await axios.request(options);
        if (data.success) {
          toast.success("Welcome!!!👋");
          const token = data.data.token;

          setToken(token);
          localStorage.setItem("token", token);
          setTimeout(() => {
            navigate("/");
          }, 3000);
        }
      } catch (errors) {
        toast.error(errors.response.data.message);
      }
    },
  });
  return (
    <>
      <div className="grid grid-cols-2 justify-items-center items-center min-h-screen">
        <div className="signup-form w-72 flex flex-col justify-items-center items-center">
          <h2 className="text-2xl mb-3 font-bold">Welcome Back!</h2>
          <form className="space-y-3 w-100 p-4" onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="email">Email Address</label>
              <br />
              <input
                id="email"
                type="email"
                name="email"
                value={formik.values.email}
                className="form-controle"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched.email ? (
                <p className="text-red-700 px-3 bg-red-200 mt-1 w-96 rounded-l ">
                  {formik.errors.email}
                </p>
              ) : (
                ""
              )}
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <br />
              <input
                id="password"
                type="password"
                name="password"
                value={formik.values.password}
                className="form-controle"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.password && formik.touched.password ? (
                <p className="text-red-700 px-3 bg-red-200 mt-1 w-96 rounded-l ">
                  {formik.errors.password}
                </p>
              ) : (
                ""
              )}
            </div>
            <button
              type="submit"
              className="w-96 mt-4 py-2 rounded-md disabled:bg-purple-900/50 disabled:cursor-not-allowed text-white text-lg font-medium hover:bg-purple-950 transition-colors duration-200 bg-purple-900"
              disabled={!(formik.dirty && formik.isValid)}
            >
              {formik.isSubmitting ? (
                <LoaderCircle className="animate-spin mx-auto block" />
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
        <div className="form-img">
          <img
            src={signupImg}
            className="w-full h-full object-contain object-center"
          />
        </div>
      </div>
    </>
  );
}
