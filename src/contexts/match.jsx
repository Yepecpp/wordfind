import { createContext, useContext, useState } from "react";
import propTypes from "prop-types";

const matchContext = createContext();

export const useMatch = () => {
  return useContext(matchContext);
};

export const MatchProvider = ({ children }) => {
  const [match, setMacth] = useState({
    status: "ready",
    points: 0,
    remaningTime: 0,
    finishTime: 1 * 60 * 1000,
    startTime: null,
    size: {
      rows: 8,
      cols: 8,
    },
    words: [
      {
        q: "",
        a: "",
      },
    ],
  });
  return (
    <matchContext.Provider value={[match, setMacth]}>
      {children}
    </matchContext.Provider>
  );
};

MatchProvider.propTypes = {
  children: propTypes.node.isRequired,
};
