import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Redirector = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const path = queryParams.get("path");
    if (path) {
      navigate(path, { replace: true });
    }
  }, [navigate]);

  return null;
};

export default Redirector;
