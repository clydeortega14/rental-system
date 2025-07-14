export type AuthPageProps = {
  auth?: {
    user: {
      id: number;
      name: string;
      email: string;
    };
  };
  url: string;
}
