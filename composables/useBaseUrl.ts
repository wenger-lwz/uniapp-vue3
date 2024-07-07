export function useBaseUrl() {
  // Always works on the client
  if (tryUseNuxtApp()) {
    return useRuntimeConfig().baseUrl
  } else {
    return process.env.BASE_URL
  }
}
