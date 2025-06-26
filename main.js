let tabela = {};
let refeicoes = {
    cafe: [],
    almoco: [],
    jantar: []
};
let graficos = {};

// Função para limpar/normalizar texto (remove acentos, deixa tudo minúsculo)
function limparTexto(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD") // separa os acentos
        .replace(/[\u0300-\u036f]/g, "") // remove os acentos
        .trim();
}

document.addEventListener('DOMContentLoaded', () => {
    // Carrega tabela nutricional do JSON externo
    fetch('tabela.json')
        .then(res => res.json())
        .then(data => {
            tabela = data;
            // Carrega refeições salvas
            const salvo = localStorage.getItem('refeicoes');
            if (salvo) refeicoes = JSON.parse(salvo);
            atualizarInterface();

            // Ativa botão adicionar (ou outras interações se quiser)
            document.getElementById('btnAdicionar').disabled = false;
        })
        .catch(err => {
            console.error('Erro ao carregar tabela.json:', err);
            alert('Erro ao carregar a tabela nutricional. Recarregue a página.');
        });
});

// Função para adicionar alimento
function adicionarAlimento() {
    const entrada = document.getElementById('alimento').value.toLowerCase().trim();
    const tipo = document.getElementById('refeicaoTipo').value;
    const regex = /^(.+?)\s(\d+)g$/i; // aceita nomes com espaços
    const match = entrada.match(regex);

    if (!match) {
        alert('Formato inválido. Use: arroz 100g');
        return;
    }

    const nomeRaw = match[1];  // nome do alimento com possível acento
    const qtd = parseFloat(match[2]);

    // Normaliza o nome do alimento digitado
    const nomeLimpo = limparTexto(nomeRaw);

    // Procura no objeto tabela uma chave que normalizada seja igual
    const chaveEncontrada = Object.keys(tabela).find(chave => limparTexto(chave) === nomeLimpo);

    if (!chaveEncontrada) {
        alert(`Alimento "${nomeRaw}" não está na tabela`);
        return;
    }

    const info = tabela[chaveEncontrada];
    const fator = qtd / 100;

    const item = {
        nome: chaveEncontrada,
        qtd,
        cal: info.cal * fator,
        prot: info.prot * fator,
        carb: info.carb * fator,
        gord: info.gord * fator
    };

    refeicoes[tipo].push(item);
    localStorage.setItem('refeicoes', JSON.stringify(refeicoes));
    document.getElementById('alimento').value = '';
    atualizarInterface();
}

// Atualiza a interface (listas, macros, gráficos)
function atualizarInterface() {
    ['cafe', 'almoco', 'jantar'].forEach(tipo => {
        const itens = refeicoes[tipo] || [];

        // Soma total dos macros
        const total = itens.reduce((acc, item) => {
            acc.cal += item.cal;
            acc.prot += item.prot;
            acc.carb += item.carb;
            acc.gord += item.gord;
            return acc;
        }, { cal: 0, prot: 0, carb: 0, gord: 0 });

        // Atualiza lista de alimentos
        const ul = document.getElementById(`lista-${tipo}`);
        if (ul) {
            ul.innerHTML = itens.map(i => `<li>${i.nome} (${i.qtd}g) - ${i.cal.toFixed(1)} kcal</li>`).join('');
        }

        // Atualiza macros
        const macrosDiv = document.getElementById(`macros-${tipo}`);
        if (macrosDiv) {
            macrosDiv.innerHTML = `
                <div class="macro"><strong>Calorias:</strong> ${total.cal.toFixed(1)} kcal</div>
                <div class="macro"><strong>Proteínas:</strong> ${total.prot.toFixed(1)} g</div>
                <div class="macro"><strong>Carboidratos:</strong> ${total.carb.toFixed(1)} g</div>
                <div class="macro"><strong>Gorduras:</strong> ${total.gord.toFixed(1)} g</div>
            `;
        }

        // Atualiza gráfico
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

// Limpa todas as refeições
function limparRefeicoes() {
    refeicoes = { cafe: [], almoco: [], jantar: [] };
    localStorage.removeItem('refeicoes');
    atualizarInterface();
}

// Exporta .txt para a refeição selecionada
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
