import { useFormik } from "formik";
import signupImg from "../../assets/signupImg.jpg";
import { toast, Toaster } from "sonner";
import axios from "axios";
import * as yup from "yup";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router";
export default function Signup() {
  const navigate = useNavigate();
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  const schema = yup.object({
    name: yup
      .string()
      .required("name is required")
      .min(3, "name must be at least 3 chars")
      .max(25, "name must less than 25 chars"),
    username: yup
      .string()
      .required("user name is required")
      .min(3, "user name must be at least 3 chars")
      .max(25, "user name must less than 25 chars"),
    email: yup.string().required("email is required").email("email is invalid"),
    password: yup
      .string()
      .required("password is required")
      .matches(passwordRegex, "password is invalid"),
    rePassword: yup
      .string()
      .required("confirm password is required")
      .oneOf(
        [yup.ref("password")],
        "password & confirm password must be the same",
      ),
    gender: yup
      .string()
      .required("gender is required")
      .oneOf(["male", "female"], "gender must be either male or female"),
    dateOfBirth: yup.string().required("date of birth is required"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      gender: "",
      dateOfBirth: "",
      password: "",
      rePassword: "",
    },
    validationSchema: schema,
    onSubmit: async function (values) {
      try {
        const options = {
          method: "POST",
          url: "https://route-posts.routemisr.com/users/signup",
          headers: {
            "Content-Type": "application/json",
          },
          data: values,
        };
        const { data } = await axios.request(options);
        if (data.success) {
          toast.success("account created successfully");
          setTimeout(() => {
            navigate("/login");
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
          <h2 className="text-2xl mb-3 font-bold">Create Your Account</h2>
          <form className="space-y-3 w-100 p-4" onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="name">Name</label>
              <br />
              <input
                id="name"
                value={formik.values.name}
                name="name"
                type="text"
                className="form-controle"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.name && formik.touched.name ? (
                <p className="text-red-700 px-3 bg-red-200 mt-1 w-96 rounded-l ">
                  {formik.errors.name}
                </p>
              ) : (
                ""
              )}
            </div>
            <div>
              <label htmlFor="user-name">User Name</label>
              <br />
              <input
                id="user-name"
                value={formik.values.username}
                type="text"
                name="username"
                className="form-controle"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.username && formik.touched.username ? (
                <p className="text-red-700 px-3 bg-red-200 mt-1 w-96 rounded-l ">
                  {formik.errors.username}
                </p>
              ) : (
                ""
              )}
            </div>
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
              <label htmlFor="date">Date Of Birth</label>
              <br />
              <input
                id="date"
                type="date"
                name="dateOfBirth"
                value={formik.values.dateOfBirth}
                className="form-controle"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.dateOfBirth && formik.touched.dateOfBirth ? (
                <p className="text-red-700 px-3 bg-red-200 mt-1 w-96 rounded-l ">
                  {formik.errors.dateOfBirth}
                </p>
              ) : (
                ""
              )}
            </div>
            <div>
              <label htmlFor="gender">Gender</label>
              <br />
              <select
                id="gender"
                name="gender"
                className="form-controle"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {formik.errors.gender && formik.touched.gender ? (
                <p className="text-red-700 px-3 bg-red-200 mt-1 w-96 rounded-l ">
                  {formik.errors.gender}
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
            <div>
              <label htmlFor="repassword">Confirm Password</label>
              <br />
              <input
                id="repassword"
                type="password"
                name="rePassword"
                value={formik.values.rePassword}
                className="form-controle"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.rePassword && formik.touched.rePassword ? (
                <p className="text-red-700 px-3 bg-red-200 mt-1 w-96 rounded-l ">
                  {formik.errors.rePassword}
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
                "create account"
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
