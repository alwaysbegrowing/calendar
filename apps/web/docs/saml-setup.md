# SAML Registration with Identity Providers

This guide explains the settings you need to use to configure SAML with your Identity Provider. Once this is set up you should get an XML metadata file that should then be uploaded on your app.abg.garden self-hosted instance.

> **Note:** Please do not add a trailing slash at the end of the URLs. Create them exactly as shown below.

**Assertion consumer service URL / Single Sign-On URL / Destination URL:** [http://localhost:3000/api/auth/saml/callback](http://localhost:3000/api/auth/saml/callback) [Replace this with the URL for your self-hosted Cal instance]

**Entity ID / Identifier / Audience URI / Audience Restriction:** https://saml.abg.garden

**Response:** Signed

**Assertion Signature:** Signed

**Signature Algorithm:** RSA-SHA256

**Assertion Encryption:** Unencrypted

**Mapping Attributes / Attribute Statements:**

id -> user.id

email -> user.email

firstName -> user.firstName

lastName -> user.lastName
