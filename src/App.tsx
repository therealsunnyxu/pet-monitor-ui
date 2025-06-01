import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router'
import './App.css'
import { CSRFHeaders } from './components/Forms/CSRFHeaders'
import { AutoLoginEnum, selectAutoLoginState } from './features/autoLoginSlice'
import { setDisplayedUsername } from './features/publicDetailsSlice'
import Account from './views/Account/Account'
import ChangeEmail from './views/Account/ChangeEmail/ChangeEmail'
import ChangePassword from './views/Account/ChangePassword/ChangePassword'
import Home from './views/Home/Home'
import Login from './views/Login/Login'

function App() {
  const autoLogin = useSelector(selectAutoLoginState);
  const [sessionState, setSessionState] = useState(autoLogin);
  const dispatch = useDispatch();

  useEffect(function () {
    (async function () {
      let emptyForm = new FormData();
      emptyForm.append("username", "");
      emptyForm.append("password", "");
      emptyForm.append("remember_me", "on");
      // If the user still has a refresh token on the server side,
      // this should let the user auto-login as long as they don't log out
      await fetch("https://pet-monitor-api.therealsunnyxu.com/token/refresh", {
        method: 'POST',
        credentials: "include",
        headers: new CSRFHeaders()
      })

      let res = await fetch("https://pet-monitor-api.therealsunnyxu.com/auth/login", {
        method: 'POST',
        credentials: "include",
        headers: new CSRFHeaders(),
      })
      if (res.status >= 400) {
        setSessionState(AutoLoginEnum.UNAUTHENTICATED);
        return;
      }
      setSessionState(AutoLoginEnum.AUTHENTICATED);

      res = await fetch("https://pet-monitor-api.therealsunnyxu.com/auth/username", {
        method: 'GET',
        credentials: "include",
        headers: new CSRFHeaders(),
      })
      const username = await res.text();
      dispatch(setDisplayedUsername(username));
    })();

  }, [autoLogin])

  // blend in with the pre-hydrated loading screen
  if (sessionState === AutoLoginEnum.UNKNOWN) {
    return (
      <div id="loading">
        <h1>Pet Cam</h1>
        <p>by therealsunnyxu</p>
      </div>
    )
  }

  // force user to have to look at the login screen
  if (sessionState === AutoLoginEnum.UNAUTHENTICATED) {
    return (
      <Routes>
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }

  // the actual routes, once the user is authenticated
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/account" >
        <Route index element={<Account />} />
        <Route path="email" element={<ChangeEmail />} />
        <Route path="password" element={<ChangePassword />} />
      </Route >
    </Routes >
  )
}

export default App
