// "This file creates the API endpoints that NextAuth needs to handle login, logout, and session management.
//export { handlers as GET, handlers as POST } from "@/auth";

import { handlers } from "@/auth";

export const { GET, POST } = handlers;
