'use client';

import { useEffect, useMemo, useState } from 'react';

const DAYS = [
  {
    id: 'mon',
    dow: 'Monday',
    short: 'MON',
    code: 'PULL A',
    title: 'Back + Biceps + Rear Delts',
    focus: 'Main focus: Back thickness + overall back',
    accent: '--pull-a',
    exercises: [
      ['Lat Pulldown', '3 × 8–12'],
      ['Barbell Row', '3 × 6–10'],
      ['Seated Cable Row', '3 × 8–12'],
      ['Face Pull', '3 × 12–20'],
      ['Dumbbell Curl', '3 × 8–12'],
      ['Hammer Curl', '2 × 10–15'],
    ],
  },
  {
    id: 'tue',
    dow: 'Tuesday',
    short: 'TUE',
    code: 'PUSH A',
    title: 'Chest + Shoulders + Triceps',
    focus: 'Main focus: Chest',
    accent: '--push-a',
    exercises: [
      ['Barbell Bench Press', '3 × 6–10'],
      ['Incline Dumbbell Press', '3 × 8–12'],
      ['Cable Fly', '2 × 12–15'],
      ['Dumbbell Lateral Raise', '3 × 12–20'],
      ['Cable Triceps Pushdown', '3 × 10–15'],
      ['Overhead Cable Triceps Extension', '2 × 10–15'],
    ],
  },
  {
    id: 'wed',
    dow: 'Wednesday',
    short: 'WED',
    code: 'LEGS A',
    title: 'Quad emphasis + calves + abs',
    focus: 'This should be your harder quad-focused leg day.',
    accent: '--legs-a',
    exercises: [
      ['Barbell Squat', '4 × 6–10'],
      ['Leg Press', '3 × 8–12'],
      ['Bulgarian Split Squat', '3 × 8–12 ea.'],
      ['Leg Extension', '2 × 12–15'],
      ['Leg Curl', '3 × 10–15'],
      ['Standing Calf Raise', '3 × 10–15'],
      ['Cable Crunch', '3 × 10–15'],
    ],
  },
  {
    id: 'thu',
    dow: 'Thursday',
    short: 'THU',
    code: 'PULL B',
    title: 'Lats + Rear Delts + Biceps',
    focus: 'Main focus: Lat width',
    accent: '--pull-b',
    exercises: [
      ['Pull-ups / Assisted Pull-ups', '3 × 6–10'],
      ['Chest-Supported Row', '3 × 8–12'],
      ['Single-Arm Lat Pulldown', '3 × 10–12'],
      ['Reverse Pec Deck', '3 × 12–20'],
      ['Incline Dumbbell Curl', '3 × 8–12'],
      ['Cable Hammer Curl', '2 × 10–15'],
    ],
  },
  {
    id: 'fri',
    dow: 'Friday',
    short: 'FRI',
    code: 'PUSH B',
    title: 'Shoulders + Upper Chest',
    focus: 'Main focus: Shoulders + upper chest',
    accent: '--push-b',
    exercises: [
      ['Overhead Dumbbell Press', '3 × 6–10'],
      ['Incline Barbell Bench Press', '3 × 6–10'],
      ['Machine Chest Press', '3 × 8–12'],
      ['Cable Lateral Raise', '3 × 12–20'],
      ['Pec Deck', '2 × 12–15'],
      ['Rope Triceps Extension', '3 × 10–15'],
    ],
  },
  {
    id: 'sat',
    dow: 'Saturday',
    short: 'SAT',
    code: 'LEGS B',
    title: 'Hamstrings + Glutes',
    focus: 'Main focus: Hamstrings + glutes',
    accent: '--legs-b',
    exercises: [
      ['Romanian Deadlift', '3 × 6–10'],
      ['Hack Squat', '3 × 8–12'],
      ['Walking Lunges', '3 × 10–12 ea.'],
      ['Seated Leg Curl', '3 × 10–15'],
      ['Leg Extension', '2 × 12–15'],
      ['Seated Calf Raise', '3 × 10–15'],
      ['Hanging Knee Raise', '3 × 10–15'],
    ],
  },
  {
    id: 'sun',
    dow: 'Sunday',
    short: 'SUN',
    code: 'REST',
    title: 'Rest / Recovery',
    rest: true,
  },
];

function isoWeekKey(date = new Date()) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = (d.getUTCDay() + 6) % 7;
  d.setUTCDate(d.getUTCDate() - dayNum + 3);
  const firstThursday = new Date(Date.UTC(d.getUTCFullYear(), 0, 4));
  const week =
    1 +
    Math.round(
      ((d.getTime() - firstThursday.getTime()) / 86400000 - 3 + ((firstThursday.getUTCDay() + 6) % 7)) /
        7,
    );
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
}

function loadSavedState(storageKey) {
  if (typeof window === 'undefined') return {};

  try {
    const raw = window.localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function dayCompletion(day, state) {
  if (day.rest) return null;
  const done = day.exercises.filter((_, i) => state[day.id]?.[i]).length;
  return { done, total: day.exercises.length, pct: done / day.exercises.length };
}

function overallPct(state) {
  let done = 0;
  let total = 0;

  DAYS.forEach((day) => {
    if (day.rest) return;
    total += day.exercises.length;
    done += day.exercises.filter((_, i) => state[day.id]?.[i]).length;
  });

  return total === 0 ? 0 : Math.round((done / total) * 100);
}

function checkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ringSVG(pct, colorVar) {
  const r = 14;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - pct);

  return (
    <svg className="ring" viewBox="0 0 34 34" aria-hidden="true">
      <circle className="bg" cx="17" cy="17" r={r} fill="none" strokeWidth="3" />
      <circle
        className="fg"
        cx="17"
        cy="17"
        r={r}
        fill="none"
        strokeWidth="3"
        strokeDasharray={c}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 17 17)"
        style={{ stroke: `var(${colorVar})` }}
      />
    </svg>
  );
}

export default function HomePage() {
  const weekKey = useMemo(() => isoWeekKey(), []);
  const storageKey = useMemo(() => `training-log:${weekKey}`, [weekKey]);
  const [state, setState] = useState({});

  useEffect(() => {
    setState(loadSavedState(storageKey));
  }, [storageKey]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const keys = Object.keys(window.localStorage).filter(
        (key) => key.startsWith('training-log:') && key !== storageKey,
      );
      keys.forEach((key) => window.localStorage.removeItem(key));
      window.localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      // Ignore write failures for privacy or storage-limited browsers.
    }
  }, [state, storageKey]);

  const toggleExercise = (dayId, exerciseIndex) => {
    setState((current) => ({
      ...current,
      [dayId]: {
        ...current[dayId],
        [exerciseIndex]: !current[dayId]?.[exerciseIndex],
      },
    }));
  };

  const resetWeek = () => {
    setState({});
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(storageKey);
    }
  };

  const percent = overallPct(state);

  return (
    <>
      <div className="page-shell">
        <header className="top glass-panel">
          <div className="top-inner">
            <div className="brand">
              <span className="brand-mark">PPL</span>
              <h1>WEEKLY TRAINING LOG</h1>
            </div>

            <div className="week-meta">
              <div className="week-label">{`WEEK ${weekKey.split('-W')[1]} · ${weekKey.split('-W')[0]}`}</div>
              <div className="week-count">
                <span>{percent}</span>
                <span className="pct-sign">%</span>
              </div>
            </div>
          </div>

          <div className="strip" aria-label="Weekly workout overview">
            {DAYS.map((day) => {
              const completed = dayCompletion(day, state);
              const pct = day.rest ? 0 : Math.round((completed?.pct ?? 0) * 100);

              return (
                <div key={day.id} className={`plate${day.rest ? ' rest' : ''}`}>
                  <div
                    className="plate-fill"
                    style={{
                      width: `${day.rest ? 100 : pct}%`,
                      background: day.rest ? 'var(--rest)' : `var(${day.accent})`,
                      opacity: day.rest ? 0.25 : 1,
                    }}
                  />
                  <div className="plate-label">{day.short}</div>
                </div>
              );
            })}
          </div>
        </header>

        <main className="day-grid">
          {DAYS.map((day) => {
            if (day.rest) {
              return (
                <div key={day.id} className="rest-card glass-panel">
                  <span className="rest-day">SUNDAY — REST / RECOVERY</span>
                </div>
              );
            }

            const completion = dayCompletion(day, state);
            const currentPct = completion ? Math.round(completion.pct * 100) : 0;

            return (
              <article key={day.id} className="day-card glass-panel" id={`card-${day.id}`}>
                <div className="day-header">
                  <div>
                    <div className="day-code" style={{ color: `var(${day.accent})` }}>
                      {day.code}
                    </div>
                    <h2>{day.dow}</h2>
                  </div>

                  <div className="ring-wrap">
                    {ringSVG(currentPct / 100, day.accent)}
                    <span>{currentPct}%</span>
                  </div>
                </div>

                <div className="day-title">{day.title}</div>
                <p className="day-focus">{day.focus}</p>

                <ul className="exercise-list">
                  {day.exercises.map(([name, sets], index) => {
                    const checked = !!state[day.id]?.[index];

                    return (
                      <li key={`${day.id}-${name}`} className={checked ? 'done' : ''}>
                        <button
                          type="button"
                          className="check-btn"
                          onClick={() => toggleExercise(day.id, index)}
                          aria-label={`${checked ? 'Uncheck' : 'Check'} ${name}`}
                        >
                          {checked ? checkIcon() : null}
                        </button>

                        <div className="exercise-copy">
                          <span className="exercise-name">{name}</span>
                          <span className="exercise-sets">{sets}</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </article>
            );
          })}
        </main>

        <footer className="bottom glass-panel">
          <p>Progress resets automatically at the start of every training week (Monday).</p>
          <button type="button" className="reset-btn" onClick={resetWeek}>
            Reset this week
          </button>
        </footer>
      </div>
    </>
  );
}
