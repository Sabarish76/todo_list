let headers = {
  "Content-Type": "application/json",
  "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_KEY,
};

export { headers };
