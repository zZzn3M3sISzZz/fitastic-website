# Fitastic website

Marketing landing page for Fitastic — a connected fitness experience. Production host: **[fitastic.cc](https://fitastic.cc)**.

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To exercise the waitlist against a deployed API:

```bash
NEXT_PUBLIC_WAITLIST_API_URL=https://<admin-api-id>.execute-api.<region>.amazonaws.com/prod/waitlist npm run dev
```

## Production: AWS Amplify Hosting

Infrastructure is **`WebsiteHostingStack`** in `fitastic-cdk` — the same Amplify `WEB_COMPUTE` pattern as the Partner Portal (`AdminDashboardHostingStack`).

### 1. Deploy the stack

From `fitastic-cdk`:

```bash
npx cdk deploy WebsiteHostingStack
# After AdminStack has the waitlist route:
npx cdk deploy AdminStack WebsiteHostingStack
```

Optional: pass the Git repo so Amplify auto-builds `main`:

```bash
WEBSITE_GITHUB_TOKEN=ghp_... npx cdk deploy WebsiteHostingStack -c websiteRepo=https://github.com/<org>/fitastic-website
```

If the stack is created without Git, connect the repo in **Amplify → Hosting → Connect branch**.

### 2. Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_WAITLIST_API_URL` | Yes | Public `POST` URL from AdminStack output `WaitlistApiEndpoint` |

CDK sets this from the Admin API. After changing it, **redeploy the Amplify branch** so the value is baked into the client bundle.

### 3. Custom domain `fitastic.cc` (Hostinger)

Amplify app: `d3h1i1y7pslswm` (`https://main.d3h1i1y7pslswm.amplifyapp.com`).

Amplify does **not** manage Hostinger DNS. Domain association is already created for `fitastic.cc` + `www`.

1. In Hostinger → DNS for `fitastic.cc`, add these CNAMEs (and remove conflicting **A** / **AAAA** on the same hosts):

   | Host | Type | Target |
   |---|---|---|
   | `_43e0d94439af113e07499ae0ce2a1c70` | CNAME | `_d03dad6c9b9e2921e11fa234f2f9c8b1.jkddzztszm.acm-validations.aws.` |
   | `www` | CNAME | `d2l9aebomqdv3s.cloudfront.net` |
   | `@` (apex) | CNAME/ALIAS | `d2l9aebomqdv3s.cloudfront.net` |

   If Hostinger cannot ALIAS the apex, redirect `fitastic.cc` → `www.fitastic.cc`.
2. Wait until Amplify shows the domain **Available**. Until DNS points at that CloudFront hostname, browsers may show TLS errors.

Connect this GitHub repo to the Amplify app (Hosting → Connect branch) so `main` builds. The waitlist URL is already set as `NEXT_PUBLIC_WAITLIST_API_URL`.

### 4. Useful commands

```bash
aws cloudformation describe-stacks --stack-name WebsiteHostingStack --query 'Stacks[0].Outputs' --output table
aws amplify start-job --app-id <id> --branch-name main --job-type RELEASE
```
