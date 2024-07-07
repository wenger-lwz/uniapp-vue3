export function useReqHearder() {
  // Always works on the client
  if (tryUseNuxtApp()) {
    return useNuxtApp().ssrContext?.event.node.req.headers
  } else {
    return {}
  }
}
