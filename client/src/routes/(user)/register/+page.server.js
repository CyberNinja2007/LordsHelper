import { register } from "$lib/auth";
import { error, redirect } from "@sveltejs/kit";

export const actions = {
    default: async ({request, cookies}) => {
      let form = await request.formData();
      let email = String(form.get("email"));
      let password = String(form.get("password"));
      try {
        if(password?.length < 7){
          return {isError: true, error: "Пароль должен быть не менее 7 символов"};
        }
        else if(!password.match(/^.*(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?"()\-_=+^~`{}[\]/\\<.>,;:|]).*$/g)){
          return {isError: true, error: "Пароль должен содержать по крайней мере 1 заглавную и строчную буквы, а так же небуквенно-цифровой символ."};
        }
  
        const newTokens = await register({email: email, password: password});
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