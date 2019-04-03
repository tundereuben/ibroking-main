export interface QuoteRiskLimit {
    id?: string,
    code?: number,
    quoteCode?: number,
    quoteRiskCode?: number,
    sectionCode?: number,
    limitAmount?: number,
    premiumRate?: number,
    premiumAmount?: number,
    commissionAmount?: number,
    rateDivisionFactor?: number,
    riskSectionCode?: number,
}