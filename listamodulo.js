const listaritem = {
    adicionar(item) {
        const itens = this.listar();
        itens.push(item);
        localStorage.setItem('itens', JSON.stringify(itens));
    },
    remover(item) {
        let itens = this.listar();
        itens = itens.filter(i => i.barcode !== item.barcode);
        localStorage.setItem('itens', JSON.stringify(itens));
    },

    marcar(item) {
        let itens = this.listar();
        const index = itens.findIndex(i => i.barcode === item.barcode);
        if (index !== -1) {
            itens[index].comprado = !itens[index].comprado;
            localStorage.setItem('itens', JSON.stringify(itens));
        }
    },

    listar() {
        return JSON.parse(localStorage.getItem('itens')) || [];
    }
};
function atualizarlista(itemlista){
    const listaatualizada = listaritem.listar();
    itemlista.innerHTML = '';
    listaatualizada.forEach(itematualizado => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="${itematualizado.comprado ? 'comprado' : ''}">${itematualizado.nome}</td>
            <td class="${itematualizado.comprado ? 'comprado' : ''}">${itematualizado.preco}</td>
            <td>
                <input type="checkbox" data-barcode="${itematualizado.barcode}" ${itematualizado.comprado ? 'checked' : ''}>
            </td>
            <td>
                <button data-action="remove" data-barcode="${itematualizado.barcode}">Remover</button>
            </td>
        `;
        itemlista.appendChild(row);
    });
}
export {listaritem,atualizarlista};