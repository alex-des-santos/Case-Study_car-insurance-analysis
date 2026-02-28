# Análise de Sinistros de Seguros de Automóveis

Uma análise exploratória completa do dataset Car Insurance Claims do Kaggle, com insights acionáveis para precificação, underwriting e retenção de clientes.

## Visão Geral

Este projeto analisa 10.000 clientes de uma seguradora de automóveis para entender padrões de risco e identificar oportunidades de negócio. Descobrimos que a taxa de sinistro varia de **1.90% a 71.83%** dependendo do segmento - uma diferença de **38 vezes**.

### Números Principais

| Métrica | Valor |
|---------|-------|
| Total de Clientes | 10.000 |
| Total de Sinistros | 3.133 |
| Taxa de Sinistro Geral | 31.33% |
| Variação de Risco | 1.90% - 71.83% (38x) |

## Estrutura do Projeto

```
car-insurance-analysis/
├── Car_Insurance_Analysis.ipynb         # Análise exploratória (notebook principal)
├── Car_Insurance_Claim.csv              # Dataset (10.000 registros)
├── MODELO_INTERPRETAVEL.md              # Documentação do modelo de regressão logística
├── DASHBOARD_README.md                  # Instruções do dashboard interativo
├── README.md                            # Este arquivo
└── kernel-metadata.json
```

## O Que Você Vai Encontrar

### 1. Notebook Jupyter (Car_Insurance_Analysis.ipynb)

Uma análise completa com:

- Exploração Inicial: Conhecendo os dados
- Auditoria: Qualidade, valores faltantes, duplicatas
- Tratamento: Estratégia documentada com justificativas
- KPIs Principais: Números-chave do negócio
- 5 Insights Quantificados:
  1. Jovens (16-25) têm 7.3x MAIS risco
  2. Experiência reduz risco em 97%
  3. Renda é indicador forte (4.9x diferença)
  4. Veículos antigos aumentam risco 3.8x
  5. Paradoxo do histórico (investigação necessária)
- Conclusões e Próximos Passos
- Limitações do Dataset

### 2. Modelo Interpretável (MODELO_INTERPRETAVEL.md)

Regressão logística com:
- AUC-ROC: 0.8861
- F1-Score: 0.7305
- Acurácia: 83.25%
- Coeficientes explicáveis para cada fator de risco

### 3. Dashboard Interativo (veja DASHBOARD_README.md)

Aplicação React com 3 páginas:
- Visão Geral: KPIs + comparações por dimensão
- Drivers: Filtros interativos + heatmap
- Recomendações: 5 ações práticas com roadmap

## Principais Insights

### Insight 1: Idade é Crítica
- Jovens (16-25): 71.83% de taxa de sinistro
- Idosos (65+): 9.85% de taxa de sinistro
- Ação: Aumentar prêmios em 40-50% para jovens

### Insight 2: Experiência é Tudo
- Iniciantes (0-9 anos): 62.80% de taxa
- Veteranos (30+ anos): 1.90% de taxa
- Ação: Criar programa de retenção com descontos progressivos

### Insight 3: Renda Importa
- Baixa renda: 65.38% de taxa de sinistro
- Alta renda: 13.35% de taxa de sinistro
- Ação: Segmentação de preços + produtos acessíveis

### Insight 4: Veículos Antigos = Risco
- Pré-2015: 40.33% de taxa de sinistro
- Pós-2015: 10.65% de taxa de sinistro
- Ação: Exigir inspeção técnica anual

### Insight 5: Paradoxo do Histórico
- Sem infrações: 57.07% de taxa de sinistro
- Com 5+ infrações: 9.04% de taxa de sinistro
- Ação: Investigar possível viés nos dados

## Como Usar Este Projeto

### Opção 1: Executar o Notebook Localmente

```bash
pip install pandas numpy matplotlib seaborn scipy jupyter

jupyter notebook Car_Insurance_Analysis.ipynb
```

### Opção 2: Usar no Kaggle

1. Acesse: https://www.kaggle.com/code/create
2. Importe o arquivo Car_Insurance_Analysis.ipynb
3. Adicione o dataset: sagnik1511/car-insurance-data
4. Execute as células

### Opção 3: Usar o Dashboard Interativo

```bash
cd dashboard
npm install
npm run dev
```

O dashboard estará disponível em http://localhost:3000

### Opção 4: Ler a Análise (Sem Código)

Abra Car_Insurance_Analysis.ipynb no GitHub ou em qualquer visualizador de notebooks.

## Tratamento de Dados

### Valores Faltantes

| Coluna | Faltantes | Estratégia |
|--------|-----------|-----------|
| CREDIT_SCORE | 9.82% | Mediana por segmento de renda |
| ANNUAL_MILEAGE | 9.57% | Mediana geral |

Justificativa: Preservar padrões reais sem perder dados

### Duplicatas
- Encontradas: 0
- Status: Dados limpos

### Outliers
- Mantidos: Todos (representam informações legítimas)
- Justificativa: Remover prejudicaria análise de risco

## Limitações do Dataset

1. Snapshot no Tempo: Dados de um período específico
2. Possível Viés: Paradoxo do histórico requer investigação
3. Valores Imputados: 9.82% + 9.57% dos dados
4. Variáveis Limitadas: Apenas 2-4 categorias por dimensão
5. Sem Timestamp: Não podemos analisar tendências

Recomendação: Use como ponto de partida, valide com dados reais da sua empresa

## Impacto Financeiro Estimado

Se implementar as recomendações:

- Redução de sinistros: 5-10 pontos percentuais
- Aumento de retenção: 25-30% em clientes de baixo risco
- Expansão de mercado: 20-30% com produtos acessíveis
- ROI: Significativo em 12-18 meses

## Próximos Passos

1. Validar insights com dados históricos de 2-3 anos
2. Desenvolver modelo de precificação por segmento
3. Testar em piloto com segmento específico
4. Implementar telemática para monitoramento em tempo real
5. Criar dashboard de KPIs para acompanhamento

## Stack Técnico

- Análise: Python (Pandas, NumPy, Matplotlib, Seaborn)
- Modelagem: Scikit-learn (Regressão Logística)
- Dashboard: React 19, Tailwind CSS, Recharts
- Notebook: Jupyter

## Referências

- Dataset: Car Insurance Data - Kaggle (https://www.kaggle.com/datasets/sagnik1511/car-insurance-data)
- Teste Técnico: Volvo Financial Services

## Autor

Análise realizada como teste técnico para posição de Analista de Dados.

## Licença

Este projeto é fornecido como parte de um teste técnico.

---

Última atualização: Fevereiro de 2026
