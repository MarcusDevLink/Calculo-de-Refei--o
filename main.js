const tabela = {
    arroz: { cal: 130, prot: 2.7, carb: 28, gord: 0.3 },
    frango: { cal: 165, prot: 31, carb: 0, gord: 3.6 },
    ovo: { cal: 143, prot: 13, carb: 1.1, gord: 9.5 },
    feijao: { cal: 76, prot: 4.8, carb: 13.6, gord: 0.5 },
    banana:        { cal: 89,  prot: 1.1, carb: 22.8, gord: 0.3 },
maçã:          { cal: 52,  prot: 0.3, carb: 13.8, gord: 0.2 },
pão:           { cal: 265, prot: 9.0, carb: 49.0, gord: 3.2 },
leite:         { cal: 61,  prot: 3.2, carb: 4.8,  gord: 3.3 },
iogurte:       { cal: 63,  prot: 3.5, carb: 4.7,  gord: 3.3 },
aveia:         { cal: 367, prot: 13.1, carb: 66.3, gord: 6.9 },
batata:        { cal: 77,  prot: 2.0, carb: 17.5, gord: 0.1 },
cenoura:       { cal: 41,  prot: 0.9, carb: 9.6,  gord: 0.2 },
beterraba:     { cal: 43,  prot: 1.6, carb: 9.6,  gord: 0.2 },
abobrinha:     { cal: 17,  prot: 1.2, carb: 3.1,  gord: 0.3 },
tomate:        { cal: 18,  prot: 0.9, carb: 3.9,  gord: 0.2 },
alface:        { cal: 15,  prot: 1.4, carb: 2.9,  gord: 0.2 },
couve:         { cal: 49,  prot: 4.3, carb: 8.8,  gord: 0.9 },
espinafre:     { cal: 23,  prot: 2.9, carb: 3.6,  gord: 0.4 },
abacate:       { cal: 160, prot: 2.0, carb: 8.5,  gord: 14.7 },
azeite:        { cal: 884, prot: 0.0, carb: 0.0,  gord: 100.0 },
margarina:     { cal: 717, prot: 0.2, carb: 0.7,  gord: 81.1 },
manteiga:      { cal: 717, prot: 0.9, carb: 0.1,  gord: 81.1 },
queijo:        { cal: 402, prot: 25.0, carb: 1.3,  gord: 33.0 },
presunto:      { cal: 145, prot: 20.0, carb: 1.5,  gord: 6.0 },
peito_peru:    { cal: 104, prot: 17.0, carb: 1.2,  gord: 2.8 },
salmão:        { cal: 208, prot: 20.4, carb: 0.0,  gord: 13.4 },
atum:          { cal: 132, prot: 28.0, carb: 0.0,  gord: 1.3 },
sardinha:      { cal: 185, prot: 20.9, carb: 0.0,  gord: 10.5 },
bife:          { cal: 250, prot: 26.0, carb: 0.0,  gord: 17.0 },
linguiça:      { cal: 301, prot: 14.0, carb: 1.0,  gord: 27.0 },
carne_moida:   { cal: 242, prot: 26.0, carb: 0.0,  gord: 15.0 },
frango_grelhado:{cal: 165, prot: 31.0, carb: 0.0, gord: 3.6 },
ovo_cozido:    { cal: 155, prot: 13.0, carb: 1.1,  gord: 11.0 },
ovo_clara:     { cal: 52,  prot: 11.0, carb: 0.7,  gord: 0.2 },
feijao_preto:  { cal: 77,  prot: 4.6, carb: 14.0, gord: 0.5 },
lentilha:      { cal: 116, prot: 9.0,  carb: 20.0, gord: 0.4 },
grão_bico:     { cal: 164, prot: 8.9,  carb: 27.4, gord: 2.6 },
soja:          { cal: 446, prot: 36.5, carb: 30.2, gord: 19.9 },
castanha:      { cal: 607, prot: 15.0, carb: 27.0, gord: 49.0 },
nozes:         { cal: 654, prot: 15.2, carb: 13.7, gord: 65.2 },
amendoim:      { cal: 567, prot: 25.8, carb: 16.1, gord: 49.2 },
amêndoa:       { cal: 579, prot: 21.1, carb: 21.6, gord: 49.9 },
pipoca:        { cal: 387, prot: 12.9, carb: 77.9, gord: 4.5 },
macarrao:      { cal: 131, prot: 5.0,  carb: 25.0, gord: 1.1 },
arroz_integral:{ cal: 123, prot: 2.7,  carb: 25.6, gord: 1.0 },
farinha_trigo: { cal: 364, prot: 10.0, carb: 76.0, gord: 1.0 },
açucar:        { cal: 387, prot: 0.0,  carb: 100.0, gord: 0.0 },
mel:           { cal: 304, prot: 0.3,  carb: 82.4, gord: 0.0 },
refrigerante:  { cal: 41,  prot: 0.0,  carb: 10.6, gord: 0.0 },
suco_laranja:  { cal: 45,  prot: 0.7,  carb: 10.4, gord: 0.2 },
cafe:          { cal: 2,   prot: 0.3,  carb: 0.0,  gord: 0.0 },
chocolate:     { cal: 546, prot: 7.6,  carb: 61.2, gord: 31.3 },
};

let refeicoes = {
    cafe: [],
    almoco: [],
    jantar: []
};

let graficos = {};

document.addEventListener('DOMContentLoaded', () => {
    const salvo = localStorage.getItem('refeicoes');
    if (salvo) refeicoes = JSON.parse(salvo);
    atualizarInterface();
});

function adicionarAlimento() {
    const entrada = document.getElementById('alimento').value.toLowerCase();
    const tipo = document.getElementById('refeicaoTipo').value;
    const regex = /(\w+)\s(\d+)g/;
    const match = entrada.match(regex);

    if (!match) {
        alert('Formato inválido. Use: arroz 100g');
        return;
    }

    const nome = match[1];
    const qtd = parseFloat(match[2]);

    if (!tabela[nome]) {
        alert(`Alimento "${nome}" não encontrado`);
        return;
    }

    const info = tabela[nome];
    const fator = qtd / 100;

    const item = {
        nome,
        qtd,
        cal: info.cal * fator,
        prot: info.prot * fator,
        carb: info.carb * fator,
        gord: info.gord * fator,
    };

    refeicoes[tipo].push(item);
    localStorage.setItem('refeicoes', JSON.stringify(refeicoes));
    document.getElementById('alimento').value = '';
    atualizarInterface();
}

function atualizarInterface() {
    const container = document.getElementById('containerRefeicoes');
    container.innerHTML = '';

    Object.entries(refeicoes).forEach(([tipo, itens]) => {
        const total = itens.reduce((acc, item) => {
            acc.cal += item.cal;
            acc.prot += item.prot;
            acc.carb += item.carb;
            acc.gord += item.gord;
            return acc;
        }, { cal: 0, prot: 0, carb: 0, gord: 0 });

        const box = document.createElement('div');
        box.className = 'refeicao-box';
        const idGrafico = `grafico-${tipo}`;
        const nomeRefeicao = tipo === 'cafe' ? 'Café da manhã' : tipo === 'almoco' ? 'Almoço' : 'Jantar';

        box.innerHTML = `
        <h3>${nomeRefeicao}</h3>
        <ul>${itens.map(i => `<li>${i.nome} (${i.qtd}g) - ${i.cal.toFixed(1)} kcal</li>`).join('')}</ul>

        <div class="macros-container">
        <div class="macro"><strong>Calorias:</strong> ${total.cal.toFixed(1)} kcal</div>
        <div class="macro"><strong>Proteínas:</strong> ${total.prot.toFixed(1)} g</div>
        <div class="macro"><strong>Carboidratos:</strong> ${total.carb.toFixed(1)} g</div>
        <div class="macro"><strong>Gorduras:</strong> ${total.gord.toFixed(1)} g</div>
        </div>

        <canvas id="${idGrafico}" width="300" height="300"></canvas>
        <button onclick="exportarRefeicao('${tipo}')" style="margin-top: 10px;">Exportar .txt</button>
    `;

        container.appendChild(box);

        // Gráfico
        setTimeout(() => {
            const ctx = document.getElementById(idGrafico).getContext('2d');
            const data = [total.prot, total.carb, total.gord];

            if (graficos[tipo]) {
                graficos[tipo].data.datasets[0].data = data;
                graficos[tipo].update();
            } else {
                graficos[tipo] = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: ['Proteínas', 'Carboidratos', 'Gorduras'],
                        datasets: [{
                            data,
                            backgroundColor: ['#007bff', '#ffc107', '#dc3545'],
                        }]
                    },
                    options: {
                        plugins: {
                            title: { display: true, text: 'Distribuição de Macronutrientes' },
                            legend: { position: 'bottom' }
                        }
                    }
                });
            }
        }, 50);
    });
}


function limparRefeicoes() {
    refeicoes = { cafe: [], almoco: [], jantar: [] };
    localStorage.removeItem('refeicoes');
    atualizarInterface();
}

function exportarRefeicao(tipo) {
    const nome = tipo === 'cafe' ? 'Café da manhã' : tipo === 'almoco' ? 'Almoço' : 'Jantar';
    const itens = refeicoes[tipo];

    if (!itens.length) {
        alert(`Nenhum alimento em ${nome}`);
        return;
    }

    const total = itens.reduce((acc, item) => {
        acc.cal += item.cal;
        acc.prot += item.prot;
        acc.carb += item.carb;
        acc.gord += item.gord;
        return acc;
    }, { cal: 0, prot: 0, carb: 0, gord: 0 });

    const agora = new Date();
    const data = agora.toLocaleDateString('pt-BR');
    const hora = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const conteudo = `${nome}\n${data} - ${hora}\nCalorias: ${total.cal.toFixed(1)}\nProteínas: ${total.prot.toFixed(1)}g\nCarboidratos: ${total.carb.toFixed(1)}g\nGorduras: ${total.gord.toFixed(1)}g`;

    const blob = new Blob([conteudo], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${nome.replace(/\s/g, '_').toLowerCase()}_${data.replace(/\//g, '-')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

