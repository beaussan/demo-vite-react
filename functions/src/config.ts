import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import {GraphQLClient} from "graphql-request";
import {getSdk} from "./generated/graphql";

export const app = admin.initializeApp();

// import * as functions from 'firebase-functions';
export const db = app.firestore();
export const auth = app.auth();

// ENV
export const hasuraGraphqlUrl = functions.config().hasura.graphql_url;
const hasuraAdminSecret = functions.config().hasura.admin_secret;

const gqlClient = new GraphQLClient(hasuraGraphqlUrl, {
  headers: {"x-hasura-admin-secret": hasuraAdminSecret},
});

export const gqlSdk = getSdk(gqlClient);
