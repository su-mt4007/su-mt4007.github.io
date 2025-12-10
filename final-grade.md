---
outline: [2]
---
# Final Grade Calculator

<script setup>
import { ref, computed } from 'vue'

const homeworkOptions = ['U', 'G', 'VG']
const gradeOptions = ['F', 'E', 'D', 'C', 'B', 'A']

const homework = ref('G')
const project = ref('E')
const exam = ref('E')

const homeworkPoints = { U: 0, G: 3, VG: 5 }
const gradePoints = { F: 0, E: 1, D: 2, C: 3, B: 4, A: 5 }

const wHomework = 3
const wProject = 3
const wExam = 1.5
const totalWeight = wHomework + wProject + wExam

const isImmediateFail = computed(
  () => homework.value === 'U' || project.value === 'F' || exam.value === 'F'
)

const numericScore = computed(() => {
  if (isImmediateFail.value) return null
  const hw = homeworkPoints[homework.value]
  const pr = gradePoints[project.value]
  const ex = gradePoints[exam.value]
  return (wHomework * hw + wProject * pr + wExam * ex) / totalWeight
})

const finalGrade = computed(() => {
  if (isImmediateFail.value) return 'F'
  if (numericScore.value == null) return ''

  const s = numericScore.value
  if (s >= 4.5) return 'A'
  if (s >= 3.5) return 'B'
  if (s >= 2.5) return 'C'
  if (s >= 1.5) return 'D'
  if (s >= 0.5) return 'E'
  return 'F'
})
</script>

Below is a simple calculator to estimate your final course grade based on your
homework, project, and exam grades. Select your grades from the dropdowns to see
the calculated final grade.

<div class="grade-calculator">
  <div class="grade-row">
    <label>
      Homework
      <select v-model="homework">
        <option v-for="option in homeworkOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </label>
    <label>
      Project
      <select v-model="project">
        <option v-for="option in gradeOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </label>
    <label>
      Exam
      <select v-model="exam">
        <option v-for="option in gradeOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </label>
  </div>

  <div class="grade-row grade-result">
    <span class="grade-label">Final grade:</span>
    <span class="grade-value" v-if="finalGrade">{{ finalGrade }}</span>
    <span v-else>–</span>
  </div>
</div>

<style scoped>
.grade-calculator {
  font-size: 0.95rem;
}

.grade-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  margin: 0.5rem 0;
}

.grade-row label {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.grade-row select {
  padding: 0.1rem 0.4rem;
  font-size: 0.9rem;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background-color: transparent;
  color: inherit;

  /* Center the selected value */
  text-align: center;
  text-align-last: center;       /* for most modern browsers */
}

.grade-result {
  margin-top: 0.5rem;
  font-weight: 500;
}

.grade-label {
  margin-right: 0.25rem;
}

.grade-score {
  margin-left: 0.35rem;
  font-size: 0.9em;
  opacity: 0.8;
}

.grade-value {
  font-size: 1.2em;
  font-weight: 600;
}


.grade-note {
  margin-top: 0.25rem;
  font-size: 0.85em;
  opacity: 0.8;
}
</style>


## Explanation of the grading rule

### Grade scales

* Project and Exam use: F, E, D, C, B, A which contribute to the score below with numeric values  
  E = 1, D = 2, C = 3, B = 4, A = 5.
* Homework uses: U, G, VG which contribute to the score below with numeric values  
  U = 0, G = 3, VG = 5.

### Immediate fail rule

* If any component is a failing grade (Homework = U, Project = F, or Exam = F), the overall course grade is automatically F.

### Weighted average (for non-failing combinations)

The overall score is computed as a weighted average of the three components according to the number of credits each module has:
* Homework weight: 3 ECTS  
* Project weight: 3 ECTS  
* Exam weight: 1.5 ECTS  

With numeric values $(G_{\text{HW}}, G_{\text{Proj}}, G_{\text{Exam}})$, the score is computed as
$$
\text{Score} = \frac{3G_{\text{HW}} + 3G_{\text{Proj}} + 1.5G_{\text{Exam}}}{7.5}.
$$

### Converting the numeric score to final grade

* A: score ≥ 4.5  
* B: 3.5 ≤ score < 4.5  
* C: 2.5 ≤ score < 3.5  
* D: 1.5 ≤ score < 2.5  
* E: 0.5 ≤ score < 1.5  
* F: score < 0.5  

The table below lists all non-failing combinations (no U, no F) together with their weighted score and final course grade.

| Homework | Project | Exam | Weighted score | Final grade |
|---------|---------|------|----------------|-------------|
| G | E | E | 1.800 | D |
| G | E | D | 2.000 | D |
| G | E | C | 2.200 | D |
| G | E | B | 2.400 | D |
| G | E | A | 2.600 | C |
| G | D | E | 2.200 | D |
| G | D | D | 2.400 | D |
| G | D | C | 2.600 | C |
| G | D | B | 2.800 | C |
| G | D | A | 3.000 | C |
| G | C | E | 2.600 | C |
| G | C | D | 2.800 | C |
| G | C | C | 3.000 | C |
| G | C | B | 3.200 | C |
| G | C | A | 3.400 | C |
| G | B | E | 3.000 | C |
| G | B | D | 3.200 | C |
| G | B | C | 3.400 | C |
| G | B | B | 3.600 | B |
| G | B | A | 3.800 | B |
| G | A | E | 3.400 | C |
| G | A | D | 3.600 | B |
| G | A | C | 3.800 | B |
| G | A | B | 4.000 | B |
| G | A | A | 4.200 | B |
| VG | E | E | 3.000 | C |
| VG | E | D | 3.200 | C |
| VG | E | C | 3.400 | B |
| VG | E | B | 3.600 | B |
| VG | E | A | 3.800 | B |
| VG | D | E | 3.400 | B |
| VG | D | D | 3.600 | B |
| VG | D | C | 3.800 | B |
| VG | D | B | 4.000 | B |
| VG | D | A | 4.200 | B |
| VG | C | E | 3.800 | B |
| VG | C | D | 4.000 | B |
| VG | C | C | 4.200 | B |
| VG | C | B | 4.400 | B |
| VG | C | A | 4.600 | A |
| VG | B | E | 3.800 | B |
| VG | B | D | 4.000 | B |
| VG | B | C | 4.200 | B |
| VG | B | B | 4.400 | B |
| VG | B | A | 4.600 | A |
| VG | A | E | 4.200 | B |
| VG | A | D | 4.400 | B |
| VG | A | C | 4.600 | A |
| VG | A | B | 4.800 | A |
| VG | A | A | 5.000 | A |
