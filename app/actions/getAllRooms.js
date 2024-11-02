"use server";

import { createAdminClient } from "@/config/appwrite";
import { revalidatePath } from "next/cache"  
import { redirect } from "next/navigation";

async function getAllRooms() {
  try {
    const { databases } = await createAdminClient();

    // Fetch rooms
    const { documents: rooms } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS
    );

    return rooms;
  } catch (error) {
    console.log("failed to get rooms", error);
    redirect('/error')  
  }
}

export async function revalidateHomePage() {
  revalidatePath("/"); // Trigger revalidation outside of rendering
}

export default getAllRooms;
