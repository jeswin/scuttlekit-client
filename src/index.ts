import * as rpc from "./rpc";
import { IAppSettings } from "./types/basic";

let initialized = false;

/*
  This function should be called once the app loads.
*/
export async function init(settings: IAppSettings) {
  const params = new URLSearchParams(window.location.search);
  if (params.has("scuttlekitredirect")) {
    await handleRegistrationRedirect(settings, params);
  } else {
    await doInit(settings);
  }
}

async function handleRegistrationRedirect(
  settings: IAppSettings,
  params: URLSearchParams
) {
  const status = params.get("status");

  if (status === "success") {
    const token = readTokenWithSingleUseKey();
    localStorage.setItem(`${settings.name}-accesstoken`, token);
  } else if (status === "failure") {
    const reason = params.get("reason");
  } else {
    // ...
  }
}

async function doInit(settings: IAppSettings) {
  const tokenName = `${settings.name}-accesstoken`;
  const token = localStorage.getItem(tokenName);

  if (token) {
    const tokenIsValid = await rpc.validateToken(token);
    if (!tokenIsValid) {
      await register(settings);
    } else {
      initialized = true;
    }
  } else {
    await register(settings);
  }
}

async function register(settings: IAppSettings) {
  
}

export async function getService(name: string) {
  if (initialized) {
    return;
  }
}

function readTokenWithSingleUseKey() {
  return "";
}
