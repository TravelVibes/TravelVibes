const IMAGE_URL = import.meta.env.VITE_S3_IMAGE_URL;
const API_URL = import.meta.env.VITE_API_URL;

export const CONST = {
  API_URL,
  IMAGE_URL,
  DEFAULT_AVATAR: "uploads/default-avatar.webp",
  DEFAULT_EVENT_COVER: "uploads/default_event.jpeg",

  // Optimistic chat ID
  OPTIMISTIC_CHAT_ID: "NEW_CHAT_ID",
  FORM_DATA_LENGTH: 5,
};
