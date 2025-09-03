import { useEffect, useState } from "react";
import "./App.css";

type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

type Player = {
  id: number;
  name: string;
  score: string;
};

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: "", score: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(1);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [type, setType] = useState("");

  async function fetchQuetions() {
    setLoading(true);
    try {
      console.log(amount);

      const res = await fetch(
        "https://opentdb.com/api.php?amount=" +
          amount +
          category +
          difficulty +
          type
      );

      const data = await res.json();
      console.log(data);
      setQuestions(data.results);
    } catch (err) {
      console.error("Error fetching triva:", err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    }
  }

  const addPlayer = () => {
    setPlayers((prev) => [
      ...prev,
      { id: Date.now(), name: "", score: "" }, // new player
    ]);
  };

  const removePlayer = (id: number) => {
    setPlayers((prev) => prev.filter((p) => p.id !== id));
  };

  const updatePlayer = (id: number, field: "name" | "score", value: string) => {
    setPlayers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Marcus Trivia</h1>

      <input
        type="number"
        name="trivia_amount"
        id="trivia_amount"
        min={1}
        max={50}
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />

      <select
        name="trivia_category"
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Any Category</option>
        <option value="&category=9">General Knowledge</option>
        <option value="&category=10">Entertainment: Books</option>
        <option value="&category=11">Entertainment: Film</option>
        <option value="&category=12">Entertainment: Music</option>
        <option value="&category=13">
          Entertainment: Musicals &amp; Theatres
        </option>
        <option value="&category=14">Entertainment: Television</option>
        <option value="&category=15">Entertainment: Video Games</option>
        <option value="&category=16">Entertainment: Board Games</option>
        <option value="&category=17">Science &amp; Nature</option>
        <option value="&category=18">Science: Computers</option>
        <option value="&category=19">Science: Mathematics</option>
        <option value="&category=20">Mythology</option>
        <option value="&category=21">Sports</option>
        <option value="&category=22">Geography</option>
        <option value="&category=23">History</option>
        <option value="&category=24">Politics</option>
        <option value="&category=25">Art</option>
        <option value="&category=26">Celebrities</option>
        <option value="&category=27">Animals</option>
        <option value="&category=28">Vehicles</option>
        <option value="&category=29">Entertainment: Comics</option>
        <option value="&category=30">Science: Gadgets</option>
        <option value="&category=31">
          Entertainment: Japanese Anime &amp; Manga
        </option>
        <option value="&category=32">
          Entertainment: Cartoon &amp; Animations
        </option>{" "}
      </select>

      <select
        name="trivia_difficulty"
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option value="">Any Difficulty</option>
        <option value="&difficulty=easy">Easy</option>
        <option value="&difficulty=medium">Medium</option>
        <option value="&difficulty=hard">Hard</option>
      </select>

      <select name="trivia_type" onChange={(e) => setType(e.target.value)}>
        <option value="">Any Type</option>
        <option value="&type=multiple">Multiple Choice</option>
        <option value="&type=boolean">True / False</option>
      </select>

      <div>
        <button onClick={fetchQuetions} disabled={loading}>
          {loading ? "Loading..." : "Get Trivia Questions"}
        </button>
      </div>

      <ul>
        {questions.map((q, i) => (
          <li key={i}>
            <strong dangerouslySetInnerHTML={{ __html: q.question }}></strong>
            <p
              dangerouslySetInnerHTML={{
                __html: "Correct answer: " + q.correct_answer,
              }}
            ></p>
            <p
              dangerouslySetInnerHTML={{
                __html: "Incorrect answers: " + q.incorrect_answers.join(", "),
              }}
            ></p>
          </li>
        ))}
      </ul>

      <div>
        <h2>Players</h2>

        {players.map((p, index) => (
          <p key={p.id}>
            Player {index + 1}:{" "}
            <textarea
              rows={1}
              cols={20}
              style={{ resize: "none" }}
              value={p.name}
              onChange={(e) => updatePlayer(p.id, "name", e.target.value)}
            />{" "}
            Score:{" "}
            <textarea
              rows={1}
              cols={20}
              style={{ resize: "none" }}
              value={p.score}
              onChange={(e) => updatePlayer(p.id, "score", e.target.value)}
            />
            <button onClick={() => removePlayer(p.id)}>Remove</button>
          </p>
        ))}

        <button onClick={addPlayer}>Add Player</button>
      </div>
    </div>
  );
}

export default App;
