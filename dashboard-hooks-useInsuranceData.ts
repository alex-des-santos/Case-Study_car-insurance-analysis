import { useEffect, useState } from "react";

/**
 * Representa um cliente de seguros com todos seus dados
 * Alguns campos podem estar vazios (credit score, quilometragem anual)
 */
export interface InsuranceRecord {
  ID: number;
  AGE: string;
  GENDER: string;
  RACE: string;
  DRIVING_EXPERIENCE: string;
  EDUCATION: string;
  INCOME: string;
  CREDIT_SCORE: number | null;
  VEHICLE_OWNERSHIP: number;
  VEHICLE_YEAR: string;
  MARRIED: number;
  CHILDREN: number;
  POSTAL_CODE: number;
  ANNUAL_MILEAGE: number | null;
  VEHICLE_TYPE: string;
  SPEEDING_VIOLATIONS: number;
  DUIS: number;
  PAST_ACCIDENTS: number;
  OUTCOME: number; // 1 = teve sinistro, 0 = não teve
}

/**
 * KPIs principais que importam para o negócio
 */
export interface KPIs {
  totalClients: number;
  totalClaims: number;
  claimRate: number;
}

/**
 * Dados segmentados por dimensão
 * Exemplo: { "16-25": { total: 1000, claims: 718, rate: 71.8 } }
 */
export interface SegmentData {
  [key: string]: {
    total: number;
    claims: number;
    rate: number;
  };
}

/**
 * Hook customizado que carrega e processa os dados de seguros
 * 
 * O que ele faz:
 * 1. Carrega o CSV do dataset
 * 2. Parseia os dados em objetos JavaScript
 * 3. Calcula os KPIs principais
 * 4. Segmenta os dados por diferentes dimensões (idade, experiência, etc)
 * 5. Retorna tudo pronto para o dashboard usar
 * 
 * Nota: Este hook roda apenas uma vez quando o componente monta
 */
export function useInsuranceData() {
  const [data, setData] = useState<InsuranceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [kpis, setKpis] = useState<KPIs | null>(null);
  const [segments, setSegments] = useState<Record<string, SegmentData>>({});

  useEffect(() => {
    const carregarDados = async () => {
      try {
        // 1. Buscar o arquivo CSV
        const response = await fetch("/Car_Insurance_Claim.csv");
        const csvText = await response.text();
        
        // 2. Separar em linhas e extrair cabeçalho
        const linhas = csvText.split("\n");
        const cabecalho = linhas[0].split(",");

        // 3. Parsear cada linha em um objeto InsuranceRecord
        const registros: InsuranceRecord[] = [];
        for (let i = 1; i < linhas.length; i++) {
          // Pular linhas vazias
          if (!linhas[i].trim()) continue;
          
          const valores = linhas[i].split(",");
          const registro: InsuranceRecord = {
            ID: parseInt(valores[0]),
            AGE: valores[1],
            GENDER: valores[2],
            RACE: valores[3],
            DRIVING_EXPERIENCE: valores[4],
            EDUCATION: valores[5],
            INCOME: valores[6],
            // Credit score pode estar vazio - deixar como null se não houver valor
            CREDIT_SCORE: valores[7] ? parseFloat(valores[7]) : null,
            VEHICLE_OWNERSHIP: parseFloat(valores[8]),
            VEHICLE_YEAR: valores[9],
            MARRIED: parseFloat(valores[10]),
            CHILDREN: parseFloat(valores[11]),
            POSTAL_CODE: parseInt(valores[12]),
            // Quilometragem anual pode estar vazia também
            ANNUAL_MILEAGE: valores[13] ? parseFloat(valores[13]) : null,
            VEHICLE_TYPE: valores[14],
            SPEEDING_VIOLATIONS: parseInt(valores[15]),
            DUIS: parseInt(valores[16]),
            PAST_ACCIDENTS: parseInt(valores[17]),
            OUTCOME: parseFloat(valores[18]),
          };
          registros.push(registro);
        }

        setData(registros);

        // 4. Calcular KPIs principais
        const totalClientes = registros.length;
        const totalSinistros = registros.filter((r) => r.OUTCOME === 1).length;
        const taxaSinistro = (totalSinistros / totalClientes) * 100;

        setKpis({
          totalClients: totalClientes,
          totalClaims: totalSinistros,
          claimRate: taxaSinistro,
        });

        // 5. Segmentar dados por diferentes dimensões
        // Isso é o coração da análise - vamos quebrar os dados em pedaços
        // para entender como o risco varia por cada característica
        const dadosSegmentados: Record<string, SegmentData> = {
          age: {},
          experience: {},
          income: {},
          vehicleYear: {},
          vehicleType: {},
        };

        // Segmento por IDADE
        // Jovens dirigem mais arriscado? Vamos ver...
        const ordemIdade = ["16-25", "26-39", "40-64", "65+"];
        ordemIdade.forEach((faixaIdade) => {
          const registrosPorIdade = registros.filter((r) => r.AGE === faixaIdade);
          const sinistrosPorIdade = registrosPorIdade.filter((r) => r.OUTCOME === 1).length;
          dadosSegmentados.age[faixaIdade] = {
            total: registrosPorIdade.length,
            claims: sinistrosPorIdade,
            rate: (sinistrosPorIdade / registrosPorIdade.length) * 100,
          };
        });

        // Segmento por EXPERIÊNCIA DE DIREÇÃO
        // Quanto mais você dirige, mais seguro fica? Vamos verificar...
        const ordemExperiencia = ["0-9y", "10-19y", "20-29y", "30y+"];
        ordemExperiencia.forEach((faixaExp) => {
          const registrosPorExp = registros.filter((r) => r.DRIVING_EXPERIENCE === faixaExp);
          const sinistrosPorExp = registrosPorExp.filter((r) => r.OUTCOME === 1).length;
          dadosSegmentados.experience[faixaExp] = {
            total: registrosPorExp.length,
            claims: sinistrosPorExp,
            rate: (sinistrosPorExp / registrosPorExp.length) * 100,
          };
        });

        // Segmento por RENDA
        // Pessoas ricas têm menos sinistros? Faz sentido...
        const ordemRenda = ["poverty", "working class", "middle class", "upper class"];
        ordemRenda.forEach((nivelRenda) => {
          const registrosPorRenda = registros.filter((r) => r.INCOME === nivelRenda);
          const sinistrosPorRenda = registrosPorRenda.filter((r) => r.OUTCOME === 1).length;
          dadosSegmentados.income[nivelRenda] = {
            total: registrosPorRenda.length,
            claims: sinistrosPorRenda,
            rate: (sinistrosPorRenda / registrosPorRenda.length) * 100,
          };
        });

        // Segmento por ANO DO VEÍCULO
        // Carros antigos quebram mais? Provavelmente...
        ["before 2015", "after 2015"].forEach((anoVeiculo) => {
          const registrosPorAno = registros.filter((r) => r.VEHICLE_YEAR === anoVeiculo);
          const sinistrosPorAno = registrosPorAno.filter((r) => r.OUTCOME === 1).length;
          dadosSegmentados.vehicleYear[anoVeiculo] = {
            total: registrosPorAno.length,
            claims: sinistrosPorAno,
            rate: (sinistrosPorAno / registrosPorAno.length) * 100,
          };
        });

        // Segmento por TIPO DE VEÍCULO
        // Sports cars são mais arriscados? Vamos descobrir...
        ["sedan", "sports car"].forEach((tipoVeiculo) => {
          const registrosPorTipo = registros.filter((r) => r.VEHICLE_TYPE === tipoVeiculo);
          const sinistrosPorTipo = registrosPorTipo.filter((r) => r.OUTCOME === 1).length;
          dadosSegmentados.vehicleType[tipoVeiculo] = {
            total: registrosPorTipo.length,
            claims: sinistrosPorTipo,
            rate: (sinistrosPorTipo / registrosPorTipo.length) * 100,
          };
        });

        setSegments(dadosSegmentados);
        setLoading(false);
      } catch (erro) {
        // Algo deu errado ao carregar os dados
        setError(erro instanceof Error ? erro.message : "Erro ao carregar dados");
        setLoading(false);
      }
    };

    carregarDados();
  }, []);

  return { data, loading, error, kpis, segments };
}
