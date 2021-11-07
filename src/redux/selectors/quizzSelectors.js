export function quizzListSelector({ quizz }) {
  return quizz.list;
};

export function currentQuizzSelector({ quizz }) {
  return quizz.current;
};

export function isQuizzLoadingSelector({ quizz }) {
  return Boolean(quizz.loading);
}
