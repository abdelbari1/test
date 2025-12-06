import CP from './Predicate'

export class FilterEntities {
    constructor() {
        this.filterGender = new CP.GenderPredicate([])
        this.filterCategory = new CP.CategoryPredicate([])
        this.filterSize = new CP.SizePredicate([])
        this.filterPrice = new CP.PricePredicate({lowest: '', highest: ''})
        this.filterItems = [this.filterGender, this.filterCategory, this.filterSize, this.filterPrice]
    }

    filter_items = lst => {
        let res = lst
        for (let prop of this.filterItems) {
            let tmp = []
            for (let it of res) {
                if (prop.apply(it)) tmp.push(it)
            }
            res = tmp
        }
        return res
    }

    change_gender_item = g => this.filterGender.set_gender(g)
    change_category_item = c => this.filterCategory.set_category(c)
    change_size_item = s => this.filterSize.set_size(s)
    change_price_item = p => this.filterPrice.set_price(p)
}