import { useNavigate } from "react-router";

function Main() {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          navigate("/pose");
        }}
      >
        포즈
      </button>
      <button
        onClick={() => {
          navigate("/selfie");
        }}
      >
        셀피
      </button>
    </div>
  );
}

export default Main;
