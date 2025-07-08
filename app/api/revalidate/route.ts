import { revalidatePath } from "next/cache";

function revalidateStaticPages() {
  const staticPathsToRevalidate = ["/[locale]", "/[locale]/[pageIndex]"];

  for (const path of staticPathsToRevalidate) {
    revalidatePath(path, "page");
  }
}

// API route handler
export async function POST(req: Request) {
  try {
    // Validate the token
    const token = req.headers.get("x-revalidate-token");
    if (token !== process.env.REVALIDATE_SECRET) {
      console.warn("Invalid token attempt:", token);
      return new Response(
        JSON.stringify({ success: false, error: "Invalid token" }),
        { status: 403 }
      );
    }

    // Trigger Vercel deploy hook
    const hookUrl = process.env.VERCEL_REDEPLOY_HOOK_URL;
    if (hookUrl) {
      const res = await fetch(hookUrl, { method: "POST" });
      if (!res.ok) {
        throw new Error("Failed to trigger Vercel redeploy hook");
      }
    } else {
      throw new Error("Vercel redeploy hook not provided. Unable to redeploy.");
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error handling webhook:", error);
    return new Response(JSON.stringify({ success: false, error }), {
      status: 500,
    });
  }
}
