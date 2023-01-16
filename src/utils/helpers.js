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

export { mergeName, extractInitials, transformDate, fromNow };
