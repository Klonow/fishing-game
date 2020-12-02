export function inventoryHTML() {
    return `<div class="inventory">
                    <div data-close="inventory" class="inventory__close"></div>
                    <div class="inventory__header">
                        <div class="tackle-list">
                        </div>
                    </div>
                    <div class="inventory__footer">
                        <div class="btn-tackle">
                            <div data-name="fishingrod" class="btn-tackle__fishingrod">Удочка</div>
                            <div data-name="coil" class="btn-tackle__coil">Катушка</div>
                            <div data-name="fishingline" class="btn-tackle__fishingline">Леска</div>
                            <div data-name="bait" class="btn-tackle__bait">Наживка</div>
                            <div data-name="hook" class="btn-tackle__hook">Крючок</div>
                        </div>
                    </div>
                </div>`
}

export function tackleItemHtml(item) {
    return `<div class='tackle-item'>
        <div data-id='${item.id}' class="transparent-background">ВЫБРАТЬ</div>
        <img class="tackle-item__img" src='${item.img}'/>
        <span class="tackle-item__name">${item.name}</span>
        ${
            item.quantity 
                ? `<span class="tackle-item__quantity">${item.quantity}</span>` 
                : ''
        }
    </div>`
}

export function footerItemHtml(item) {
    return `<div class="footer-tackle-item">
                <img class="footer-tackle-item__img" src="${item[0].img}" />
                <span class="footer-tackle-item__name">${item[0].name}</span>
                ${
                    item[0].quantity 
                        ? `<span class="footer-tackle-item__quantity">${item[0].quantity}</span>` 
                        : ''
                }
            </div>`
}

export function currentTackleHtml(store) {
    return Object.keys(store).map(i => {
        const item = store[i]
        return tackleItemHtml(item)
    })
}
