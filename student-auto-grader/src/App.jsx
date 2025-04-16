import { useState } from 'react';

export default function App() {
  const [answers, setAnswers] = useState(Array(25).fill(''));
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState([]);

  const answerKey = [
    'A', 'C', 'B', 'D', 'A', 'B', 'C', 'D', 'A', 'B',
    'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D',
    'A', 'B', 'C', 'D', 'A'
  ];

  const handleChange = (index, value) => {
    const updated = [...answers];
    updated[index] = value.toUpperCase();
    setAnswers(updated);
  };

  const handleSubmit = () => {
    let total = 0;
    const feedback = answers.map((ans, i) => {
      const correct = answerKey[i];
      const isCorrect = ans.trim().toUpperCase() === correct;
      if (isCorrect) total++;
      return { question: i + 1, studentAnswer: ans, correctAnswer: correct, isCorrect };
    });
    setScore(total);
    setResult(feedback);
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">학생용 자동 채점</h1>
      <input
        type="text"
        placeholder="이름을 입력하세요"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <div className="grid grid-cols-5 gap-2">
        {answers.map((val, idx) => (
          <input
            key={idx}
            type="text"
            maxLength={1}
            value={val}
            onChange={(e) => handleChange(idx, e.target.value)}
            className="border rounded px-2 py-1 text-center"
            placeholder={`Q${idx + 1}`}
          />
        ))}
      </div>
      <button
        className="w-full bg-blue-600 text-white py-2 rounded"
        onClick={handleSubmit}
        disabled={submitted || !name}
      >
        제출하고 채점하기
      </button>

      {submitted && (
        <div className="bg-white p-4 border rounded shadow">
          <h2 className="text-xl font-semibold mb-2">{name}님의 채점 결과</h2>
          <p className="mb-4">총점: {score} / 25</p>
          <div className="grid grid-cols-5 gap-1 text-sm">
            {result.map((r, i) => (
              <div
                key={i}
                className={`p-2 rounded text-center ${r.isCorrect ? 'bg-green-100' : 'bg-red-100'}`}
              >
                Q{r.question}: {r.studentAnswer || '-'}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
