import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import "@testing-library/jest-dom";
import { GET_LAUNCHES } from '../hooks/useLaunches';
import LaunchList from '../components/LaunchList';
import { mockIntersectionObserver } from '../test/__mocks__/setupMocks';


beforeAll(() => {
  mockIntersectionObserver();
});


const mocks: MockedResponse[] = [
  {
    request: {
      query: GET_LAUNCHES,
      variables: {
        pageSize: 20,
        after: null,
      },
    },
    result: {
      data: {
        launches: {
          cursor: 'cursor1',
          hasMore: true,
          launches: [
            {
              id: '1',
              mission: { name: 'mission 1' },
              rocket: { name: 'rocket 1' },
              site: 'site 1',
            },
            {
              id: '2',
              mission: { name: 'mission 2' },
              rocket: { name: 'rocket 2' },
              site: 'site 2',
            },
          ],
        },
      },
    },
  },
];

test('renders launch list and caches the data', async () => {
  const { rerender } = render(
    <MockedProvider mocks={[...mocks]} addTypename={false}>
      <LaunchList />
    </MockedProvider>
  );

  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  
  await waitFor(() => expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument());

  expect(screen.getByText(/mission 1/i)).toBeInTheDocument();
  expect(screen.getByText(/rocket 1/i)).toBeInTheDocument();
  expect(screen.getByText(/site 1/i)).toBeInTheDocument();

  expect(screen.getByText(/mission 2/i)).toBeInTheDocument();
  expect(screen.getByText(/rocket 2/i)).toBeInTheDocument();
  expect(screen.getByText(/site 2/i)).toBeInTheDocument();

  rerender(
    <MockedProvider mocks={[...mocks]} addTypename={false}>
      <LaunchList />
    </MockedProvider>
  );

  expect(screen.getByText(/mission 1/i)).toBeInTheDocument();
  expect(screen.getByText(/rocket 1/i)).toBeInTheDocument();
  expect(screen.getByText(/site 1/i)).toBeInTheDocument();

  expect(screen.getByText(/mission 2/i)).toBeInTheDocument();
  expect(screen.getByText(/rocket 2/i)).toBeInTheDocument();
  expect(screen.getByText(/site 2/i)).toBeInTheDocument();
});