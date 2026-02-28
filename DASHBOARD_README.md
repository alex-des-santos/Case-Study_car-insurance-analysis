# Car Insurance Claims Analysis Dashboard

## Visão Geral

Dashboard interativo para análise de sinistros de seguros de automóveis, desenvolvido como parte de um teste técnico para a Volvo. O projeto fornece insights acionáveis sobre taxa de sinistro por segmentos, identificando sinais de maior risco para apoiar precificação, underwriting e retenção.

## Contexto e Objetivo

Você atua em uma seguradora de automóveis. O objetivo é entender a taxa de sinistro (variável **outcome**) por segmentos e identificar sinais associados a maior risco, para apoiar precificação, **underwriting** e retenção.

**Dataset**: Car Insurance Data (Kaggle)  
**Total de Clientes**: 10.000  
**Total de Sinistros**: 3.133  
**Taxa de Sinistro Geral**: 31.33%

## Arquitetura do Projeto

O projeto é composto por três componentes principais:

### 1. EDA (Análise Exploratória de Dados)

**Arquivo**: `Car_Insurance_EDA.ipynb`

Um notebook Jupyter completo com:

- **Auditoria de Dados**: Análise de tipos, valores faltantes, duplicados, outliers e balanceamento de classes
- **KPIs Principais**: Total de clientes, sinistros e taxa geral
- **Segmentação**: Taxa de sinistro por idade, experiência, renda, ano do veículo, tipo de veículo e histórico
- **Insights Quantificados**: 5 achados principais com implicação de negócio
- **Tratamento de Dados**: Estratégia documentada para valores faltantes e outliers

### 2. Dashboard Interativo

**Tecnologia**: React 19 + Tailwind CSS 4 + Recharts

O dashboard fornece três páginas principais:

#### Página 1: Visão Geral
- **Cards de KPI**: Total de clientes, sinistros e taxa geral
- **Comparação por 2 Dimensões**: Gráficos interativos para comparar taxa de sinistro entre segmentos
- **Resumo de Segmentação**: Visão geral das taxas médias por dimensão

#### Página 2: Drivers
- **Filtros Interativos**: Filtrar por idade, experiência e renda
- **Heatmap**: Visualização interativa da taxa de sinistro (Experiência × Idade)
- **Estatísticas em Tempo Real**: Atualização automática conforme filtros são aplicados

#### Página 3: Recomendações
- **5 Ações Práticas**: Recomendações baseadas nos insights de dados
- **Roadmap de Implementação**: Cronograma de 3 fases (curto, médio e longo prazo)
- **Métricas-Chave**: Indicadores para monitorar impacto das ações

## Decisões de Tratamento de Dados

### Valores Faltantes

| Coluna | Faltantes | Estratégia | Justificativa |
|--------|-----------|-----------|---------------|
| CREDIT_SCORE | 9.82% | Imputar com mediana por segmento de renda | Score correlaciona com renda; preserva relação |
| ANNUAL_MILEAGE | 9.57% | Imputar com mediana geral (12.000 km) | Distribuição uniforme; não introduz viés |

### Duplicados

Nenhum duplicado encontrado ✓

### Outliers

Todos os outliers foram mantidos, pois representam informações legítimas:
- CREDIT_SCORE: 9 outliers (0.10%)
- ANNUAL_MILEAGE: 17 outliers (0.19%)
- SPEEDING_VIOLATIONS: 588 outliers (5.88%)
- DUIS: 1.882 outliers (18.82%)
- PAST_ACCIDENTS: 285 outliers (2.85%)

### Balanceamento de Classes

Desbalanceamento moderado (68.67% sem sinistro vs 31.33% com sinistro). Não foi necessário resampling para análise exploratória.

## Insights Principais

### 1. Jovens Motoristas (16-25) são Alto Risco
- **Taxa de sinistro**: 71.83% (vs 31.33% geral) - **7.3x maior** que motoristas 65+
- **Ação**: Aumentar prêmios em 40-50%; exigir curso de segurança obrigatório

### 2. Experiência de Direção é Fator Crítico
- **0-9 anos**: 62.80% | **30+ anos**: 1.90% - **Redução de 97%** no risco com experiência
- **Ação**: Criar programa de retenção com descontos progressivos

### 3. Renda é Indicador Forte de Risco
- **Pobreza**: 65.38% | **Classe alta**: 13.35% - **4.9x maior** risco em baixa renda
- **Ação**: Segmentação de preços; produtos especiais para baixa renda

### 4. Veículos Antigos (pré-2015) Aumentam Risco
- **Antes de 2015**: 40.33% | **Depois de 2015**: 10.65% - **3.8x maior** risco
- **Ação**: Exigir inspeção técnica anual; oferecer desconto para veículos novos

### 5. Histórico Limpo Reduz Risco Drasticamente
- **Sem histórico**: 57.07% | **5+ infrações**: 9.04% - Clientes com histórico têm taxa menor
- **Ação**: Investigar possível seleção adversa; analisar padrões ocultos

## Instalação e Execução

### Pré-requisitos

- Node.js 18+
- pnpm 10+

### Passos

1. **Instalar dependências**
   ```bash
   cd /home/ubuntu/car_insurance_dashboard
   pnpm install
   ```

2. **Executar em desenvolvimento**
   ```bash
   pnpm dev
   ```
   O dashboard estará disponível em `http://localhost:3000`

3. **Build para produção**
   ```bash
   pnpm build
   ```

4. **Executar em produção**
   ```bash
   pnpm start
   ```

## Estrutura de Arquivos

```
car_insurance_dashboard/
├── client/
│   ├── public/
│   │   └── Car_Insurance_Claim.csv       # Dataset
│   ├── src/
│   │   ├── components/
│   │   │   └── DashboardLayout.tsx       # Layout principal
│   │   ├── hooks/
│   │   │   └── useInsuranceData.ts       # Hook para carregar dados
│   │   ├── pages/
│   │   │   ├── Overview.tsx              # Página 1: Visão Geral
│   │   │   ├── Drivers.tsx               # Página 2: Drivers
│   │   │   └── Recommendations.tsx       # Página 3: Recomendações
│   │   ├── App.tsx                       # Roteamento principal
│   │   └── index.css                     # Estilos globais
│   └── index.html                        # HTML principal
├── Car_Insurance_EDA.ipynb               # Notebook com EDA
└── README.md                             # Este arquivo
```

## Recursos Utilizados

### Frontend
- **React 19**: Framework UI moderno
- **Tailwind CSS 4**: Utility-first CSS framework
- **Recharts**: Biblioteca de gráficos para React
- **shadcn/ui**: Componentes UI reutilizáveis
- **Wouter**: Roteamento leve para React

### Data Processing
- **Pandas**: Análise de dados em Python
- **NumPy**: Computação numérica

## Limitações do Dataset

1. **Desbalanceamento Moderado**: 68.67% sem sinistro vs 31.33% com sinistro
2. **Valores Faltantes**: 9.82% em CREDIT_SCORE e 9.57% em ANNUAL_MILEAGE
3. **Variáveis Categóricas Limitadas**: Apenas 2-4 categorias por dimensão
4. **Sem Informações Temporais**: Não há dados de data/período dos sinistros
5. **Possível Seleção Adversa**: Clientes com histórico de infrações têm taxa de sinistro menor (requer investigação)

## Bônus: Modelo Interpretável

Um modelo de regressão logística foi desenvolvido para explicar os fatores de risco. O modelo alcançou:

- **AUC**: 0.78
- **F1-Score**: 0.65
- **Acurácia**: 72%

### Fatores Mais Importantes (por ordem de impacto)

1. **Experiência de Direção** (coef: -0.497) - Fator mais importante
2. **Idade** (coef: -0.448)
3. **Renda** (coef: -0.423)
4. **Propriedade do Veículo** (coef: -0.379)
5. **Score de Crédito** (coef: -0.325)

## Próximos Passos

1. **Integração com Sistema de Precificação**: Implementar ajustes de prêmios baseados em segmentos
2. **Telemática**: Coletar dados de comportamento de direção em tempo real
3. **Machine Learning Avançado**: Desenvolver modelos preditivos mais sofisticados
4. **Análise de Rentabilidade**: Calcular LTV (Lifetime Value) por segmento
5. **Monitoramento Contínuo**: Implementar dashboard de KPIs para acompanhar impacto das ações

## Contato e Suporte

Para dúvidas ou sugestões sobre este projeto, consulte a documentação do Kaggle em https://www.kaggle.com/datasets/sagnik1511/car-insurance-data

## Licença

Este projeto é fornecido como parte de um teste técnico.
