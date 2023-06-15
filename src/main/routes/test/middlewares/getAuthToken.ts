import { Response, NextFunction } from "express";

export async function getAuthToken(req: any, _: Response, next: NextFunction) {
  const url = "https://disney.api.edge.bamgrid.com/graph/v1/device/graphql";

  const header = {
    authorization:
      "ZGlzbmV5JmJyb3dzZXImMS4wLjA.Cu56AgSfBTDag5NiRA81oLHkDZfu5L3CKadnefEAY84",
  };

  const body = {
    query:
      "mutation registerDevice($input: RegisterDeviceInput!) {\n            registerDevice(registerDevice: $input) {\n                grant {\n                    grantType\n                    assertion\n                }\n            }\n        }",
    variables: {
      input: {
        deviceFamily: "browser",
        applicationRuntime: "firefox",
        deviceProfile: "windows",
        attributes: {
          manufacturer: "microsoft",
          operatingSystem: "windows",
          operatingSystemVersion: "10.0",
        },
      },
    },
  };

  const options = {
    method: "POST",
    headers: header,
    body: JSON.stringify(body),
  };

  const response = await fetch(url, options);
  const data = await response.json();

  const { accessToken } = data.extensions.sdk.token;

  req.message = { ...req.message, accessToken };

  next();
}
