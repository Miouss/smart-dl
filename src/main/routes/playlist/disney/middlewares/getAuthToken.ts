import { Response, NextFunction } from "express";
import { createOptions, fetchResponse } from "../../utils";

export async function getAuthToken(req: any, _: Response, next: NextFunction) {
  try {
    const apiKey =
      "ZGlzbmV5JmJyb3dzZXImMS4wLjA.Cu56AgSfBTDag5NiRA81oLHkDZfu5L3CKadnefEAY84";

    const { username, password } = req.body.account;

    const accessToken = await getLoginToken(apiKey);
    const profile = await getProfileIdAndToken(accessToken, username, password);
    const refreshToken = await getRefreshToken(profile);
    const token = await getDRMToken(refreshToken, apiKey);
    req.token = token;

    next();
  } catch (err) {
    next(err);
  }
}

async function getLoginToken(apiKey: string) {
  const url = "https://disney.api.edge.bamgrid.com/graph/v1/device/graphql";

  const header = {
    authorization: apiKey,
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

  const options = createOptions("POST", header, body);

  const data = await fetchResponse("json", url, options);

  return data.extensions.sdk.token.accessToken;
}

async function getProfileIdAndToken(
  loginToken: string,
  email: string,
  password: string
) {
  const url = "https://disney.api.edge.bamgrid.com/v1/public/graphql";

  const header = {
    authorization: loginToken,
  };

  const body = {
    query:
      "\n    mutation login($input: LoginInput!) {\n        login(login: $input) {\n            account {\n                ...account\n\n                profiles {\n                    ...profile\n                }\n            }\n            actionGrant\n            activeSession {\n              ...session\n            }\n            identity {\n              ...identity\n          }\n        }\n    }\n\n    \nfragment identity on Identity {\n    attributes {\n        securityFlagged\n        createdAt\n        passwordResetRequired\n    }\n    flows {\n        marketingPreferences {\n            eligibleForOnboarding\n            isOnboarded\n        }\n        personalInfo {\n            eligibleForCollection\n            requiresCollection\n        }\n    }\n    personalInfo {\n        dateOfBirth\n        gender\n    }\n    subscriber {\n        subscriberStatus\n        subscriptionAtRisk\n        overlappingSubscription\n        doubleBilled\n        doubleBilledProviders\n        subscriptions {\n            id\n            groupId\n            state\n            partner\n            isEntitled\n            source {\n                sourceType\n                sourceProvider\n                sourceRef\n                subType\n            }\n            paymentProvider\n            product {\n                id\n                sku\n                offerId\n                promotionId\n                name\n                nextPhase {\n                    sku\n                    offerId\n                    campaignCode\n                    voucherCode\n                }\n                entitlements {\n                    id\n                    name\n                    desc\n                    partner\n                }\n                categoryCodes\n                redeemed {\n                    campaignCode\n                    redemptionCode\n                    voucherCode\n                }\n                bundle\n                bundleType\n                subscriptionPeriod\n                earlyAccess\n                trial {\n                    duration\n                }\n            }\n            term {\n                purchaseDate\n                startDate\n                expiryDate\n                nextRenewalDate\n                pausedDate\n                churnedDate\n                isFreeTrial\n            }\n            externalSubscriptionId,\n            cancellation {\n                type\n                restartEligible\n            }\n            stacking {\n                status\n                overlappingSubscriptionProviders\n                previouslyStacked\n                previouslyStackedByProvider\n            }\n        }\n    }\n}\n\n    \nfragment account on Account {\n    id\n    attributes {\n        blocks {\n            expiry\n            reason\n        }\n        consentPreferences {\n            dataElements {\n                name\n                value\n            }\n            purposes {\n                consentDate\n                firstTransactionDate\n                id\n                lastTransactionCollectionPointId\n                lastTransactionCollectionPointVersion\n                lastTransactionDate\n                name\n                status\n                totalTransactionCount\n                version\n            }\n        }\n        dssIdentityCreatedAt\n        email\n        emailVerified\n        lastSecurityFlaggedAt\n        locations {\n            manual {\n                country\n            }\n            purchase {\n                country\n                source\n            }\n            registration {\n                geoIp {\n                    country\n                }\n            }\n        }\n        securityFlagged\n        tags\n        taxId\n        userVerified\n    }\n    parentalControls {\n        isProfileCreationProtected\n    }\n    flows {\n        star {\n            isOnboarded\n        }\n    }\n}\n\n    \nfragment profile on Profile {\n    id\n    name\n    isAge21Verified\n    attributes {\n        avatar {\n            id\n            userSelected\n        }\n        isDefault\n        kidsModeEnabled\n        languagePreferences {\n            appLanguage\n            playbackLanguage\n            preferAudioDescription\n            preferSDH\n            subtitleAppearance {\n                backgroundColor\n                backgroundOpacity\n                description\n                font\n                size\n                textColor\n            }\n            subtitleLanguage\n            subtitlesEnabled\n        }\n        groupWatch {\n            enabled\n        }\n        parentalControls {\n            kidProofExitEnabled\n            isPinProtected\n        }\n        playbackSettings {\n            autoplay\n            backgroundVideo\n            prefer133\n            preferImaxEnhancedVersion\n            previewAudioOnHome\n            previewVideoOnHome\n        }\n    }\n    personalInfo {\n        dateOfBirth\n        gender\n        age\n    }\n    maturityRating {\n        ...maturityRating\n    }\n    personalInfo {\n        dateOfBirth\n        age\n        gender\n    }\n    flows {\n        personalInfo {\n            eligibleForCollection\n            requiresCollection\n        }\n        star {\n            eligibleForOnboarding\n            isOnboarded\n        }\n    }\n}\n\n\nfragment maturityRating on MaturityRating {\n    ratingSystem\n    ratingSystemValues\n    contentMaturityRating\n    maxRatingSystemValue\n    isMaxContentMaturityRating\n}\n\n\n    \nfragment session on Session {\n    device {\n        id\n        platform\n    }\n    entitlements\n    features {\n        coPlay\n    }\n    inSupportedLocation\n    isSubscriber\n    location {\n        type\n        countryCode\n        dma\n        asn\n        regionName\n        connectionType\n        zipCode\n    }\n    sessionId\n    experiments {\n        featureId\n        variantId\n        version\n    }\n    identity {\n        id\n    }\n    account {\n        id\n    }\n    profile {\n        id\n        parentalControls {\n            liveAndUnratedContent {\n                enabled\n            }\n        }\n    }\n    partnerName\n    preferredMaturityRating {\n        impliedMaturityRating\n        ratingSystem\n    }\n    homeLocation {\n        countryCode\n    }\n    portabilityLocation {\n        countryCode\n        type\n    }\n}\n\n",
    variables: {
      input: {
        email,
        password,
      },
    },
    operationName: "login",
  };

  const options = createOptions("POST", header, body);

  const data = await fetchResponse("json", url, options);

  return {
    id: data.data.login.account.profiles[0].id,
    token: data.extensions.sdk.token.accessToken,
  };
}

async function getRefreshToken(profile: { id: string; token: string }) {
  const url = "https://disney.api.edge.bamgrid.com/v1/public/graphql";

  const header = {
    authorization: profile.token,
  };

  const body = {
    query:
      "\n    mutation switchProfile($input: SwitchProfileInput!) {\n        switchProfile(switchProfile: $input) {\n            account {\n                ...account\n\n                activeProfile {\n                    ...profile\n                }\n            }\n            activeSession {\n                ...session\n            }\n        }\n    }\n\n    \nfragment account on Account {\n    id\n    attributes {\n        blocks {\n            expiry\n            reason\n        }\n        consentPreferences {\n            dataElements {\n                name\n                value\n            }\n            purposes {\n                consentDate\n                firstTransactionDate\n                id\n                lastTransactionCollectionPointId\n                lastTransactionCollectionPointVersion\n                lastTransactionDate\n                name\n                status\n                totalTransactionCount\n                version\n            }\n        }\n        dssIdentityCreatedAt\n        email\n        emailVerified\n        lastSecurityFlaggedAt\n        locations {\n            manual {\n                country\n            }\n            purchase {\n                country\n                source\n            }\n            registration {\n                geoIp {\n                    country\n                }\n            }\n        }\n        securityFlagged\n        tags\n        taxId\n        userVerified\n    }\n    parentalControls {\n        isProfileCreationProtected\n    }\n    flows {\n        star {\n            isOnboarded\n        }\n    }\n}\n\n    \nfragment profile on Profile {\n    id\n    name\n    isAge21Verified\n    attributes {\n        avatar {\n            id\n            userSelected\n        }\n        isDefault\n        kidsModeEnabled\n        languagePreferences {\n            appLanguage\n            playbackLanguage\n            preferAudioDescription\n            preferSDH\n            subtitleAppearance {\n                backgroundColor\n                backgroundOpacity\n                description\n                font\n                size\n                textColor\n            }\n            subtitleLanguage\n            subtitlesEnabled\n        }\n        groupWatch {\n            enabled\n        }\n        parentalControls {\n            kidProofExitEnabled\n            isPinProtected\n        }\n        playbackSettings {\n            autoplay\n            backgroundVideo\n            prefer133\n            preferImaxEnhancedVersion\n            previewAudioOnHome\n            previewVideoOnHome\n        }\n    }\n    personalInfo {\n        dateOfBirth\n        gender\n        age\n    }\n    maturityRating {\n        ...maturityRating\n    }\n    personalInfo {\n        dateOfBirth\n        age\n        gender\n    }\n    flows {\n        personalInfo {\n            eligibleForCollection\n            requiresCollection\n        }\n        star {\n            eligibleForOnboarding\n            isOnboarded\n        }\n    }\n}\n\n\nfragment maturityRating on MaturityRating {\n    ratingSystem\n    ratingSystemValues\n    contentMaturityRating\n    maxRatingSystemValue\n    isMaxContentMaturityRating\n}\n\n\n    \nfragment session on Session {\n    device {\n        id\n        platform\n    }\n    entitlements\n    features {\n        coPlay\n    }\n    inSupportedLocation\n    isSubscriber\n    location {\n        type\n        countryCode\n        dma\n        asn\n        regionName\n        connectionType\n        zipCode\n    }\n    sessionId\n    experiments {\n        featureId\n        variantId\n        version\n    }\n    identity {\n        id\n    }\n    account {\n        id\n    }\n    profile {\n        id\n        parentalControls {\n            liveAndUnratedContent {\n                enabled\n            }\n        }\n    }\n    partnerName\n    preferredMaturityRating {\n        impliedMaturityRating\n        ratingSystem\n    }\n    homeLocation {\n        countryCode\n    }\n    portabilityLocation {\n        countryCode\n        type\n    }\n}\n\n",
    variables: {
      input: {
        profileId: profile.id,
      },
    },
    operationName: "switchProfile",
  };

  const options = createOptions("POST", header, body);

  const data = await fetchResponse("json", url, options);

  return data.extensions.sdk.token.refreshToken;
}

async function getDRMToken(refreshToken: string, apiKey: string) {
  const url = "https://disney.api.edge.bamgrid.com/graph/v1/device/graphql";

  const header = {
    authorization: apiKey,
  };

  const body = {
    query:
      "mutation refreshToken($input: RefreshTokenInput!) {\n            refreshToken(refreshToken: $input) {\n                activeSession {\n                    sessionId\n                }\n            }\n        }",
    variables: {
      input: {
        refreshToken,
      },
    },
    operationName: "refreshToken",
  };

  const options = createOptions("POST", header, body);

  const data = await fetchResponse("json", url, options);

  return data.extensions.sdk.token.accessToken;
}
