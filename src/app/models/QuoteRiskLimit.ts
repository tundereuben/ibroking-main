export interface QuoteRiskLimit {
    id?: string,
    code?: number,
    quoteCode?: number,
    quoteRiskCode?: number,
    sectionCode?: number,
    limitAmount?: number,
    premiumRate?: number,
    premiumAmount?: number,
    rateDivisionFactor?: number,
    riskSectionCode?: number,
}