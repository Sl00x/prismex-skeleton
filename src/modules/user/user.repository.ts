import { PrismaClient } from "prisma/prisma-client";

export const UserReposirtory = new PrismaClient().user;
