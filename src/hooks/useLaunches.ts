import { gql, useQuery } from '@apollo/client';
import { LaunchConnection } from '../interfaces';

export const GET_LAUNCHES = gql`
  query GetLaunches($pageSize: Int, $after: String) {
    launches(pageSize: $pageSize, after: $after) {
      cursor
      hasMore
      launches {
        id
        mission {
          name
        }
        rocket {
          name
        }
        site
      }
    }
  }
`;

export const useLaunches = (pageSize: number, after: string | null) => {
  return useQuery<{ launches: LaunchConnection }>(GET_LAUNCHES, {
    variables: { pageSize, after },
    fetchPolicy: 'cache-first',
  });
};