import MDXComponents from "@theme-original/MDXComponents";
import { Icon } from "@iconify/react"; // Import the entire Iconify library.

export default {
  // Re-use the default mapping
  ...MDXComponents,
  IIcon: Icon, // Make the iconify Icon component available in MDX as <icon />.
  MuiIcon: () => <Icon icon="material-symbols:deployed-code" height="24" />,
};
