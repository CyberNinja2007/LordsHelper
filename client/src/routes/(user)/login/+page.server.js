import { auth, login, refresh } from "$lib/auth.js";
import { redirect } from "@sveltejs/kit";
import { error } from "@sveltejs/kit";

export async function load({ fetch, cookies }) {
  let user;

  try {
    const accessToken = cookies.get("access");
    user = await auth(accessToken);
    throw redirect(302, "/profile");
  } catch (e) {
    if (e.status === 302) throw e;
    const refreshToken = cookies.get("refresh");
    let newTokens = await refresh(refreshToken);

    if (!newTokens.message) {
      cookies.set("access", newTokens.accessToken, {maxAge: 15 * 60 * 1000, path: '/'});
      cookies.set("refresh", newTokens.refreshToken, {maxAge: 14 * 24 * 60 * 60 * 1000, path: '/'});
      throw redirect(302, "/profile");
    }
  }
}

export const actions = {
  default: async ({request, cookies}) => {
    let form = await request.formData();
    let email = String(form.get("email"));
    let password = String(form.get("password"));
    try {
      const newTokens = await login({email: email, password: password});
      if (newTokens.message) {
        return {isError: true, error: newTokens.message};
      }
      cookies.set("access", newTokens.accessToken, {maxAge: 15 * 60, path: '/'});
      cookies.set("refresh", newTokens.refreshToken, {maxAge: 14 * 24 * 60 * 60, path: '/'});
      throw redirect(302,"/profile"); // Redirect to the protected page or dashboard
    } catch (e) {
      if (e.status === 302) throw e;
      console.log(e.message);
      throw error(404,e.message);
    }
  }
}

