

const initFilters = (
    category = {
        Men: [
            { value: 'Polo_Shirt', checked: false },
            { value: 'Tshirt', checked: false },
            { value: 'Sweatshirts', checked: false },
            { value: 'Jeans', checked: false },
            { value: 'Shirt', checked: false },
            { value: 'Jacket', checked: false },
            { value: 'Shoes', checked: false },
            { value: 'Hats', checked: false },
            { value: 'Sneakers', checked: false },
            { value: 'Sport_Sweatshirts', checked: false },
            { value: 'Sport_Pants', checked: false },
            { value: 'Sport_Jacket', checked: false },
            { value: 'Sport_T-shirt', checked: false },
            { value: 'Vest', checked: false },
            { value: 'Shorts', checked: false },
            { value: 'Socks', checked: false },
            { value: 'Belts', checked: false },
            { value: 'Accessories', checked: false },
            { value: 'Wallet', checked: false },
            { value: 'Perfums', checked: false },
            { value: 'Watch', checked: false },
            { value: 'Sunglasses', checked: false },
        ],
        Woman: [
            { value: 'Jacket', checked: false },
            { value: 'Dresses', checked: false },
            { value: 'Skirts', checked: false },
            { value: 'Tshirt', checked: false },
            { value: 'Jeans', checked: false },
            { value: 'Sweatshirts', checked: false },
            { value: 'Shoes', checked: false },
            { value: 'Sneakers', checked: false },
            { value: 'Sandals', checked: false },
            { value: 'Hats', checked: false },
            { value: 'Shorts', checked: false },
            { value: 'Sunglasses', checked: false },
            { value: 'Coats', checked: false },
            { value: 'Polo_Shirt', checked: false },
            { value: 'Sett', checked: false },
            { value: 'Socks', checked: false },
            { value: 'Body_Suits', checked: false },
            { value: 'Trench_Coats', checked: false },
            { value: 'Heels', checked: false },
            { value: 'Handbags', checked: false },
            { value: 'Belts', checked: false },
            { value: 'Accessories', checked: false },
            { value: 'Wallet', checked: false },
            { value: 'Perfums', checked: false },
            { value: 'Watch', checked: false },
            { value: 'Sunglasses', checked: false },
        ],
        Kids_Boy: [
            { value: 'Tshirt', checked: false },
            { value: 'Jeans', checked: false },
            { value: 'Sweatshirts', checked: false },
            { value: 'Shoes', checked: false },
            { value: 'Sneakers', checked: false },
            { value: 'Sandals', checked: false },
            { value: 'Hats', checked: false },
            { value: 'Shorts', checked: false },
            { value: 'Sunglasses', checked: false },
            { value: 'Coats', checked: false },
            { value: 'Polo_Shirt', checked: false },
            { value: 'Handbags', checked: false },
            { value: 'Belts', checked: false },
            { value: 'Accessories', checked: false },
            { value: 'Wallet', checked: false },
            { value: 'Socks', checked: false },

        ],

        kids_girl: [
            { value: 'Polo_Shirt', checked: false },
            { value: 'Tshirt', checked: false },
            { value: 'Sweatshirts', checked: false },
            { value: 'Jeans', checked: false },
            { value: 'Shirt', checked: false },
            { value: 'Jacket', checked: false },
            { value: 'Shoes', checked: false },
            { value: 'Hats', checked: false },
            { value: 'Sneakers', checked: false },
            { value: 'Sport_Sweatshirts', checked: false },
            { value: 'Sport_Pants', checked: false },
            { value: 'Sport_Jacket', checked: false },
            { value: 'Sport_T-shirt', checked: false },
            { value: 'Vest', checked: false },
            { value: 'Shorts', checked: false },
            { value: 'Socks', checked: false },
            { value: 'Belt', checked: false },
            { value: 'Accessories', checked: false },

        ],
        expanded: true,
        multiSelected: true,
        controlled: { value: [], operator: 'is' }
    },
    Sizes = {
        Men: [
            {value: 28}
        ],
        Men: [
            { value: [28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38], categories: ['Jeans', 'Shorts', 'Heels'] },
            { value: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'], categories: ['Tshirt', 'Vest', 'Coats', 'Trench_Coats', 'Sett', 'Body_Suits', 'Sandals', 'Skirts', 'Dresses', 'Shirt', 'Jacket', 'Polo_Shirt', 'Sweatshirts', 'Sport_Sweatshirts', 'Sport_Jacket', 'Sport_T-shirt',] },
            { value: [40, 41, 42, 43, 44, 45], categories: ['Shoes', 'Sneakers',] },
            { value: ['OSFA', 'One Size', 'Standard'], categories: ['Hats', 'Socks'] },
            { value: ['Standart'], categories: [] },
            { value: ['70 cm', '80 cm', '90 cm', '100 cm', '110 cm', '120 cm'], categories: ['Belts',] },
            { value: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 40, 41, 42, 43, 44, 45], categories: [] },
        ],
        Woman: {
            int_j: [28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38],
            str: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
            int: [36, 37, 38, 39, 40],
            str_hat: ['OSFA', 'One Size', 'Standard'],
            str_socks: ['Standart'],
            str_belt: ['30 cm', '40 cm', '50 cm', '60 cm', '70 cm', '80 cm'],
            mix: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 40, 41, 42, 43, 44, 45]
        },
        kids_girl: {
            str: ['0-6 month', '6 month-1 year', '1-2 year', '1-2 year', '3-4 year', '5-6 year', '6-7 year', '9-10 year', '11-12 years'],
            int: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35],
            str_hat: ['OSFA', 'One Size', 'Standard'],
            str_socks: ['Standart'],
            str_belt: ['5 cm', '10 cm', '15 cm', '20 cm', '25 cm', '30 cm'],
            mix: ['0-6 month', '6 month-1 year', '1-2 year', '1-2 year', '3-4 year', '5-6 year', '6-7 year', '9-10 year', '11-12 years', 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35]

        },
        Kids_Boy: {
            int_j: ['0-6 month', '6 month-1 year', '1-2 year', '1-2 year', '3-4 year', '5-6 year', '6-7 year', '9-10 year', '11-12 years'],
            str: ['0-6 month', '6 month-1 year', '1-2 year', '1-2 year', '3-4 year', '5-6 year', '6-7 year', '9-10 year', '11-12 years'],
            int: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35],
            str_hat: ['OSFA', 'One Size', 'Standard'],
            str_socks: ['Standart'],
            str_belt: ['5 cm', '10 cm', '15 cm', '20 cm', '25 cm', '30 cm'],
            mix: ['0-6 month', '6 month-1 year', '1-2 year', '1-2 year', '3-4 year', '5-6 year', '6-7 year', '9-10 year', '11-12 years', 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35]

        },
        expanded: true,
        // multiSelected: true,
        controlled: { value: [], operator: 'is' }
    },
    price = {
        lowest: 0,
        highest: 200,
        expanded: true,
        slider: true,
        controlled: { value: [], operator: 'between' }
    },
    colors = {}
) => (
    {
        category,
        Sizes,
        price,
        colors
    }
)

export default initFilters