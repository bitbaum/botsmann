/**
 * Opens the Heidi bot in a new tab with an optional query
 * @param query Optional query to append to the URL
 */
export const openHeidiBot = (query?: string) => {
  const baseUrl = "https://chatgpt.com/g/g-rni41WTSh-heidi-tell";
  const url = query ? `${baseUrl}?q=${encodeURIComponent(query)}` : baseUrl;

  // Ensure the window opens properly
  const newWindow = window.open(url, "_blank");

  // Fallback if window.open is blocked
  if (
    !newWindow ||
    newWindow.closed ||
    typeof newWindow.closed === "undefined"
  ) {
    // Show a message to the user
    alert(
      "Please allow pop-ups to open Heidi in a new tab, or click this link: " +
        url,
    );

    // Copy the URL to clipboard as another fallback
    navigator.clipboard
      .writeText(url)
      .catch((err) => console.error("Could not copy URL: ", err));
  }
};
