
export const DEFAULT_GENDER = ['Men', 'Woman', 'Kids_Boy', 'Kids_Girl']

const XSMLMW = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
const NBJSM = [28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38]
const NBSSM = [40, 41, 42, 43, 44, 45]
const HSMW = ['OSFA', 'One Size', 'Standard']
const SMW = ['Standard']
const BM = ['70 cm', '80 cm', '90 cm', '100 cm', '110 cm', '120 cm']
const BW = ['30 cm', '40 cm', '50 cm', '60 cm', '70 cm', '80 cm']
const DEFAULTMW = [...XSMLMW, ...NBSSM]
const NBSSW = [36, 37, 38, 39, 40]
const NBJW = [28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38]
const SCBG = ['0-6 month', '6 month-1 year', '1-2 year', '1-2 year', '3-4 year', '5-6 year', '6-7 year', '9-10 year', '11-12 years']
const NBSHBG = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35]
const BBG = ['5 cm', '10 cm', '15 cm', '20 cm', '25 cm', '30 cm']



const COMMON_SZMW = {
    Tshirt: XSMLMW,
    Shirt: XSMLMW,
    Polo_shirt: XSMLMW,
    Jacket: XSMLMW,
    Sweatshirt: XSMLMW,
    Sett: XSMLMW,
    Trench_Coats: XSMLMW,
    Sport_sweatshirt: XSMLMW,
    Sport_pants: XSMLMW,
    Sport_Jacket: XSMLMW,
    Sport_T_Shirt: XSMLMW,
    Vest: XSMLMW,
    Shorts: XSMLMW,
    Perfumes: SMW,
    Watch: SMW,
    Sunglasses: SMW,
    Handbags: SMW,
    Hats: HSMW,
    Socks: HSMW,
    Accessories: SMW,
    Sunglasses: SMW,
    Wallet: SMW,
    Default: DEFAULTMW
}

const COMMON_SZBG = {
    Tshirt: SCBG,
    Polo_Shirt: SCBG,
    Jeans: SCBG,
    Sweatshirts: SCBG,
    Shoes: NBSHBG,
    Sneakers: NBSHBG,
    Hats: SMW,
    Shorts: SCBG,
    Belts: BBG,
    Jacket: SCBG,
    Sport_Sweatshirts: SCBG,
    Sport_Pants: SCBG,
    Sport_Jacket: SCBG,
    Sport_Tshirt: SCBG,
    Vest: SCBG,
    Socks: SMW,
    Sandals: NBSHBG,
    Coats: SCBG,
    Sunglasses: SMW,
    Accessories: SMW,
    Handbags: SMW,
    Wallet: SMW,
    Default: [...SCBG, ...NBSHBG]
}


const CATEGORIES_SIZES = {
    Men: {
        ...COMMON_SZMW,
        Shoes: NBSSM,
        Sandals: NBSSW,
        Jeans: NBJSM,
        Suits: XSMLMW,
        Sneackers: NBSSM,
        Belts: BM,
    },
    Woman: {
        ...COMMON_SZMW,
        Shoes: NBSSW,
        Sneackers: NBSSW,
        Heels: NBSSW,
        Jeans: NBJW,
        Skirts: NBJSM,
        Dresses: XSMLMW,
        Coats: XSMLMW,
        Body_Suits: XSMLMW,
        Belts: BW
    },
    Kids_Boy: {
        ...COMMON_SZBG
    },
    Kids_Girl: {
        ...COMMON_SZBG,
        Dresses: SCBG,
        Skirt: SCBG
    },
    Default: {
        ...COMMON_SZMW,
    }
}

export const PRICE = {
    lowest: 10,
    highest: 1000
}

export const COLORS = {}

export const GENDER = {
    Men: CATEGORIES_SIZES.Men,
    Woman: CATEGORIES_SIZES.Woman,
    Kids_Boy: CATEGORIES_SIZES.Kids_Boy,
    Kids_Girl: CATEGORIES_SIZES.Kids_Girl,
    Default: CATEGORIES_SIZES.Default
}