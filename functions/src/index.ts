import * as functions from "firebase-functions";
import {getUID, updateClaims} from "./utils";

export const refreshToken = functions
    .region("europe-west3")
    .https.onCall(async (data, context) => {
      functions.logger.log("START REFRESH ??");
      const uid = getUID(context);
      try {
        await updateClaims(uid);
      } catch (e) {
        functions.logger.error("REFRESH ERROR", e);
        throw new functions.https.HttpsError(
            "internal",
            "error refreshing auth token",
        );
      }
    });
