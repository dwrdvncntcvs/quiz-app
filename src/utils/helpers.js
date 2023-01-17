import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const mergeName = (firstName, lastName) => {
  return `${firstName} ${lastName}`;
};

const extractInitials = (firstName = "", lastName = "") => {
  return `${firstName.charAt(0).toUpperCase()} ${lastName
    .charAt(0)
    .toUpperCase()}`;
};

const transformDate = (date) => {
  return dayjs(date).format("MMMM D, YYYY");
};

const fromNow = (date) => {
  dayjs.extend(relativeTime);
  return dayjs(date).fromNow();
};

const transformToURLQuery = (title) => {
  return title.split(" ").join("_");
};

const revertURLQueryToPlainText = (data) => {
  return data.split("_").join(" ");
};

const generatePathBasedOnRole = (role) => {
  if (role === "quizzer") return "/quizzer";
  else if (role === "quizee") return "/";
};

export {
  mergeName,
  extractInitials,
  transformDate,
  fromNow,
  transformToURLQuery,
  revertURLQueryToPlainText,
  generatePathBasedOnRole,
};
