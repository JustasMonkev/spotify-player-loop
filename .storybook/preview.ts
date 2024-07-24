import type { Preview } from "@storybook/react";
import "../src/assets/SearchComponent.css";
import "../src/assets/SpotifyHistoryModalComponent.css"
import "../src/assets/styles.css"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
