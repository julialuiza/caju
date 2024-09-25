import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

function Wrapper(props: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
}

function renderWithProviders(children: React.ReactNode) {
  return render(<Wrapper>{children}</Wrapper>);
}

export default renderWithProviders;
