import React from 'react';
import propTypes from 'prop-types';
import { Chip } from '@mui/material';
import useTranslate from '../../../hooks/useTranslate';
import QUIZZ_STATUS from '../../../constants/quizzStatus';

function QuizzStatusTag({ quizz }) {
  const { t } = useTranslate();
  const { currentStatus } = quizz;

  let color;
  let trad;
  if (currentStatus === QUIZZ_STATUS.draft) {
    color = "warning";
    trad = "Common.quizzStatus.draft";
  }
  if (currentStatus === QUIZZ_STATUS.active) {
    color = "success";
    trad = "Common.quizzStatus.active";
  }
  if (currentStatus === QUIZZ_STATUS.archived) {
    color = "error";
    trad = "Common.quizzStatus.archived";
  }



  return (
    <Chip
      label={t(trad)}
      color={color}
    />
  );
}

QuizzStatusTag.propTypes = {
  quizz: propTypes.shape({
    name: propTypes.string,
  }).isRequired,
};

export default QuizzStatusTag;
