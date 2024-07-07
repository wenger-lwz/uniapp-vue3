/**
 * 管理多租户
 * @param {string} tenantId 租户ID
 */
export const useGoogleGtag = (tenantId: string) => {
  const { gtag, grantConsent, revokeConsent } = useGtag()
  function acceptTracking() {
    grantConsent(tenantId)
  }
}
