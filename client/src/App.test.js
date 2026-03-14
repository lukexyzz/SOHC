import { render, screen } from '@testing-library/react';
import App from './App';

// We "mock" the global fetch function
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ message: "Hello from Mock Server!" }),
    })
  );
});

test('renders message from the server', async () => {
  render(<App />);

  // Use waitFor because the fetch call is asynchronous
  const serverMessage = await screen.findByText(/Hello from Mock Server!/i);
  expect(serverMessage).toBeInTheDocument();
});