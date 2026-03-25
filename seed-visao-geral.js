/**
 * seed-visao-geral.js
 * Escreve a Visão Geral de cada solução diretamente no banco,
 * como se você tivesse digitado manualmente no site.
 *
 * Uso:
 *   1. vercel env pull .env.local        (pega DATABASE_URL e ADMIN_TOKEN)
 *   2. node seed-visao-geral.js
 */

require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Mesma função de ID aleatório do app
function nbId() {
  return Math.random().toString(36).slice(2, 9);
}

function blocks(items) {
  return items.map(([type, content]) => ({ id: nbId(), type, content }));
}

const VISAO_GERAL = {
  hidrometros: blocks([
    ['h2', 'Hidrômetros Inteligentes'],
    ['p',  'Distribuidoras de água perdem em média 38% do volume captado em perdas físicas e comerciais — a maior parte por vazamentos não detectados e fraudes. Com a medição inteligente, cada ponto da rede torna-se uma fonte de dados em tempo real.'],
    ['p',  'A Unifique oferece conectividade NB-IoT e LoRaWAN para hidrômetros smart, integrando o medidor às plataformas de gestão da concessionária. Alertas de vazamento, corte remoto e leitura automática substituem rotas de campo mensais — reduzindo custo operacional em 30–45%.'],
    ['p',  'O contrato Sabesp + Vivo (R$ 3,8 bi / 4,4 milhões de pontos) é o maior projeto IoT de água do mundo e sinaliza que o mercado nacional está em inflexão. Municípios menores seguirão — e a Unifique já possui a infraestrutura de conectividade necessária para acelerar esse ciclo.'],
  ]),
  ilum: blocks([
    ['h2', 'Iluminação Pública Inteligente'],
    ['p',  'Apenas 19,6% dos 22 milhões de pontos de iluminação pública no Brasil utilizam LED. Os 80% restantes consomem energia em excesso e exigem manutenção cara — enquanto o COSIP arrecada R$ 9 bi/ano que poderiam financiar eficiência e inteligência urbana.'],
    ['p',  'A solução Unifique combina retrofit LED com telegestão via NB-IoT: dimming remoto, detecção automática de falha, agendamentos e relatórios de consumo — sem lock-in de hardware, compatível com qualquer fabricante homologado.'],
    ['p',  'Com 821 projetos PPP em pipeline e a LC 227/2024 ampliando o uso do COSIP para inteligência urbana, cada contrato de IP torna-se porta de entrada para câmeras, sensores ambientais e Wi-Fi público — maximizando o ARPU por ponto instalado.'],
  ]),
  cameras: blocks([
    ['h2', 'Monitoramento com Câmeras'],
    ['p',  'Municípios brasileiros investem em câmeras mas enfrentam imagens sem análise, dados em silos e baixa taxa de resolução de ocorrências. A câmera isolada não resolve — é a inteligência analítica conectada que transforma vigilância em segurança pública efetiva.'],
    ['p',  'A Unifique provê backhaul dedicado (fibra + LTE) para câmeras IP municipais, integrando o vídeo a plataformas de analytics — detecção de placa, reconhecimento de padrões, alertas em tempo real — e ao NOC de segurança pública.'],
    ['p',  'A infraestrutura de conectividade já instalada pela Unifique para IP e Wi-Fi reduz o custo de expansão da rede de câmeras em até 60%, tornando viável cobrir zonas periféricas que hoje ficam completamente sem monitoramento.'],
  ]),
  led: blocks([
    ['h2', 'IP LED Simples'],
    ['p',  'Para prefeituras com orçamento limitado, o retrofit LED puro — sem camada de telegestão — é o primeiro passo obrigatório: reduz 40–55% do consumo energético da iluminação pública com payback de 3 a 5 anos, sem depender de aprovação de PPP.'],
    ['p',  'A Unifique atua como parceiro técnico para instalação e fornecimento de luminárias LED certificadas INMETRO, viabilizando acesso ao PROCEL Reluz (R$ 151 M em 2025) e demais linhas de financiamento federal disponíveis para os 119 municípios contemplados.'],
    ['p',  'O projeto LED simples preserva o investimento futuro: a luminária instalada pode receber módulo IoT retrofit sem substituição, evoluindo para IP Inteligente com telegestão quando o município estiver pronto — sem retrabalho.'],
  ]),
  ar: blocks([
    ['h2', 'Qualidade do Ar'],
    ['p',  'PM2.5, NO₂ e ozônio urbano causam mais de 7 milhões de mortes por ano no mundo. No Brasil, o monitoramento oficial se concentra em capitais com equipamentos de alto custo — deixando a maioria dos municípios sem dados para políticas de saúde e mobilidade.'],
    ['p',  'A Unifique conecta redes de sensores IoT de qualidade do ar via LoRaWAN/NB-IoT, gerando mapas de poluição em tempo real, alertas para grupos de risco e relatórios para planos de mobilidade urbana e prestação de contas ESG municipal.'],
    ['p',  'A regulação ambiental está se tornando pré-requisito para captação de financiamentos internacionais em projetos urbanos. Municípios com monitoramento contínuo e dados publicados têm vantagem na disputa por recursos BID, BIRD e fundos climáticos.'],
  ]),
  enchentes: blocks([
    ['h2', 'Alerta de Enchentes'],
    ['p',  'As cheias de 2024 no Rio Grande do Sul causaram R$ 89 bilhões em danos e 183 mortes — a maioria evitável com sistemas de alerta precoce. Mais de 2.000 municípios brasileiros estão em área de risco hídrico sem qualquer monitoramento contínuo instalado.'],
    ['p',  'A solução integra pluviômetros IoT, sensores de nível hidrométrico e réguas ultrassônicas transmitindo dados em tempo real via NB-IoT para plataformas de defesa civil — com alertas automáticos para sirenes, apps e SMS com antecedência de 1 a 6 horas.'],
    ['p',  'O governo federal alocou R$ 1,7 bi via FUNASA e MCID para sistemas de alerta após as tragédias de 2024. A Unifique, com rede NB-IoT já operacional em centenas de municípios do Sul e Sudeste, é o parceiro natural para execução e manutenção desses projetos.'],
  ]),
  met: blocks([
    ['h2', 'Estação Meteorológica IoT'],
    ['p',  'O INMET opera cerca de 600 estações automáticas para todo o território nacional — cobertura insuficiente para defesa civil municipal, agricultura de precisão e gestão de eventos urbanos. A lacuna é suprida por redes de baixo custo baseadas em IoT.'],
    ['p',  'A Unifique instala e conecta estações meteorológicas compactas (temperatura, umidade, pressão, pluviometria, vento) via LoRaWAN/NB-IoT, alimentando dashboards municipais e plataformas agroclimáticas com dados atualizados a cada 5–15 minutos.'],
    ['p',  'Para prefeituras com vocação agrícola, a rede de estações viabiliza programas de agricultura de precisão e captação de recursos do MAPA. Para defesa civil, fundamenta o protocolo de corte preventivo de energia e ativação de abrigos.'],
  ]),
  semaforos: blocks([
    ['h2', 'Semáforos com IA'],
    ['p',  'Semáforos de tempo fixo desperdiçam até 30% do fluxo em vias com demanda variável, gerando congestionamento, emissão desnecessária de CO₂ e atraso no deslocamento de ambulâncias e ônibus. O custo do tempo parado no trânsito no Brasil supera R$ 100 bi/ano.'],
    ['p',  'A solução usa câmeras de visão computacional com algoritmos de IA para ajustar ciclos semafóricos em tempo real conforme o volume de veículos, pedestres e prioridade de frotas especiais — conectado à central de tráfego via fibra ou LTE Unifique.'],
    ['p',  'Cidades como Curitiba e São Paulo já operam sistemas adaptativos com redução de 15–25% no tempo de viagem. Para médias cidades, a Unifique pode estruturar projetos piloto a partir de 10 interseções com ROI demonstrável em 24 meses.'],
  ]),
  frota: blocks([
    ['h2', 'Gestão de Frota GPS'],
    ['p',  'Frotas municipais de saúde, saneamento e educação operam sem visibilidade em tempo real — gerando desvio de rotas, uso indevido, consumo excessivo de combustível e manutenções corretivas caras. Frotas não monitoradas custam em média 18–22% a mais por km rodado.'],
    ['p',  'A Unifique oferece rastreamento GPS em tempo real, telemetria veicular (RPM, freadas, temperatura do motor), alertas de excesso de velocidade e relatórios de produtividade — integrados a plataformas de BI municipal via API aberta.'],
    ['p',  'Para prefeituras, o sistema viabiliza controle de contratos de frotas terceirizadas, comprovação de cobertura de coleta e transporte escolar, e atendimento às exigências de auditoria do TCE — com ROI médio de 6 a 12 meses.'],
  ]),
  estacionamento: blocks([
    ['h2', 'Estacionamento Inteligente'],
    ['p',  'Estudos urbanos mostram que até 30% do tráfego em centros comerciais é de veículos procurando vaga. Além do congestionamento gerado, a gestão ineficiente de estacionamentos públicos representa perda de dezenas de milhões de reais por ano em receitas municipais não capturadas.'],
    ['p',  'A solução instala sensores magnéticos em vagas conectados via NB-IoT, alimentando apps de guiamento, totens informativos e sistemas de pagamento digital — com painel de ocupação em tempo real e relatórios de rotatividade para a gestão pública.'],
    ['p',  'A Unifique integra o módulo de estacionamento à infraestrutura NB-IoT já existente, reduzindo o custo de implantação em até 40% frente a soluções standalone. O modelo de tarifação digital com receita compartilhada viabiliza o projeto sem CAPEX direto da prefeitura.'],
  ]),
  energia: blocks([
    ['h2', 'Smart Meter Energia (AMI)'],
    ['p',  'A ANEEL determinou que 100% dos medidores de energia das distribuidoras brasileiras sejam substituídos por smart meters (AMI) até 2031 — são mais de 90 milhões de unidades. O gargalo não é o equipamento: é a conectividade de campo com custo viável em áreas de baixa densidade.'],
    ['p',  'A Unifique provê redes NB-IoT e LoRaWAN como infraestrutura de comunicação para os smart meters, integrando dados de consumo às plataformas das distribuidoras (MDM/MDMS) com latência de minutos e custo por ponto abaixo das alternativas 4G/LTE.'],
    ['p',  'Além da leitura automática, a AMI habilita detecção de fraudes e perdas não técnicas (que representam R$ 10+ bi/ano no Brasil), resposta à demanda e gestão de outages em tempo real — transformando a distribuidora em uma empresa orientada a dados energéticos.'],
  ]),
  wifi: blocks([
    ['h2', 'Wi-Fi Público Municipal'],
    ['p',  '26 milhões de brasileiros não têm acesso à internet em casa — concentrados em periferias e municípios de menor porte. A inclusão digital é pré-requisito para acesso a serviços públicos online, educação a distância e empregabilidade no mercado digital.'],
    ['p',  'A Unifique instala e opera redes Wi-Fi público em praças, terminais de transporte, escolas e unidades de saúde — com portal de autenticação, analytics de uso e SLA gerenciado. O backbone próprio da Unifique elimina o maior custo: o backhaul.'],
    ['p',  'O Wi-Fi público é a camada de acesso da smart city: a mesma infraestrutura suporta câmeras IP, sensores ambientais e dispositivos IoT municipais — reduzindo o custo total da cidade inteligente e criando um ecossistema de conectividade urbana integrado.'],
  ]),
  solar: blocks([
    ['h2', 'Solar Municipal'],
    ['p',  'A conta de energia elétrica representa 4–8% do orçamento de uma prefeitura média — um dos maiores custos operacionais fixos. Com o custo de geração solar no menor nível histórico e crédito de energia garantido até 2045 (Lei 14.300/2022), o retorno sobre investimento nunca foi tão previsível.'],
    ['p',  'A Unifique estrutura projetos de geração solar para prédios públicos (sede da prefeitura, escolas, UBSs, iluminação pública solar), incluindo engenharia, instalação, monitoramento de geração em tempo real e integração com o sistema de gestão energética municipal.'],
    ['p',  'O monitoramento IoT — consumo vs. geração por ponto, alertas de anomalia, relatórios de crédito energético — transforma o projeto solar em ativo auditável, requisito para financiamentos BID, BNDES e Banco do Brasil Armazéns Verdes.'],
  ]),
};

async function run() {
  const client = await pool.connect();
  try {
    // Garante que a tabela existe
    await client.query(`
      CREATE TABLE IF NOT EXISTS site_data (
        id TEXT PRIMARY KEY,
        data JSONB NOT NULL,
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    for (const [id, newBlocks] of Object.entries(VISAO_GERAL)) {
      // Lê dado atual do banco (se existir)
      const res = await client.query('SELECT data FROM site_data WHERE id = $1', [id]);
      const current = res.rows[0]?.data || {};

      // Merge: preserva todos os outros campos, só atualiza informativo.blocks
      const updated = {
        ...current,
        informativo: {
          ...(current.informativo || {}),
          blocks: newBlocks,
        },
      };

      await client.query(`
        INSERT INTO site_data (id, data, updated_at)
        VALUES ($1, $2, NOW())
        ON CONFLICT (id) DO UPDATE SET data = $2, updated_at = NOW()
      `, [id, JSON.stringify(updated)]);

      console.log(`✓ ${id}`);
    }

    console.log('\nPronto! Abra o site e veja a Visão Geral de cada solução.');
  } finally {
    client.release();
    await pool.end();
  }
}

run().catch(err => { console.error(err); process.exit(1); });
