import Moment from "moment";

export const ExportWords = (words, setExportState) => {
  // export the words to a json file and download it
  setExportState("loading");
  const wordsJSON = JSON.stringify(words);
  const blob = new Blob([wordsJSON], { type: "application/json" });
  // await 5 seconds
  const url = URL.createObjectURL(blob);
  setExportState(["download", url].join(","));
};

export const DownloadBlob = (exportState, setExportState) => {
  const link = document.createElement("a");
  link.href = exportState.split(",")[1];
  link.download = `Palabras-${Moment().format("L")}.json`;
  link.click();
  setExportState("done");
};
