
# Arquitetura AutoDrive Smart

Este documento detalha as decisões técnicas para o marketplace de instrutores autônomos.

## 1. Estratégia de Migração
- **ORM**: Utilização do Prisma para garantir que as interfaces TypeScript e o banco de dados estejam sempre em sincronia.
- **PostGIS**: As migrações iniciais devem incluir o comando `CREATE EXTENSION IF NOT EXISTS postgis;` para habilitar funções geoespaciais avançadas no PostgreSQL.
- **Evolução**: Adição de colunas para "Pagamentos" (payment_intent_id) será feita em uma migração futura sem downtime, usando valores default.

## 2. Estratégia de Cache (Redis)
- **Geosearch**: Cachear os resultados de `getNearbyInstructors(lat, lng, radius)` por 5 minutos, invalidando quando um novo instrutor for aprovado ou mudar de endereço base.
- **Session locks**: Implementar um lock de 5 minutos no Redis para horários selecionados por alunos, evitando "double booking" enquanto o aluno preenche os dados de pagamento.
- **Configurações**: Cachear metadados de precificação global e taxas da plataforma.

## 3. Escalabilidade e LGPD
- **LGPD**: Os dados sensíveis (telefones, CPFs) devem ter permissões de acesso restritas na camada de API. O campo `deletedAt` implementa o *Soft Delete*, permitindo que o usuário "exclua" sua conta enquanto a plataforma mantém registros fiscais necessários por lei.
- **Performance**: Utilização de índices GIST para a coluna `location` (Point) no PostgreSQL para buscas espaciais ultra-rápidas (ex: "quem está a 5km de mim?").
- **Imutabilidade Financeira**: A tabela de `Lessons` salva snapshots de preço. Se um instrutor aumentar seu preço base hoje, as aulas já agendadas ou concluídas mantêm o valor histórico original.

## 4. Próximos Passos (Diferenciais)
- **Rastreamento em Tempo Real**: Integração com WebSockets para mostrar a posição do instrutor no mapa 15 minutos antes da aula.
- **IA de Roteirização**: Utilizar Gemini API para sugerir a melhor ordem de aulas para o instrutor, minimizando o tempo de deslocamento morto entre endereços de diferentes alunos.
