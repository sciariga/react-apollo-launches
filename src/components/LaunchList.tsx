import React from 'react';
import { useLaunches } from '../hooks/useLaunches';
import { InView } from 'react-intersection-observer';
import { Launch } from '../interfaces';
import './LaunchList.css';

const LaunchList: React.FC = () => {
    const { data, loading, fetchMore } = useLaunches(20, null);

    const loadMore = () => {
        if (data?.launches.hasMore) {
            fetchMore({
                variables: { after: data.launches.cursor },
                updateQuery: (prevResult, { fetchMoreResult }) => {
                    const newLaunches = fetchMoreResult?.launches?.launches || [];
                    const newCursor = fetchMoreResult?.launches?.cursor;
                    const hasMore = fetchMoreResult?.launches?.hasMore || false;

                    return newLaunches.length
                        ? {
                            launches: {
                                cursor: newCursor,
                                hasMore: hasMore,
                                launches: [...prevResult.launches.launches, ...newLaunches],
                            },
                        }
                        : prevResult;
                },
            });
        }
    };

    return (
        <div className="launches-container">
            {data?.launches.launches.map((launch: Launch) => (
                <div key={launch.id} className="launch-card">
                    <h3>{launch.mission.name}</h3>
                    <p><strong>ID:</strong> {launch.id}</p>
                    <p><strong>Rocket:</strong> {launch.rocket.name}</p>
                    <p><strong>Launch Site:</strong> {launch.site}</p>
                </div>
            ))}
            {loading && <p>Loading...</p>}
            <InView onChange={(inView) => inView && loadMore()} />
        </div>
    );
};

export default LaunchList;