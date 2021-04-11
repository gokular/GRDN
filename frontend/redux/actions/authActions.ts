export type userInfoType = {
    email: string,
    password: string,
    username: string,
}

export const signIn = (email: string, password: string) => {
    return async (dispatch: any, getState: any) => {
      try{
      const response = await fetch(`http://088d60de8c82.ngrok.io/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: email,
          password: password
        })
      });

      if (response.ok) {
        const signInRes = await response.json();

        const {token, user,image, id} = signInRes
        console.log("signInRes",signInRes)
        dispatch({
            type: 'SIGN_IN',
            token,
            image,
            id,
            user
        });
        return {success: true}
      } else if (response.status == 401) {
        // TODO Wrong username/password
        return {error: {message: "Username/ Password Incorrect"}}
      }
else {
        return {error: {message:"Unknown error"}}
}
    } catch (error) {
      return {error}
    }
    }
}

export const signOut = () => {
    return async (dispatch: any, getState: any) => {
        dispatch({
            type: 'SIGN_OUT',
        });
    }
}