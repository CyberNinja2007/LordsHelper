import { logout, refresh } from "$lib/auth.js";
import { create, deleteOne, getAll } from "$lib/botManagement";
import { error, redirect } from "@sveltejs/kit";

export async function load({ cookies }) {
  let bots;
  try {
    const accessToken = cookies.get("access");
    bots = await getAll(accessToken);
  } catch (e) {
    console.log(e);
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

    bots = await getAll(newTokens.accessToken);

    if (bots.message) {
      console.log(e.message);
      throw error(401, e.message);
    }
  }

  return { bots };
}

export const actions = {
  logout: async ({ cookies }) => {
    try {
      const refreshToken = cookies.get("refresh");
      const resultOfLogOut = await logout(refreshToken);
      if (resultOfLogOut.message) {
        throw Error(resultOfLogOut.message);
      }
      cookies.delete("access");
      cookies.delete("refresh");
      throw redirect(302, "/");
    } catch (e) {
      if (e.status === 302) throw e;
      console.log(e.message);
      throw error(404, e.message);
    }
  },

  addBot: async ({ cookies }) => {
    try {
      const accessToken = cookies.get("access");
      await create(accessToken);

      return { success: true };
    } catch (e) {
      console.log(e);
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

      let newBot = await create(newTokens.accessToken);

      if (newBot.message) {
        console.log(e.message);
        throw error(404, e.message);
      }

      return { success: true };
    }
  },

  deleteBot: async ({ request, cookies }) => {
    let form = await request.formData();
    let id = String(form.get("id"));
    try {
      const accessToken = cookies.get("access");
      await deleteOne(id, accessToken);

      return { success: true };
    } catch (e) {
      console.log(e);
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

      let deletedBot = await deleteOne(id, newTokens.accessToken);

      if (deletedBot.message) {
        console.log(e.message);
        throw error(404, e.message);
      }

      return { success: true };
    }
  }
};
