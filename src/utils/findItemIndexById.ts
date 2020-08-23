interface Item {
    id: string
}
// generic is constrained to hava Item:s fields
export const findItemIndexById = <T extends Item>(
    items: T[], id: string) => { 
    return items.findIndex((item: T) => item.id === id)
}