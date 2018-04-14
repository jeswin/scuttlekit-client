import * as rpc from "./rpc";
import { IAppSettings } from "./types/basic";

let initialized = false;

export async function init(settings: IAppSettings) {
  const params = new URLSearchParams(window.location.search);
  if (params.has("scuttlekitredirect")) {
    handleRegistrationRedirect(settings, params);
  } else {
    doInit(settings);
  }
}

async function handleRegistrationRedirect(settings: IAppSettings, params: URLSearchParams) {
  const status = params.get("status");
  
  if (status === "success") {
    const token = readTokenWithEphemeralKey();
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

export async function getService(name: string) {
  if (initialized) {
    return;
  }
}

function readTokenWithEphemeralKey() {
  return "";
}

async function register(settings: IAppSettings) {}
