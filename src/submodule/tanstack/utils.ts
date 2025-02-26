export async function getQueryFunction(endPoint: string) {
  const response = await fetch(`https://${process.env.API_KEY}.mockapi.io/api/${endPoint}`)
  
  return await response.json();
}