# Email Setup Instructions

To enable the contact form to send emails to **abrhambest7@gmail.com**, you need to set up Resend API.

## Quick Setup Steps:

1. **Sign up for Resend** (Free tier available):
   - Go to https://resend.com
   - Create a free account

2. **Get your API Key**:
   - After signing up, go to https://resend.com/api-keys
   - Click "Create API Key"
   - Copy the API key (starts with `re_`)

3. **Create `.env.local` file** in the project root:
   ```bash
   RESEND_API_KEY=re_your_actual_api_key_here
   ```

4. **Restart your development server**:
   ```bash
   npm run dev
   ```

## Testing:

After setting up, test the contact form:
- Fill out the form on your portfolio
- Submit it
- Check your email inbox at **abrhambest7@gmail.com**

## Troubleshooting:

- **"Email service is not configured"**: Make sure you created `.env.local` with the API key
- **"Failed to send email"**: Check that your API key is correct and active
- **Emails not received**: Check spam folder, and verify the API key has sending permissions

## Note:

Initially, emails will be sent from `onboarding@resend.dev`. After verifying your domain with Resend, you can update the `from` field in `app/api/send-email/route.ts` to use your own domain.

