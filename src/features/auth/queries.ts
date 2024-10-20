"use server";

import { createSessionClient } from "@/lib/appwrite";

/**
 * @description Protects the page and returns the user if authenticated
 * @returns User if authenticated, otherwise null
 */
export async function protectPage() {
  try {
    const { account } = await createSessionClient();

    return await account.get();
  } catch (_error) {
    return null;
  }
}
