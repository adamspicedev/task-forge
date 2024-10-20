"use server";

import { createSessionClient } from "@/lib/appwrite";

export async function protectPage() {
  try {
    const { account } = await createSessionClient();

    return await account.get();
  } catch (_error) {
    return null;
  }
}
