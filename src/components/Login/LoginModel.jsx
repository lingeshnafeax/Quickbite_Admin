import { useContext, useEffect, useMemo, useState } from "react";
import { PinInput } from "react-input-pin-code";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
const LoginModel = () => {
  const [values, setValues] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState(null);
  const { setLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const addedValues = useMemo(() => {
    return values.join("");
  }, [values]);
  const checkPasskey = () => {
    if (addedValues === import.meta.env.VITE_PASSKEY) {
      setLoggedIn(true);
      setError(null);
      localStorage.setItem("adminPin", addedValues);
      navigate("/");
    } else {
      setError("Incorrect passkey");
    }
  };
  useEffect(() => {
    if (
      localStorage.getItem("adminPin") &&
      localStorage.getItem("adminPin") === import.meta.env.VITE_PASSKEY
    ) {
      setLoggedIn(true);
      navigate("/");
    }
  }, []);

  return (
    <div className="flex  justify-center items-center min-h-screen text-white font-bold  ">
      <div className="flex flex-col items-center bg-primary  rounded-lg p-8 gap-8">
        <h1 className="text-xl">Enter the passcode</h1>
        <PinInput
          containerStyle={{
            width: "100%",
            backgroundColor: "white",
            borderRadius: "10px",
            color: "black",
          }}
          values={values}
          onChange={(value, index, values) => setValues(values)}
        />
        {error && <p className="bg-red-600 p-2 rounded-lg text-sm">{error}</p>}
        <button
          className="bg-orange-700 p-2 rounded-lg text-sm"
          onClick={checkPasskey}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default LoginModel;
