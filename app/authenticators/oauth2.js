import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';
import config from 'point-maker-web/config/environment';

const host = config.apiUrl || '';
const serverTokenEndpoint = [ host, 'oauth/token' ];
export default class OAuth2Authenticator extends OAuth2PasswordGrant {
  serverTokenEndpoint = serverTokenEndpoint.join('/')
};
