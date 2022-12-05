import { formatDate } from "./date";

export const formatGetAllDevisApiData = (data) => {
  const formatedData = data.map(formatDevisApiData);
  return formatedData;
};

export const formatDevisApiData = (devisApiData) => {
  const formatedDevis = {
    ...devisApiData,
    dateReglement: formatDate(devisApiData.dateReglement),
    lines: devisApiData.lines.map(formatDevisLineApiData),
  };
  return formatedDevis;
};

export const formatDevisLineApiData = (devisLine) => {
  const formatedDevisLine = {
    ...devisLine,
    date: formatDate(devisLine.date),
  };
  return formatedDevisLine;
};



export const formatGetAllFactureApiData = (data) => {
  const formatedData = data.map(formatFactureApiData);
  return formatedData;
};

export const formatFactureApiData = (factureApiData) => {
  const formatedFacture = {
    ...factureApiData,
    dateReglement: formatDate(factureApiData.dateReglement),
    lines: factureApiData.lines.map(formatFactureLineApiData),
  };
  return formatedFacture;
};

export const formatFactureLineApiData = (factureLine) => {
  const formatedFactureLine = {
    ...factureLine,
    date: formatDate(factureLine.date),
  };
  return formatedFactureLine;
};