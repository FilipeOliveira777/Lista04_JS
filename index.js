import { listaritem, atualizarlista } from "./listamodulo.js";
const form = document.querySelector('#form');
const itemlista = document.querySelector('#item-list');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const barcode = 'item_' + Date.now();
    const nome = document.querySelector('#nome').value;
    const preco = parseFloat(document.querySelector('#preco').value);
    const comprado = false;

    const item = { barcode, nome, preco, comprado };

    listaritem.adicionar(item);
    atualizarlista(itemlista);
    form.reset();
});
itemlista.addEventListener('click', function (e) {
    if (e.target.tagName === 'BUTTON') {
        const action = e.target.dataset.action;

        const barcode = e.target.dataset.barcode;

        const item = listaritem.listar().find(i => i.barcode === barcode);

        if (action === 'remove') {
            listaritem.remover(item);
        } else if (action === 'marcar') {
            listaritem.marcar(item);
        }

        atualizarlista(itemlista);
    } else if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
        const barcode = e.target.dataset.barcode;
        const item = listaritem.listar().find(i => i.barcode === barcode);
        listaritem.marcar(item);
        atualizarlista(itemlista);
    }
});
atualizarlista(itemlista);