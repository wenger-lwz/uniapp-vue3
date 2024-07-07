declare namespace ORDERS {
  /**
   * 操作消息提醒
   */
  export interface Response {
    /**
     * 错误码
     */
    code?: number | null
    /**
     * 数据
     */
    data?: TrackInfoVO
    /**
     * 错误信息
     */
    msg?: null | string
    [property: string]: any
  }

  /**
   * 数据
   *
   * TrackInfoVO
   */
  export interface TrackInfoVO {
    carrier: number
    number: string
    param: string
    tag: string
    /**
     * 物流信息主结构节点
     */
    trackInfo: TrackInfo
    [property: string]: any
  }

  /**
   * 物流信息主结构节点
   */
  export interface TrackInfo {
    latestEvent: LatestEvent
    latestStatus: LatestStatus
    milestone: Milestone[]
    miscInfo: MiscInfo
    shippingInfo: ShippingInfo
    timeMetrics: TimeMetrics
    /**
     * 物流信息
     */
    tracking: Tracking
    [property: string]: any
  }

  export interface LatestEvent {
    address: LatestEventAddress
    description: string
    descriptionTranslation: LatestEventDescriptionTranslation
    location: string
    stage: string
    timeIso: string
    timeUtc: string
    [property: string]: any
  }

  export interface LatestEventAddress {
    city: string
    coordinates: PurpleCoordinates
    country: string
    postalCode: string
    state: string
    street: string
    [property: string]: any
  }

  export interface PurpleCoordinates {
    latitude: string
    longitude: string
    [property: string]: any
  }

  export interface LatestEventDescriptionTranslation {
    description: string
    lang: string
    [property: string]: any
  }

  export interface LatestStatus {
    status: string
    subStatus: string
    subStatusDescr: string
    [property: string]: any
  }

  export interface Milestone {
    keyStage?: string
    timeIso?: string
    timeUtc?: string
    [property: string]: any
  }

  export interface MiscInfo {
    customerNumber: string
    dimensions: string
    localKey: number
    localNumber: string
    localProvider: string
    pieces: string
    referenceNumber: string
    riskFactor: number
    serviceType: string
    weightKg: string
    weightRaw: string
    [property: string]: any
  }

  export interface ShippingInfo {
    recipientAddress: RecipientAddress
    shipperAddress: ShipperAddress
    [property: string]: any
  }

  export interface RecipientAddress {
    city: string
    coordinates: RecipientAddressCoordinates
    country: string
    postalCode: string
    state: string
    street: string
    [property: string]: any
  }

  export interface RecipientAddressCoordinates {
    latitude: string
    longitude: string
    [property: string]: any
  }

  export interface ShipperAddress {
    city: string
    coordinates: ShipperAddressCoordinates
    country: string
    postalCode: string
    state: string
    street: string
    [property: string]: any
  }

  export interface ShipperAddressCoordinates {
    latitude: string
    longitude: string
    [property: string]: any
  }

  export interface TimeMetrics {
    daysAfterLastUpdate: number
    daysAfterOrder: number
    daysOfTransit: number
    daysOfTransitDone: number
    estimatedDeliveryDate: EstimatedDeliveryDate
    [property: string]: any
  }

  export interface EstimatedDeliveryDate {
    from: string
    source: string
    to: string
    [property: string]: any
  }

  /**
   * 物流信息
   */
  export interface Tracking {
    providers: ProviderElement[]
    providersHash: number
    [property: string]: any
  }

  export interface ProviderElement {
    events?: Event[]
    eventsHash?: number
    latestSyncStatus?: string
    latestSyncTime?: string
    provider?: ProviderProvider
    serviceType?: string
    [property: string]: any
  }

  export interface Event {
    address?: EventAddress
    description?: string
    descriptionTranslation?: EventDescriptionTranslation
    location?: string
    stage?: string
    timeIso?: string
    timeUtc?: string
    [property: string]: any
  }

  export interface EventAddress {
    city: string
    coordinates: FluffyCoordinates
    country: string
    postalCode: string
    state: string
    street: string
    [property: string]: any
  }

  export interface FluffyCoordinates {
    latitude: string
    longitude: string
    [property: string]: any
  }

  export interface EventDescriptionTranslation {
    description: string
    lang: string
    [property: string]: any
  }

  export interface ProviderProvider {
    alias: string
    country: string
    homepage: string
    key: number
    name: string
    tel: string
    [property: string]: any
  }
}
