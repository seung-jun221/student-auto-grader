import { useState } from 'react';

const Card = ({ children, className }) => (
  <div className={`rounded-xl border p-4 shadow ${className}`}>{children}</div>
);
const CardContent = ({ children, className }) => (
  <div className={className}>{children}</div>
);
const Button = ({ children, ...props }) => (
  <button
    {...props}
    className={`p-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 ${props.className}`}
  >
    {children}
  </button>
);

export default function StudentInputGrader() {
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
    const input = value.toUpperCase();
    if (!['A', 'B', 'C', 'D', ''].includes(input)) return;
    const updated = [...answers];
    updated[index] = input;
    setAnswers(updated);
  };

  const handleSubmit = () => {
    if (answers.some(ans => !['A', 'B', 'C', 'D'].includes(ans))) {
      alert('모든 문항에 답을 입력해주세요 (A, B, C, D 중 하나)');
      return;
    }

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
    <div className="p-6 max-w-4xl mx-auto space-y-6 bg-white rounded-xl shadow-md border border-gray-200">
      <Card className="bg-[#f7f9fb]">
        <CardContent className="p-6 space-y-6">
          <h2 className="text-2xl font-bold text-[#1e3a8a] border-b pb-2">진단검사-TRI 성적입력</h2>
          <input
            type="text"
            placeholder="이름을 입력하세요"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="grid grid-cols-5 gap-3">
            {answers.map((val, idx) => (
              <input
                key={idx}
                type="text"
                maxLength={1}
                value={val}
                onChange={(e) => handleChange(idx, e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-center focus:ring-2 focus:ring-blue-300"
                placeholder={`Q${idx + 1}`}
              />
            ))}
          </div>

          <Button className="w-full" onClick={handleSubmit} disabled={submitted || !name}>
            제출하고 채점하기
          </Button>
        </CardContent>
      </Card>

      {submitted && (
        <Card className="bg-gray-50">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">{name}님의 채점 결과</h3>
            <p className="mb-4 text-lg">총점: <span className="font-bold text-blue-700">{score} / 25</span></p>
            <div className="grid grid-cols-1 gap-2 text-sm">
              {result.map((r, i) => (
                <div
                  key={i}
                  className={`p-2 rounded font-medium ${r.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                >
                  Q{r.question}: 당신의 답 — {r.studentAnswer || '-'}, 정답 — {r.correctAnswer}
                </div>
              ))}
            </div>
            <Button
              className="w-full mt-4 bg-gray-300 text-gray-800 hover:bg-gray-400"
              onClick={() => {
                setAnswers(Array(25).fill(''));
                setSubmitted(false);
                setScore(0);
                setResult([]);
                setName('');
              }}
            >
              다시 시작하기
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
import { useState } from 'react';

const Card = ({ children, className }) => (
  <div className={`rounded-xl border p-4 shadow ${className}`}>{children}</div>
);
const CardContent = ({ children, className }) => (
  <div className={className}>{children}</div>
);
const Button = ({ children, ...props }) => (
  <button
    {...props}
    className={`p-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 ${props.className}`}
  >
    {children}
  </button>
);

export default function StudentInputGrader() {
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
    const input = value.toUpperCase();
    if (!['A', 'B', 'C', 'D', ''].includes(input)) return;
    const updated = [...answers];
    updated[index] = input;
    setAnswers(updated);
  };

  const handleSubmit = () => {
    if (answers.some(ans => !['A', 'B', 'C', 'D'].includes(ans))) {
      alert('모든 문항에 답을 입력해주세요 (A, B, C, D 중 하나)');
      return;
    }

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
    <div className="p-6 max-w-4xl mx-auto space-y-6 bg-white rounded-xl shadow-md border border-gray-200">
      <Card className="bg-[#f7f9fb]">
        <CardContent className="p-6 space-y-6">
          <h2 className="text-2xl font-bold text-[#1e3a8a] border-b pb-2">진단검사-TRI 성적입력</h2>
          <input
            type="text"
            placeholder="이름을 입력하세요"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="grid grid-cols-5 gap-3">
            {answers.map((val, idx) => (
              <input
                key={idx}
                type="text"
                maxLength={1}
                value={val}
                onChange={(e) => handleChange(idx, e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-center focus:ring-2 focus:ring-blue-300"
                placeholder={`Q${idx + 1}`}
              />
            ))}
          </div>

          <Button className="w-full" onClick={handleSubmit} disabled={submitted || !name}>
            제출하고 채점하기
          </Button>
        </CardContent>
      </Card>

      {submitted && (
        <Card className="bg-gray-50">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">{name}님의 채점 결과</h3>
            <p className="mb-4 text-lg">총점: <span className="font-bold text-blue-700">{score} / 25</span></p>
            <div className="grid grid-cols-1 gap-2 text-sm">
              {result.map((r, i) => (
                <div
                  key={i}
                  className={`p-2 rounded font-medium ${r.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                >
                  Q{r.question}: 당신의 답 — {r.studentAnswer || '-'}, 정답 — {r.correctAnswer}
                </div>
              ))}
            </div>
            <Button
              className="w-full mt-4 bg-gray-300 text-gray-800 hover:bg-gray-400"
              onClick={() => {
                setAnswers(Array(25).fill(''));
                setSubmitted(false);
                setScore(0);
                setResult([]);
                setName('');
              }}
            >
              다시 시작하기
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
