-- ============================================================
-- FutStyle — estrutura do banco de dados (PostgreSQL)
-- Hierarquia: ligas (1) --- (N) times (1) --- (N) camisas
-- ============================================================

/* Entidade mais forte: independe de qualquer outra tabela. */
CREATE TABLE IF NOT EXISTS ligas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(60) NOT NULL UNIQUE
);

/* Entidade média: pertence a uma liga. */
CREATE TABLE IF NOT EXISTS times (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(80) NOT NULL,
    liga_id INTEGER NOT NULL,
    FOREIGN KEY (liga_id) REFERENCES ligas(id) ON DELETE CASCADE,
    /* o mesmo clube pode aparecer em ligas diferentes (ex.: Real Madrid atual e Retrô) */
    UNIQUE (nome, liga_id)
);

/* Entidade mais fraca: depende de times, que depende de ligas. */
CREATE TABLE IF NOT EXISTS camisas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(120) NOT NULL UNIQUE,
    cor VARCHAR(30) NOT NULL,
    temporada VARCHAR(10) NOT NULL,
    preco_centavos INTEGER NOT NULL,
    estoque INTEGER NOT NULL DEFAULT 0,
    destaque BOOLEAN NOT NULL DEFAULT FALSE,
    time_id INTEGER NOT NULL,
    criado_em TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (time_id) REFERENCES times(id) ON DELETE CASCADE,
    CHECK (preco_centavos > 0),
    CHECK (estoque >= 0)
);

INSERT INTO ligas (nome) VALUES
('La Liga'),
('Premier League'),
('Ligue 1'),
('Brasileirão'),
('Bundesliga'),
('Serie A'),
('MLS'),
('Saudi Pro League'),
('Liga Portugal'),
('Retrô');

INSERT INTO times (nome, liga_id) VALUES
('Real Madrid', 1),
('Barcelona', 1),
('Atlético de Madrid', 1),
('Manchester City', 2),
('Liverpool', 2),
('Manchester United', 2),
('Chelsea', 2),
('Arsenal', 2),
('PSG', 3),
('Marseille', 3),
('Lyon', 3),
('Monaco', 3),
('Flamengo', 4),
('Corinthians', 4),
('Palmeiras', 4),
('São Paulo', 4),
('Grêmio', 4),
('Internacional', 4),
('Bayern de Munique', 5),
('Borussia Dortmund', 5),
('Inter de Milão', 6),
('Milan', 6),
('Juventus', 6),
('Inter Miami', 7),
('Al-Nassr', 8),
('Al-Hilal', 8),
('Benfica', 9),
('Porto', 9),
('Real Madrid', 10),
('Brasil', 10);

INSERT INTO camisas (nome, cor, temporada, preco_centavos, estoque, destaque, time_id) VALUES
('Real Madrid I 2026/27', 'Branco', '2026/27', 15990, 18, TRUE, 1),
('Barcelona I 2026/27', 'Azul', '2026/27', 15990, 15, TRUE, 2),
('Atlético de Madrid I 2026/27', 'Vermelho', '2026/27', 14990, 11, FALSE, 3),
('Manchester City I 2026/27', 'Azul', '2026/27', 14990, 12, TRUE, 4),
('Liverpool I 2026/27', 'Vermelho', '2026/27', 14990, 20, TRUE, 5),
('Manchester United I 2026/27', 'Vermelho', '2026/27', 14990, 9, FALSE, 6),
('Chelsea I 2026/27', 'Azul', '2026/27', 14490, 14, FALSE, 7),
('Arsenal I 2026/27', 'Vermelho', '2026/27', 14990, 13, FALSE, 8),
('PSG I 2026/27', 'Azul', '2026/27', 14990, 17, TRUE, 9),
('Marseille I 2026/27', 'Branco', '2026/27', 13990, 10, FALSE, 10),
('Lyon I 2026/27', 'Branco', '2026/27', 13990, 7, FALSE, 11),
('Monaco I 2026/27', 'Vermelho', '2026/27', 13990, 8, FALSE, 12),
('Flamengo I 2026', 'Vermelho', '2026', 13990, 22, TRUE, 13),
('Corinthians I 2026', 'Branco', '2026', 13990, 19, TRUE, 14),
('Palmeiras I 2026', 'Verde', '2026', 13990, 18, FALSE, 15),
('São Paulo I 2026', 'Branco', '2026', 13990, 13, FALSE, 16),
('Grêmio I 2026', 'Azul', '2026', 13490, 12, FALSE, 17),
('Internacional I 2026', 'Vermelho', '2026', 13490, 12, FALSE, 18),
('Bayern de Munique I 2026/27', 'Vermelho', '2026/27', 15490, 16, TRUE, 19),
('Borussia Dortmund I 2026/27', 'Amarelo', '2026/27', 14990, 11, FALSE, 20),
('Inter de Milão I 2026/27', 'Azul', '2026/27', 14990, 13, FALSE, 21),
('Milan I 2026/27', 'Vermelho', '2026/27', 14990, 14, FALSE, 22),
('Juventus I 2026/27', 'Branco', '2026/27', 14990, 10, FALSE, 23),
('Inter Miami I 2026', 'Rosa', '2026', 14990, 20, TRUE, 24),
('Al-Nassr I 2026', 'Amarelo', '2026', 14490, 17, TRUE, 25),
('Al-Hilal I 2026', 'Azul', '2026', 14490, 12, FALSE, 26),
('Benfica I 2026/27', 'Vermelho', '2026/27', 13990, 9, FALSE, 27),
('Porto I 2026/27', 'Azul', '2026/27', 13990, 8, FALSE, 28),
('Real Madrid Retrô 2002', 'Branco', '2002', 18990, 6, TRUE, 29),
('Brasil Retrô 2002', 'Amarelo', '2002', 19990, 8, TRUE, 30);
