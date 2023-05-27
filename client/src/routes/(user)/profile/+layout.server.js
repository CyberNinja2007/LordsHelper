import { auth, refresh } from "$lib/auth";
import { error } from "@sveltejs/kit";

export async function load({ cookies }) {
  let user;

  try {
    const accessToken = cookies.get("access");
    user = await auth(accessToken);
  } catch (e) {
    const refreshToken = cookies.get("refresh");
    let newTokens = await refresh(refreshToken);

    if (newTokens.message) {
      console.log(newTokens);
      throw error(401, newTokens.message);
    }

    cookies.set("access", newTokens.accessToken, {
      maxAge: 15 * 60,
      path: "/",
    });
    cookies.set("refresh", newTokens.refreshToken, {
      maxAge: 14 * 24 * 60 * 60,
      path: "/",
    });
    user = await auth(newTokens.accessToken);
  }

  return user;
}
