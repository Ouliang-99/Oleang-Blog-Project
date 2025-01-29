const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const date = new Date(dateString);
  return date.toLocaleString("en-GB", options).replace(",", " at");
};

export default formatDate;
