🚀 Hosting React/Vue Microfrontend on AWS S3

Follow these steps to host your frontend app on Amazon S3:

1. Create an S3 Bucket

- Go to the AWS Console → search for S3.

- Click Create bucket.

- Enter a unique bucket name (e.g., `my-mfe-container`).

- Leave all other fields as default → click Create bucket.

2. Enable Static Website Hosting

- Open your newly created bucket.

- Go to the Properties tab.

- Scroll down to Static website hosting.

- Click Edit → enable Host a static website.

- Set the Index document to:

```js
index.html
```
- Save changes.

3. Update Bucket Permissions

- Go to the Permissions tab of your bucket.

- Click Edit under Block public access settings.

- Uncheck Block all public access.

- Confirm and Save changes.

**🔑 Configure Bucket Policy for CloudFront Access**

To allow CloudFront (or public access) to fetch files from your S3 bucket, update the bucket policy:

1. Open Bucket Policy Editor

- Go to your S3 bucket → Permissions tab.

- Scroll to Bucket policy → click Edit.

2. Use Policy Generator

- Click Policy generator to create a policy.

- Choose:

  - Policy Type: `S3 Bucket Policy`

  - Principal: `*` (allows public access)

  - Actions: `GetObject`

  - Resource (ARN):

    - Copy the ARN of your bucket (from the same page).

    - Append `/*` to allow access to all files inside the bucket.

    - Example:
     
    ```ruby

    arn:aws:s3:::my-mfe-container/*

    ```
⚠️ If adding ARN with `/*` doesn’t work, you can:

- Select `*` (all resources) in the policy generator.

- Generate the policy JSON.

- Then manually replace `"Resource": "*"` with your correct bucket ARN (with `/*`).

3. Generate & Apply Policy

- Click Add Statement → Generate Policy.

- Copy the generated JSON.

- Paste it into the Bucket policy editor.

- Save changes.


```js
**Notes on CloudFront UI Updates**

Before setting up a CloudFront distribution, be aware that the AWS UI has changed slightly compared to older tutorials or videos. Here are the key differences:

1. Delivery Method

- Previously, you had to choose between Web and RTMP.

- The RTMP option has been removed, so CloudFront now defaults to Web delivery. No manual selection is required.

2. Distribution Settings

- What was earlier called “Distribution settings” is now simply labeled “Settings.”

3. SSL Certificate

- The SSL certificate fields look different.

- You won’t see the default CloudFront certificate explicitly shown, but rest assured, the default certificate is still applied automatically—no action needed.
```

**🚀 Setting up CloudFront Distribution**

1. Open CloudFront

- In the AWS Console, open a new tab.

- Search for CloudFront and click on it.

2. Create Distribution

- Click on Create distribution.

- If prompted, switch to the previous version of the create distribution page (UI option).

3. Configure Origin

- In the Origin domain field, select your S3 bucket name.

4. Default Cache Behavior Settings

- Scroll down to Viewer protocol policy.

- Select Redirect HTTP to HTTPS (ensures all traffic is served securely).

5. Finalize Distribution

- Review settings.

- Click Create distribution.

🔧 Configure Root Object & Error Handling

1. Set Default Root Object

- Once the distribution is created, click on your distribution ID.

- Go to the General tab.

- Click the Edit icon.

- In the Default root object field, enter:

```bash

container/latest/index.html

```
- Save changes.

2. Configure Custom Error Response

- Navigate to the Error pages tab.

- Click Create custom error response.

- In the HTTP error code dropdown, select 403: Forbidden.

- Enable Customize error response (check Yes).

- Set Response page path to:

```bash

/container/latest/index.html

```
- Set HTTP response code to 200 OK.

- Click Create custom error response.


**Create an IAM User for AWS Deployment Keys**

1. Open a new tab in the AWS Console.

2. In the search bar, type IAM and open the IAM service.

3. From the left sidebar, click Users → then click Create user.

4. Enter a username (e.g., mfe-github-action) and click Next.

5. On the Permissions step, select Attach policies directly.

   - Search for AmazonS3FullAccess and check it.

   - Search for CloudFrontFullAccess and check it.

6. Click Next, review the details, then click Create user.

7. From the list of users, select the newly created user.

8. Go to the Security credentials tab.

9. Scroll down to the Access keys section → click Create access key.

10. Choose Command Line Interface (CLI) as the use case.

11. Tick the I understand... confirmation box, then click Next.

12. Copy and/or download the Access Key ID and Secret Access Key — these will be used for your GitHub Actions deployment.

Issue

- After pushing new code, the application wasn’t loading the latest changes.

- Reason:

  - All static assets (JS/CSS bundles) are built with unique hash filenames → CloudFront automatically picks new ones.

  - But `index.html` keeps the same name → CloudFront serves the cached old version unless explicitly invalidated.

Fix: Enable Fresh index.html

1. Webpack Config

- In `webpack.prod.config.js`, set:

   ```js
   output: {
   filename: "[name].[contenthash].js",
   publicPath: "/container/latest/",
   }
   ```
- Ensures assets use hashed names and load correctly.

2. CloudFront Invalidation

- Go to AWS Console → CloudFront → Distribution → Invalidations.

- Click Create Invalidation.

- Enter the path for the root HTML file:

```bash

/container/latest/index.html

```
- This forces CloudFront to fetch the latest deployed version.

Automating Invalidation (CI/CD)

- In GitHub Actions workflow, add an invalidation step after S3 upload:

```yaml
- run: aws cloudfront create-invalidation --distribution-id ${{ secrets.AWS_CLOUDFRONT_DISTRIBUTION_ID }} --paths "/container/latest/index.html"
  env:
    AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
    AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }} 
    AWS_DEFAULT_REGION: us-east-1
```
- This ensures every new deployment always uses the fresh index.html.

Result

- JS/CSS assets auto-update via unique hashes.

- index.html always refreshed via CloudFront invalidation.

- No manual invalidation required.

🚀 Deploying Marketing App (Microfrontend)

Steps

1. Duplicate Workflow

- Copy the existing `container.yml` workflow file.

- Save it as `marketing.yml` inside `.github/workflows/`.

2. Update Workflow Paths

- In `marketing.yml`, update all references from `container → marketing` (folder names, build paths, S3 paths, etc.).

3. Add Production Domain Secret

- In GitHub repo settings, go to Secrets and variables → Actions.

- Create a new secret:

```bash

PRODUCTION_DOMAIN

```
- Store the Marketing app’s production domain here.

4. Use Secret in Workflow

Update `container.yml` to reference `PRODUCTION_DOMAIN` for deployment.

5. Webpack Config Update

In `marketing/webpack.prod.config.js`, set:

```js
output: {
  filename: "[name].[contenthash].js",
  publicPath: "/marketing/latest/",
}
```
6. Commit & Push

- Commit changes (workflow + config).

- Push to GitHub → triggers new deployment for Marketing app.


**Production style workflow**

```bash
+---------------------------------------------------+
| Each team develops features on git branches like  |
| 'container-dev'                                   |
+---------------------------------------------------+
                        |
                        v
+---------------------------------------------------+
| Feature complete and ready for deployment?         |
| Push branch to GitHub                              |
+---------------------------------------------------+
                        |
                        v
+---------------------------------------------------+
| Create a Pull Request to merge into master/main   |
+---------------------------------------------------+
                        |
                        v
+---------------------------------------------------+
| Other engineers review the Pull Request           |
+---------------------------------------------------+
                        |
                        v
+---------------------------------------------------+
| When ready to deploy, merge the Pull Request      |
+---------------------------------------------------+
                        |
                        v
+---------------------------------------------------+
| Workflow detects change to master/main branch     |
| → Deployment runs automatically                   |
+---------------------------------------------------+
```

