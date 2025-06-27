let tabela = {};
let refeicoes = {
    cafe: [],
    almoco: [],
    jantar: []
};
let graficos = {};

// Normaliza nomes (remove acentos e converte para minúsculas)
function limparTexto(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}

$(document).ready(function () {
    $.getJSON('tabela.json')
        .done(function (data) {
            tabela = data;
            const salvo = localStorage.getItem('refeicoes');
            if (salvo) refeicoes = JSON.parse(salvo);
            atualizarInterface();
            $('#btnAdicionar').prop('disabled', false);
        })
        .fail(function () {
            alert('Erro ao carregar a tabela nutricional.');
        });
    $('#btnAdicionar').on('click', adicionarAlimento);
    $('#btnLimpar').on('click', limparRefeicoes);
    $('.btn-exportar').on('click', function () {
        const tipo = $(this).data('tipo');
        exportarRefeicao(tipo);
    });
    // Exibe apenas a refeição selecionada
function mostrarRefeicaoSelecionada() {
    const tipo = $('#refeicaoTipo').val(); // cafe, almoco, jantar
    // Esconde todos os blocos
    $('.refeicao-box').hide();
    // Mostra apenas o bloco da refeição selecionada
    $(`#box-${tipo}`).show();
}
// Chamada ao mudar a seleção
$('#refeicaoTipo').on('change', mostrarRefeicaoSelecionada);
// Executa na primeira carga
mostrarRefeicaoSelecionada();

});

function adicionarAlimento() {
    const entrada = $('#alimento').val().toLowerCase().trim();
    const tipo = $('#refeicaoTipo').val();
    const regex = /^(.+?)\s(\d+)g$/i;
    const match = entrada.match(regex);

    if (!match) {
        alert('Formato inválido. Use: arroz 100g');
        return;
    }

    const nomeRaw = match[1];
    const qtd = parseFloat(match[2]);
    const nomeLimpo = limparTexto(nomeRaw);

    const chave = Object.keys(tabela).find(k => limparTexto(k) === nomeLimpo);

    if (!chave) {
        alert(`Alimento "${nomeRaw}" não está na tabela`);
        return;
    }

    const info = tabela[chave];
    const fator = qtd / 100;

    const item = {
        nome: chave,
        qtd,
        cal: info.cal * fator,
        prot: info.prot * fator,
        carb: info.carb * fator,
        gord: info.gord * fator
    };

    refeicoes[tipo].push(item);
    localStorage.setItem('refeicoes', JSON.stringify(refeicoes));
    $('#alimento').val('');
    atualizarInterface();
}

function atualizarInterface() {
    ['cafe', 'almoco', 'jantar'].forEach(tipo => {
        const itens = refeicoes[tipo] || [];

        const total = itens.reduce((acc, item) => {
            acc.cal += item.cal;
            acc.prot += item.prot;
            acc.carb += item.carb;
            acc.gord += item.gord;
            return acc;
        }, { cal: 0, prot: 0, carb: 0, gord: 0 });

        const $ul = $(`#lista-${tipo}`).empty();
        itens.forEach(i => {
            $ul.append(`<li>${i.nome} (${i.qtd}g) - ${i.cal.toFixed(1)} kcal</li>`);
        });

        const $macros = $(`#macros-${tipo}`);
        $macros.html(`
            <div class="macro"><strong>Calorias:</strong> ${total.cal.toFixed(1)} kcal</div>
            <div class="macro"><strong>Proteínas:</strong> ${total.prot.toFixed(1)} g</div>
            <div class="macro"><strong>Carboidratos:</strong> ${total.carb.toFixed(1)} g</div>
            <div class="macro"><strong>Gorduras:</strong> ${total.gord.toFixed(1)} g</div>
        `);

        const canvas = document.getElementById(`grafico-${tipo}`);
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
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
                        title: {
                            display: true,
                            text: 'Distribuição de Macronutrientes'
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }
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
