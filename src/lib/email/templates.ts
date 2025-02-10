export const welcomeEmailTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    /* Tailwind-inspired styles */
    .container { max-width: 600px; margin: 0 auto; padding: 20px; font-family: system-ui, -apple-system, sans-serif; }
    .heading { font-size: 24px; color: #1a202c; margin-bottom: 16px; font-weight: bold; }
    .text { color: #4a5568; line-height: 1.5; margin-bottom: 12px; }
    .highlight { color: #4f46e5; font-weight: 500; }
    .button { display: inline-block; background-color: #4f46e5; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin-top: 16px; font-weight: 500; }
    .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #e2e8f0; color: #718096; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <h1 class="heading">Welcome to Botsmann, {{name}}!</h1>
    <p class="text">Thank you for reaching out. We're excited to help you explore innovative <span class="highlight">AI and robotic solutions</span> that can transform your business.</p>
    <p class="text">Our team will carefully review your message and get back to you shortly with personalized recommendations tailored to your specific needs.</p>
    {{#if preferences.newsletter}}
    <p class="text">You'll receive our newsletter with the latest updates, industry insights, and success stories from businesses like yours.</p>
    {{/if}}
    {{#if preferences.productUpdates}}
    <p class="text">We'll keep you informed about new features and improvements that can benefit your business.</p>
    {{/if}}
    <a href="{{dashboardUrl}}" class="button">Visit Your Dashboard</a>
    <div class="footer">
      <p>Best regards,<br>The Botsmann Team</p>
      <p>Questions? Reply to this email or contact us at support@botsmann.com</p>
    </div>
  </div>
</body>
</html>
`;
