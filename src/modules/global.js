

const globalsVariable = {
    auth: {
        get user() {
            return localStorage.getItem('authedUser')
                ? JSON.parse(localStorage.getItem('authedUser'))
                : null
        }
    },
    api: {
        baseURL: 'http://localhost:8000',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    },
    methods: {
        capitalizeMany: s => (s && s.split(' ').length > 1 ? s.split(' ').map(ss => globalsVariable.methods.capitalize(ss)).join(' ') : globalsVariable.methods.capitalize(s)),
        capitalize: s => (s && s[0].toUpperCase() + s.slice(1).toLowerCase()) || '',
        _spacing: s => s ? s.split('_').map(ss => ss[0].toUpperCase() + ss.slice(1).toLowerCase()).join(' ') : '',
        pagination: (list, count, page) => list.slice((page - 1) * count, page * count),
        scrollTop: () => window.scrollTo({ top: 0, left: 0 }),
        scrollTopSmooth: () => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }),
        imageBase64Js: image => image.slice(0, 5) === 'data:' ? image : `data:image/png;base64,${image}`,
        imagePyBase64Js: image => image.slice(22),
        trancEmail: e => e.split('@')[1],
        avatar: org => {
            const lst = org.split(' ')
            if (lst.length === 1) {
                return org.includes('-') ? org.split('-')[0][0] + org.split('-')[1].slice(0, 3) : org.length === 2 ? org : org.slice(0, 3)
            } else if (lst.length === 2) {
                return lst[0][0] + lst[1][0]
            } else {
                return lst[0][0] + lst[1][0] + lst[2][0]
            }
        },
        avatarProfile: name => {
            const lst = name.split(' ')
            if (lst.length === 1) {
                return lst[0][0] + lst[0][1]
            }
            else {
                let last = lst[lst.length - 1]
                return lst[0][0] + last[0]
            }
        },
    },
    enums: {
        Men: ['Polo_Shirt', 'Tshirt', 'Sweatshirts', 'Jeans', 'Shirt', 'Jacket', 'Shoes', 'Hats', 'Sneakers', 'Sport_Sweatshirts',
            'Sport_Pants', 'Sport_Jacket', 'Sport_T-shirt', 'Vest', 'Shorts', 'Socks', 'Belts', 'Accessories', 'Wallet',
            'Perfums', 'Watch', 'Sunglasses'],

        Woman: ['Jacket', 'Dresses', 'Skirts', 'Tshirt', 'Shirt', 'Jeans', 'Sweatshirts', 'Shoes', 'Sneakers', 'Sandals', 'Hats', 'Shorts',
            'Sunglasses', 'Coats', 'Polo_Shirt', 'Sett', 'Socks', 'Body_Suits', 'Trench_Coats', 'Heels', 'Handbags', 'Belts',
            'Accessories', 'Wallet', 'Perfums', 'Watch', 'Sunglasses'],

        Kids_Boy: ['Tshirt', 'Jeans', 'Sweatshirts', 'Shoes', 'Sneakers', 'Sandals', 'Hats', 'Shorts', 'Sunglasses', 'Coats',
            'Polo_Shirt', 'Handbags', 'Belts', 'Accessories', 'Wallet', 'Socks'],

        Kids_girl: ['Polo_Shirt', 'Tshirt', 'Sweatshirts', 'Jeans', 'Shirt', 'Jacket', 'Shoes', 'Hats', 'Sneakers', 'Sport_Sweatshirts',
            'Sport_Pants', 'Sport_Jacket', 'Sport_T-shirt', 'Vest', 'Shorts', 'Socks', 'Belt', 'Accessories'],
        cities: [{ region: 'Lebanon', prefix: '+961' }]
    },
    constants: {
        gender: ['Men', 'Woman', 'Kids_Boy', 'Kids_Girl']
    }
}

export default globalsVariable