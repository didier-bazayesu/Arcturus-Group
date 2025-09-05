import { useState, useEffect } from "react";

export default function Map() {
  const [occupations, setOccupations] = useState([]);
  const [selectedOccupation, setSelectedOccupation] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");
  const [answers, setAnswers] = useState({});
  const [finalResult, setFinalResult] = useState("");

  // Fetch all occupations from server
  useEffect(() => {
    fetch("http://localhost:3000/api/occupations") // assume you add a /api/occupations endpoint
      .then((res) => res.json())
      .then((data) => setOccupations(data.occupations));
  }, []);

  // Start chat after occupation is selected
  async function startChat() {
    if (!selectedOccupation) return;

    // Fetch occupation skills from your existing API
    const res = await fetch(`http://localhost:3000/api/occupations/${selectedOccupation}`);
    const data = await res.json();

    const skillsText = [
      ...data.requiredSkills.map((s) => s.name),
      ...data.optionalSkills.map((s) => s.name),
      ...data.relatedSkills.map((s) => s.name),
    ].join(", ");

    // Call OpenAI to generate 10 questions
    const prompt = `
      You are an interview question generator.
      Occupation: ${data.occupation.label}
      Skills to focus on: ${skillsText}

      Generate 10 skill-assessment questions in plain text.
    `;

    const aiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const aiData = await aiRes.json();
    const questionsList = aiData.choices[0].message.content
      .split("\n")
      .filter((q) => q.trim() !== "")
      .slice(0, 10);

    setQuestions(questionsList);
    setChat([{ role: "bot", text: questionsList[0] }]);
    setCurrentQuestion(0);
  }

  // Handle user answer
  async function handleSend() {
    if (!input.trim()) return;

    const newChat = [...chat, { role: "user", text: input }];
    const newAnswers = { ...answers, [currentQuestion]: input };
    setAnswers(newAnswers);
    setInput("");

    if (currentQuestion < questions.length - 1) {
      const nextQuestion = questions[currentQuestion + 1];
      setChat([...newChat, { role: "bot", text: nextQuestion }]);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setChat([...newChat, { role: "bot", text: "✅ All questions answered! Evaluating..." }]);
      await evaluateSkills(newAnswers);
    }
  }

  // Evaluate user answers with OpenAI
  async function evaluateSkills(allAnswers) {
    const allText = Object.entries(allAnswers)
      .map(([i, ans]) => `Q${Number(i) + 1}: ${questions[i]} \nA: ${ans}`)
      .join("\n\n");

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a professional evaluator. The user is a ${selectedOccupation}. Based on their answers, extract key skills and give a grade (1-100) with a short explanation.`,
          },
          { role: "user", content: allText },
        ],
      }),
    });

    const data = await res.json();
    setFinalResult(data.choices[0].message.content);
  }

  return (
    <div className="max-w-lg mx-auto p-6 border rounded shadow bg-white">
      <h1 className="text-xl font-bold mb-4">Occupation Skill Chatbot</h1>

      {!selectedOccupation && (
        <>
          <select
            className="border p-2 rounded mb-3 w-full"
            onChange={(e) => setSelectedOccupation(e.target.value)}
            value={selectedOccupation || ""}
          >
            <option value="">Select your occupation</option>
            {occupations.map((occ) => (
              <option key={occ.id} value={occ.id}>
                {occ.label}
              </option>
            ))}
          </select>
          <button
            onClick={startChat}
            className="px-4 py-2 bg-blue-500 text-white rounded"
            disabled={!selectedOccupation}
          >
            Start
          </button>
        </>
      )}

      {chat.length > 0 && (
        <>
          <div className="h-64 overflow-y-auto border p-3 mb-3 bg-gray-50 rounded">
            {chat.map((msg, i) => (
              <div
                key={i}
                className={`mb-2 ${msg.role === "bot" ? "text-blue-600" : "text-green-600 text-right"}`}
              >
                <strong>{msg.role === "bot" ? "Bot:" : "You:"}</strong> {msg.text}
              </div>
            ))}
          </div>

          {!finalResult && (
            <div className="flex gap-2">
              <input
                className="flex-1 p-2 border rounded"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your answer..."
              />
              <button onClick={handleSend} className="px-4 py-2 bg-blue-500 text-white rounded">
                Send
              </button>
            </div>
          )}

          {finalResult && (
            <div className="p-3 border rounded bg-green-100 mt-3">
              <h2 className="font-semibold">Final Evaluation</h2>
              <p>{finalResult}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
