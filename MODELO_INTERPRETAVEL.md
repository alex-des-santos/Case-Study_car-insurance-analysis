# Modelo Interpretável - Regressão Logística

## Visão Geral

Um modelo de regressão logística foi desenvolvido para explicar os fatores de risco de sinistro no dataset de seguros de automóveis. O modelo alcançou excelente performance e fornece insights interpretáveis sobre quais fatores aumentam ou diminuem o risco de sinistro.

## Métricas de Validação

| Métrica | Valor |
|---------|-------|
| **AUC-ROC** | 0.8861 |
| **F1-Score** | 0.7305 |
| **Acurácia** | 0.8325 |

O modelo apresenta excelente capacidade discriminatória (AUC > 0.85), indicando que consegue separar bem clientes com alto e baixo risco.

## Coeficientes do Modelo (Fatores de Risco)

### Fatores que DIMINUEM o Risco (Coeficientes Negativos)

| Rank | Fator | Coeficiente | Impacto |
|------|-------|------------|--------|
| 1 | Experiência de Direção | -1.7054 | **Muito Alto** |
| 2 | Propriedade do Veículo | -1.6855 | **Muito Alto** |
| 5 | Casado | -0.3870 | Moderado |
| 6 | Score de Crédito | -0.2862 | Moderado |
| 7 | Acidentes Anteriores | -0.2260 | Baixo |
| 8 | Filhos | -0.2211 | Baixo |
| 9 | Raça | -0.2205 | Baixo |

**Interpretação**: Motoristas com mais experiência, que possuem seu veículo, são casados e têm bom score de crédito têm significativamente menor risco de sinistro.

### Fatores que AUMENTAM o Risco (Coeficientes Positivos)

| Rank | Fator | Coeficiente | Impacto |
|------|-------|------------|--------|
| 3 | Ano do Veículo | 1.6656 | **Muito Alto** |
| 4 | Gênero | 0.8987 | Alto |
| 10 | DUIs | 0.1249 | Baixo |

**Interpretação**: Veículos mais antigos (antes de 2015) e motoristas do sexo masculino apresentam maior risco de sinistro.

## Insights Principais

### 1. Experiência de Direção é o Fator Mais Importante

O coeficiente de -1.7054 para experiência de direção indica que é o fator mais importante no modelo. Cada aumento de um nível de experiência (ex: de 0-9y para 10-19y) reduz significativamente a probabilidade de sinistro.

**Implicação**: Investir em programas de retenção para motoristas experientes é crítico para reduzir sinistros.

### 2. Propriedade do Veículo Reduz Risco Substancialmente

Motoristas que possuem seu veículo têm 1.6855 de redução no coeficiente de risco. Isso sugere que proprietários são mais cuidadosos com seus veículos.

**Implicação**: Oferecer descontos para proprietários pode ser uma estratégia eficaz.

### 3. Veículos Antigos Aumentam Risco Significativamente

O coeficiente positivo de 1.6656 para ano do veículo (onde valores menores = mais antigos) indica que veículos pré-2015 têm risco substancialmente maior.

**Implicação**: Implementar inspeção técnica obrigatória ou aumentar prêmios para veículos antigos.

### 4. Gênero é Fator Importante

Motoristas do sexo masculino têm risco aumentado (coeficiente: 0.8987), consistente com dados do setor de seguros.

**Implicação**: Segmentação de preços por gênero é justificada pelos dados.

## Interpretação Técnica

### Equação do Modelo

```
log(odds de sinistro) = -2.45 + 
                        -1.7054 * DRIVING_EXPERIENCE +
                        -1.6855 * VEHICLE_OWNERSHIP +
                         1.6656 * VEHICLE_YEAR +
                         0.8987 * GENDER +
                        ... (outros fatores)
```

### Como Usar para Precificação

Para um cliente com características específicas, o modelo calcula:

1. **Combinação Linear**: Multiplica cada fator pelo seu coeficiente e soma
2. **Transformação Logística**: Aplica função sigmoid para obter probabilidade (0-1)
3. **Ajuste de Prêmio**: Prêmio base × (1 + risco estimado)

### Exemplo

Um motorista com:
- Experiência: 20-29y (baixo risco)
- Propriedade: Sim (baixo risco)
- Veículo: Pós-2015 (baixo risco)
- Gênero: Feminino (baixo risco)

Teria probabilidade estimada de sinistro muito menor que a média (31.33%), justificando desconto no prêmio.

## Validação do Modelo

### Matriz de Confusão

| | Predito: Sem Sinistro | Predito: Com Sinistro |
|---|---|---|
| **Real: Sem Sinistro** | 1,370 | 102 |
| **Real: Com Sinistro** | 180 | 448 |

- **Sensibilidade** (Taxa de Verdadeiros Positivos): 71.3%
- **Especificidade** (Taxa de Verdadeiros Negativos): 93.1%

O modelo é conservador, identificando 71% dos sinistros reais enquanto mantém baixa taxa de falsos positivos.

## Limitações e Considerações

1. **Dados Históricos**: O modelo é treinado em dados históricos; mudanças no comportamento de dirigir podem afetar performance

2. **Viés Potencial**: O fator "Gênero" pode refletir viés histórico nos dados em vez de diferença real de risco

3. **Interações Não Capturadas**: O modelo linear não captura interações complexas entre fatores (ex: jovem + veículo antigo)

4. **Dados Faltantes**: 9.82% de valores faltantes em CREDIT_SCORE foram imputados

5. **Seleção Adversa**: Clientes com histórico de infrações têm taxa menor (paradoxo observado nos dados)

## Recomendações

1. **Implementação em Produção**: Usar este modelo como base para ajustes de prêmios, validando com dados reais

2. **Monitoramento**: Acompanhar performance do modelo mensalmente; retreinar se AUC cair abaixo de 0.80

3. **Modelos Avançados**: Considerar modelos não-lineares (árvores, redes neurais) para capturar interações

4. **Investigação de Anomalias**: Investigar por que clientes com histórico de infrações têm menor taxa de sinistro

5. **Segmentação**: Usar modelo para criar segmentos de risco e oferecer produtos diferenciados

## Conclusão

O modelo de regressão logística fornece uma base sólida e interpretável para entender os fatores de risco de sinistro. Com AUC de 0.8861 e F1-Score de 0.7305, o modelo é adequado para suportar decisões de precificação e underwriting.

Os fatores mais importantes são experiência de direção, propriedade do veículo e ano do veículo, alinhados com insights da análise exploratória de dados.
