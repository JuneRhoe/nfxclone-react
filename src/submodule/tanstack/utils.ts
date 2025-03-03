const API_URL = `https://${process.env.API_KEY}.mockapi.io/api/`

export interface SearchParamInfo {
  name: string
  value: string
}

export async function queryFunction(endPoint: string, paramInfos: SearchParamInfo[] = []): Promise<Response | null> {
  const url = new URL(`${API_URL}${endPoint}`)
  
  for (const paramInfo of paramInfos) {
    url.searchParams.append(paramInfo.name, paramInfo.value)
  }

  let response: Response | null = null

  try {
    response = await fetch(url, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    })
  } catch (e) {
    // Error handling
    console.error(e)
  }
  
  return response;
}

export async function mutationFunction<TData>(endPoint: string, newData: TData): Promise<Response | null> {
  let response: Response | null = null

  try {
    response = await fetch(`${API_URL}${endPoint}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newData)
    })
  } catch (e) {
    // Error handling
    console.error(e)
  }  

  return response;
}