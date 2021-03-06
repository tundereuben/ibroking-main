export interface QuoteRiskLimit {
    qrlCode?: number,
    qrlClntCode?: number,
    qrlSectCode?: number,
    qrlSectShtDesc?: String,
    qrlLimitAmt?: number,
    qrlPremRate?: number,
    qrlPremAmt?: number,
    qrlQrCode?: number,
    qrlQrQuotCode?: number,
    qrlQpProCode?: number,
    qrlQpCode?: number,
    qrlSectType?: String,
    qrlRateType?: String,
    qrlRateDesc?: String,
    qrlRateDivFactor?: number,
    qrlAnnualPrem?: number,
    qrlUsedLimit?: number,
    qrlDesc?: String,
    qrlDualBasis?: String

    // id?: string,
    // code?: number,
    // quoteCode?: number,
    // quoteRiskCode?: number,
    // sectionCode?: number,
    // limitAmount?: number,
    // premiumRate?: number,
    // premiumAmount?: number,
    // commissionAmount?: number,
    // rateDivisionFactor?: number,
    // riskSectionCode?: number,
}