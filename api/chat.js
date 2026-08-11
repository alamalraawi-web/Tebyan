const SYSTEM_PROMPT = `
أنت مساعد تبيان الذكي داخل مشروع صحي عربي.

خدمات المشروع:
- الفحوصات والمختبرات: /main/labs
- لوحة التحكم: /main/dashboard
- الصيدلية الذكية: /main/pharmacy
- الاستشارات والمواعيد: /main/consultations
- التغذية العلاجية: /main/scans
- الإعدادات: /main/settings

أجب بالعربية بوضوح وود.
ساعد المستخدم في فهم مشروع تبيان والتنقل بين خدماته.
لا تخترع نتائج فحوصات أو بيانات مستخدم أو مواعيد.
في الأسئلة الطبية قدم معلومات عامة فقط، ولا تصف جرعات علاجية.
عند الأعراض الخطيرة اطلب التواصل مع الطوارئ المحلية أو مختص فوراً.
`;

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
}

function normalizeMessages(value) {
  if (!Array.isArray(value)) return [];

  return value
    .filter(
      (message) =>
        message &&
        (message.role === "user" || message.role === "assistant") &&
        typeof message.content === "string"
    )
    .map((message) => ({
      role: message.role,
      content: message.content.trim().slice(0, 4000),
    }))
    .filter((message) => message.content)
    .slice(-12);
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    return sendJson(res, 200, {
      ok: true,
      service: "Tibyan AI API",
      tokenConfigured: Boolean(process.env.GITHUB_TOKEN),
      model: process.env.GITHUB_MODEL || "openai/gpt-4.1",
    });
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return sendJson(res, 405, { error: "طريقة الطلب غير مدعومة." });
  }

  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return sendJson(res, 500, {
      error:
        "مفتاح GITHUB_TOKEN غير موجود في Vercel. أضفه في Settings ثم نفّذ Redeploy.",
    });
  }

  const messages = normalizeMessages(req.body?.messages);

  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return sendJson(res, 400, { error: "اكتب رسالة صحيحة أولاً." });
  }

  try {
    const githubResponse = await fetch(
      "https://models.github.ai/inference/chat/completions",
      {
        method: "POST",
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${token}`,
          "X-GitHub-Api-Version": "2026-03-10",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: process.env.GITHUB_MODEL || "openai/gpt-4.1",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
          ],
          temperature: 0.35,
          max_tokens: 700,
          stream: false,
        }),
      }
    );

    const rawGithubResponse = await githubResponse.text();
    let data = {};

    if (rawGithubResponse) {
      try {
        data = JSON.parse(rawGithubResponse);
      } catch {
        data = { message: rawGithubResponse.slice(0, 500) };
      }
    }

    if (!githubResponse.ok) {
      console.error("GitHub Models error:", githubResponse.status, data);

      const errors = {
        401: "مفتاح GitHub غير صالح أو تم إلغاؤه.",
        403:
          "مفتاح GitHub لا يملك صلاحية models: read. أنشئ Fine-grained token بهذه الصلاحية.",
        404:
          "النموذج أو مسار GitHub Models غير متاح لهذا الحساب.",
        422:
          "إعداد النموذج غير صحيح. اجعل GITHUB_MODEL يساوي openai/gpt-4.1.",
        429:
          "وصلت إلى الحد المؤقت المجاني لـGitHub Models. حاول بعد قليل.",
      };

      return sendJson(res, githubResponse.status, {
        error:
          errors[githubResponse.status] ||
          data?.message ||
          `فشل GitHub Models برمز ${githubResponse.status}.`,
      });
    }

    const reply = data?.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return sendJson(res, 502, {
        error: "أعاد GitHub Models رداً فارغاً. حاول مرة أخرى.",
      });
    }

    return sendJson(res, 200, { reply });
  } catch (error) {
    console.error("Tibyan API error:", error);
    return sendJson(res, 500, {
      error:
        error?.message ||
        "حدث خطأ في خادم مساعد تبيان.",
    });
  }
}
