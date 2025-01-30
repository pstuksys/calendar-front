declare namespace NodeJS {
    interface ProcessEnv {
        REACT_APP_PORT: string;
        REACT_APP_HOST: string;
        REACT_APP_ENVIRONMENT:string;
        REACT_APP_BACKEND_URL:string;
         // Add any other custom env variables here
    }
  }