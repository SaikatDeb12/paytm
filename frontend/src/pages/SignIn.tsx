import { useState } from "react";
import Button from "../components/Button";
import Footer from "../components/Footer";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn: React.FC = () => {
  type Schema = {
    name: string;
    email: string;
    password: string;
  };

  const navigate = useNavigate();

  const [value, setValue] = useState<Schema>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(value);
    const res = await axios.post(
      (import.meta.env.VITE_BASE_URL as string) + "/api/v1/user/signin",
      value
    );
    const token = res.data.token;
    console.log(res.data.msg);
    localStorage.setItem("token", token);
    navigate("/dashboard");
  };
  return (
    <div className="bg-slate-300 w-full h-screen flex justify-center items-center">
      <div className="rounded-lg bg-white w-90 p-2 h-max px-4 pb-10 flex flex-col justify-center items-center">
        <div className="text-center">
          <Heading label={"Sign In"} />
          <SubHeading />
        </div>
        <form className="items-start" onSubmit={(event) => handleSubmit(event)}>
          <InputBox
            name="email"
            label="Email"
            placeholder="John.Doe@gmail.com"
            type="text"
            onChange={handleChange}
          />
          <InputBox
            name="password"
            label="Password"
            placeholder="******"
            type="password"
            onChange={handleChange}
          />
          <Button text="Sign In" />
        </form>
        <Footer
          msg="Don't have an account? "
          redirect="SignUp"
          onClick={() => navigate("/signup")}
        />
      </div>
    </div>
  );
};

export default SignIn;

//196235
