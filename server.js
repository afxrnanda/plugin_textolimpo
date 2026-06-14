import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Função com retry exponencial
async function generateWithRetry(messages, opts = {}) {
  const maxRetries = opts.maxRetries ?? 4;
  const baseDelay = opts.baseDelay ?? 1000;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.GPT_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "nex-agi/nex-n2-pro:free",
            messages,
            reasoning: {
              enabled: true,
            },
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        const err = new Error(
          result.error?.message || "Erro ao acessar a API"
        );
        err.status = response.status;
        throw err;
      }

      return result;
    } catch (err) {
      const isLast = attempt === maxRetries;

      if (isLast) {
        throw err;
      }

      const delay = baseDelay * Math.pow(2, attempt);
      console.log(
        `Tentativa ${attempt + 1} falhou. Tentando novamente em ${
          delay / 1000
        }s...`
      );

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

app.post("/traduzir", async (req, res) => {
  try {
    const texto = req.body.texto;

    if (!texto || texto.trim().length === 0) {
      return res.status(400).json({
        error: "Texto vazio ou inválido.",
      });
    }

    const prompt = `
Simplifique o texto abaixo para que seja compreensível para pessoas com baixo letramento funcional.
Evite palavras difíceis, jargões e frases longas. Mantenha o mesmo sentido.
Responda apenas com o texto reescrito, sem comentários adicionais.

Texto original:
${texto}
`;

    let result;

    try {
      result = await generateWithRetry(
        [
          {
            role: "user",
            content: prompt,
          },
        ],
        {
          maxRetries: 4,
          baseDelay: 1000,
        }
      );
    } catch (error) {
      console.error("Erro após retries:", error);

      if (error.status === 429) {
        return res.status(503).json({
          error: "Cota da API excedida. Tente novamente mais tarde.",
          detalhe: error.message,
        });
      }

      return res.status(500).json({
        error: "Erro ao processar tradução.",
        detalhe: error.message,
      });
    }

    const resposta = result.choices[0].message.content;

    res.json({
      traducao: resposta.trim(),
    });
  } catch (error) {
    console.error("Erro:", error);

    res.status(500).json({
      error: "Erro ao processar tradução.",
      detalhe: error.message || String(error),
    });
  }
});

app.listen(3001, () => {
  console.log("✅ Servidor rodando em http://localhost:3001");
});