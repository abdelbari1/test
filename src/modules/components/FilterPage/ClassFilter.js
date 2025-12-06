import { GENDER, DEFAULT_GENDER, PRICE, COLORS } from "./constants"


class Filters {

    constructor(gender = ['Default'], is_all = false) {
        this.gender = gender
        this.category = ['Default']
        this.size = []
        this.price = []
        this.is_all = is_all
        this.dymData = { gender: [], category: [], size: [], price: { lowest: '', highest: '' }, color: [] }
        this.items_sidebar = {}
        this.load_data()
    }

    set_dymData = (key, val, checked) => {
        let dymData = { ...this.dymData }
        if (checked) {
            dymData[key] = [...dymData[key], val]
        }
        else {
            dymData[key] = dymData[key].filter(dd => dd !== val)
        }
        this.dymData = dymData
    }

    handle_checked_size = () => {
        const default_size = this.load_default_sizes()
        const size_checked = this.items_sidebar.size
        const new_size = default_size.map((ds) => {
            const checked = size_checked.find(sc => String(sc.value) === String(ds.value) && sc.checked)
            if (checked) return checked
            return ds
        })
        return new_size
    }

    handle_price = (low, high) => {
        const data = { ...this.items_sidebar }
        data.price['lowest'] = low
        data.price['highest'] = high
        this.dymData['price'] = { lowest: low, highest: high }
        return data
    }

    handle_checked_cat = () => {
        const default_cat = this.load_default_category()
        const cat_checked = this.items_sidebar.category
        const new_cat = default_cat.map((dc) => {
            const checked = cat_checked.find(cc => cc.value === dc.value && cc.checked)
            if (checked) return checked
            return dc
        })
        return new_cat
    }

    handle_size = (val, checked) => {
        const deflt = this.category.indexOf('Default')
        if (deflt > -1) this.category.splice(deflt, 1)
        if (!checked) {
            const delVal = this.category.indexOf(val)
            if (delVal > -1) this.category.splice(delVal, 1)
            if (this.category.length === 0) this.category.push('Default')
        }
        else this.category.push(val)
        const upSize = this.handle_checked_size()
        this.items_sidebar['size'] = upSize
    }

    handle_category = (val, checked) => {
        const deflt = this.gender.indexOf('Default')
        if (deflt > -1) this.gender.splice(deflt, 1)
        if (!checked) {
            const delVal = this.gender.indexOf(val)
            if (delVal > -1) this.gender.splice(delVal, 1)
            if (this.gender.length === 0) this.gender.push('Default')
        }
        else this.gender.push(val)
        const upCat = this.handle_checked_cat()
        this.items_sidebar['category'] = upCat
    }

    handle_items_sidebar = (cat, val, checked) => {
        if (cat === 'gender') this.handle_category(val, checked)
        if (cat === 'category') this.handle_size(val, checked)
        const data = { ...this.items_sidebar }
        let option = data[cat].find(opt => String(opt.value) === String(val))
        let index = data[cat].findIndex(opt => String(opt.value) === String(val))
        data[cat][index] = { ...option, checked }
        return { ...data }
    }

    load_data = () => {
        const gender = this.load_default_gender()
        const category = this.load_default_category()
        const size = this.load_default_sizes()
        const price = this.load_default_price()
        const color = this.load_default_color()
        this.items_sidebar = this.is_all ? { gender, category, size, price, color } : { category, size, price, color }
    }

    load_default_gender = () => DEFAULT_GENDER.map(dg => ({ value: dg, checked: false }))

    load_default_category = () => {
        let set_cat = new Set()
        this.gender.forEach((gndr) => Object.keys(GENDER[gndr]).forEach((cat) => set_cat.add(JSON.stringify({ value: cat, checked: false }))))
        return Array.from(set_cat).map((sc) => JSON.parse(sc))
    }

    load_default_sizes = () => {
        let set_size = new Set()
        this.gender.forEach((gndr) => this.category.forEach((catg) => GENDER[gndr][catg].forEach((siz) => set_size.add(JSON.stringify({ value: siz, checked: false })))))
        return Array.from(set_size).map(sz => JSON.parse(sz))
    }

    load_default_price = () => PRICE

    load_default_color = () => COLORS

}

export default Filters