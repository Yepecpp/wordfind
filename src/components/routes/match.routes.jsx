import { useMatch } from "../../contexts/match";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const gameRoutes = () => {
  const [match] = useMatch();
  const Navigate = useNavigate();
  const hasWords =
    match.words.length > 0 &&
    match.words[0].q !== "" &&
    match.words[0].a !== "";
  useEffect(() => {
    if (!hasWords || !match.finishTime) {
      Navigate("/create");
    }
  }, [hasWords, Navigate]);
  return <Outlet />;
};

export default gameRoutes;
