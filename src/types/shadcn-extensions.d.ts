
import '@radix-ui/react-select';

// Extend the SelectProps to include the id property
declare module '@radix-ui/react-select' {
  interface SelectProps {
    id?: string;
  }
}
