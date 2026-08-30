import "server-only";

import { cache } from "react";

import { auth } from "@/features/auth/lib/auth";

export const getServerSession = cache(auth);
