import { getExtensionVersion } from './utils'

const API_HOST = 'https://chatgpt4google.com'
// const API_HOST = 'http://localhost:3000'

export async function fetchExtensionConfigs(): Promise<{
  chatgpt_webapp_model_name: string
  openai_model_names: string[]
}> {
  return fetch(`${API_HOST}/api/config`, {
    headers: {
      'x-version': getExtensionVersion(),
    },
  }).then((r) => r.json())
}
