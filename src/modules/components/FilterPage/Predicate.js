

class GenderPredicate {
    constructor(gender) {
        this.gender = gender
    }
    apply = itemIn => this.gender.length === 0 || this.gender.includes(itemIn.gender)
    set_gender = g => this.gender = g
}

class CategoryPredicate {
    constructor(category) {
        this.category = category
    }
    apply = itemIn => this.category.length === 0 || this.category.includes(itemIn.item_category)
    set_category = g => this.category = g
}

class SizePredicate {
    constructor(size) {
        this.size = size
    }

    apply = itemIn => {
        if (this.size.length === 0) return itemIn
        else {
            const sizes = itemIn.sizes.filter(sz => this.size.includes(sz.size))
            if (sizes.length > 0) return itemIn
        }
    }
    set_size = s => this.size = s
}

class PricePredicate {
    constructor(price) {
        this.price = price
    }
    apply = itemIn => {
        if (this.price.lowest === '' && this.price.highest === '') return itemIn
        else {
            const lowest = Number(this.price.lowest)
            const highest = Number(this.price.highest)
            if (itemIn.flash_sale > 0){
                if (itemIn.edited_price >= lowest && itemIn.edited_price <= highest) return itemIn
            }
            else {
                if (itemIn.actual_price >= lowest && itemIn.actual_price <= highest) return itemIn
            }
        }
    }
    set_price = p => this.price = p
}

const predicate = {
    GenderPredicate,
    CategoryPredicate,
    SizePredicate,
    PricePredicate
}

export default predicate