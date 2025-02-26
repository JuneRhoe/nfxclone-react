const API_URL = `https://${process.env.API_KEY}.mockapi.io/api/`

export async function queryFunction<TQueryFnData>(endPoint: string): Promise<TQueryFnData> {
  let response: Response | null = null

  try {
    response = await fetch(`${API_URL}${endPoint}`, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    })
    
    if (!response.ok) {
      throw new Error(response.statusText)
    }
  } catch (e) {
    // Error handling
    console.error(e)
  }
  
  return await response?.json();
}

export async function mutationFunction<TData>(endPoint: string, newData: TData): Promise<TData> {
  let response: Response | null = null

  try {
    response = await fetch(`${API_URL}${endPoint}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newData)
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }
  } catch (e) {
    // Error handling
    console.error(e)
  }  

  return await response?.json();
}