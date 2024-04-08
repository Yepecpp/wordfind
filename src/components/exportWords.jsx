import { useState } from "react";
import propTypes from "prop-types";

import { Delete as DeleteIcon } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

import { DownloadBlob, ExportWords } from "../utils/exportwords";

const exportWords = ({ words }) => {
  const [exportState, setExportState] = useState("done");
  return (
    <Box>
      {exportState === "done" ? (
        <Button
          className="export"
          onClick={() => ExportWords(words, setExportState)}
          disabled={words.length < 2}
          sx={{
            color: "black",
            ":disabled": { color: "#c8c8c8" },
          }}
        >
          Exportar Palabras{" "}
          <FileDownloadOutlinedIcon
            sx={{
              ml: 1,
            }}
          />
        </Button>
      ) : exportState === "loading" ? (
        <Button disabled>Exportando...</Button>
      ) : null}
      {exportState.includes(",") ? (
        <>
          <Button onClick={() => DownloadBlob(exportState, setExportState)}>
            Descargar archivo
          </Button>
          <Button onClick={() => setExportState("done")}>
            <DeleteIcon />
          </Button>
        </>
      ) : null}
    </Box>
  );
};
exportWords.propTypes = {
  words: propTypes.arrayOf(propTypes.object).isRequired,
};

export default exportWords;
