declare module 'virtual:react-router/server-build' {
  export const routes: Record<
    string,
    {
      id: string;
      path?: string;
      module: {
        meta?: () => Record<string, string>;
        handle?: unknown;
      };
    }
  >;
}
