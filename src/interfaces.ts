export interface Rocket {
    name: string;
  }
  
  export interface Mission {
    name: string;
  }
  
  export interface Launch {
    id: string;
    mission: Mission;
    rocket: Rocket;
    site: string;
  }
  
  export interface LaunchConnection {
    cursor: string;
    hasMore: boolean;
    launches: Launch[];
  }