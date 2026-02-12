export async function logToGoogleSheet(data: Record<string, unknown>) {
  // Add timestamp if not present
  const payload = {
    ...data,
    timestamp: data.timestamp || new Date().toISOString(),
  };

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  
  if (!webhookUrl) {
    // If no URL is configured, we silently skip external logging
    // This allows the app to work locally without configuration
    return;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.warn('Failed to log to Google Sheets:', response.statusText);
    }
  } catch (error) {
    console.warn('Error logging to Google Sheets:', error);
  }
}
