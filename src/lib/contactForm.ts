export interface ContactFormData {
  name: string
  email: string
  message: string
  aoss_bot_check?: string // honeypot
}

export async function submitContactForm(data: ContactFormData): Promise<boolean> {
  const webhookUrl = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL

  if (!webhookUrl) {
    console.error('Google Sheets webhook URL is not configured.')
    return false
  }

  // If honeypot is filled, silently resolve (prevent spam)
  if (data.aoss_bot_check) {
    return true
  }

  try {
    const formData = new URLSearchParams()
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('message', data.message)

    // Using no-cors might cause the response body to be opaque,
    // so we handle it gracefully. We also use POST with form urlencoded
    // to avoid complex preflight when not needed, though the Apps Script
    // will need to handle it.
    const response = await fetch(webhookUrl, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      mode: 'no-cors' // Required for Apps Script Web App POST from browser
    })

    // If it's no-cors, response.ok is false and status is 0, but it might have succeeded.
    // If we use standard cors and the server responds correctly, we get a 200.
    if (response.ok || response.type === 'opaque') {
      return true
    }
    
    return false
  } catch (error) {
    console.error('Form submission error:', error)
    return false
  }
}
