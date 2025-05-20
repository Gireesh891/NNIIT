const flashcards = [];

function inferSubject(question) {
  const q = question.toLowerCase();
  if (q.includes('newton') || q.includes('force') || q.includes('acceleration') || q.includes('motion')) return 'Physics';
  if (q.includes('photosynthesis') || q.includes('cell') || q.includes('plant') || q.includes('mitochondria')) return 'Biology';
  if (q.includes('equation') || q.includes('calculate') || q.includes('algebra') || q.includes('geometry')) return 'Mathematics';
  if (q.includes('revolution') || q.includes('independence') || q.includes('war')) return 'History';
  return 'General Knowledge';
}

function addFlashcard() {
  const student_id = document.getElementById('student_id').value.trim();
  const question = document.getElementById('question').value.trim();
  const answer = document.getElementById('answer').value.trim();

  if (!student_id || !question || !answer) {
    alert('Please fill all fields');
    return;
  }

  const subject = inferSubject(question);
  flashcards.push({ student_id, question, answer, subject });

  document.getElementById('add_result').innerHTML = `Flashcard added successfully.... <br> Subject: ${subject}`;
  document.getElementById('flashcardForm').reset();
}

function getFlashcards() {
  const student_id = document.getElementById('get_student_id').value.trim();
  const limit = parseInt(document.getElementById('limit').value);

  const studentCards = flashcards.filter(card => card.student_id === student_id);
  const grouped = {};

  studentCards.forEach(card => {
    if (!grouped[card.subject]) grouped[card.subject] = [];
    grouped[card.subject].push(card);
  });

  const mixed = [];
  for (let subject in grouped) {
    if (mixed.length < limit) {
      const cards = grouped[subject];
      const randomCard = cards[Math.floor(Math.random() * cards.length)];
      mixed.push(randomCard);
    }
  }

  // Shuffle
  for (let i = mixed.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [mixed[i], mixed[j]] = [mixed[j], mixed[i]];
  }

  const output = document.getElementById('flashcard_output');
  output.innerHTML = '';

  mixed.forEach(card => {
    const div = document.createElement('div');
    div.className = 'col-md-6';
    div.innerHTML = `
      <div class="flashcard-box">
        <h5><strong>Subject:</strong> ${card.subject}</h5>
        <p><strong>Q:</strong> ${card.question}</p>
        <p><strong>A:</strong> ${card.answer}</p>
      </div>
    `;
    output.appendChild(div);
  });
}